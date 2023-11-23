import {FS} from "../../lib";
import * as child_process from 'child_process';
// https://mathjs.org/index.html
const math = require('mathjs');

export const commands: Chat.ChatCommands = {
	invmod(target, room, user, connection, cmd) {
		if (!target) return;
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		const numbers = target.split(',');
		if (numbers.length !== 2) return;
		try {
			const a = math.bignumber(numbers[0]);
			const b = math.bignumber(numbers[1]);
			const result = math.invmod(a, b);
			this.sendReplyBox(`invmod: ${result.toHex().toUpperCase()}`);
		} catch (e) {
			this.errorReply('invmod error!');
		}
	},
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
	clientbuild(target, room, user) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
	},
};
