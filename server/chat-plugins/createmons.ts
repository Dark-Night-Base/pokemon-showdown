import {typeToPoint, abilityToPoint, moveToPoint} from '../../data/mods/createmons/pointchart';

function orderByPoint(category: string) {
	let buf = '';
	const categoryToData: {[k: string]: {[k: string]: number}} = {
		Type: typeToPoint,
		Ability: abilityToPoint,
		Move: moveToPoint,
	};
	const categoryToDex: {[k: string]: any} = {
		Type: Dex.types,
		Ability: Dex.abilities,
		Move: Dex.moves,
	};
	let data: {[k: string]: number};
	let dexData;
	if (category in categoryToData) {
		data = categoryToData[category];
		dexData = categoryToDex[category];
	} else {
		return 'Something wrong!';
	}
	const sheet: {[k: string]: string[]} = {};
	let pointList: number[] = [];
	for (const val in data) {
		const point = data[val].toFixed(1);
		if (point in sheet) {
			sheet[point].push(dexData.get(val).name);
		} else {
			sheet[point] = [dexData.get(val).name];
			pointList.push(data[val]);
		}
	}
	pointList = pointList.sort((a, b) => a - b);
	const categoryPlural = category === 'Ability' ? 'Abilities' : (category + 's');
	for (const point of pointList) {
		const pointstring = point.toFixed(1);
		buf += `<b>${categoryPlural} of ${pointstring} Points</b><br />${sheet[pointstring].join(', ')}<br />`;
	}
	if (category === 'Ability') {
		buf += `<b>Abilities of 1 Point</b><br />All Others<br />`;
	}
	if (category === 'Move') {
		buf += `<b>Moves of 0.5 Point</b><br />All Others<br />`;
	}
	return buf;
}

export const commands: Chat.ChatCommands = {
	crtm: 'createmons',
	createmons(target, room, user, connection) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help crtm');

		switch (target.toLowerCase()) {
		case 'formula':
		case 'f':
			this.sendReplyBox(
				`<b>Createmons 分数计算方法</b><br />` +
				`首先计算出以下几项: <br />` +
				`&bullet; S: 种族分. 计算方式在最后. <br />` +
				`&bullet; T: 属性分. 等于各属性分数之和; 如果是单属性则为属性分数乘以 1.5. <br />` +
				`&bullet; A: 特性分. <br />` +
				`&bullet; M: 招式分. 等于各招式分数之和; 空白招式计 0.5 分. <br />` +
				`总分 = S * T * A * M <br />` +
				`<details><summary><em>种族分计算方式</em></summary>` +
				`h, a, b, c, d, s 分别代表 HP, 攻击, 防御, 特攻, 特防, 速度种族值. <br />` +
				`&bullet; <em> 第 0 步 </em><br />` +
				`&bullet; 计算物理输出 A = 2 * a + 100, 特殊输出 C 同理 <br />` +
				`&bullet; 计算物理耐久 B = (2 * h + 200) * (2 * b + 100), 特殊耐久 D 同理 <br />` +
				`&bullet; <em> 第 1 步 </em><br />` +
				`&bullet; 计算平均输出 Aw = max(A, C) * 4 / 5 + min(A, C) * 1 / 5 <br />` +
				`&bullet; 计算平均耐久 Bw = max(B, D) * 2 / 3 + min(B, D) * 1 / 3 <br />` +
				`&bullet; <em> 第 2 步 </em><br />` +
				`&bullet; 计算输出与梦幻输出的比值 Pa = Aw / 300 <br />` +
				`&bullet; 计算耐久与梦幻耐久的比值 Pb = Bw / (400 * 300) <br />` +
				`&bullet; 计算速度与梦幻速度的比值 Ps = (2 * s + 100) / 300 <br />` +
				`&bullet; <em> 第 3 步 </em><br />` +
				`&bullet; 输出核函数 f(x) = 11x^3 - 25x^2 + 19x - 0.75 <br />` +
				`&bullet; 耐久核函数 g(x) = 10x^3 - 18x^2 + 10x + 2 <br />` +
				`&bullet; 速度核函数 k(x) = -x^4 + 8x^3 - 10x^2 + 3x + 1 <br />` +
				`&bullet; 种族分 S = f(Pa) * g(Pb) * k(Ps) * 10 <br />` +
				`<b>太长不看</b>: 双攻越高、耐久越高、速度越极端, S 越大.` +
				`</details><br />` +

				`<br />` +

				`<b>Createmons Point Calculation</b><br />` +
				`Calc the following terms: <br />` +
				`&bullet; S: Stats Point. See the last column for details. <br />` +
				`&bullet; T: Type Point. Equals to the sum of the Points of Types. Times 1.5 if single Type. <br />` +
				`&bullet; A: Ability Point. <br />` +
				`&bullet; M: Move Point. Equals to the sum of the Points of Moves. Blank Move counts as 0.5 Point. <br />` +
				`Total = S * T * A * M <br />` +
				`<details><summary><em>How Stats Point is Calculated</em></summary>` +
				`h, a, b, c, d, s represent base stats of HP, Atk, Def, SpA, SpD, Spe respectively. <br />` +
				`&bullet; <em>Step 0</em><br />` +
				`&bullet; Physical Offense A = 2 * a + 100, Special Offense C is calculated in the same way <br />` +
				`&bullet; Physical Bulk B = (2 * h + 200) * (2 * b + 100), Special Bulk D is calculated in the same way <br />` +
				`&bullet; <em>Step 1</em><br />` +
				`&bullet; Weighed Average of Offense Aw = max(A, C) * 4 / 5 + min(A, C) * 1 / 5 <br />` +
				`&bullet; Weighed Average of Bulk Bw = max(B, D) * 2 / 3 + min(B, D) * 1 / 3 <br />` +
				`&bullet; <em>Step 2</em><br />` +
				`&bullet; Offense Proportion (to that of Mew) Pa = Aw / 300 <br />` +
				`&bullet; Bulk Proportion (to that of Mew) Pb = Bw / (400 * 300) <br />` +
				`&bullet; Speed Proportion (to that of Mew) Ps = (2 * s + 100) / 300 <br />` +
				`&bullet; <em>Step 3</em><br />` +
				`&bullet; Kernal Function for Offense f(x) = 11x^3 - 25x^2 + 19x - 0.75 <br />` +
				`&bullet; Kernal Function for Bulk g(x) = 10x^3 - 18x^2 + 10x + 2 <br />` +
				`&bullet; Kernal Function for Speed k(x) = -x^4 + 8x^3 - 10x^2 + 3x + 1 <br />` +
				`&bullet; Stats Point S = f(Pa) * g(Pb) * k(Ps) * 10 <br />` +
				`<b>TL;DR</b>: Basically, the higher the attacks / the more the bulk / the more extreme the speed, the greater the Stats Point.` +
				`</details>`
			);
			return;
		case 'type':
		case 'types':
		case 't':
			const tBuf = orderByPoint('Type');
			this.sendReplyBox(tBuf);
			return;
		case 'ability':
		case 'abilities':
		case 'a':
			const aBuf = orderByPoint('Ability');
			this.sendReplyBox(aBuf);
			return;
		case 'move':
		case 'moves':
		case 'm':
			const mBuf = orderByPoint('Move');
			this.sendReplyBox(mBuf);
			return;
		default:
			break;
		}

		const point = Number(target);
		if (!isNaN(point)) {
			let buf = '';
			const types: string[] = [];
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
					abilities = Dex.abilities.all().filter(value =>
						!abilityToPoint[value.id] && value.isNonstandard !== "CAP").map(value => value.name);
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
		`/crtm type/ability/move - 查看全属性/特性/招式分数表。`,
		`/crtm [type/ability/move] - Show the Point of that type/ability/move in Createmons. E.g. /crtm fairy to see the Point of fairy type.`,
		`/crtm number - Show all types/abilities/moves of that number of Points. E.g. /crtm 2 to see all types, abilities, and moves of 2 Points.`,
		`/crtm formula or /crtm f - See the formula Createmons uses to calculate the Point.`,
		`/crtm type/ability/move - Show the Point list of all types/abilities/moves in Createmons.`,
	],
};
