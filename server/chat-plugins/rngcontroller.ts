import { PRNG } from "../../sim";

async function findSeed(realNumbers : (number | number[])[], realRanges : number[][]) {
	const length = realNumbers.length;
	const iRN = Math.floor(Math.random() * 0x10000);
	const jRN = Math.floor(Math.random() * 0x10000);
	const kRN = Math.floor(Math.random() * 0x10000);
	const lRN = Math.floor(Math.random() * 0x10000);
	for (let i = iRN; ; i = (i + 1) % 0x10000) {
		for (let j = jRN; ; j = (j + 1) % 0x10000) {
			for (let k = kRN; ; k = (k + 1) % 0x10000) {
				for (let l = lRN; ; l = (l + 1) % 0x10000) {
					const seed : PRNGSeed = [i, j, k, l];
					const prng = new PRNG(seed);
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
	 * > BattleActions.getDamage(): Battle.randomChance(): PRNG.randomChance(1, critMult[critRatio]): PRNG.next(critMult[critRatio])
	 * > BattleActions.getDamage(): Battle.randomizer(): Battle.random(): PRNG.next(16)
	 * > BattleActions.secondaries(): Battle.random(): PRNG.next(100)
	 */
	rng: 'rngcontrol',
	async rngcontrol(target, room, user, connection, cmd) {
		if (!room?.battle) return;
		if (!user.isStaff) return;
		if (!target) return;
		if (!this.runBroadcast(true)) return;
		if (!this.broadcasting) return this.parse(`!rng ${target}`);

		if (target === 'clear' || target === 'c') {
			this.sendReplyBox(`${user.name} clears the set random numbers.`);
			return this.parse('/editbattle reseed');
		}
		const numbers = target.split(';')[0].split(',');
		const ranges = target.split(';')[1].split(',');
		const realNumbers : (number | number[])[] = [];
		const realRanges : number[][] = [];
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
		if (realNumbers.filter((value) => typeof value !== 'number' || value !== -1).length >= 5) {
			this.errorReply(`Warning: Too long random number series. It can take server years to finish calculation.`);
		}
		this.sendReplyBox(`${user.name} is setting the next ${realNumbers.length} random number(s) to: ${realNumbers.map((value) => typeof value === 'number' ? value : `[${value[0]}, ${value[1]})`).join(',').replace(RegExp('-1', 'g'), '*')}`);
		this.sendReplyBox(`Ranges: ${realRanges.map((value) => `[${value[0]}, ${value[1]})`).join(',')}`);

		// const length = realNumbers.length;
		// const iRN = Math.floor(Math.random() * 0x10000);
		// const jRN = Math.floor(Math.random() * 0x10000);
		// const kRN = Math.floor(Math.random() * 0x10000);
		// const lRN = Math.floor(Math.random() * 0x10000);
		// for (let i = iRN; ; i = (i + 1) % 0x10000) {
		// 	for (let j = jRN; ; j = (j + 1) % 0x10000) {
		// 		for (let k = kRN; ; k = (k + 1) % 0x10000) {
		// 			for (let l = lRN; ; l = (l + 1) % 0x10000) {
		// 				const seed : PRNGSeed = [i, j, k, l];
		// 				const prng = new PRNG(seed);
		// 				for (let m = 0; m < length; ++m) {
		// 					const rng = prng.next(realRanges[m][0], realRanges[m][1]);
		// 					const realNumber = realNumbers[m];
		// 					if (typeof realNumber === 'number') {
		// 						if (realNumber === -1) continue;
		// 						if (rng !== realNumber) break;
		// 					} else {
		// 						if (realNumber[0] !== -1 && rng < realNumber[0]) break;
		// 						if (realNumber[1] !== -1 && rng >= realNumber[1]) break;
		// 					}
		// 					if (m === length - 1) {
		// 						this.sendReplyBox(`Seed: ${i},${j},${k},${l}`);
		// 						return this.parse(`/editbattle reseed ${i},${j},${k},${l}`);
		// 					}
		// 				}
		// 				if ((lRN - l) % 0x10000 === 1) break;
		// 			}
		// 			if ((kRN - k) % 0x10000 === 1) break;
		// 		}
		// 		if ((jRN - j) % 0x10000 === 1) break;
		// 	}
		// 	if ((iRN - i) % 0x10000 === 1) break;
		// }
		const seed = await findSeed(realNumbers, realRanges);
		if (seed === undefined) {
			// It takes literally 5000 years to get here, but still
			this.errorReply(`Setting random number failed!`);
		} else {
			this.sendReplyBox(`Seed: ${seed.join(',')}`);

			const nextRNs : number[] = [];
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