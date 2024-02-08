import {FS} from "../../lib";
// https://mathjs.org/index.html

export const commands: Chat.ChatCommands = {
	weaktable(target, room, user) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (!this.runBroadcast()) return;
		const dex = Dex;
		const types = dex.types.all();
		const statuses: {[k: string]: string} = {
			brn: "Burn",
			frz: "Frozen",
			hail: "Hail damage",
			par: "Paralysis",
			powder: "Powder moves",
			prankster: "Prankster",
			sandstorm: "Sandstorm damage",
			tox: "Toxic",
			trapped: "Trapping",
		};
		const weaktable: {[k: string]: {[k: string]: any[]}} = {};
		for (const type1 of types) {
			for (const type2 of types) {
				for (const type3 of types) {
					const typeArray = Array.from(new Set([type1.name, type2.name, type3.name])).sort();
					const typeString = typeArray.join('+');
					if (weaktable[typeString]) continue;
					weaktable[typeString] = {
						weaknesses: [],
						resistances: [],
						immunities: [],
					};
					const species = {types: typeArray};
					for (const type of types) {
						const notImmune = dex.getImmunity(type.name, species);
						if (!notImmune) {
							weaktable[typeString].immunities.push(type.name);
							continue;
						}
						const typeMod = dex.getEffectiveness(type.name, species);
						if (typeMod > 0) weaktable[typeString].weaknesses.push(type.name);
						else if (typeMod < 0) weaktable[typeString].resistances.push(type.name);
					}
					weaktable[typeString].weaknessCnt = [weaktable[typeString].weaknesses.length];
					weaktable[typeString].resistanceCnt = [
						weaktable[typeString].resistances.length +
						weaktable[typeString].immunities.length
					];
					for (const status in statuses) {
						if (!dex.getImmunity(status, species)) weaktable[typeString].immunities.push(statuses[status]);
					}
				}
			}
		}
		for (const offenseTypeString in weaktable) {
			const offenseTypes = offenseTypeString.split('+');
			const coverage2: number[] = [0, 0, 0, 0];
			const coverage3: number[] = [0, 0, 0, 0];
			for (const DefenseTypeString in weaktable) {
				const typeLength = DefenseTypeString.split('+').length;
				const coverageIndex = (() => {
					if (offenseTypes.findIndex(
						value => weaktable[DefenseTypeString].weaknesses.includes(value)
					) !== -1) return 0;
					if (offenseTypes.findIndex(
						value => !weaktable[DefenseTypeString].resistances.includes(value) &&
							!weaktable[DefenseTypeString].immunities.includes(value)
					) !== -1) return 1;
					if (offenseTypes.findIndex(
						value => !weaktable[DefenseTypeString].immunities.includes(value)
					) !== -1) return 2;
					return 3;
				})();
				coverage3[coverageIndex]++;
				if (typeLength < 3) coverage2[coverageIndex]++;
			}
			weaktable[offenseTypeString].coverage2 = coverage2;
			weaktable[offenseTypeString].coverage3 = coverage3;
		}
		let buf = `{\n`;
		for (const r in weaktable) {
			buf += `\t"${r}": {\n`;
			buf += `\t\t"weaknessCnt": ${weaktable[r].weaknessCnt[0]},\n`;
			buf += `\t\t"resistanceCnt": ${weaktable[r].resistanceCnt[0]},\n`;
			buf += `\t\t"defensiveDelta": ${weaktable[r].resistanceCnt[0] - weaktable[r].weaknessCnt[0]},\n`;
			buf += `\t\t"coverage2": [${weaktable[r].coverage2.join(', ')}],\n`;
			buf += `\t\t"coverage3": [${weaktable[r].coverage3.join(', ')}],\n`;
			buf += `\t\t"offensiveDelta2": ${weaktable[r].coverage2[0] - weaktable[r].coverage2[2] - weaktable[r].coverage2[3]},\n`;
			buf += `\t\t"offensiveDelta3": ${weaktable[r].coverage3[0] - weaktable[r].coverage3[2] - weaktable[r].coverage3[3]},\n`;
			buf += `\t\t"weaknesses": [${(weaktable[r].weaknesses || []).map(value => `"${value}"`).join(', ')}],\n`;
			buf += `\t\t"resistances": [${(weaktable[r].resistances || []).map(value => `"${value}"`).join(', ')}],\n`;
			buf += `\t\t"immunities": [${(weaktable[r].immunities || []).map(value => `"${value}"`).join(', ')}]\n`;
			buf += `\t},\n`;
		}
		buf += `}\n`;
		FS(`config/chat-plugins/nihilslave/weaktable.json`).writeSync(buf);
		// todo: extend type number from 3 to n
		// todo: make covertable too
		this.sendReply('Done');
	},
	// temporary function, remove when weaktable() upgraded
	weaktable4(target, room, user) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (!this.runBroadcast()) return;
		const dex = Dex;
		const types = dex.types.all();
		const statuses: {[k: string]: string} = {
			brn: "Burn",
			frz: "Frozen",
			hail: "Hail damage",
			par: "Paralysis",
			powder: "Powder moves",
			prankster: "Prankster",
			sandstorm: "Sandstorm damage",
			tox: "Toxic",
			trapped: "Trapping",
		};
		const weaktable4: {[k: string]: {[k: string]: any[]}} = {};
		const typeset2: Set<string> = new Set();
		for (const type1 of types) {
			for (const type2 of types) {
				const typeCombination = Array.from(new Set([type1.name, type2.name])).sort();
				typeset2.add(typeCombination.join('+'));
				for (const type3 of types) {
					for (const type4 of types) {
						const typeArray = Array.from(new Set([type1.name, type2.name, type3.name, type4.name])).sort();
						if (typeArray.length === 3) continue;
						const typeString = typeArray.join('+');
						if (weaktable4[typeString]) continue;
						weaktable4[typeString] = {
							weaknesses: [],
							resistances: [],
							immunities: [],
						};
						if (typeArray.length > 2) continue;
						const species = {types: typeArray};
						for (const type of types) {
							const notImmune = dex.getImmunity(type.name, species);
							if (!notImmune) {
								weaktable4[typeString].immunities.push(type.name);
								continue;
							}
							const typeMod = dex.getEffectiveness(type.name, species);
							if (typeMod > 0) weaktable4[typeString].weaknesses.push(type.name);
							else if (typeMod < 0) weaktable4[typeString].resistances.push(type.name);
						}
						weaktable4[typeString].weaknessCnt = [weaktable4[typeString].weaknesses.length];
						weaktable4[typeString].resistanceCnt = [
							weaktable4[typeString].resistances.length +
							weaktable4[typeString].immunities.length
						];
						for (const status in statuses) {
							if (!dex.getImmunity(status, species)) weaktable4[typeString].immunities.push(statuses[status]);
						}
					}
				}
			}
		}
		const typetable2 = Array.from(typeset2);
		for (const offenseTypeString in weaktable4) {
			const offenseTypes = offenseTypeString.split('+');
			const coverage2: number[] = [0, 0, 0, 0];
			for (const DefenseTypeString of typetable2) {
				const coverageIndex = (() => {
					if (offenseTypes.findIndex(
						value => weaktable4[DefenseTypeString].weaknesses.includes(value)
					) !== -1) return 0;
					if (offenseTypes.findIndex(
						value => !weaktable4[DefenseTypeString].resistances.includes(value) &&
							!weaktable4[DefenseTypeString].immunities.includes(value)
					) !== -1) return 1;
					if (offenseTypes.findIndex(
						value => !weaktable4[DefenseTypeString].immunities.includes(value)
					) !== -1) return 2;
					return 3;
				})();
				coverage2[coverageIndex]++;
			}
			weaktable4[offenseTypeString].coverage2 = coverage2;
		}
		let buf = `{\n`;
		for (const r in weaktable4) {
			buf += `\t"${r}": {\n`;
			buf += `\t\t"coverage2": [${weaktable4[r].coverage2.join(', ')}],\n`;
			buf += `\t\t"offensiveDelta2": ${weaktable4[r].coverage2[0] - weaktable4[r].coverage2[2] - weaktable4[r].coverage2[3]},\n`;
			buf += `\t\t"weaknesses": [${(weaktable4[r].weaknesses || []).map(value => `"${value}"`).join(', ')}],\n`;
			buf += `\t\t"resistances": [${(weaktable4[r].resistances || []).map(value => `"${value}"`).join(', ')}],\n`;
			buf += `\t\t"immunities": [${(weaktable4[r].immunities || []).map(value => `"${value}"`).join(', ')}]\n`;
			buf += `\t},\n`;
		}
		buf += `}\n`;
		FS(`config/chat-plugins/nihilslave/weaktable4.json`).writeSync(buf);
		this.sendReply('Done');
	},
	movepointchart(target, room, user) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (!this.runBroadcast()) return;
		const moves = Dex.moves.all();
		const points: {[k: string]: number} = {};
		for (const move of moves) {
			if (move.category === 'Status') continue;
			if (move.isZ || move.isMax) continue;
			if (move.isNonstandard === 'CAP') continue;
			let power = move.basePower;
			const powerx2 = power * 2;
			const powerMapper: {[k: string]: number} = {
				acrobatics: powerx2,
				boltbeak: powerx2,
				expandingforce: power * 1.5,
				facade: powerx2,
				ficklebeam: power * 1.3,
				finalgambit: 250,
				fishiousrend: powerx2,
				flail: 200,
				frustration: 102,
				grassknot: 80,
				heatcrash: 80,
				heavyslam: 80,
				lastrespects: power * 3,
				lowkick: 80,
				multiattack: 100,
				pikapapow: 102,
				powertrip: 80,
				psyblade: power * 1.5,
				pursuit: powerx2,
				ragefist: power * 3,
				return: 102,
				reversal: 200,
				risingvoltage: powerx2,
				storedpower: 80,
				technoblast: 100,
				terrainpulse: powerx2,
				veeveevolley: 102,
				weatherball: powerx2,
			}
			if (move.id in powerMapper) power = powerMapper[move.id];
			if (move.ohko) power = 250;
			if (move.multihit) {
				if (['tripleaxel', 'triplekick'].includes(move.id)) power *= 6; // doesn't work
				else if (typeof move.multihit === 'number') power *= move.multihit;
				else power *= 3.1;
			}
			if (move.willCrit) power *= 1.5;
			if (power < 80) points[move.id] = 0.5;
			else if (power <= 100) points[move.id] = 1;
			else if (power < 120) points[move.id] = 1.5;
			else if (power <= 150) points[move.id] = 2;
			else points[move.id] = 2.5;
			if ((move.priority > 0 && move.id !== 'bide') || move.id === 'grassyglide') points[move.id] += 0.5;
			if (move.flags.heal) points[move.id] += 0.5;
			if (move.flags.recharge) points[move.id] -= 0.5;
			if (move.ignoreAbility) points[move.id] += 0.5;
			if (move.selfSwitch) points[move.id] += 0.5;
			if (move.volatileStatus === 'partiallytrapped') points[move.id] += 0.5;
			const secondary = move.secondary;
			if (secondary && secondary.chance && (secondary.chance >= 30 || secondary.status === 'slp')) {
				const isVeryUsefulSecondary = ['acidspray', 'direclaw', 'luminacrash'].includes(move.id) || secondary.status === 'slp';
				const isUsefulSecondary = isVeryUsefulSecondary || secondary.boosts || secondary.self || secondary.status || secondary.volatileStatus;
				if (isVeryUsefulSecondary) points[move.id] += 0.5;
				if (isUsefulSecondary && (power >= 80 && power < 120 || secondary.chance >= 50 || isVeryUsefulSecondary)) points[move.id] += 0.5;
			}
			const self = move.self;
			if (self) {
				const isVeryUsefulSelf = self.sideCondition;
				const isUsefulSelf = isVeryUsefulSelf || self.boosts && Object.values(self.boosts).some(value => value > 0);
				if (isVeryUsefulSelf) points[move.id] += 0.5;
				if (isUsefulSelf && (power >= 80 || isVeryUsefulSelf)) points[move.id] += 0.5;
			}
			const otherVeryUseful = [
				'ceaselessedge', 'endeavor', 'stoneaxe', 'lastrespects', 'powertrip', 'ragefist', 'storedpower',
			];
			const otherUseful = otherVeryUseful.concat([
				'barbbarrage', 'bodypress', 'collisioncourse', 'coreenforcer', 'counter', 'electrodrift', 'electroshot', 'infernalparade',
				'hex', 'knockoff', 'metalburst', 'mirrorcoat', 'mortalspin', 'naturesmadness', 'psychicnoise', 'rapidspin',
				'ruination', 'saltcure', 'sparklyswirl', 'spectralthief', 'superfang', 'thousandarrows', 'venoshock',
			]);
			const otherUseless = [
				'belch', 'burnup', 'doubleshock', 'dreameater', 'freezeshock', 'iceburn', 'lastresort', 'shelltrap',
				'skullbash', 'skyattack', 'steelroller', 'synchronoise'
			];
			if (otherVeryUseful.includes(move.id)) points[move.id] += 0.5;
			if (otherUseful.includes(move.id)) points[move.id] += 0.5;
			if (otherUseless.includes(move.id)) points[move.id] -= 0.5;
			points[move.id] = Math.max(0.5, points[move.id]);
			points[move.id] = Math.min(2.5, points[move.id]);
		}

		let buf = 'const MovePointsDraft: {[k: string]: number} = {\n';
		for (const move in points) buf += `\t${move}: ${points[move]},\n`;
		buf += '};\n';
		const splitedPoints: {[p: number]: string[]} = {
			0.5: [],
			1: [],
			1.5: [],
			2: [],
			2.5: [],
		};
		buf += 'const SplitedMovePointsDraft: {[p: number]: string[]} = {\n';
		for (const move in points) splitedPoints[points[move]].push(move);
		for (const point of Object.keys(splitedPoints).sort()) buf += `\t${point}: ['${splitedPoints[Number.parseFloat(point)].join("', '")}'],\n`;
		buf += '};\n';
		FS(`config/chat-plugins/nihilslave/movepointchart.ts`).writeSync(buf);
		this.sendReply('Done');
	},
	clientbuild(target, room, user) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
	},
};
