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
const furtherStep = 10;

let TABLE: stepModTable;

// '0xabcdefghijklmnop' => [seed0, seed1, seed2, seed3]
function toPRNGSeed(a: string) {
	let num = a.slice(2);
	num = num.padStart(16, '0');
	const numSlice = [num.slice(0, 4), num.slice(4, 8), num.slice(8, 12), num.slice(12, 16)];
	const seed = numSlice.map(value => Number('0x' + value));
	return seed as PRNGSeed;
}

function frameToResult(frame: PRNGSeed, module: number) {
	let result = (frame[0] << 16 >>> 0) + frame[1];
	return Math.floor(result * module / 0x100000000);
}

function generateStepModTable() {
	if (FS('config/chat-plugins/rngcontroller.json').existsSync()) return;
	const table: stepModTable = {};

	const a = mathjs.evaluate('0x5D588B656C078965');
	const c = mathjs.evaluate('0x269EC3');
	const m = mathjs.evaluate('2^64');
	const twoE32 = mathjs.evaluate('2^32');
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

function findSeedNew(realNumbers: (number | number[])[], realRanges: number[][]) {
	if (!TABLE) TABLE = JSON.parse(FS('config/chat-plugins/rngcontroller.json').readSync());
	const length = realNumbers.length;
	let notNumber;
	let firstStep = 0;
	for (let i = 0; i < length; i++) {
		notNumber = (typeof realNumbers[i] !== 'number');
		if (notNumber || realNumbers[i] !== -1) {
			firstStep = i;
			break;
		}
	}
	let lowerBound: number = notNumber ? (realNumbers[firstStep] as number[])[0] : (realNumbers[firstStep] as number);
	let upperBound: number = notNumber ? (realNumbers[firstStep] as number[])[1] : ((realNumbers[firstStep] as number) + 1);
	if (lowerBound === -1) lowerBound = realRanges[firstStep][0];
	if (upperBound === -1) upperBound = realRanges[firstStep][1];
	const range = realRanges[firstStep][1] - realRanges[firstStep][0];
	for (let remainder = lowerBound; remainder < upperBound; remainder++) {
		for (let i = 0; i < tableSize; i++) {
			const stepSeed = TABLE[firstStep + 1][range][remainder][i].stepSeed;
			if (!stepSeed) return;
			const prng = new PRNG(stepSeed);
			if (firstStep + 1 === length) return TABLE[firstStep + 1][range][remainder][i].seed;
			for (let j = firstStep + 1; j < length; j++) {
				const rng = prng.next(realRanges[j][0], realRanges[j][1]);
				const realNumber = realNumbers[j];
				if (typeof realNumber === 'number') {
					if (realNumber === -1) continue;
					if (rng !== realNumber) break;
				} else {
					if (realNumber[0] !== -1 && rng < realNumber[0]) break;
					if (realNumber[1] !== -1 && rng >= realNumber[1]) break;
				}
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
		const numbers = targets[0].split(',');
		const ranges = targets.length > 1 ? targets[1].split(',') : [];
		const realNumbers: (number | number[])[] = [];
		const realRanges: number[][] = [];
		for (const number of numbers) {
			if (number.startsWith('*')) {
				const anyCount = number === '*' ? 1 : Number(number.substring(1));
				if (isNaN(anyCount)) return;
				for (let i = 0; i < anyCount; ++i) {
					realNumbers.push(-1);
				}
			} else if (number.includes('/')) {
				if (number === '/') {
					realNumbers.push(-1);
				} else if (number.startsWith('/')) {
					realNumbers.push([-1, Number(number.substring(1))]);
				} else if (number.endsWith('/')) {
					realNumbers.push([Number(number.substring(0, number.length - 1)), -1]);
				} else {
					realNumbers.push(number.split('/').map(Number));
				}
			} else {
				realNumbers.push(Number(number));
			}
		}
		for (const range of ranges) {
			if (range.includes('/')) {
				realRanges.push(range.split('/').map(Number));
			} else if (range === '') {
				realRanges.push([0, 100]);
			} else if (range.startsWith('*')) {
				const anyCount = range === '*' ? 1 : Number(range.substring(1));
				if (isNaN(anyCount)) return;
				for (let i = 0; i < anyCount; ++i) {
					realRanges.push([0, 100]);
				}
			} else {
				realRanges.push([0, Number(range)]);
			}
		}
		while (realRanges.length < realNumbers.length) {
			realRanges.push([0, 100]);
		}
		for (const realNumber of realNumbers) {
			if (typeof realNumber === 'number' && isNaN(realNumber)) return;
			if (typeof realNumber !== 'number' && (isNaN(realNumber[0]) || isNaN(realNumber[1]))) return;
		}
		for (const realRange of realRanges) {
			if (isNaN(realRange[0]) || isNaN(realRange[1])) return;
		}
		// todo: i think the actual thing we need to do here is to make findSeed() really async so that it won't lag the server
		// todo: if that failed, just try to get a more precise estimate of how long this will take and then block long requests
		if (realNumbers.filter((value) => typeof value !== 'number' || value !== -1).length > 4) {
			return this.errorReply(`Too long random number series. It will take too much time to set the correct seed.`);
		}
		this.sendReplyBox(`${user.name} is setting the next ${realNumbers.length} random number(s) to: ${realNumbers.map((value) => typeof value === 'number' ? value : `[${value[0]}, ${value[1]})`).join(',').replace(RegExp('-1', 'g'), '*')}`);
		this.sendReplyBox(`Ranges: ${realRanges.map((value) => `[${value[0]}, ${value[1]})`).join(',')}`);

		generateStepModTable();
		const seed = findSeedNew(realNumbers, realRanges);
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
		`/rng [number 1], [number 2] ... ; [range 1], [range 2] ... - Set the next random numbers to be number 1, number 2, ... (Will inform others when you use it. Test Use Only.)`,
		`E.g. /rng *,/70,0,0,/10;,,24,16 to get a hit, crit, max roll, and lowering spd focus blast`,
	],
};
