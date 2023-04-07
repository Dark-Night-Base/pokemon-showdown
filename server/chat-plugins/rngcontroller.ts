import {BigNumber} from "mathjs";
import {FS} from "../../lib";
import {PRNG} from "../../sim";

const {create, all} = require('mathjs');
const config = {
	number: 'BigNumber',
	precision: 256, // this should be set to at least 128 otherwise the calc will be imprecise
}
const mathjs = create(all, config);

interface seedTable {
	seed: PRNGSeed;
	stepSeed?: PRNGSeed;
	[step: number]: modTable;
}
interface remainderTable {
	[remainder: number]: seedTable[];
}
interface modTable {
	[module: number]: remainderTable;
}
interface stepModTable {
	[step: number]: modTable;
}

const tableSize = 1000;
const maxTry = 5e5;

let TABLE: stepModTable;

const a = mathjs.evaluate('0x5D588B656C078965');
const c = mathjs.evaluate('0x269EC3');
const m = mathjs.evaluate('2^64');
const twoE32 = mathjs.evaluate('2^32');

// '0x1234567890abcdef' => [seed0, seed1, seed2, seed3]
function toPRNGSeed(a: string) {
	let num = a.slice(2);
	num = num.padStart(16, '0');
	const numSlice = [num.slice(0, 4), num.slice(4, 8), num.slice(8, 12), num.slice(12, 16)];
	const seed = numSlice.map(value => Number('0x' + value));
	return seed as PRNGSeed;
}
function toBigNumber(a: PRNGSeed) {
	const num = a.map(value => value.toString(16).padStart(4, '0')).join('').padStart(18, '0x');
	return mathjs.evaluate(num);
}
function toPRNGResult(a: PRNGSeed, from?: number, to?: number) {
	let result = (a[0] << 16 >>> 0) + a[1];
	if (from) from = Math.floor(from);
	if (to) to = Math.floor(to);
	if (from === undefined) {
		result = result / 0x100000000;
	} else if (!to) {
		result = Math.floor(result * from / 0x100000000);
	} else {
		result = Math.floor(result * (to - from) / 0x100000000) + from;
	}
	return result;
}

function powmod(a: BigNumber, p: number, m: BigNumber): BigNumber {
	if (p < 0) return powmod(mathjs.invmod(a, m), -p, m);
	if (p === 0) return mathjs.evaluate('1');
	if (p === 1) return a;
	let result = powmod(a, p >> 1, m);
	result = mathjs.multiply(result, result);
	if (p & 1) result = mathjs.multiply(result, a);
	result = mathjs.mod(result, m);
	return result;
}
// 1 + a + a^2 + ... + a^{2n+1} = (1 + a) * (1 + a^2 + (a^2)^2 + ... + (a^2)^n)
function geomod(a: BigNumber, n: number, m: BigNumber): BigNumber {
	if (n === 0) return mathjs.evaluate('1');
	if (n === 1) return mathjs.add(a, 1);
	let result = geomod(mathjs.mod(mathjs.multiply(a, a), m), n >> 1, m);
	result = mathjs.multiply(result, mathjs.add(a, 1));
	if (n & 1) return mathjs.mod(result, m);
	result = mathjs.subtract(result, powmod(a, n + 1, m));
	return mathjs.mod(result, m);
}

// 1. find seed s, s.t. after {step} steps, PRNG.next(0, module) = remainder
// 2. given seed, find the frame after {step} steps
function generateSeed(step: number, module: number, remainder: number, seed?: PRNGSeed) {
	const result = [];
	let S;

	const a_n = powmod(a, step, m);
	const aInv_n = mathjs.invmod(a_n, m);
	let c_n = geomod(a, step - 1, m);
	c_n = mathjs.multiply(c_n, c);
	c_n = mathjs.mod(c_n, m);

	if (seed === undefined) {
		const G_n = mathjs.mod(mathjs.multiply(aInv_n, c_n), m);

		const rangeCore = Math.ceil(0x100000000 / module);
		const kValue = Math.floor(Math.random() * rangeCore + rangeCore * remainder);
		const lValue = Math.floor(Math.random() * 0x100000000);
		const k = mathjs.evaluate(kValue.toString());
		const l = mathjs.evaluate(lValue.toString());

		S = mathjs.multiply(k, twoE32);
		S = mathjs.multiply(S, aInv_n);
		S = mathjs.subtract(S, G_n);
		const left = mathjs.multiply(aInv_n, l);
		S = mathjs.add(S, left);
		S = mathjs.mod(S, m);

		result.push(toPRNGSeed(S.toHex()));
	} else {
		S = toBigNumber(seed);
		result.push(seed);
	}
	S = mathjs.multiply(S, a_n);
	S = mathjs.add(S, c_n);
	S = mathjs.mod(S, m);
	result.push(toPRNGSeed(S.toHex()));
	return result;
}

function generateStepModTable(force = false) {
	if (FS('config/chat-plugins/rngcontroller.json').existsSync() && !force) return;
	const table: stepModTable = {};

	const aInvValues: string[] = ['0x1'];
	const cValues: string[] = ['0x0'];

	let aInvValue = mathjs.evaluate('1');
	const aInv = mathjs.invmod(a, m);
	for (let i = 1; i <= 10; i++) {
		aInvValue = mathjs.mod(mathjs.multiply(aInvValue, aInv), m);
		aInvValues.push(aInvValue.toHex());
	}
	let aGeo = mathjs.evaluate('0');
	for (let i = 1; i <= 10; i++) {
		aGeo = mathjs.multiply(aGeo, a);
		aGeo = mathjs.add(aGeo, 1);
		cValues.push(mathjs.mod(mathjs.multiply(aGeo, c), m).toHex());
	}
	let kValue, lValue, k, l;
	let value, seed;
	for (let n = 1; n <= 10; n++) { // step
		const aInv_n = mathjs.evaluate(aInvValues[n]);
		const a_n = mathjs.invmod(aInv_n, m);
		const c_n = mathjs.evaluate(cValues[n]);
		const G_n = mathjs.mod(mathjs.multiply(aInv_n, c_n), m);
		for (const module of [2, 4, 8, 16, 24, 100]) { // module, or range tbh
			// should use ceil here, i think
			const rangeCore = Math.ceil(0x100000000 / module);
			for (let remainder = 0; remainder < module; remainder++) { // remainder
				for (let i = 0; i < tableSize; i++) { // size, 1000 for test
					kValue = Math.floor(Math.random() * rangeCore + rangeCore * remainder);
					lValue = Math.floor(Math.random() * 0x100000000);
					k = mathjs.evaluate(kValue.toString());
					l = mathjs.evaluate(lValue.toString());

					// x(n, module, remainder) = 2^{32} * a^{-n} * k - G_n + a^{-n} * l
					value = mathjs.multiply(k, twoE32);
					value = mathjs.multiply(value, aInv_n);
					value = mathjs.subtract(value, G_n);
					const left = mathjs.multiply(aInv_n, l);
					value = mathjs.add(value, left);
					value = mathjs.mod(value, m);

					seed = toPRNGSeed(value.toHex());
					const result: seedTable = {seed: seed};

					// temporarily disable this cuz it makes heap overflow
					// const prng = new PRNG(seed);
					// for (let s = n + 1; s <= furtherStep; s++) {
					// 	result[s] = {};
					// 	const frame = prng.nextFrame(prng.seed);
					// 	for (const r of [2, 4, 8, 16, 24, 100]) {
					// 		result[s][r] = {};
					// 		result[s][r][frameToResult(frame, r)] = [];
					// 	}
					// 	prng.seed = frame;
					// }

					// use this instead
					value = mathjs.multiply(value, a_n);
					value = mathjs.add(value, c_n);
					value = mathjs.mod(value, m);
					seed = toPRNGSeed(value.toHex());
					result.stepSeed = seed;

					if (!table[n]) table[n] = {};
					if (!table[n][module]) table[n][module] = {};
					if (!table[n][module][remainder]) table[n][module][remainder] = [];
					table[n][module][remainder].push(result);
				}
			}
		}
	}
	TABLE = table;
	FS('config/chat-plugins/rngcontroller.json').writeSync(JSON.stringify(table));
}

function findSeedRT(realNumbers: number[][], realRanges: number[][], force = false) {
	const steps: number[] = [];
	for (let i = 0; i < realNumbers.length; i++) {
		if (realNumbers[i].length !== 0) {
			steps.push(i);
		}
	}
	for (let i = steps.length - 1; i > 0; i--) {
		steps[i] -= steps[i - 1];
	}
	const firstStep = steps[0];
	const lowerBound = realNumbers[firstStep][0];
	const upperBound = realNumbers[firstStep][1];
	const range = realRanges[firstStep][1] - realRanges[firstStep][0];
	const maxTryTimes = force ? (maxTry * 100) : maxTry;
	for (let i = 0; i < maxTryTimes; i++) {
		const randomRemainder = Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
		let seeds = generateSeed(firstStep + 1, range, randomRemainder);
		const seed = seeds[0].slice() as PRNGSeed;
		if (steps.length === 1) return seed;
		for (let j = 1; j < steps.length; j++) {
			const step = steps[j];
			// module & remainder irrelevant here
			seeds = generateSeed(step, range, randomRemainder, seeds[1]);
			const result = toPRNGResult(seeds[1], realRanges[step][0], realRanges[step][1]);
			if (result < realNumbers[step][0] || result >= realNumbers[step][1]) break;
			if (j === steps.length - 1) {
				return seed as PRNGSeed;
			}
		}
	}
}

function findSeedNew(realNumbers: number[][], realRanges: number[][]) {
	if (!TABLE) TABLE = JSON.parse(FS('config/chat-plugins/rngcontroller.json').readSync());
	const length = realNumbers.length;
	let firstStep = 0;
	for (let i = 0; i < length; i++) {
		if (realNumbers[i].length !== 0) {
			firstStep = i;
			break;
		}
	}
	const lowerBound = realNumbers[firstStep][0];
	const upperBound = realNumbers[firstStep][1];
	const range = realRanges[firstStep][1] - realRanges[firstStep][0];
	for (let remainder = lowerBound; remainder < upperBound; remainder++) {
		for (let i = 0; i < tableSize; i++) {
			if (!TABLE[firstStep + 1][range]) return;
			const stepSeed = TABLE[firstStep + 1][range][remainder][i].stepSeed;
			if (!stepSeed) return;
			const prng = new PRNG(stepSeed);
			if (firstStep + 1 === length) return TABLE[firstStep + 1][range][remainder][i].seed;
			for (let j = firstStep + 1; j < length; j++) {
				const rng = prng.next(realRanges[j][0], realRanges[j][1]);
				const realNumber = realNumbers[j];
				if (realNumber.length === 0) continue;
				if (rng < realNumber[0] || rng >= realNumber[1]) break;
				if (j === length - 1) {
					return TABLE[firstStep + 1][range][remainder][i].seed;
				}
			}
		}
	}
}

function findSeed(realNumbers: (number | number[])[], realRanges: number[][]) {
	const length = realNumbers.length;
	const iRN = Math.floor(Math.random() * 0x10000);
	const jRN = Math.floor(Math.random() * 0x10000);
	const kRN = Math.floor(Math.random() * 0x10000);
	const lRN = Math.floor(Math.random() * 0x10000);
	let loopCount = 0; // hard timeout
	const timeout = 5e8; // about 1 min
	for (let i = iRN; ; i = (i + 1) % 0x10000) {
		for (let j = jRN; ; j = (j + 1) % 0x10000) {
			for (let k = kRN; ; k = (k + 1) % 0x10000) {
				for (let l = lRN; ; l = (l + 1) % 0x10000) {
					const seed: PRNGSeed = [i, j, k, l];
					const prng = new PRNG(seed);
					++loopCount;
					for (let m = 0; m < length; ++m) {
						const rng = prng.next(realRanges[m][0], realRanges[m][1]);
						const realNumber = realNumbers[m];
						if (typeof realNumber === 'number') {
							if (realNumber === -1) continue;
							if (rng !== realNumber) break;
						} else {
							if (realNumber[0] !== -1 && rng < realNumber[0]) break;
							if (realNumber[1] !== -1 && rng >= realNumber[1]) break;
						}
						if (m === length - 1) {
							return seed;
						}
					}
					if (loopCount > timeout) return undefined;
					if ((lRN - l) % 0x10000 === 1) break;
				}
				if ((kRN - k) % 0x10000 === 1) break;
			}
			if ((jRN - j) % 0x10000 === 1) break;
		}
		if ((iRN - i) % 0x10000 === 1) break;
	}
}

function parseNumberRangeCells(nr: string, splits: string[] = []): any {
	const splitsCopy = splits.slice();
	const splitChar = splitsCopy.pop();
	if (nr === '') return -1;
	if (splitChar === undefined) return Number(nr);
	return nr.split(splitChar).map(value => parseNumberRangeCells(value, splitsCopy))
		// [a] => a
		.map(value => (typeof value !== 'number' && value.length === 1) ? value[0] : value);
}

export const commands: Chat.ChatCommands = {
	/**
	 * Order of RNG in Battle:
	 * > Battle.speedSort(): PRNG.shuffle(): PRNG.next(0, 2) // (0, 2) is the case for Singles
	 * >>> It somehow takes 6 random numbers to determine the order to move when there is SpeedTie (otherwise takes 1)
	 * > BattleActions.hitStepAccuracy(): Battle.randomChance(): PRNG.randomChance(accuracy, 100): PRNG.next(100)
	 * >>> Sometimes hitStepAccuracy looks like the 3rd instead of the 2nd, I'm not sure
	 * > BattleActions.getDamage(): Battle.randomChance(): PRNG.randomChance(1, critMult[critRatio]):
	 *       PRNG.next(critMult[critRatio])
	 * > BattleActions.getDamage(): Battle.randomizer(): Battle.random(): PRNG.next(16)
	 * > BattleActions.secondaries(): Battle.random(): PRNG.next(100)
	 */
	rng: 'rngcontrol',
	rngcontrol(target, room, user, connection, cmd) {
		if (!room?.battle) return;
		if (!user.isStaff) return;
		if (!target) return;
		if (!this.runBroadcast(true)) return;
		if (!this.broadcasting) return this.parse(`!rng ${target}`);

		if (target === 'clear' || target === 'c') {
			this.sendReplyBox(`${user.name} clears the set random numbers.`);
			return this.parse('/editbattle reseed');
		}

		const targets = target.split(';');
		const force = (targets.length > 1);
		const rawParsedResults = parseNumberRangeCells(targets[0], ['/', '|', ',']);
		const realNumbers: number[][] = [];
		const realRanges: number[][] = [];

		// set numbers & ranges
		if (rawParsedResults === -1) {
			return this.errorReply(`Invalid params, won't do anything.`);
		}
		for (const numberRange of rawParsedResults) {
			if (typeof numberRange === 'number') {
				for (let i = 0; i > numberRange; i--) {
					realNumbers.push([]);
					realRanges.push([0, 100]);
				}
				if (numberRange >= 0) {
					realNumbers.push([numberRange, numberRange + 1]);
					realRanges.push([0, 100]);
				}
				continue;
			}
			// parse range
			if (typeof numberRange[1] === 'number') {
				realRanges.push([0, numberRange[1] > 0 ? numberRange[1] : 100]);
			} else {
				realRanges.push((numberRange[1] as number[]).map((value, index) => {
					if (value === -1) {
						if (index === 0) return 0;
						return 100;
					}
					return value;
				}));
			}
			// parse number
			if (typeof numberRange[0] === 'number') {
				if (numberRange[0] >= 0) {
					realNumbers.push([numberRange[0], numberRange[0] + 1]);
				} else {
					realNumbers.push([]);
				}
			} else {
				realNumbers.push((numberRange[0] as number[]).map((value, index) => value === -1 ? realRanges[realRanges.length - 1][index] : value));
			}
		}
		// validation
		for (const range of realRanges) {
			if (!range) return this.errorReply(`Wrong ranges!`);
			if (range.length !== 2) return this.errorReply(`Wrong ranges!`);
			if (isNaN(range[0]) || isNaN(range[1])) return this.errorReply(`Wrong ranges!`);
		}
		for (const num of realNumbers) {
			if (num === undefined) return this.errorReply(`Wrong numbers!`);
			if (num.length !== 0 && num.length !== 2) return this.errorReply(`Wrong numbers!`);
			if (num.length === 2 && (isNaN(num[0]) || isNaN(num[1]))) return this.errorReply(`Wrong numbers!`);
		}
		if (realNumbers.findIndex(value => value.length !== 0) >= 10) {
			return this.errorReply(`Too long series!`);
		}
		// output 0
		this.sendReplyBox(`${user.name} is setting the next ${realNumbers.length} random number(s) to: ${realNumbers.map(value => value.length === 0 ? '*' : `[${value[0]}, ${value[1]})`).join(',')}`);
		this.sendReplyBox(`Ranges: ${realRanges.map((value) => `[${value[0]}, ${value[1]})`).join(',')}`);

		// find seed
		let seed = findSeedRT(realNumbers, realRanges, force);
		// output 1
		if (seed === undefined) {
			this.errorReply(`Setting random number failed!`);
		} else {
			this.sendReplyBox(`Seed: ${seed.join(',')}`);

			const nextRNs: number[] = [];
			const resultRNG = new PRNG(seed);
			for (let i = 0; i < realNumbers.length; ++i) {
				nextRNs.push(resultRNG.next(realRanges[i][0], realRanges[i][1]));
			}
			this.sendReplyBox(`Next ${realNumbers.length} Random Number(s): ${nextRNs.join(',')}`);

			return this.parse(`/editbattle reseed ${seed.join(',')}`);
		}
	},
	rngcontrolhelp: [
		`/rng cell1,cell2,cell3,... - Set the next random numbers described by the cells. (Will inform others when you use it. Test Use Only.)`,
		`Syntax for a cell is generally d*/?d*|?d*/?d*. E.g. /rng 0/30|0/100 to set a random number in range [0,30) for PRNG.next(0,100).`,
		`If u wanna leave n consecutive random numbers uncontrolled u can use -n. E.g. /rng -4,0/30|0/100 to set the 5th next random number as [0,30).`,
		`Sometimes the command will fail to find the seed you demand, u can add a ; at the end of it to force one.`
	],
	rngtable(target, room, user, connection, cmd) {
		if (!user.isStaff) return;
		generateStepModTable(true);
		this.sendReplyBox(`RNG Table Generated.`);
	},
};
