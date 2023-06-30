import {FS} from "../../lib";
// https://mathjs.org/index.html
const math = require('mathjs');

export const commands: Chat.ChatCommands = {
	invmod(target, room, user, connection, cmd) {
		if (!target) return;
		if (!user.isStaff) return; // remove this line after bug fixed
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
		if (!user.isStaff) return;
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
};
