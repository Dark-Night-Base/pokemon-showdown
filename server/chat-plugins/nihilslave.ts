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
		const result: {[k: string]: {[k: string]: string[]}} = {};
		for (const type1 of types) {
			for (const type2 of types) {
				for (const type3 of types) {
					const typeArray = Array.from(new Set([type1.name, type2.name, type3.name])).sort();
					const typeString = typeArray.join('+');
					if (result[typeString]) continue;
					result[typeString] = {
						weaknesses: [],
						resistances: [],
						immunities: [],
					};
					const species = {types: typeArray};
					for (const type of types) {
						const notImmune = dex.getImmunity(type.name, species);
						if (!notImmune) {
							result[typeString].immunities.push(type.name);
							continue;
						}
						const typeMod = dex.getEffectiveness(type.name, species);
						if (typeMod > 0) result[typeString].weaknesses.push(type.name);
						else if (typeMod < 0) result[typeString].resistances.push(type.name);
					}
					result[typeString].weaknessCnt = [result[typeString].weaknesses.length.toString()];
					result[typeString].resistanceCnt = [(
						result[typeString].resistances.length +
						result[typeString].immunities.length
					).toString()];
					for (const status in statuses) {
						if (!dex.getImmunity(status, species)) result[typeString].immunities.push(statuses[status]);
					}
				}
			}
		}
		let buf = `{\n`;
		for (const r in result) {
			buf += `\t"${r}": {\n`;
			buf += `\t\t"weaknessCnt": ${result[r].weaknessCnt[0]},\n`;
			buf += `\t\t"resistanceCnt": ${result[r].resistanceCnt[0]},\n`;
			buf += `\t\t"weaknesses": [${(result[r].weaknesses || []).map(value => `"${value}"`).join(', ')}],\n`;
			buf += `\t\t"resistances": [${(result[r].resistances || []).map(value => `"${value}"`).join(', ')}],\n`;
			buf += `\t\t"immunities": [${(result[r].immunities || []).map(value => `"${value}"`).join(', ')}]\n`;
			buf += `\t},\n`;
		}
		buf += `}\n`;
		FS(`config/chat-plugins/nihilslave/weaktable.json`).writeSync(buf);
		// todo: extend type number from 3 to n
		// todo: make covertable too
		this.sendReply('Done');
	},
};
