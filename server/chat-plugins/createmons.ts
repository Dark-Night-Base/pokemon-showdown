import { typeToPoint, abilityToPoint, moveToPoint } from '../../data/mods/createmons/pointchart';

export const commands: Chat.ChatCommands = {
	ctm(target, room, user, connection) {
		if (Monitor.countPrepBattle(connection.ip, connection)) {
			return;
		}
		if (!target) return this.errorReply(this.tr`Provide a valid slot.`);
		const slot = Number(target);
		if (isNaN(slot)) return this.errorReply(this.tr`Provide a valid slot.`);
		const format = Dex.formats.get('gen9balancedcreatemons');
		const newTeam = user.battleSettings.team.split(']')[slot];

		return TeamValidatorAsync.get(format.id).validateTeam(newTeam).then(result => {
			connection.popup(`${result.slice(1).replace(/\n/g, '\n- ')}`);
		});
	},
	ctmhelp: [`/ctm [slot] - Validates your current Createmons set (set with /utm).`],

	crtm: 'createmons',
	createmons(target, room, user, connection) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help crtm');
		if (target === 'formula' || target === 'f') {
			this.sendReplyBox(
				`Createmons 分数计算方法：<br />` + 
				`&bullet;首先计算出以下几项：<br />` + 
				`BST：种族和 <br />` + 
				`SD：种族值标准差（种族分配得越极端这项越大）<br />` + 
				`T：属性分。如果是双属性则为两种属性的分数之和；如果是单属性则为属性分数乘以 1.5 <br />` + 
				`A：特性分 <br />` + 
				`M：招式分。等于各招式分数之和，空白招式计 0.5 分 <br />` + 
				`&bullet;总分 = (BST - 450) * (SD + 100) * T * A * M / 100 <br />` + 
				`如果 BST 小于 500，则上面式子中第一项固定为 50。`
			);
			return;
		}
		
		const point = Number(target);
		if (!isNaN(point)) {
			let buf = '';
			let types: string[] = [];
			let abilities: string[] = [];
			let moves: string[] = [];
			for (const type in typeToPoint) {
				if (typeToPoint[type] === point) {
					types.push(Dex.types.get(type).name);
				}
			}
			for (const ability in abilityToPoint) {
				if (abilityToPoint[ability] === point) {
					abilities.push(Dex.abilities.get(ability).name);
				}
				if (point === 1) {
					abilities = Dex.abilities.all().filter(value => !abilityToPoint[value.id] && value.isNonstandard !== "CAP").map(value => value.name);
				}
			}
			for (const move in moveToPoint) {
				if (moveToPoint[move] === point) {
					moves.push(Dex.moves.get(move).name);
				}
				if (point === 0.5) {
					moves = Dex.moves.all().filter(value => !moveToPoint[value.id] && !value.isZ && !value.isMax).map(value => value.name);
				}
			}
			if (types.length) {
				buf += `<details><summary><b>Types of ${point} Points</b></summary>${types.join(', ')}</details>`;
			}
			if (abilities.length) {
				buf += `<details><summary><b>Abilities of ${point} Points</b></summary>${abilities.join(', ')}</details>`;
			}
			if (moves.length) {
				buf += `<details><summary><b>Moves of ${point} Points</b></summary>${moves.join(', ')}</details>`;
			}
			if (buf.length) {
				this.sendReplyBox(buf);
			} else {
				this.errorReply(`No Type/Ability/Move of ${point} Points is found.`);
			}
			return;
		}

		const type = Dex.types.get(target);
		const ability = Dex.abilities.get(target);
		const move = Dex.moves.get(target);
		if (type.exists) {
			this.sendReplyBox(`${type.name}'s Point is ${typeToPoint[type.id]}`);
			return;
		}
		if (ability.exists) {
			this.sendReplyBox(`${ability.name}'s Point is ${abilityToPoint[ability.id] || 1}`);
			return;
		}
		if (move.exists) {
			this.sendReplyBox(`${move.name}'s Point is ${moveToPoint[move.id] || 0.5}`);
			return;
		}
		this.errorReply(`Type/Ability/Move doesn't exist.`);
	},
	createmonshelp: [
		`/crtm [属性/特性/招式] - 查看该属性/特性/招式在 Createmons 中的分数。如：/crtm fairy 查看妖精属性的分数。`, 
		`/crtm 分数 - 查看所有该分数的属性/特性/招式。如：/crtm 2 查看所有 2 分的属性、特性和招式。`, 
		`/crtm formula 或 /crtm f - 查看 Createmons 的算分公式。`, 
		`/crtm [type/ability/move] - Show the Point of that type/ability/move in Createmons. E.g. /crtm fairy to see the Point of fairy type.`, 
		`/crtm number - Show all types/abilities/moves of that number of Points. E.g. /crtm 2 to see all types, abilities, and moves of 2 Point.`, 
		`/crtm formula or /crtm f - See the formula Createmons uses to calculate the Point.`
	],
}