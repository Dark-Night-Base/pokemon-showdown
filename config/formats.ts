// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

import {Species} from '../sim/dex-species';

export const Formats: FormatList = [

	{
		section: "Server Special",
	},
	{
		name: "[Gen 9] Balanced Hackmons 500 Cup",
		desc: `BH，但禁止使用种族和大于 500 的精灵。<br />BH but Pok&eacute;mon with BST > 500 are banned.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'BST Limit = 500'],
		banlist: [
			'Chansey',
		],
	},
	{
		name: "[Gen 9] More Balanced Hackmons v4",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711482/">More Balanced Hackmons v4</a>`,
		],
		mod: 'gen9morebalancedhackmons',
		// debug: true,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', 'Terastal Clause', '!Obtainable'],
		banlist: [
			'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Arena Trap',
			'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond',
			'Stakeout', 'Wonder Guard', 'Gengarite', 'Belly Drum', 'Chatter', 'Double Iron Bash', 'Electrify',
			'Last Respects', 'Octolock', 'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		restricted: ['Arceus'],
		onValidateTeam(team, format) {
			// baseSpecies:count
			const restrictedPokemonCount = new Map<string, number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.set(species.baseSpecies, (restrictedPokemonCount.get(species.baseSpecies) || 0) + 1);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	},
	{
		name: "[Gen 9] ND Category Swap BH",
		desc: `NDBH but all physical moves become special, and all special moves become physical.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711668/">Category Swap</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] National Dex BH', 'Category Swap Mod'],
	},
	{
		name: "[Gen 9] ND Godly Gift BH",
		desc: `Godly Gift + NDBH, Pok&eacute;mon with BST > 651 are Gods.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710734/">Godly Gift</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711099/">National Dex BH</a>`,
		],

		mod: 'gen9',
		// we cannot use godly gift mod here
		ruleset: ['[Gen 9] National Dex BH'],
		restricted: [],
		onValidateTeam(team) {
			const gods = new Set<string>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.bst > 651) {
					gods.add(species.name);
				}
			}
			if (gods.size > 1) {
				return [`You have too many Gods.`, `(${Array.from(gods).join(', ')} are Gods.)`];
			}
		},
		onModifySpeciesPriority: 3,
		onModifySpecies(species, target, source) {
			if (source || !target?.side) return;
			const god = target.side.team.find(set => {
				const godSpecies = this.dex.species.get(set.species);
				return godSpecies.bst > 651;
			}) || target.side.team[0];
			const stat = Dex.stats.ids()[target.side.team.indexOf(target.set)];
			const newSpecies = this.dex.deepClone(species);
			const godSpecies = this.dex.species.get(god.species);
			newSpecies.bst -= newSpecies.baseStats[stat];
			newSpecies.baseStats[stat] = godSpecies.baseStats[stat];
			newSpecies.bst += newSpecies.baseStats[stat];
			return newSpecies;
		},
	},
	{
		name: "[Gen 8] Johto Dex BH",
		desc: `BH, but only things that are native to Kanto and Johto regions are usable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Standard NatDex', '!Obtainable', 'Ability Clause = 2', 'OHKO Clause', 'CFZ Clause', 'Evasion Moves Clause', 'Forme Clause', 'Dynamax Clause', 'Sleep Moves Clause', 'Johto Pokedex'],
		banlist: [
			'Snorlax', 'Mewtwo', 'Lugia', 'Ho-Oh',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Imprison + Transform', 'Normalize + Entrainment', 'Normalize + Skill Swap',
			'Shell Smash', 'Belly Drum',
		],
	},
	{
		section: "Server Special OMs",
	},
	{
		name: "[Gen 9] Balanced Createmons",
		desc: `自定义你的精灵，包括种族值、属性、特性和招式。<br />` +
			`&bullet; 通过在组队器中调整努力值来调整种族值：你的真实种族值等于你的努力值，你的真实努力值强制每项全满；<br />` +
			`&bullet; 在组队器细节栏（就是调整钛晶属性的地方）设定第一属性及第二属性；<br />` +
			`&bullet; 特性和招式可以自由选择。（但有很小一部分被禁用。）<br />` +
			`&bullet; 根据你的配置，每只精灵都会算出一个固定的分数。每支队伍分数上限 100000，超过上限的队伍视为不合法。<br />` +
			`&bullet; 可通过命令 /crtm formula 或 /crtm f 查看分数计算公式，也可按组队窗中的 Check 按钮快速计算精灵分数；<br />` +
			`&bullet; 可通过命令 /crtm 属性/特性/招式 来查看该属性/特性/招式对应的分数，如用 /crtm fairy 查看妖精系的分数，得知其分数为 2 分。<br />` +
			`&bullet; /crtm 的其它用途可通过 /help crtm 查看。<br />` +

			`<br />` +

			`DIY your own Pok&eacute;mon with any base stats, type, ability, and moves. <br />` +
			`&bullet; Customize Base Stats by adjusting EVs in teambuilder. The true Base Stats of a Pok&eacute;mon equal to its EVs. And the true EVs of a Pok&eacute;mon are forced to be all 252. <br />` +
			`&bullet; Set First Type and Second Type in the details cell of teambuilder. <br />` +
			`&bullet; Select Ability and Moves freely. (With a few bans though.) <br />` +
			`&bullet; The Point of a Pok&eacute;mon will be calculated based on its set. Teams with Total Point exceeding 100000 are invalid.<br />` +
			`&bullet; Use the command /crtm formula or /crtm f to see the formula used for Point calculation. Click the "Check" button in teambuilder to check a Pok&eacute;mon's Point quickly. <br />` +
			`&bullet; Use the command /crtm [type/ability/move] to see the Point of that type/ability/move. E.g. use /crtm fairy to see the Point of fairy type, which is 2. <br />` +
			`&bullet; Type /help crtm to see more usages of /crtm command. <br />`,

		mod: 'gen9',
		// debug: true,
		ruleset: ['Createmons Mod = 100000', 'Team Species Preview', 'Adjust Level = 100', 'Overflow Stat Mod',
			'Species Clause', 'Signature Items Clause', 'Z-Move Clause', 'CFZ Clause', 'Max Moves Clause', 'Terastal Clause',
			'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Nickname Clause',
			'-CAP',
		],
		banlist: [
			'Shedinja',
			'Arena Trap', 'Huge Power', 'Innards Out', 'Neutralizing Gas', 'Pure Power', 'Shadow Tag', 'Wonder Guard',
			'Comatose + Sleep Talk',
			'Double Iron Bash', 'Rage Fist', 'Revival Blessing', 'Shed Tail',
		],
		// todo: merge this with Createmons Mod
		battle: {
			spreadModify(baseStats: StatsTable, set: PokemonSet): StatsTable {
				const modStats: SparseStatsTable = {atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
				const tr = this.trunc;
				let statName: keyof StatsTable;
				for (statName in modStats) {
					const stat = baseStats[statName];
					modStats[statName] = tr(tr(2 * stat + set.ivs[statName] + 63) + 5);
				}
				if ('hp' in baseStats) {
					const stat = baseStats['hp'];
					modStats['hp'] = tr(tr(2 * stat + set.ivs['hp'] + 63 + 100) + 10);
				}
				return this.natureModify(modStats as StatsTable, set);
			},
		},
	},
	{
		name: "[Gen 9] Cross Evolution Convergence",
		desc: `Cross Evolution + Convergence`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710953/">Cross Evolution</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714048/">Convergence</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Ability Clause = 2', 'Sleep Moves Clause', '!Obtainable Abilities', 'Min Source Gen = 9', '+Unobtainable'],
		banlist: [
			'Arena Trap', 'Comatose', 'Huge Power', 'Imposter', 'Moody', 'Pure Power', 'Shadow Tag', 'Speed Boost',
			'Baton Pass', 'Extreme Speed', 'Last Respects', 'Rage Fist', 'Revival Blessing', 'Shell Smash', 'Spore', 'Transform',
			'Damp Rock', 'King\'s Rock',
		],
		onValidateTeam(team) {
			const names = new Set<ID>();
			for (const set of team) {
				const name = set.name;
				if (names.has(this.dex.toID(name))) {
					return [
						`Your Pok\u00e9mon must have different nicknames.`,
						`(You have more than one Pok\u00e9mon named '${name}')`,
					];
				}
				names.add(this.dex.toID(name));
			}
			if (!names.size) {
				return [
					`${this.format.name} works using nicknames; your team has 0 nicknamed Pok\u00e9mon.`,
					`(If this was intentional, add a nickname to one Pok\u00e9mon that isn't the name of a Pok\u00e9mon species.)`,
				];
			}
		},
		checkCanLearn(move, species, lsetData, set) {
			function convCheckCanLearn(tv: TeamValidator, mv: Move, sp: Species, sS: PokemonSources, st: PokemonSet) {
				const matchingSpecies = tv.dex.species.all()
				.filter(s => (
					(!s.isNonstandard || tv.ruleTable.has(`+pokemontag:${tv.toID(s.isNonstandard)}`)) &&
					s.types.every(type => sp.types.includes(type)) &&
					s.types.length === sp.types.length && !tv.ruleTable.isBannedSpecies(s)
				));
				const someCanLearn = matchingSpecies.some(s => tv.checkCanLearn(mv, s, sS, st) === null);
				if (someCanLearn) return null;
				return tv.checkCanLearn(mv, sp, sS, st);
			}
			// @ts-ignore
			if (!set.sp?.exists || !set.crossSpecies?.exists) {
				return convCheckCanLearn(this, move, species, lsetData, set);
			}
			// @ts-ignore
			const problem = convCheckCanLearn(this, move, set.sp);
			if (!problem) return null;
			// @ts-ignore
			if (convCheckCanLearn(this, move, set.crossSpecies)) return problem;
			return null;
		},
		validateSet(set, teamHas) {
			const crossSpecies = this.dex.species.get(set.name);
			let problems = this.dex.formats.get('Obtainable Misc').onChangeSet?.call(this, set, this.format) || null;
			if (Array.isArray(problems) && problems.length) return problems;
			const crossNonstandard = (!this.ruleTable.has('standardnatdex') && crossSpecies.isNonstandard === 'Past') ||
				crossSpecies.isNonstandard === 'Future';
			const crossIsCap = !this.ruleTable.has('+pokemontag:cap') && crossSpecies.isNonstandard === 'CAP';
			if (!crossSpecies.exists || crossNonstandard || crossIsCap) return this.validateSet(set, teamHas);
			const species = this.dex.species.get(set.species);
			const check = this.checkSpecies(set, species, species, {});
			if (check) return [check];
			const nonstandard = !this.ruleTable.has('standardnatdex') && species.isNonstandard === 'Past';
			const isCap = !this.ruleTable.has('+pokemontag:cap') && species.isNonstandard === 'CAP';
			if (!species.exists || nonstandard || isCap || species === crossSpecies) return this.validateSet(set, teamHas);
			if (!species.nfe) return [`${species.name} cannot cross evolve because it doesn't evolve.`];
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable" &&
				!this.ruleTable.has('+unobtainable'));
			if (crossSpecies.battleOnly || crossIsUnreleased || !crossSpecies.prevo) {
				return [`${species.name} cannot cross evolve into ${crossSpecies.name} because it isn't an evolution.`];
			}
			if (this.ruleTable.isRestrictedSpecies(crossSpecies)) {
				return [`${species.name} cannot cross evolve into ${crossSpecies.name} because it is banned.`];
			}
			const crossPrevoSpecies = this.dex.species.get(crossSpecies.prevo);
			if (!crossPrevoSpecies.prevo !== !species.prevo) {
				return [
					`${species.name} cannot cross evolve into ${crossSpecies.name} because they are not consecutive evolution stages.`,
				];
			}
			const item = this.dex.items.get(set.item);
			if (item.itemUser?.length) {
				if (!item.itemUser.includes(crossSpecies.name) || crossSpecies.name !== species.name) {
					return [`${species.name} cannot use ${item.name} because it is cross evolved into ${crossSpecies.name}.`];
				}
			}
			const ability = this.dex.abilities.get(set.ability);
			if (!this.ruleTable.isRestricted(`ability:${ability.id}`) || Object.values(species.abilities).includes(ability.name)) {
				set.species = crossSpecies.name;
			}

			// @ts-ignore
			set.sp = species;
			// set types for validation
			let mixedTypes = this.dex.deepClone(species.types);
			if (crossSpecies.types[0] !== crossPrevoSpecies.types[0]) mixedTypes[0] = crossSpecies.types[0];
			if (crossSpecies.types[1] !== crossPrevoSpecies.types[1]) {
				mixedTypes[1] = crossSpecies.types[1] || crossSpecies.types[0];
			}
			if (mixedTypes[0] === mixedTypes[1]) mixedTypes = [mixedTypes[0]];
			// @ts-ignore
			set.crossSpecies = {...crossSpecies, types: mixedTypes};
			problems = this.validateSet(set, teamHas);
			set.name = crossSpecies.name;
			set.species = species.name;
			return problems;
		},
		onValidateSet(set, format) {
			// @ts-ignore
			const species = set.crossSpecies || set.species;
			const curSpecies = this.dex.species.get(species);
			const obtainableAbilityPool = new Set<string>();
			const matchingSpecies = this.dex.species.all()
				.filter(species => (
					(!species.isNonstandard || this.ruleTable.has(`+pokemontag:${this.toID(species.isNonstandard)}`)) &&
					species.types.every(type => curSpecies.types.includes(type)) &&
					species.types.length === curSpecies.types.length && !this.ruleTable.isBannedSpecies(species)
				));
			for (const species of matchingSpecies) {
				for (const abilityName of Object.values(species.abilities)) {
					const abilityid = this.toID(abilityName);
					obtainableAbilityPool.add(abilityid);
				}
			}
			// Nihilslave: add original abilities
			for (const abilityName of Object.values(curSpecies.abilities)) {
				const abilityid = this.toID(abilityName);
				obtainableAbilityPool.add(abilityid);
			}
			if (!obtainableAbilityPool.has(this.toID(set.ability))) {
				return [`${curSpecies.name} doesn't have access to ${this.dex.abilities.get(set.ability).name}.`];
			}
		},
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // chat
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (target.set.name === target.set.species) return;
			const crossSpecies = this.dex.species.get(target.set.name);
			if (!crossSpecies.exists) return;
			if (species.battleOnly || !species.nfe) return;
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable" &&
				!this.ruleTable.has('+unobtainable'));
			if (crossSpecies.battleOnly || crossIsUnreleased || !crossSpecies.prevo) return;
			const crossPrevoSpecies = this.dex.species.get(crossSpecies.prevo);
			if (!crossPrevoSpecies.prevo !== !species.prevo) return;

			const mixedSpecies = this.dex.deepClone(species);
			mixedSpecies.weightkg =
				Math.max(0.1, +(species.weightkg + crossSpecies.weightkg - crossPrevoSpecies.weightkg)).toFixed(1);
			mixedSpecies.nfe = false;
			mixedSpecies.evos = [];
			mixedSpecies.eggGroups = crossSpecies.eggGroups;
			mixedSpecies.abilities = crossSpecies.abilities;
			mixedSpecies.bst = 0;
			let i: StatID;
			for (i in species.baseStats) {
				const statChange = crossSpecies.baseStats[i] - crossPrevoSpecies.baseStats[i];
				mixedSpecies.baseStats[i] = this.clampIntRange(species.baseStats[i] + statChange, 1, 255);
				mixedSpecies.bst += mixedSpecies.baseStats[i];
			}
			if (crossSpecies.types[0] !== crossPrevoSpecies.types[0]) mixedSpecies.types[0] = crossSpecies.types[0];
			if (crossSpecies.types[1] !== crossPrevoSpecies.types[1]) {
				mixedSpecies.types[1] = crossSpecies.types[1] || crossSpecies.types[0];
			}
			if (mixedSpecies.types[0] === mixedSpecies.types[1]) mixedSpecies.types = [mixedSpecies.types[0]];

			return mixedSpecies;
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.baseSpecies = pokemon.species;
			}
		},
	},
	{
		// asked by boingk#6794
		name: "[Gen 9] Godly Gift LC",
		desc: `Each Pok&eacute;mon receives one base stat from a (smol) God (LC Ubers Pok&eacute;mon) depending on its position in the team. If there is no LC Ubers Pok&eacute;mon, it uses the Pok&eacute;mon in the first (HP) slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660461/">Godly Gift</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Evasion Items Clause', 'Little Cup'],
		banlist: [
			'Basculin', 'Scyther', 'Swirlix',
			'Arena Trap', 'Huge Power',
			'Baton Pass',
			'Focus Band', 'King\'s Rock', 'Quick Claw',
			'Sand Veil', 'Snow Cloak',
		],
		restricted: [
			'Murkrow', 'Meditite', 'Gothita', 'Gastly', 'Misdreavus', 'Dunsparce', 'Girafarig', 'Basculin',
			'Tandemaus',
		],
		onValidateTeam(team) {
			const gods = new Set<string>();
			for (const set of team) {
				let species = this.dex.species.get(set.species);
				if (typeof species.battleOnly === 'string') species = this.dex.species.get(species.battleOnly);
				if (this.ruleTable.isRestrictedSpecies(species)) {
					gods.add(species.name);
				}
			}
			if (gods.size > 1) {
				return [`You have too many Gods.`, `(${Array.from(gods).join(', ')} are Gods.)`];
			}
		},
		onModifySpeciesPriority: 3,
		onModifySpecies(species, target, source) {
			if (source || !target?.side) return;
			const god = target.side.team.find(set => {
				const godSpecies = this.dex.species.get(set.species);
				return this.ruleTable.isRestrictedSpecies(godSpecies);
			}) || target.side.team[0];
			const stat = Dex.stats.ids()[target.side.team.indexOf(target.set)];
			const newSpecies = this.dex.deepClone(species);
			let godSpecies = this.dex.species.get(god.species);
			if (typeof godSpecies.battleOnly === 'string') {
				godSpecies = this.dex.species.get(godSpecies.battleOnly);
			}
			newSpecies.bst -= newSpecies.baseStats[stat];
			newSpecies.baseStats[stat] = godSpecies.baseStats[stat];
			newSpecies.bst += newSpecies.baseStats[stat];
			return newSpecies;
		},
	},
	{
		name: "[Gen 9] ND Infinite Fusion",
		desc: `将（几乎）任意两只精灵融合成新精灵！<br/>\
			<details><summary>具体规则如下：</summary>\
			&bullet; 正常选择精灵作为融合的<strong>身体</strong>部分，在昵称栏写上一只精灵的英文名，由它组成<strong>头部</strong><br/>\
			&bullet; 融合后精灵的ＨＰ、特攻、特防种族 = 头部对应种族的 2 / 3 + 身体对应种族的 1 / 3<br/>\
			&bullet; 融合后精灵的攻击、防御、速度种族 = 头部对应种族的 1 / 3 + 身体对应种族的 2 / 3<br/>\
			&bullet; 融合后精灵的属性为头部精灵的第一属性 + 身体精灵的第二属性（如没有则为第一属性）<br/>\
			&bullet; 融合后精灵的特性池包含头部精灵的第一特性、身体精灵的第二特性，以及头部精灵的隐藏特性<br/>\
			&bullet; 融合后精灵的技能池为头身精灵技能池之和<br/>\
			&bullet; 禁止选择任何特殊形态作为融合组件，如：胡帕-解放形态<br/>\
			&bullet; 有部分精灵间存在特殊融合，如：酋雷姆 + 雷希拉姆 = 焰白酋雷姆<br/>\
			</details><br/>\
			Fusion (almost) any two Pok&eacute;mon together!<br/>\
			<details><summary>Fusion Mechanism</summary>\
			&bullet; Choose a Pok&eacute;mon as usual to be the <strong>Body Part</strong>, while giving it the name of a Pok&eacute;mon as nickname which is to be the <strong>Head Part</strong> of the fusioned Pok&eacute;mon<br/>\
			&bullet; Fusioned Pok&eacute;mon's base stats of H P, SpA, SpD = That base stats of Head * 2 / 3 + That base stats of Body * 1 / 3<br/>\
			&bullet; Fusioned Pok&eacute;mon's base stats of Atk, Def, Spe = That base stats of Head * 1 / 3 + That base stats of Body * 2 / 3<br/>\
			&bullet; Fusioned Pok&eacute;mon's Types includes: First Type of Head + Second (or First if no Second) Type of Body<br/>\
			&bullet; Fusioned Pok&eacute;mon's Abilities includes: First Ability of Head, Second Ability of Body, and Hidden Ability of Head<br/>\
			&bullet; Fusioned Pok&eacute;mon's Moves includes: ALL moves learnt by Head and Body<br/>\
			&bullet; Pok&eacute;mon in Formes cannot be used in fusion. E.g. Hoopa-Unbound<br/>\
			&bullet; There are several special Fusions. E.g. Kyurem + Reshiram = Kyurem-White</details>`,
		threads: [
			`&bullet; <a href="https://infinitefusion.fandom.com/wiki/Pok%C3%A9mon_Infinite_Fusion_Wiki">Infinite Fusion Wiki</a>`,
			`&bullet; <a href="https://aegide.github.io/">Infinite Fusion Calculator</a>`,
		],

		mod: 'infinitefusion',
		ruleset: [
			'Obtainable', '+Past', '+Unobtainable', '+Unreleased', 'Team Species Preview', 'Nickname Preview', '!!EV Limit = 1020', 'Species Clause',
			'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Sketch Post-Gen 7 Moves', 'Dynamax Clause', 'Terastal Clause',
			'OHKO Clause',
		],
		banlist: [
			'Cramorant', 'Shedinja',
			'Revival Blessing',
		],
		restricted: [
			'Eternatus',
		],
		onValidateTeam(team) {
			const names = new Set<ID>();
			for (const set of team) {
				const name = set.name;
				const species = this.dex.species.get(set.species).name;
				if (names.has(this.dex.toID(name))) {
					return [
						`You have more than one ${name}`,
					];
				}
				if (names.has(this.dex.toID(species))) {
					return [
						`You have more than one ${species}`,
					];
				}
				names.add(this.dex.toID(name));
				if (species !== name) names.add(this.dex.toID(species));
			}
		},
		checkCanLearn(move, species, lsetData, set) {
			// @ts-ignore
			if (set.fusionSpecies) return this.checkCanLearn(move, set.fusionSpecies, undefined, set);
			const headSpecies = this.dex.species.get(set.name);
			if (!headSpecies.exists) return this.checkCanLearn(move, species, lsetData, set);
			const problem = this.checkCanLearn(move, species, lsetData, set);
			if (!problem) return null;
			if (this.checkCanLearn(move, headSpecies, undefined, set)) return problem;
			return null;
		},
		validateSet(set, teamHas) {
			const headSpecies = this.dex.species.get(set.name);
			const bodySpecies = this.dex.species.get(set.species);
			let problems = this.dex.formats.get('Obtainable Misc').onChangeSet?.call(this, set, this.format) || null;
			if (Array.isArray(problems) && problems.length) return problems;
			const nonstandard = ['CAP', 'Custom'];
			if (headSpecies.isNonstandard && nonstandard.includes(headSpecies.isNonstandard)) {
				return [`${headSpecies.name} does not exist`];
			}
			if (this.ruleTable.isBannedSpecies(headSpecies)) {
				return [`${headSpecies.name} is banned`];
			}
			if (!headSpecies.exists) return this.validateSet(set, teamHas);
			const check = this.checkSpecies(set, bodySpecies, bodySpecies, {});
			if (check) return [check];
			if (headSpecies.baseSpecies !== headSpecies.name) {
				return [`${headSpecies.name} is not in base forme`];
			}
			if (bodySpecies.baseSpecies !== bodySpecies.name) {
				return [`${bodySpecies.name} is not in base forme`];
			}
			let fusionSpecies: {
				species?: Species,
				abilities: string[],
			} = { abilities: [] };
			if (headSpecies.name === bodySpecies.name) {
				if (this.ruleTable.isRestrictedSpecies(headSpecies)) {
					return [`${headSpecies.name} is banned from self-fusion`];
				}
				const specialSelfFusions: {[key: string]: string} = {
					deoxys: 'Deoxys-Attack',
					rotom: 'Rotom-Heat',
					shaymin: 'Shaymin-Sky',
					// darmanitan: 'Darmanitan-Zen',
					keldeo: 'Keldeo-Resolute',
					meloetta: 'Meloetta-Pirouette',
					greninja: 'Greninja-Ash',
					floette: 'Floette-Eternal',
					zygarde: 'Zygarde-Complete',
					hoopa: 'Hoopa-Unbound',
					lycanroc: 'Lycanroc-Dusk',
					wishiwashi: 'Wishiwashi-School',
					necrozma: 'Necrozma-Ultra',
					// cramorant: 'Cramorant-Gorging',
					eternatus: 'Eternatus-Eternamax',
					palafin: 'Palafin-Hero',
				};
				if (headSpecies.id in specialSelfFusions) {
					fusionSpecies.species = this.dex.species.get(specialSelfFusions[headSpecies.id]);
				} else if (headSpecies.otherFormes) {
					for (const forme of headSpecies.otherFormes) {
						if (forme.endsWith('-Mega') || forme.endsWith('-Mega-Y') ||
							forme.endsWith('-Primal') ||
							forme.endsWith('-Origin') ||
							forme.endsWith('-Therian') ||
							forme.endsWith('-Starter') ||
							forme.endsWith('-Crowned')
						) fusionSpecies.species = this.dex.species.get(forme);
					}
				} else {
					fusionSpecies.species = this.dex.deepClone(headSpecies);
				}
			} else {
				const pair = [headSpecies.name, bodySpecies.name].sort();
				if (pair[0] === 'Kyurem' && pair[1] === 'Reshiram') fusionSpecies.species = this.dex.species.get('Kyurem-White');
				if (pair[0] === 'Kyurem' && pair[1] === 'Zekrom') fusionSpecies.species = this.dex.species.get('Kyurem-Black');
				if (pair[0] === 'Necrozma' && pair[1] === 'Solgaleo') fusionSpecies.species = this.dex.species.get('Necrozma-Dusk-Mane');
				if (pair[0] === 'Lunala' && pair[1] === 'Necrozma') fusionSpecies.species = this.dex.species.get('Necrozma-Dawn-Wings');
				if (pair[0] === 'Calyrex' && pair[1] === 'Glastrier') fusionSpecies.species = this.dex.species.get('Calyrex-Ice');
				if (pair[0] === 'Calyrex' && pair[1] === 'Spectrier') fusionSpecies.species = this.dex.species.get('Calyrex-Shadow');
				if (pair[0] === 'Arrokuda' && pair[1] === 'Cramorant') fusionSpecies.species = this.dex.species.get('Cramorant-Gulping');
				if (pair[0] === 'Cramorant' && pair[1] === 'Pikachu') fusionSpecies.species = this.dex.species.get('Cramorant-Gorging');
			}
			if (fusionSpecies.species) {
				fusionSpecies.abilities = Object.values(fusionSpecies.species!.abilities);
				// @ts-ignore
				set.fusionSpecies = fusionSpecies.species;
			} else {
				fusionSpecies.abilities = [
					headSpecies.abilities[0],
					bodySpecies.abilities[1] || bodySpecies.abilities[0],
					headSpecies.abilities['H'] || '',
					headSpecies.abilities['S'] || '',
				];
			}
			const ability = this.dex.abilities.get(set.ability);
			if (!fusionSpecies.abilities.includes(ability.name)) {
				return [`${bodySpecies.name} can't have ${ability.name}`];
			}
			const item = this.dex.items.get(set.item);
			const NonexistentItems = ['blueorb', 'redorb', 'rustedshield', 'rustedsword'];
			if (item.megaStone || item.zMove || NonexistentItems.includes(item.id)) {
				return [`${bodySpecies.name}'s item ${item.name} doesn't exist in Infinite Fusion`];
			}

			set.ability = bodySpecies.abilities[0];
			problems = this.validateSet(set, teamHas);
			set.ability = ability.name;
			// Nihilslave: if the pokemon is a special fusion, change it here
			if (fusionSpecies.species) set.name = set.species = fusionSpecies.species.name;
			return problems;
		},
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // chat
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			// onModifySpecies can be called before onBegin, which is quite stupid
			let headSpecies = target.m.headSpecies ? target.m.headSpecies : this.dex.species.get(target.set.name);
			let bodySpecies = target.m.bodySpecies ? target.m.bodySpecies : this.dex.species.get(target.set.species);
			if (!headSpecies?.exists || !bodySpecies?.exists) return;
			// Nihilslave: should let non-base formes to merge, don't check it here
			const toModifySpeciesID = this.dex.species.get(species.baseSpecies).id;
			const headBaseSpeciesID = this.dex.species.get(headSpecies.baseSpecies).id;
			const bodyBaseSpeciesID = this.dex.species.get(bodySpecies.baseSpecies).id;
			if (toModifySpeciesID === headBaseSpeciesID) target.m.headSpecies = headSpecies = species;
			if (toModifySpeciesID === bodyBaseSpeciesID) target.m.bodySpecies = bodySpecies = species;
			// special fusion
			if (headSpecies.name === bodySpecies.name) {
				return this.dex.species.get(headSpecies.name);
			}

			const fusionSpecies = this.dex.deepClone(species);
			fusionSpecies.weightkg = Math.max(0.1, (headSpecies.weightkg + bodySpecies.weightkg) / 2).toFixed(1);
			fusionSpecies.weighthg = Math.max(1, (headSpecies.weighthg + bodySpecies.weighthg) / 2).toFixed(1);
			fusionSpecies.nfe = headSpecies.nfe || bodySpecies.nfe;
			// fusionSpecies.evos
			// fusionSpecies.eggGroups
			fusionSpecies.abilities = {
				0: headSpecies.abilities[0],
				1: bodySpecies.abilities[1] || bodySpecies.abilities[0],
				H: headSpecies.abilities['H'],
				S: headSpecies.abilities['S'],
			};
			if (fusionSpecies.abilities['H'] === fusionSpecies.abilities[1] ||
				fusionSpecies.abilities['H'] === fusionSpecies.abilities[0]) delete fusionSpecies.abilities['H'];
			if (fusionSpecies.abilities[1] === fusionSpecies.abilities[0]) delete fusionSpecies.abilities[1];
			fusionSpecies.bst = 0;
			if (this.dex.abilities.get(target.set.ability).id === 'wonderguard') fusionSpecies.maxHP = 1;
			let i: StatID;
			for (i in species.baseStats) {
				let headStat, bodyStat;
				if (['hp', 'spa', 'spd'].includes(i)) {
					headStat = headSpecies.baseStats[i] * 2;
					bodyStat = bodySpecies.baseStats[i];
				} else {
					headStat = headSpecies.baseStats[i];
					bodyStat = bodySpecies.baseStats[i] * 2;
				}
				fusionSpecies.baseStats[i] = this.clampIntRange(Math.floor((headStat + bodyStat) / 3), 1, 255);
				fusionSpecies.bst += fusionSpecies.baseStats[i];
			}
			fusionSpecies.types[0] = headSpecies.types[0];
			fusionSpecies.types[1] = bodySpecies.types[1] || bodySpecies.types[0];
			if (fusionSpecies.types[1] === fusionSpecies.types[0]) fusionSpecies.types = [fusionSpecies.types[0]];

			return fusionSpecies;
		},
		onSwitchIn(pokemon) {
			const baseSpecies = [pokemon.m.headSpecies?.baseSpecies, pokemon.m.bodySpecies?.baseSpecies];
			if (baseSpecies.includes('Arceus')) pokemon.addVolatile('arceus');
			if (baseSpecies.includes('Silvally')) pokemon.addVolatile('silvally');
		},
		// todo: consider this
		// onType(types, pokemon) {
		// 	const headSpecies = pokemon.m.headSpecies?.baseSpecies;
		// 	if (headSpecies === 'Arceus' && pokemon.ability === 'multitype') {
		// 		let arcType = pokemon.getItem().onPlate;
		// 		if (!arcType) arcType = 'Normal';

		// 	}
		// },
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				// prevent rayquaza from mega evolving
				if (pokemon.species.id === 'rayquaza') {
					pokemon.canMegaEvo = null;
				}
				if (!pokemon.m.headSpecies || !pokemon.m.bodySpecies) {
					const headSpecies = this.dex.species.get(pokemon.set.name);
					const bodySpecies = this.dex.species.get(pokemon.set.species);
					if (headSpecies.exists) pokemon.m.headSpecies = headSpecies;
					if (bodySpecies.exists) pokemon.m.bodySpecies = bodySpecies;
				}
				// send headSpecies to client
				pokemon.getDetails = () => {
					const health = pokemon.getHealth();
					let details = pokemon.details;
					if (pokemon.m.headSpecies) details += `, headname:${pokemon.m.headSpecies.name}`;
					if (pokemon.illusion) {
						let illusionDetails = pokemon.illusion.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
							(pokemon.illusion.gender === '' ? '' : ', ' + pokemon.illusion.gender) + (pokemon.illusion.set.shiny ? ', shiny' : '');
						if (pokemon.illusion.m.headSpecies) illusionDetails += `, headname:${pokemon.illusion.m.headSpecies.name}`;
						details = illusionDetails;
					}
					if (pokemon.terastallized) details += `, tera:${pokemon.terastallized}`;
					this.debug(details);
					return {side: health.side, secret: `${details}|${health.secret}`, shared: `${details}|${health.shared}`};
				};
			}
		},
	},
	{
		name: "[Gen 9] ND Infinite Fusion LC",
		desc: `Infinite Fusion + LC`,

		mod: 'infinitefusion',
		ruleset: [
			'Obtainable', '+Past', '+Unobtainable', '+Unreleased', 'Team Species Preview', 'Nickname Preview', '!!EV Limit = 1020', 'Species Clause',
			'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Sketch Post-Gen 7 Moves', 'Dynamax Clause', 'Terastal Clause',
			'OHKO Clause', 'Max Level = 5'
		],
		banlist: [
			'Scyther', 'Sneasel', 'Stantler', 'Type: Null',
			'Revival Blessing',
		],
		onValidateTeam(team) {
			const names = new Set<ID>();
			for (const set of team) {
				const name = set.name;
				const species = this.dex.species.get(set.species).name;
				if (names.has(this.dex.toID(name))) {
					return [
						`You have more than one ${name}`,
					];
				}
				if (names.has(this.dex.toID(species))) {
					return [
						`You have more than one ${species}`,
					];
				}
				names.add(this.dex.toID(name));
				if (species !== name) names.add(this.dex.toID(species));
			}
		},
		checkCanLearn(move, species, lsetData, set) {
			// @ts-ignore
			if (set.fusionSpecies) return this.checkCanLearn(move, set.fusionSpecies, undefined, set);
			const headSpecies = this.dex.species.get(set.name);
			if (!headSpecies.exists) return this.checkCanLearn(move, species, lsetData, set);
			const problem = this.checkCanLearn(move, species, lsetData, set);
			if (!problem) return null;
			if (this.checkCanLearn(move, headSpecies, undefined, set)) return problem;
			return null;
		},
		validateSet(set, teamHas) {
			const headSpecies = this.dex.species.get(set.name);
			const bodySpecies = this.dex.species.get(set.species);
			let problems = this.dex.formats.get('Obtainable Misc').onChangeSet?.call(this, set, this.format) || null;
			if (Array.isArray(problems) && problems.length) return problems;
			const nonstandard = ['CAP', 'Custom'];
			if (headSpecies.isNonstandard && nonstandard.includes(headSpecies.isNonstandard)) {
				return [`${headSpecies.name} does not exist`];
			}
			if (this.ruleTable.isBannedSpecies(headSpecies)) {
				return [`${headSpecies.name} is banned`];
			}
			if (!headSpecies.exists) return this.validateSet(set, teamHas);
			const check = this.checkSpecies(set, bodySpecies, bodySpecies, {});
			if (check) return [check];
			if (headSpecies.baseSpecies !== headSpecies.name) {
				return [`${headSpecies.name} is not in base forme`];
			}
			if (bodySpecies.baseSpecies !== bodySpecies.name) {
				return [`${bodySpecies.name} is not in base forme`];
			}
			if (headSpecies.prevo) return [`${headSpecies.name} isn't the first in its evolution family.`];
			if (bodySpecies.prevo) return [`${bodySpecies.name} isn't the first in its evolution family.`];
			if (!headSpecies.nfe) return [`${headSpecies.name} doesn't have an evolution family.`];
			if (!bodySpecies.nfe) return [`${bodySpecies.name} doesn't have an evolution family.`];
			let fusionAbilities = [
				headSpecies.abilities[0],
				bodySpecies.abilities[1] || bodySpecies.abilities[0],
				headSpecies.abilities['H'] || '',
				headSpecies.abilities['S'] || '',
			];
			const ability = this.dex.abilities.get(set.ability);
			if (!fusionAbilities.includes(ability.name)) {
				return [`${bodySpecies.name} can't have ${ability.name}`];
			}
			const item = this.dex.items.get(set.item);
			const NonexistentItems = ['blueorb', 'redorb', 'rustedshield', 'rustedsword'];
			if (item.megaStone || item.zMove || NonexistentItems.includes(item.id)) {
				return [`${bodySpecies.name}'s item ${item.name} doesn't exist in Infinite Fusion`];
			}

			set.ability = bodySpecies.abilities[0];
			problems = this.validateSet(set, teamHas);
			set.ability = ability.name;
			// the only special fusion
			if (headSpecies.name === bodySpecies.name && headSpecies.name === 'Eevee') {
				set.name = set.species = 'Eevee-Starter';
			}
			return problems;
		},
		onModifySpecies(species, target, source, effect) {
			if (!target) return;
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			let headSpecies = target.m.headSpecies ? target.m.headSpecies : this.dex.species.get(target.set.name);
			let bodySpecies = target.m.bodySpecies ? target.m.bodySpecies : this.dex.species.get(target.set.species);
			if (!headSpecies?.exists || !bodySpecies?.exists) return;
			const toModifySpeciesID = this.dex.species.get(species.baseSpecies).id;
			const headBaseSpeciesID = this.dex.species.get(headSpecies.baseSpecies).id;
			const bodyBaseSpeciesID = this.dex.species.get(bodySpecies.baseSpecies).id;
			if (toModifySpeciesID === headBaseSpeciesID) target.m.headSpecies = headSpecies = species;
			if (toModifySpeciesID === bodyBaseSpeciesID) target.m.bodySpecies = bodySpecies = species;
			if (headSpecies.name === bodySpecies.name) {
				return this.dex.species.get(headSpecies.name);
			}

			const fusionSpecies = this.dex.deepClone(species);
			fusionSpecies.weightkg = Math.max(0.1, (headSpecies.weightkg + bodySpecies.weightkg) / 2).toFixed(1);
			fusionSpecies.weighthg = Math.max(1, (headSpecies.weighthg + bodySpecies.weighthg) / 2).toFixed(1);
			fusionSpecies.nfe = headSpecies.nfe || bodySpecies.nfe;
			fusionSpecies.abilities = {
				0: headSpecies.abilities[0],
				1: bodySpecies.abilities[1] || bodySpecies.abilities[0],
				H: headSpecies.abilities['H'],
				S: headSpecies.abilities['S'],
			};
			if (fusionSpecies.abilities['H'] === fusionSpecies.abilities[1] ||
				fusionSpecies.abilities['H'] === fusionSpecies.abilities[0]) delete fusionSpecies.abilities['H'];
			if (fusionSpecies.abilities[1] === fusionSpecies.abilities[0]) delete fusionSpecies.abilities[1];
			fusionSpecies.bst = 0;
			if (this.dex.abilities.get(target.set.ability).id === 'wonderguard') fusionSpecies.maxHP = 1;
			let i: StatID;
			for (i in species.baseStats) {
				let headStat, bodyStat;
				if (['hp', 'spa', 'spd'].includes(i)) {
					headStat = headSpecies.baseStats[i] * 2;
					bodyStat = bodySpecies.baseStats[i];
				} else {
					headStat = headSpecies.baseStats[i];
					bodyStat = bodySpecies.baseStats[i] * 2;
				}
				fusionSpecies.baseStats[i] = this.clampIntRange(Math.floor((headStat + bodyStat) / 3), 1, 255);
				fusionSpecies.bst += fusionSpecies.baseStats[i];
			}
			fusionSpecies.types[0] = headSpecies.types[0];
			fusionSpecies.types[1] = bodySpecies.types[1] || bodySpecies.types[0];
			if (fusionSpecies.types[1] === fusionSpecies.types[0]) fusionSpecies.types = [fusionSpecies.types[0]];

			return fusionSpecies;
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (!pokemon.m.headSpecies || !pokemon.m.bodySpecies) {
					const headSpecies = this.dex.species.get(pokemon.set.name);
					const bodySpecies = this.dex.species.get(pokemon.set.species);
					if (headSpecies.exists) pokemon.m.headSpecies = headSpecies;
					if (bodySpecies.exists) pokemon.m.bodySpecies = bodySpecies;
				}
				pokemon.getDetails = () => {
					const health = pokemon.getHealth();
					let details = pokemon.details;
					if (pokemon.m.headSpecies) details += `, headname:${pokemon.m.headSpecies.name}`;
					if (pokemon.illusion) {
						let illusionDetails = pokemon.illusion.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
							(pokemon.illusion.gender === '' ? '' : ', ' + pokemon.illusion.gender) + (pokemon.illusion.set.shiny ? ', shiny' : '');
						if (pokemon.illusion.m.headSpecies) illusionDetails += `, headname:${pokemon.illusion.m.headSpecies.name}`;
						details = illusionDetails;
					}
					if (pokemon.terastallized) details += `, tera:${pokemon.terastallized}`;
					this.debug(details);
					return {side: health.side, secret: `${details}|${health.secret}`, shared: `${details}|${health.shared}`};
				};
			}
		},
	},
	{
		name: "[Gen 8] Turn Tables",
		desc: `Base stats below 100 get doubled, excluding HP.`,
		threads: [
			`None yet.`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Turn Tables Mod'],
		banlist: [
			'AG', 'Shadow Tag', 'Baton Pass',
			'Huge Power',
			'Eviolite', 'Thick Club',
		],
	},

	// Balanced Hackmons
	///////////////////////////////////////////////////////////////////

	{
		section: "Balanced Hackmons",
	},
	{
		name: "[Gen 9] Balanced Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712766/">BH Resources</a>`,
		],

		mod: 'gen9',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Showdown'],
		banlist: [
			'Calyrex-Shadow', 'Miraidon', 'Zacian-Crowned', 'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull',
			'Moody', 'Neutralizing Gas', 'Orichalcum Pulse', 'Parental Bond', 'Poison Heal', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Belly Drum', 'Last Respects', 'Quiver Dance', 'Rage Fist', 'Revival Blessing', 'Shed Tail', 'Shell Smash',
		],
	},
	{
		name: "[Gen 9] National Dex BH",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711099/">National Dex BH</a>`,
		],
		mod: 'gen9',
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable'],
		banlist: [
			'Arceus > 1', 'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Zygarde-Complete',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond',
			'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Gengarite',
			'Belly Drum', 'Bolt Beak', 'Chatter', 'Double Iron Bash', 'Electrify', 'Last Respects', 'Octolock', 'Rage Fist', 'Revival Blessing', 'Shed Tail',
			'Shell Smash',
			'Comatose + Sleep Talk', 'Imprison + Transform',
		],
	},
	{
		name: "[Gen 8] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Dynamax Clause', 'Sleep Moves Clause', 'Showdown'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Shedinja', 'Zacian-Crowned',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Belly Drum', 'Bolt Beak', 'Court Change', 'Double Iron Bash', 'Octolock', 'Shell Smash',
			'Rusted Sword',
		],
	},
	{
		name: "[Gen 8] National Dex BH",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3690179/">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable', 'Arceus Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Imprison + Transform',
			'Belly Drum', 'Bolt Beak', 'Chatter', 'Court Change', 'Double Iron Bash', 'Electrify', 'Octolock', 'Shell Smash',
			'Gengarite',
		],
		restricted: ['Zacian-Crowned', 'Intrepid Sword'],
		onValidateSet(set) {
			const ability = this.dex.abilities.get(set.ability);
			if (set.species === 'Zacian-Crowned') {
				if (this.dex.toID(set.item) !== 'rustedsword' || ability.id !== 'intrepidsword') {
					return [`${set.species} is banned.`];
				}
			} else if (ability.id === 'intrepidsword') {
				return [`${set.name}'s ability ${ability.name} is banned.`];
			}
		},
		onChangeSet(set) {
			const item = this.dex.toID(set.item);
			if (set.species === 'Zacian' && item === 'rustedsword') {
				set.species = 'Zacian-Crowned';
				set.ability = 'Intrepid Sword';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothblade';
				}
			}
			if (set.species === 'Zamazenta' && item === 'rustedshield') {
				set.species = 'Zamazenta-Crowned';
				set.ability = 'Dauntless Shield';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothbash';
				}
			}
		},
	},
	{
		name: "[Gen 8 BDSP] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/9043074">BDSP Balanced Hackmons</a>`,
		],

		mod: 'gen8bdsp',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Moves Clause', 'Showdown'],
		banlist: [
			'Shedinja', 'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword',
			'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble',
			'Wonder Guard', 'Comatose + Sleep Talk', 'Shell Smash',
		],
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8407209/">USM Balanced Hackmons</a>`,
		],

		mod: 'gen7',
		ruleset: ['-Nonexistent', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'CFZ Clause', 'Sleep Clause Mod', 'Showdown'],
		banlist: [
			'Groudon-Primal', 'Rayquaza-Mega', 'Gengarite', 'Comatose + Sleep Talk', 'Chatter',
			'Arena Trap', 'Contrary', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
	},
	{
		name: "[Gen 6] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/balanced-hackmons.3489849/">ORAS Balanced Hackmons</a>`,
		],

		mod: 'gen6',
		ruleset: ['-Nonexistent', 'Ability Clause = 2', 'ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Sleep Clause Mod', 'Showdown'],
		banlist: [
			'Groudon-Primal', 'Kyogre-Primal',
			'Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard',
			'Assist', 'Chatter',
		],
	},
	{
		name: "[Gen 5] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3463764/">BW2 Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661782/post-8407341">BH Old Gens Hub</a>`,
			`&bullet; <a href="https://replay.pokemonshowdown.com/rom-gen5balancedhackmons-1288517">示例录像 Sample Replay</a>`,
		],

		mod: 'gen5',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Wonder Guard',
		],
	},
	{
		name: "[Gen 4] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/balanced-hackmons-old-gens-hub.3661782/#post-8407354">HGSS Balanced Hackmons</a>`,
		],

		mod: 'gen4',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'HP Percentage Mod', 'Cancel Mod', 'Ability Clause = 2', 'Endless Battle Clause'],
		banlist: [
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Wonder Guard',
			'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush',
		],
	},
	{
		name: "[Gen 3] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,

		mod: 'gen3',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Slaking',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Wonder Guard',
			'Soul Dew', 'Belly Drum',
		],
	},
	{
		name: "[Gen 2] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,

		mod: 'gen2',
		ruleset: ['-Nonexistent', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Mewtwo > 1',
			'Mean Look + Hypnosis', 'Mean Look + Lovely Kiss', 'Mean Look + Sing', 'Mean Look + Sleep Powder', 'Mean Look + Spore',
			'Spider Web + Hypnosis', 'Spider Web + Lovely Kiss', 'Spider Web + Sing', 'Spider Web + Sleep Powder', 'Spider Web + Spore',
		],
	},
	{
		name: "[Gen 1] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/balanced-hackmons-old-gens-hub.3661782/#post-8407359">RBY Balanced Hackmons</a>`,
		],

		mod: 'gen1',
		ruleset: ['-Nonexistent', 'Freeze Clause Mod', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Mewtwo',
			'Bind', 'Clamp', 'Fire Spin', 'Wrap',
		],
	},

	// BH Mashups
	///////////////////////////////////////////////////////////////////

	{
		section: "BH Mashups",
	},
	{
		name: "[Gen 9] Balanced Hackmons Doubles",
		desc: `Doubles, but BH.`,

		mod: 'gen9',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', '!Gravity Sleep Clause', '!Obtainable', '-Nonexistent'],
		banlist: [
			'Arena Trap', 'Huge Power', 'Illusion', 'Innards Out', 'Neutralizing Gas', 'Parental Bond', 'Pure Power', 'Shadow Tag',
			'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Last Respects', 'Rage Fist', 'Revival Blessing', 'Shed Tail',
			// rest abilities and moves TBA
			'Justified', 'Anger Point', 'Steam Engine', 'Stamina', 'Rattled', 'Wandering Spirit', 'Soul-Heart',
			'Comatose + Sleep Talk',
		],
	},
	{
		name: "[Gen 9] Balanced Hackmons Multi Battle",
		desc: `Multi Battle, but BH.`,

		mod: 'gen9',
		gameType: 'multi',
		rated: false,
		tournamentShow: false,
		ruleset: ['[Gen 9] Balanced Hackmons Doubles', 'Picked Team Size = 3'],
	},
	{
		name: "[Gen 9] Free-For-All BH",
		desc: `FFA, but BH.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3681641/">Free-For-All</a>`,
		],

		mod: 'gen9',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['[Gen 9] Balanced Hackmons Doubles', 'Sleep Clause Mod'],
		banlist: [
			'Poison Heal',
			'Acupressure', 'Aromatic Mist', 'Coaching', 'Court Change', 'Decorate', 'Final Gambit', 'Floral Healing', 'Follow Me',
			'Heal Pulse', 'Rage Powder',
		],
		unbanlist: [
			// TBA
			'Parental Bond',
		],
	},
	{
		name: "[Gen 9] FFA Balanced Hackmons 600 Cup",
		desc: `FFABH, but Pok&eacute;mon with BST > 600 are banned.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3681641/">Free-For-All</a>`,
		],

		mod: 'gen9',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['[Gen 9] Free-For-All BH', 'BST Limit = 600'],
	},
	{
		name: "[Gen 9] 350 Cup BH",
		desc: `BH，但所有种族和在350及以下的宝可梦种族值翻倍。<br />BH, but Pok&eacute;mon with BST <= 350 has their base stats doubled.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656554/">350 Cup</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', '350 Cup Mod', 'Overflow Stat Mod'],
	},
	{
		name: "[Gen 9] Balanced Hackmons LC",
		desc: `Little Cup + BH`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710868/">Little Cup Metagame Discussion</a>`,
		],

		mod: 'gen9',
		ruleset: ['Little Cup', '-Nonexistent', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Moves Clause', 'Showdown'],
		banlist: [
			'Dunsparce', 'Flittle', 'Gastly', 'Girafarig', 'Meditite', 'Misdreavus', 'Murkrow', 'Rufflet', 'Scyther', 'Sneasel',
			'Arena Trap', 'Contrary', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Poison Heal', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Belly Drum', 'Last Respects', 'Quiver Dance', 'Rage Fist', 'Revival Blessing', 'Shed Tail', 'Shell Smash',
		],
	},
	{
		name: "[Gen 8] Bonus Type BH",
		desc: `BH but Pok&eacute;mon can be nicknamed the name of a type to have that type added onto their current ones.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3683173/">Bonus Type</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 8] Balanced Hackmons'],
		// unbanlist: [
		// 	'Cramorant-Gorging'
		// ],
		onModifySpeciesPriority: 1,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const typesSet = new Set(species.types);
			const bonusType = this.dex.types.get(target.set.name);
			if (bonusType.exists) typesSet.add(bonusType.name);
			return {...species, types: [...typesSet]};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 9] Camomons BH",
		desc: `BH but Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Gen 8 Camomons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Camomons Mod'],
	},
	{
		name: "[Gen 9] Category Swap BH",
		desc: `BH but all physical moves become special, and all special moves become physical.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711668/">Category Swap</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Category Swap Mod'],
	},
	{
		name: "[Gen 9] Cross Evolution BH",
		desc: `Give a Pok&eacute;mon a Pok&eacute;mon name of the next evolution stage as a nickname to inherit stat changes, typing, abilities, and up to 2 moves from the next stage Pok&eacute;mon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710953/">Cross Evolution</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Overflow Stat Mod'],
		onValidateTeam(team) {
			const names = new Set<ID>();
			for (const set of team) {
				const name = set.name;
				if (names.has(this.dex.toID(name))) {
					return [
						`Your Pok\u00e9mon must have different nicknames.`,
						`(You have more than one Pok\u00e9mon named '${name}')`,
					];
				}
				names.add(this.dex.toID(name));
			}
			if (!names.size) {
				return [
					`${this.format.name} works using nicknames; your team has 0 nicknamed Pok\u00e9mon.`,
					`(If this was intentional, add a nickname to one Pok\u00e9mon that isn't the name of a Pok\u00e9mon species.)`,
				];
			}
		},
		checkCanLearn(move, species, lsetData, set) {
			// @ts-ignore
			if (!set.sp?.exists || !set.crossSpecies?.exists) {
				return this.checkCanLearn(move, species, lsetData, set);
			}
			// @ts-ignore
			const problem = this.checkCanLearn(move, set.sp);
			if (!problem) return null;
			// @ts-ignore
			if (this.checkCanLearn(move, set.crossSpecies)) return problem;
			return null;
		},
		validateSet(set, teamHas) {
			const crossSpecies = this.dex.species.get(set.name);
			let problems = this.dex.formats.get('Obtainable Misc').onChangeSet?.call(this, set, this.format) || null;
			if (Array.isArray(problems) && problems.length) return problems;
			const crossNonstandard = (!this.ruleTable.has('standardnatdex') && crossSpecies.isNonstandard === 'Past') ||
				crossSpecies.isNonstandard === 'Future';
			const crossIsCap = !this.ruleTable.has('+pokemontag:cap') && crossSpecies.isNonstandard === 'CAP';
			if (!crossSpecies.exists || crossNonstandard || crossIsCap) return this.validateSet(set, teamHas);
			const species = this.dex.species.get(set.species);
			const check = this.checkSpecies(set, species, species, {});
			if (check) return [check];
			const nonstandard = !this.ruleTable.has('standardnatdex') && species.isNonstandard === 'Past';
			const isCap = !this.ruleTable.has('+pokemontag:cap') && species.isNonstandard === 'CAP';
			if (!species.exists || nonstandard || isCap || species === crossSpecies) return this.validateSet(set, teamHas);
			if (!species.nfe) return [`${species.name} cannot cross evolve because it doesn't evolve.`];
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable" &&
				!this.ruleTable.has('+unobtainable'));
			// Nihilslave: remove the crossIsUnreleased judge here cuz it's bh
			if (crossSpecies.battleOnly || !crossSpecies.prevo) {
				return [`${species.name} cannot cross evolve into ${crossSpecies.name} because it isn't an evolution.`];
			}
			if (this.ruleTable.isRestrictedSpecies(crossSpecies)) {
				return [`${species.name} cannot cross evolve into ${crossSpecies.name} because it is banned.`];
			}
			const crossPrevoSpecies = this.dex.species.get(crossSpecies.prevo);
			if (!crossPrevoSpecies.prevo !== !species.prevo) {
				return [
					`${species.name} cannot cross evolve into ${crossSpecies.name} because they are not consecutive evolution stages.`,
				];
			}
			const item = this.dex.items.get(set.item);
			if (item.itemUser?.length) {
				if (!item.itemUser.includes(crossSpecies.name) || crossSpecies.name !== species.name) {
					return [`${species.name} cannot use ${item.name} because it is cross evolved into ${crossSpecies.name}.`];
				}
			}
			const ability = this.dex.abilities.get(set.ability);
			if (!this.ruleTable.isRestricted(`ability:${ability.id}`) || Object.values(species.abilities).includes(ability.name)) {
				set.species = crossSpecies.name;
			}

			// @ts-ignore
			set.sp = species;
			// @ts-ignore
			set.crossSpecies = crossSpecies;
			problems = this.validateSet(set, teamHas);
			set.name = crossSpecies.name;
			set.species = species.name;
			return problems;
		},
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // chat
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (target.set.name === target.set.species) return;
			const crossSpecies = this.dex.species.get(target.set.name);
			if (!crossSpecies.exists) return;
			if (species.battleOnly || !species.nfe) return;
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable" &&
				!this.ruleTable.has('+unobtainable'));
			// Nihilslave: remove the crossIsUnreleased judge here cuz it's bh
			if (crossSpecies.battleOnly || !crossSpecies.prevo) return;
			const crossPrevoSpecies = this.dex.species.get(crossSpecies.prevo);
			if (!crossPrevoSpecies.prevo !== !species.prevo) return;

			const mixedSpecies = this.dex.deepClone(species);
			mixedSpecies.weightkg =
				Math.max(0.1, +(species.weightkg + crossSpecies.weightkg - crossPrevoSpecies.weightkg)).toFixed(1);
			mixedSpecies.nfe = false;
			mixedSpecies.evos = [];
			mixedSpecies.eggGroups = crossSpecies.eggGroups;
			mixedSpecies.abilities = crossSpecies.abilities;
			mixedSpecies.bst = 0;
			let i: StatID;
			for (i in species.baseStats) {
				const statChange = crossSpecies.baseStats[i] - crossPrevoSpecies.baseStats[i];
				mixedSpecies.baseStats[i] = this.clampIntRange(species.baseStats[i] + statChange, 1, 255);
				mixedSpecies.bst += mixedSpecies.baseStats[i];
			}
			if (crossSpecies.types[0] !== crossPrevoSpecies.types[0]) mixedSpecies.types[0] = crossSpecies.types[0];
			if (crossSpecies.types[1] !== crossPrevoSpecies.types[1]) {
				mixedSpecies.types[1] = crossSpecies.types[1] || crossSpecies.types[0];
			}
			if (mixedSpecies.types[0] === mixedSpecies.types[1]) mixedSpecies.types = [mixedSpecies.types[0]];

			return mixedSpecies;
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.baseSpecies = pokemon.species;
			}
		},
	},
	{
		name: "[Gen 9] Flipped BH",
		desc: `BH + Flipped.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3662020/">Gen 8 Flipped</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Flipped Mod'],
		banlist: ['Fur Coat', 'Ice Scales'],
		unbanlist: [
			'Shell Smash',
		],
	},
	{
		name: "[Gen 9] Fortemons BH",
		desc: `BH，但精灵可以在道具栏携带攻击招式，然后该精灵的所有攻击招式共享其特效。<br/>\
			如，一只精灵道具栏带高速旋转，则其所有攻击招式都额外拥有扫钉和速度 +1 效果。<br/>\
			<details><summary>以下招式禁止作为道具携带：</summary>\
			&bullet; 一击必杀招式<br/>\
			&bullet; 降低命中率的招式<br/>\
			&bullet; 多段招式<br/>\
			&bullet; 正先制度招式<br/>\
			&bullet; 抓人招式<br/>\
			&bullet; 反击招式<br/>\
			&bullet; 比例伤害招式（如愤怒门牙）<br/>\
			&bullet; 蓄力招式（如飞翔）<br/>\
			&bullet; 必定击中要害的招式<br/>\
			<details><summary>其它被禁止的招式：</summary>\
			&emsp;&bullet; 快速折返、急速折返、伏特替换<br/>\
			&emsp;&bullet; 爆裂拳、炼狱、晶光转转、蹭蹭脸颊、电磁炮<br/>\
			&emsp;&bullet; 酸液炸弹、琉光冲激<br/>\
			&emsp;&bullet; 回声、扫墓、嚣张、愤怒之拳、滚动、辅助力量<br/>\
			&emsp;&bullet; 电力上升、大地波动、气象球<br/>\
			&emsp;&bullet; 秘剑千重涛、诡异咒语</details></details><br/>\
			BH, but Pok&eacute;mon can have attack moves in their item slot as fortes. Every attack move of a Pok&eacute;mon will additionally have the move effects of its forte.<br/>\
			E.g. A Pok&eacute;mon with Rapid Spin as its forte will give all its attacks the effect of hazard removal and +1 Spe, along with their original effects.<br/>\
			<details><summary>The following moves are banned as forte:</summary>\
			&bullet; OHKO Moves<br/>\
			&bullet; Moves That Lower Accuracy<br/>\
			&bullet; Multi-hit Moves<br/>\
			&bullet; Positive Priority Moves<br/>\
			&bullet; Trapping Moves<br/>\
			&bullet; Counter-like Moves<br/>\
			&bullet; Ratio Damage Moves (e.g. Super Fang)<br/>\
			&bullet; Charge Moves (e.g. Fly)<br/>\
			&bullet; Always-Crit Moves<br/>\
			<details><summary>Other Banned Moves:</summary>\
			&emsp;&bullet; Flip Turn, U-turn, Volt Switch<br/>\
			&emsp;&bullet; Dynamic Punch, Inferno, Mortal Spin, Nuzzle, Zap Cannon<br/>\
			&emsp;&bullet; Acid Spray, Lumina Crash<br/>\
			&emsp;&bullet; Echoed Voice, Last Respects, Power Trip, Rage Fist, Rollout, Stored Power<br/>\
			&emsp;&bullet; Rising Voltage, Terrain Pulse, Weather Ball<br/>\
			&emsp;&bullet; Ceaseless Edge, Eerie Spell</details></details>`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713983/">Fortemons</a>`,
		],

		mod: 'fortemons',
		// debug: true,
		ruleset: ['[Gen 9] Balanced Hackmons', 'Forte Clause', 'Multi-hit Moves Clause'],
		banlist: [
			'Serene Grace', 'Shield Dust', 'Triage',
			'Endeavor', 'Ruination', 'Super Fang',
			// multi-hit moves banned by multihitmovesclause
			'Covert Cloak',
		],
		unbanlist: [
			'Miraidon',
			'Gorilla Tactics', 'Orichalcum Pulse',
		],
		validateSet(set, teamHas) {
			const item = set.item;
			const move = this.dex.moves.get(item);
			if (!move.exists || move.id === 'metronome' || move.category === 'Status') {
				return this.validateSet(set, teamHas);
			}
			set.item = '';
			const problems = this.validateSet(set, teamHas) || [];
			set.item = item;
			if (set.moves.map(this.toID).includes(move.id)) {
				problems.push(`Moves in the item slot can't be in the moveslots as well.`);
			}
			// keep nd moves just in case they are back one day
			const restrictedMoves = ['Acid Spray', 'Anchor Shot', 'Beat Up', 'Bide', 'Bolt Beak', 'Ceaseless Edge',
				'Dynamic Punch', 'Echoed Voice', 'Eerie Spell', 'Fishious Rend', 'Ice Ball', 'Inferno', 'Jaw Lock',
				'Last Respects', 'Lumina Crash', 'Mortal Spin', 'Nuzzle', 'Power Trip', 'Pursuit', 'Rage Fist',
				'Rising Voltage', 'Rollout', 'Spirit Shackle', 'Stored Power', 'Terrain Pulse',
				'Thousand Waves', 'Weather Ball', 'Zap Cannon',
				// watchlist 'Shell Side Arm',
			];
			const accuracyLoweringMove = move.secondaries?.some(secondary => secondary.boosts?.accuracy && secondary.boosts?.accuracy < 0);
			if ((move.isNonstandard && move.isNonstandard !== 'Unobtainable') ||
				move.ohko ||
				accuracyLoweringMove ||
				move.multihit ||
				move.priority > 0 ||
				move.volatileStatus === 'partiallytrapped' ||
				move.damageCallback && move.id !== 'psywave' ||
				move.flags['charge'] ||
				move.willCrit ||
				// ban voltturn
				move.selfSwitch ||
				restrictedMoves.includes(move.name)
			) {
				problems.push(`The move ${move.name} is banned as a Forte.`);
			}
			return problems.length ? problems : null;
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				const move = this.dex.getActiveMove(pokemon.set.item);
				if (move.exists && move.category !== 'Status') {
					pokemon.m.forte = move;
				}
			}
		},
		// complexProperties - part 0
		// these are called before onModifyMove
		// see simulator-doc.txt and sim/battle-actions.ts
		onModifyPriorityPriority: 1,
		onModifyPriority(priority, source, target, move) {
			// works for grassyglide and triage
			// but not for revelationdance + galewings, since onModifyType is called later
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				if (forte.flags['heal']) {
					move.flags['heal'] = forte.flags['heal'];
				}
				// don't use singleEvent here, will cause some issues
				if (forte.onModifyPriority) {
					return forte.onModifyPriority.call(this, priority, source, target, move) || priority;
				}
			}
		},
		// set priority to 11 for sleepUsable and defrost
		onBeforeMovePriority: 11,
		onBeforeMove(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				if (forte.beforeMoveCallback) {
					if (move.beforeMoveCallback) {
						move.beforeMoveCallback = function (pkm, tgt, mv) {
							const ret1 = this.dex.moves.get(move.id).beforeMoveCallback!.call(this, pkm, tgt, mv);
							const ret2 = forte.beforeMoveCallback.call(this, pkm, tgt, mv);
							return this.actions.combineResults(ret1 as any, ret2);
						}
					} else {
						move.beforeMoveCallback = forte.beforeMoveCallback;
					}
				}
				if (forte.sleepUsable) {
					move.sleepUsable = forte.sleepUsable;
				}
				if (forte.flags['defrost']) {
					move.flags['defrost'] = forte.flags['defrost'];
				}
			}
		},
		onModifyTypePriority: 1,
		onModifyType(move, pokemon, target) {
			const forte = pokemon.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('ModifyType', forte, null, pokemon, target, move, move);
			}
		},
		// set this to 1 for sheer force
		onModifyMovePriority: 1,
		/**
		 * but listen, here we get an unsolvable bug (or feature)
		 * usually items like king's rock, which give ur move a secondary, won't trigger sheer force
		 * because they have their onModifyMovePriority set to -1, which is later than sheer force (0)
		 * but here we want sheer force to work for forte's secondaries, so we set it to 1
		 * you may think ahh it's totally ok, where's the bug?
		 * check the code of diamond storm, a move without any real secondary
		 * it can trigger sheer force and have its "self" property disabled as the result
		 * and it should be implemented like that cuz it hits both adjacent foes
		 * so having its effect in self can avoid triggering it twice in doubles
		 * then check the code of sheer force
		 * it's triggered by secondary, but will remove self along with secondary
		 * and the following two effects are also implemented in self property:
		 * stats drop of v-create, draco meteor, and etc; must recharge of hyper beam, etc;
		 * there are more, but these two are the most important
		 * so, by having sheer force ability and anything with secondary as forte
		 * you will get a v-create that doesn't drop stats, or a hyper beam that doesn't require recharge
		 * i say this is unsolvable because we have to add secondary and self at the same time for diamond storm
		 * which should be earlier than sheer force
		 * commented by Nihilslave
		 */
		onModifyMove(move, pokemon, target) {
			if (move.category !== 'Status' && pokemon.m.forte) {
				const forte: ActiveMove = pokemon.m.forte;

				move.flags = {...move.flags, ...forte.flags};

				// pseudoWeather is a simple prop in practice cuz plasma fists is the only attack with it,
				const simpleProperties = ['breaksProtect', 'forceSwitch', 'hasCrashDamage', 'hasSheerForce',
					'ignoreAbility', 'ignoreDefensive', 'ignoreEvasion', 'ignoreImmunity', 'mindBlownRecoil',
					'ohko', 'overrideDefensiveStat', 'overrideOffensivePokemon', 'overrideOffensiveStat',
					'pseudoWeather', 'selfdestruct', 'selfSwitch', 'sleepUsable', 'smartTarget', 'stealsBoosts',
					'struggleRecoil', 'thawsTarget', 'willCrit',
					// function properties
					'onDamage', 'onMoveFail', 'onUseMoveMessage'
				] as const;
				for (const prop of simpleProperties) {
					if (forte[prop]) {
						move[prop] = forte[prop] as any;
					}
				}
				// otherwise the move still won't break protect
				if (move.breaksProtect) {
					delete move.flags['protect'];
				}

				// secondaries
				if (forte.secondaries) {
					if (move.secondaries) {
						move.secondaries = move.secondaries.concat(forte.secondaries);
					} else if (move.secondary) {
						move.secondaries = [move.secondary].concat(forte.secondaries);
						move.secondary = undefined;
					} else {
						move.secondaries = forte.secondaries;
					}
				} else if (forte.secondary) {
					if (move.secondaries) {
						move.secondaries = move.secondaries.concat(forte.secondary);
					} else if (move.secondary) {
						move.secondaries = [move.secondary].concat(forte.secondary);
						move.secondary = undefined;
					} else {
						move.secondary = forte.secondary;
					}
				}
				// volatileStatus
				// todo: test
				if (forte.volatileStatus) {
					if (move.volatileStatus && move.volatileStatus !== forte.volatileStatus) {
						move.volatileStatus += '+' + forte.volatileStatus;
					} else {
						move.volatileStatus = forte.volatileStatus;
					}
				}
				// self
				if (forte.self) {
					if (!move.self) {
						move.self = {};
					}
					for (const i in forte.self) {
						if (['onHit', 'boosts', 'volatileStatus'].includes(i)) continue;
						(move.self as any)[i] = (forte.self as any)[i];
					}
					if (forte.self.onHit) {
						if (move.self.onHit) {
							move.self.onHit = function (tgt, src, mv) {
								const ret1 = (this.dex.moves.get(move.id).self!.onHit as any).call(this, tgt, src, mv);
								const ret2 = (forte.self!.onHit as any).call(this, tgt, src, mv);
								return this.actions.combineResults(ret1, ret2);
							}
						} else {
							(move.self as any).onHit = forte.self.onHit;
						}
					}
					// todo: fix diamond storm, it has a chance of 50%
					if (forte.self.boosts) {
						if (!move.self.boosts) move.self.boosts = {};
						let boostid: BoostID;
						for (boostid in forte.self.boosts) {
							if (!move.self.boosts[boostid]) move.self.boosts[boostid] = 0;
							move.self.boosts[boostid]! += forte.self.boosts[boostid]!;
						}
					}
					// todo: test if this really works
					if (forte.self.volatileStatus) {
						if (move.self.volatileStatus && move.self.volatileStatus !== forte.self.volatileStatus) {
							// the other part implemented in data/mods
							move.self.volatileStatus += '+' + forte.self.volatileStatus;
						} else {
							move.self.volatileStatus = forte.self.volatileStatus;
						}
					}
				}

				// number properties
				move.critRatio = (move.critRatio || 1) + (forte.critRatio || 1) - 1;
				if (forte.damage || forte.id === 'psywave') {
					if (move.damage || move.id === 'psywave') {
						let damageLevel = 1;
						if (typeof forte.damage === 'number') damageLevel *= 2;
						if (forte.damage === 'level') damageLevel *= 5;
						if (forte.id === 'psywave') damageLevel *= 7;
						if (typeof move.damage === 'number') damageLevel *= 3;
						if (move.damage === 'level') damageLevel *= 5;
						if (move.id === 'psywave') damageLevel *= 7;
						switch (damageLevel) {
						case 35:
							move.damageCallback = function (pkm) {
								return (this.random(50, 151) * pkm.level) / 100 + pkm.level;
							};
							break;
						case 25:
							move.damageCallback = function (pkm) {
								return pkm.level * 2;
							};
							break;
						case 21:
							move.damageCallback = function (pkm) {
								return (this.random(50, 151) * pkm.level) / 100 + (move.damage as number);
							};
							break;
						case 15:
							move.damageCallback = function (pkm) {
								return pkm.level + (move.damage as number);
							};
							break;
						case 14:
							move.damageCallback = function (pkm) {
								return (this.random(50, 151) * pkm.level) / 100 + (forte.damage as number);
							};
							break;
						case 10:
							move.damageCallback = function (pkm) {
								return pkm.level + (forte.damage as number);
							};
							break;
						case 6:
							(move.damage as number) += (forte.damage as number);
							break;
						default:
							move.damage = forte.damage;
							break;
						}
					} else {
						move.damage = forte.damage;
					}
				}
				if (forte.drain) {
					if (move.drain) {
						const moreDrain = ['drainingkiss', 'oblivionwing'];
						const drainLevel = (moreDrain.includes(forte.id) ? 1 : 0) + (moreDrain.includes(move.id) ? 1 : 0);
						switch (drainLevel) {
						case 2:
							move.drain = [3, 2];
							break;
						case 1:
							move.drain = [5, 4];
							break;
						default:
							move.drain = [1, 1];
							break;
						}
					} else {
						move.drain = forte.drain;
					}
				}
				if (forte.recoil) {
					if (move.recoil) {
						let recoilLevel = 1;
						if (move.recoil[0] === 1 && move.recoil[1] === 4) recoilLevel *= 2;
						if (move.recoil[0] === 33 && move.recoil[1] === 100) recoilLevel *= 3;
						if (move.recoil[0] === 1 && move.recoil[1] === 2) recoilLevel *= 5;
						if (forte.recoil[0] === 1 && forte.recoil[1] === 4) recoilLevel *= 2;
						if (forte.recoil[0] === 33 && forte.recoil[1] === 100) recoilLevel *= 3;
						if (forte.recoil[0] === 1 && forte.recoil[1] === 2) recoilLevel *= 5;
						switch (recoilLevel) {
						case 25:
							move.recoil = [1, 1];
							break;
						case 15:
							move.recoil = [83, 100];
							break;
						case 10:
							move.recoil = [3, 4];
							break;
						case 9:
							move.recoil = [66, 100];
							break;
						case 6:
							move.recoil = [29, 50];
							break;
						case 4:
							move.recoil = [1, 2];
							break;
						// won't really happen, just in case
						case 3:
							move.recoil = [33, 100];
							break;
						default:
							move.recoil = [1, 4];
							break;
						}
					} else {
						move.recoil = forte.recoil;
					}
				}
				// Nihilslave: use official code
				if (forte.selfBoost?.boosts) {
					if (!move.selfBoost?.boosts) move.selfBoost = {boosts: {}};
					let boostid: BoostID;
					for (boostid in forte.selfBoost.boosts) {
						if (!move.selfBoost.boosts![boostid]) move.selfBoost.boosts![boostid] = 0;
						move.selfBoost.boosts![boostid]! += forte.selfBoost.boosts[boostid]!;
					}
				}

				// complexProperties - part 1
				// here we only deal with properties whose return value matters
				// return value of some of them are practically irrelevant, but there's not harm to deal with them
				if (forte.basePowerCallback) {
					if (move.basePowerCallback) {
						move.basePowerCallback = function (pkm, tgt, mv) {
							let baseMove = this.dex.getActiveMove(mv.id);
							let basePower = this.dex.moves.get(move.id).basePowerCallback!.call(this, pkm, tgt, mv);
							// const forteMove = this.dex.getActiveMove(forte.id);
							baseMove.basePower = basePower || 1; // should this be 1 or something else?
							// here we should use "forteMove" as the last param instead of mv
							// ^ no, just use baseMove
							basePower = forte.basePowerCallback!.call(this, pkm, tgt, baseMove);
							return basePower;
						};
					} else {
						move.basePowerCallback = forte.basePowerCallback;
					}
				}
				if (forte.onEffectiveness) {
					if (move.onEffectiveness) {
						move.onEffectiveness = function (typeMod, tgt, tp, mv) {
							const moveEffectiveness = this.dex.moves.get(move.id).onEffectiveness!.call(this, typeMod, tgt, tp, mv);
							const forteEffectiveness = forte.onEffectiveness!.call(this, moveEffectiveness || typeMod, tgt, tp, mv);
							return forteEffectiveness || 0;
						};
					} else {
						move.onEffectiveness = forte.onEffectiveness;
					}
				}
				if (forte.onTry) {
					if (move.onTry) {
						move.onTry = function (src, tgt, mv) {
							const ret1 = (this.dex.moves.get(move.id).onTry as any).call(this, src, tgt, mv);
							let ret2;
							if (!forte.flags['futuremove']) {
								ret2 = (forte.onTry as any).call(this, src, tgt, mv);
							} else {
								if (!tgt.side.addSlotCondition(tgt, 'futuremove')) {
									ret2 = false;
								} else {
									Object.assign(tgt.side.slotConditions[tgt.position]['futuremove'], {
										duration: 3,
										move: move.id,
										source: src,
										moveData: {
											id: move.id,
											name: move.name,
											accuracy: move.accuracy,
											basePower: move.basePower,
											category: move.category,
											priority: move.priority,
											flags: move.flags,
											effectType: 'Move',
											type: move.baseMoveType,
										},
									});
									this.add('-start', src, forte.name);
									ret2 = this.NOT_FAIL;
								}
							}
							return this.actions.combineResults(ret1, ret2);
						};
					} else {
						if (!forte.flags['futuremove']) {
							move.onTry = forte.onTry;
						} else {
							move.onTry = function (src, tgt, mv) {
								if (!tgt.side.addSlotCondition(tgt, 'futuremove')) return false;
								Object.assign(tgt.side.slotConditions[tgt.position]['futuremove'], {
									duration: 3,
									move: move.id,
									source: src,
									moveData: {
										id: move.id,
										name: move.name,
										accuracy: move.accuracy,
										basePower: move.basePower,
										category: move.category,
										priority: move.priority,
										flags: move.flags,
										effectType: 'Move',
										type: move.baseMoveType,
									},
								});
								this.add('-start', src, forte.name);
								return this.NOT_FAIL;
							};
						}
					}
				}
				const retValComplexProperties = [
					'onPrepareHit', 'onHit', 'onTryHit', 'onTryImmunity', 'onTryMove'
				] as const;
				for (const prop of retValComplexProperties) {
					if (forte[prop]) {
						if (move[prop]) {
							// using a gimmick here since they all have argument lists of the same type
							move[prop] = function (pkm1, pkm2, mv) {
								const ret1 = (this.dex.moves.get(move.id)[prop] as any).call(this, pkm1, pkm2, mv);
								const ret2 = (forte[prop] as any).call(this, pkm1, pkm2, mv);
								return this.actions.combineResults(ret1, ret2);
							}
						} else {
							move[prop] = forte[prop] as any;
						}
					}
				}

				if (forte.onModifyMove) {
					forte.onModifyMove.call(this, move, pokemon, target);
				}
			}
		},
		// complexProperties - part 2
		// these are both after onModifyMove and have irrelevant return value
		onAfterHit(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterHit', forte, {}, target, source, move);
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterSubDamage', forte, null, target, source, move);
			}
		},
		// don't know what this does, just keep it
		onModifySecondaries(secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		// this should be -1 to be applied later than the move itself i think?
		onAfterMoveSecondaryPriority: -1,
		onAfterMoveSecondarySelf(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterMoveSecondarySelf', forte, null, source, target, move);
			}
		},
		onAfterMove(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterMove', forte, null, source, target, move);
			}
		},
		// still, irrelevant tho, i think this should be -1
		onBasePowerPriority: -1,
		onBasePower(basePower, source, target, move) {
			const forte = source.m.forte;
			if (move.category !== 'Status' && forte?.onBasePower) {
				forte.onBasePower.call(this, basePower, source, target, move);
			}
		},
		// beak blast / focus punch forte implemented in data/mods/fortemons/scripts.ts
	},
	{
		name: "[Gen 9] Godly Gift BH",
		desc: `Godly Gift + BH. Pok&eacute;mon with BST greater than or equal to 650 are Gods.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710734/">Godly Gift</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		// we cannot use godly gift mod here
		ruleset: ['[Gen 9] Balanced Hackmons'],
		restricted: [
			'Mewtwo', 'Slaking', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Dialga-Origin', 'Palkia', 'Palkia-Origin',
			'Giratina', 'Giratina-Origin', 'Arceus', 'Hoopa-Unbound', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Eternatus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Palafin-Hero', 'Koraidon', 'Miraidon',
		],
		onValidateTeam(team) {
			const gods = new Set<string>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.baseSpecies === 'Arceus') {
					gods.add(species.name);
				}
				if (this.ruleTable.isRestrictedSpecies(species)) {
					gods.add(species.name);
				}
			}
			if (gods.size > 1) {
				return [`You have too many Gods.`, `(${Array.from(gods).join(', ')} are Gods.)`];
			}
		},
		onModifySpeciesPriority: 3,
		onModifySpecies(species, target, source) {
			if (source || !target?.side) return;
			const god = target.side.team.find(set => {
				const godSpecies = this.dex.species.get(set.species);
				if (godSpecies.baseSpecies === 'Arceus') return true;
				return this.ruleTable.isRestrictedSpecies(godSpecies);
			}) || target.side.team[0];
			const stat = Dex.stats.ids()[target.side.team.indexOf(target.set)];
			const newSpecies = this.dex.deepClone(species);
			const godSpecies = this.dex.species.get(god.species);
			newSpecies.bst -= newSpecies.baseStats[stat];
			newSpecies.baseStats[stat] = godSpecies.baseStats[stat];
			newSpecies.bst += newSpecies.baseStats[stat];
			return newSpecies;
		},
	},
	{
		name: "[Gen 9] Inverse BH",
		desc: `BH + Inverse`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Inverse Mod'],
	},
	{
		name: "[Gen 9] Mirror Move BH",
		desc: `BH，但你与你的对手共享技能。（但一只精灵自己至多携带 2 个技能。）<br /> BH, but you and your opponent share the moves. (One pok&eacute;mon can only choose at most 2 moves in the teambuilder.)`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572990/">Gen 6 Mirror Move</a>`,
		],

		mod: 'mirrormove',
		debug: true,
		ruleset: ['[Gen 9] Balanced Hackmons'],
		banlist: [
			'Imprison',
		],
		onValidateSet(set) {
			if (set.moves.length > 2) {
				return [`${set.species} has more than 2 moves`];
			}
		},
	},
	{
		name: "[Gen 8] Mix and Mega BH",
		desc: `BH + MnM。在本分级，除了Mega石，你还可以使用朱红色宝珠、靛蓝色宝珠、腐朽的剑、腐朽的盾、画龙点睛、雪矛和星碎来让宝可梦“Mega 进化”。<br />输入“/mnm &lt;宝可梦名称&gt; @ &lt;Mega石&gt;, bh”来查看宝可梦 Mega 进化后的信息<br />例如：/mnm zygardecomplete@rustedshield,bh。<br />BH where you can mega evolve any Pok&eacute;mon (as long as they are not already in "mega" formes) with any mega stone and no limit. Boosts based on mega evolution from gen 7. <br /> You can also "mega evolve" any Pok&eacute;mon with Red Orb, Blue Orb, Rusted Sword, Rusted Shield, Dragon Ascent, Astral Barrage, and Glacial Lance in this format. <br /> Type "/mnm &lt;pokemon&gt; @ &lt;mega stone&gt;, bh" to see type and stats of Mix and Mega Evolved Pok&eacute;mon in this format. E.g. /mnm zygardecomplete@rustedshield,bh`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656469/">Mix and Mega</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659028/">M&amp;M Resources</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
			`&bullet; <a href="http://replay.sciroccogti.top/files/gen8mixandmegabh-997-asouchihiro-leon6.html">示例录像 Sample Replay</a>`,
		],

		mod: 'mixandmegabh',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 8] Balanced Hackmons', 'Nickname Clause', 'Overflow Stat Mod'],
		banlist: [
			'Beedrillite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite',
			'Astral Barrage > 1', 'Dragon Ascent > 1', 'Glacial Lance > 1',
		],
		unbanlist: [
			'Calyrex-Shadow', 'Darmanitan-Galar-Zen', 'Shedinja', 'Zacian-Crowned',
			'Belly Drum',
			'Rusted Sword',
		],
		restricted: ['Intrepid Sword'],
		onValidateSet(set) {
			const ability = this.dex.abilities.get(set.ability);
			if (ability.id === 'intrepidsword') {
				if (this.dex.toID(set.item) !== 'rustedsword') {
					return [`${set.name}'s ability ${ability.name} is banned.`];
				}
			}
		},
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item?.megaStone && !item?.onPrimal) continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard) return [`${species.baseSpecies} does not exist in gen 8.`];
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
					return [`${species.name} is not allowed to hold ${item.name}.`];
				}
				if (itemTable.has(item.id)) {
					return [`You are limited to one of each mega stone.`, `(You have more than one ${item.name})`];
				}
				itemTable.add(item.id);
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalMega);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalMega);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
		// necessary
		onChangeSet(set) {
			const species = this.dex.species.get(set.species);
			if (species.forme && ['Mega', 'Mega-X', 'Mega-Y', 'Primal'].includes(species.forme)) return;

			const item = this.dex.toID(set.item);
			if (item === 'rustedshield') {
				set.ability = 'Dauntless Shield';
				if (set.species === 'Zamazenta') {
					set.species = 'Zamazenta-Crowned';
				}
			}
			if (item === 'rustedsword') {
				set.ability = 'Intrepid Sword';
				if (set.species === 'Zacian') {
					set.species = 'Zacian-Crowned';
				}
			}
		},
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (target.species.forme && ['Mega', 'Mega-X', 'Mega-Y', 'Primal'].includes(target.species.forme)) return;

			const item = this.dex.toID(target?.set.item);
			if (item === 'rustedshield') {
				const mSpecies = this.dex.deepClone(this.dex.species.get(target.species.name));
				mSpecies.types = [target.species.types[0], 'Steel'];
				mSpecies.baseStats.def = this.clampIntRange(mSpecies.baseStats.def + 30, 1, 255);
				mSpecies.baseStats.spd = this.clampIntRange(mSpecies.baseStats.spd + 30, 1, 255);
				mSpecies.baseStats.spe = this.clampIntRange(mSpecies.baseStats.spe - 10, 1, 255);
				mSpecies.abilities = {'0': 'dauntlessshield'};
				mSpecies.weighthg = Math.max(1, mSpecies.weighthg + 5750);
				mSpecies.isPrimal = true;
				mSpecies.originalMega = 'Zamazenta-Crowned';
				mSpecies.requiredItem = 'rustedshield';
				target.baseSpecies = mSpecies;
				// unnecessary target.canMegaEvo = null;
				return mSpecies;
			}
			if (item === 'rustedsword') {
				const mSpecies = this.dex.deepClone(this.dex.species.get(target.species.name));
				mSpecies.types = [target.species.types[0], 'Steel'];
				mSpecies.baseStats.atk = this.clampIntRange(mSpecies.baseStats.atk + 40, 1, 255);
				mSpecies.baseStats.spe = this.clampIntRange(mSpecies.baseStats.spe + 10, 1, 255);
				mSpecies.abilities = {'0': 'intrepidsword'};
				mSpecies.weighthg = Math.max(1, mSpecies.weighthg + 2450);
				mSpecies.isPrimal = true;
				mSpecies.originalMega = 'Zacian-Crowned';
				mSpecies.requiredItem = 'rustedsword';
				target.baseSpecies = mSpecies;
				// unnecessary target.canMegaEvo = null;
				return mSpecies;
			}
			return;
		},
	},
	{
		name: "[Gen 9] Monotype BH",
		desc: `BH + Monotype.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Same Type Clause'],
	},
	{
		name: "[Gen 9] Multibility BH",
		desc: `BH + Multibility.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3688892/">Gen 8 Multibility</a>`,
		],

		mod: 'gen9',
		debug: true,
		ruleset: ['[Gen 9] Balanced Hackmons', 'Ability Clause = 2'],
		validateSet(set, teamHas) {
			const ability = this.dex.abilities.get(set.ability);
			const item = this.dex.abilities.get(set.item);
			if (!item.exists) return this.validateSet(set, teamHas);
			const problems = [];
			if (item.isNonstandard && !this.ruleTable.has(`+ability:${item.id}`)) {
				problems.push(`${item.name} is banned.`);
			}
			if (ability.id === item.id) {
				problems.push(`${set.species} has ${ability.name} as an ability and as an item.`);
			}
			if (this.ruleTable.isRestricted(`ability:${item.id}`) || this.ruleTable.isBanned(`ability:${item.id}`)) {
				problems.push(`${set.species}'s second ability (${item.name}) can only be used as an ability.`);
			}
			if ((ability.id === 'regenerator' && ['emergencyexit', 'wimpout'].includes(item.id)) ||
				(item.id === 'regenerator' && ['emergencyexit', 'wimpout'].includes(ability.id))) {
				problems.push(`${ability.name} and ${item.name} are banned together.`);
			}
			if (item.id === 'comatose' && set.moves.map((value) => this.toID(value)).includes('sleeptalk' as ID)) {
				problems.push(`${set.species} has the combination of Comatose + Sleep Talk, which is banned by [Gen 9] Balanced Hackmons.`);
			}
			const itemStr = set.item;
			set.item = '';
			const problem = this.validateSet(set, teamHas);
			if (problem?.length) problems.push(...problem);
			set.item = itemStr;
			return problems;
		},
		onValidateTeam(team) {
			if (!this.ruleTable.has('abilityclause')) return;
			const abilityTable = new Map<string, number>();
			const base: {[k: string]: string} = {
				airlock: 'cloudnine',
				armortail: 'queenlymajesty',
				battlearmor: 'shellarmor',
				clearbody: 'whitesmoke',
				dazzling: 'queenlymajesty',
				emergencyexit: 'wimpout',
				filter: 'solidrock',
				gooey: 'tanglinghair',
				insomnia: 'vitalspirit',
				ironbarbs: 'roughskin',
				libero: 'protean',
				minus: 'plus',
				moxie: 'chillingneigh',
				powerofalchemy: 'receiver',
				propellertail: 'stalwart',
				teravolt: 'moldbreaker',
				turboblaze: 'moldbreaker',
			};
			const abilities: [string, string][] = [];
			for (const set of team) {
				abilities.push([set.ability, set.item].map((abil) => {
					const id = this.toID(abil);
					return base[id] || id;
				}) as [string, string]);
			}
			for (const [abilityid, itemid] of abilities) {
				const ability = this.dex.abilities.get(abilityid);
				const item = this.dex.abilities.get(itemid);
				if (ability.exists) abilityTable.set(ability.id, (abilityTable.get(ability.id) || 0) + 1);
				if (item.exists) abilityTable.set(item.id, (abilityTable.get(item.id) || 0) + 1);
			}
			for (const [abilityid, size] of abilityTable) {
				if (size > 2) {
					return [
						`You are limited to two of each ability by Ability Clause = 2.`,
						`(You have more than two ${this.dex.abilities.get(abilityid).name} variants)`,
					];
				}
			}
		},
		onSwitchOut(pokemon) {
			const item = this.dex.abilities.get(pokemon.item);
			if (item.exists) {
				this.singleEvent('End', item, pokemon.itemState, pokemon);
			}
		},
		onFaint(pokemon) {
			const item = this.dex.abilities.get(pokemon.item);
			if (item.exists) {
				this.singleEvent('End', item, pokemon.itemState, pokemon);
			}
		},
		field: {
			suppressingWeather() {
				for (const pokemon of this.battle.getAllActive()) {
					const item = this.battle.dex.abilities.get(pokemon.item);
					if (pokemon && !pokemon.ignoringAbility() &&
						(pokemon.getAbility().suppressWeather || (item.exists && item.suppressWeather))) {
						return true;
					}
				}
				return false;
			},
		},
		pokemon: {
			getItem() {
				const ability = this.battle.dex.abilities.get(this.item);
				if (!ability.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {...ability, ignoreKlutz: true, onTakeItem: false};
			},
			hasItem(item) {
				const ownItem = this.item;
				if (this.battle.dex.abilities.get(ownItem).exists) return false;
				if (this.ignoringItem()) return false;
				if (!Array.isArray(item)) return ownItem === this.battle.toID(item);
				return item.map(this.battle.toID).includes(ownItem);
			},
			hasAbility(ability) {
				if (this.ignoringAbility()) return false;
				if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
				const abilityid = this.battle.toID(ability);
				const item = this.battle.dex.abilities.get(this.item);
				return this.ability === abilityid || (item.exists && item.id === abilityid);
			},
			ignoringAbility() {
				// Check if any active pokemon have the ability Neutralizing Gas
				let neutralizinggas = false;
				for (const pokemon of this.battle.getAllActive()) {
					// can't use hasAbility because it would lead to infinite recursion
					if ((pokemon.ability === ('neutralizinggas' as ID) || pokemon.item === ('neutralizinggas' as ID)) &&
						!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending) {
						neutralizinggas = true;
						break;
					}
				}
				return !!(
					(this.battle.gen >= 5 && !this.isActive) ||
					((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID) &&
						this.item !== ('neutralizinggas' as ID))) && !this.getAbility().isPermanent));
			},
			ignoringItem() {
				let nGas = false;
				for (const pokemon of this.battle.getAllActive()) {
					// can't use hasAbility because it would lead to infinite recursion
					if (((pokemon.ability === ('neutralizinggas' as ID) && !pokemon.abilityState.ending) ||
						(pokemon.item === ('neutralizinggas' as ID) && !pokemon.itemState.ending)) &&
						!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending) {
						nGas = true;
						break;
					}
				}
				const item = this.battle.dex.abilities.get(this.item);
				return !!((this.battle.gen >= 5 && !this.isActive) ||
					(this.hasAbility('klutz') && !this.getItem().ignoreKlutz) ||
					this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom'] ||
					(item.exists && item.id !== 'neutralizinggas' && (nGas || this.volatiles['gastroacid'])));
			},
			takeItem(source) {
				if (!this.isActive) return false;
				if (!this.item) return false;
				if (this.battle.dex.abilities.get(this.item).exists) return false;
				if (!source) source = this;
				if (this.battle.gen === 4) {
					if (this.battle.toID(this.ability) === 'multitype') return false;
					if (source && this.battle.toID(source.ability) === 'multitype') return false;
				}
				const item = this.getItem();
				if (this.battle.runEvent('TakeItem', this, source, null, item)) {
					this.item = '';
					this.itemState = {id: '', target: this};
					this.pendingStaleness = undefined;
					return item;
				}
				return false;
			},
		},
	},
	{
		name: "[Gen 8] Nature Swap BH",
		desc: `BH + Nature Swap.`,
		threads: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3673622/">Nature Swap</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Eternatus-Eternamax', 'Shedinja', 'Zacian-Crowned',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Belly Drum', 'Bolt Beak', 'Court Change', 'Double Iron Bash', 'Octolock', 'Shell Smash',
			'Rusted Sword',
		],
		battle: {
			spreadModify(baseStats, set) {
				const modStats: SparseStatsTable = {atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
				const tr = this.trunc;
				const nature = this.dex.natures.get(set.nature);
				let statName: keyof StatsTable;
				for (statName in modStats) {
					const stat = baseStats[statName];
					let usedStat = statName;
					if (nature.plus) {
						if (statName === nature.minus) {
							usedStat = nature.plus;
						} else if (statName === nature.plus) {
							usedStat = nature.minus!;
						}
					}
					modStats[statName] = tr(tr(2 * stat + set.ivs[usedStat] + tr(set.evs[usedStat] / 4)) * set.level / 100 + 5);
				}
				if ('hp' in baseStats) {
					const stat = baseStats['hp'];
					modStats['hp'] = tr(tr(2 * stat + set.ivs['hp'] + tr(set.evs['hp'] / 4) + 100) * set.level / 100 + 10);
				}
				return this.natureModify(modStats as StatsTable, set);
			},
			natureModify(stats, set) {
				const tr = this.trunc;
				const nature = this.dex.natures.get(set.nature);
				let s: StatIDExceptHP;
				if (nature.plus) {
					s = nature.minus!;
					const stat = this.ruleTable.has('overflowstatmod') ? Math.min(stats[s], 595) : stats[s];
					stats[s] = this.ruleTable.has('overflowstatmod') ? Math.min(stats[nature.plus], 728) : stats[nature.plus];
					stats[nature.plus] = tr(tr(stat * 110, 16) / 100);
				}
				return stats;
			},
		},
		onChangeSet(set) {
			const item = this.dex.toID(set.item);
			if (set.species === 'Zacian' && item === 'rustedsword') {
				set.species = 'Zacian-Crowned';
				set.ability = 'Intrepid Sword';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothblade';
				}
			}
			if (set.species === 'Zamazenta' && item === 'rustedshield') {
				set.species = 'Zamazenta-Crowned';
				set.ability = 'Dauntless Shield';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothbash';
				}
			}
		},
	},
	{
		name: "[Gen 8] Re-Evolution BH",
		desc: `BH but Pok&eacute;mon gain base stats equal to the difference with their previous stage.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3703643/">Re-Evolution</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'Overflow Stat Mod'],
		banlist: [
			'Cramorant-Gorging', 'Eternatus-Eternamax', 'Shedinja',
			'Lunala', 'Solgaleo',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Court Change', 'Double Iron Bash', 'Octolock', 'Shell Smash',
		],
		onChangeSet(set) {
			const item = this.dex.toID(set.item);
			if (set.species === 'Zacian' && item === 'rustedsword') {
				set.species = 'Zacian-Crowned';
				set.ability = 'Intrepid Sword';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothblade';
				}
			}
			if (set.species === 'Zamazenta' && item === 'rustedshield') {
				set.species = 'Zamazenta-Crowned';
				set.ability = 'Dauntless Shield';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothbash';
				}
			}
		},
		// works differently to Re-Evolution Mod
		onModifySpeciesPriority: 2,
		onModifySpecies(species) {
			if (!species) return;
			if (!species.baseStats) return;
			const baseSpecies = this.dex.species.get(species.baseSpecies);
			if (!baseSpecies.baseStats) return;
			if (!baseSpecies.prevo) return;
			const newSpecies = this.dex.deepClone(species);
			newSpecies.bst = 0;
			const prevoSpecies = this.dex.species.get(baseSpecies.prevo);
			let statName: StatID;
			for (statName in newSpecies.baseStats as StatsTable) {
				newSpecies.baseStats[statName] = this.clampIntRange(newSpecies.baseStats[statName] +
					baseSpecies.baseStats[statName] - prevoSpecies.baseStats[statName], 1, 255);
				newSpecies.bst += newSpecies.baseStats[statName];
			}
			return newSpecies;
		},
	},
	{
		name: "[Gen 9] Scalemons BH",
		desc: `BH + Scalemons.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],
		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Scalemons Mod'],
		banlist: [
			// TBA
		],
	},
	{
		name: "[Gen 9] Tera Donation BH",
		desc: `The first Pok&eacute;mon sent out immediately terastallizes. The other Pok&eacute;mon in the party inherit that Tera Type as an additional type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3715801/">Tera Donation</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons'],
		banlist: [],
		onSwitchIn(pokemon) {
			if (this.turn === 0) {
				this.actions.terastallize(pokemon);
				const teraType = pokemon.teraType;
				for (const poke of pokemon.side.pokemon) {
					poke.m.thirdType = teraType;
				}
			}
			if (!pokemon.terastallized) {
				this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.id === 'terablast') {
				const teraType = pokemon.m.thirdType;
				if (teraType && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					move.category = 'Physical';
				}
			}
		},
		onModifyType(move, pokemon, target) {
			if (move.id === 'terablast') {
				const teraType = pokemon.m.thirdType;
				if (teraType) {
					move.type = teraType;
				}
			}
		},
		pokemon: {
			getTypes(excludeAdded, preterastallized) {
				if (!preterastallized && this.terastallized) return [this.terastallized];
				const types = this.battle.runEvent('Type', this, null, null, this.types);
				if (!excludeAdded && this.addedType) return types.concat(this.addedType);
				const addTeraType = this.m.thirdType;
				if (types.length) {
					if (addTeraType) return Array.from(new Set([...types, addTeraType]));
					return types;
				}
				return [this.battle.gen >= 5 ? 'Normal' : '???'];
			},
		},
	},
	{
		name: "[Gen 9] The Card Game BH",
		desc: `The type chart is simplified based off of the Pok&eacute;mon Trading Card Game.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3716838/">The Card Game</a>`,
		],

		mod: 'thecardgame',
		ruleset: ['[Gen 9] Balanced Hackmons'],
		unbanlist: [
			'Calyrex-Shadow', 'Zacian-Crowned',
		],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.hpType = pokemon.hpType.replace(/(Ghost|Fairy)/g, 'Psychic')
					.replace(/Bug/g, 'Grass')
					.replace(/Ice/g, 'Water')
					.replace(/(Rock|Ground)/g, 'Fighting')
					.replace(/Flying/g, 'Normal')
					.replace(/Poison/g, 'Dark');
				pokemon.teraType = pokemon.teraType.replace(/(Ghost|Fairy)/g, 'Psychic')
					.replace(/Bug/g, 'Grass')
					.replace(/Ice/g, 'Water')
					.replace(/(Rock|Ground)/g, 'Fighting')
					.replace(/Flying/g, 'Normal')
					.replace(/Poison/g, 'Dark');
			}
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			pokemon.apparentType = pokemon.getTypes(true).join('/');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			pokemon.apparentType = pokemon.getTypes(true).join('/');
		},
	},
	{
		name: "[Gen 9] Trademarked BH",
		desc: `Trademarked + BH.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714688/">Trademarked</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'trademarked',
		ruleset: ['[Gen 9] Balanced Hackmons'],
		restricted: [
			'Baneful Bunker', 'Block', 'Copycat', 'Detect', 'Destiny Bond', 'Encore', 'Fairy Lock', 'Ingrain', 'Instruct', 'Mean Look',
			'move:Metronome', 'Protect', 'Revival Blessing', 'Roar', 'Silk Trap', 'Spiky Shield', 'Sleep Talk', 'Shed Tail', 'Shell Smash',
			'Substitute', 'Trick Room', 'Whirlwind',
		],
		onValidateTeam(team, format, teamHas) {
			const problems = [];
			for (const trademark in teamHas.trademarks) {
				if (teamHas.trademarks[trademark] > 1) {
					problems.push(`You are limited to 1 of each Trademark.`, `(You have ${teamHas.trademarks[trademark]} Pok\u00e9mon with ${trademark} as a Trademark.)`);
				}
			}
			return problems;
		},
		validateSet(set, teamHas) {
			const dex = this.dex;
			const ability = dex.moves.get(set.ability);
			if (!ability.exists) { // Not even a real move
				return this.validateSet(set, teamHas);
			}
			// Absolute trademark bans
			if (ability.category !== 'Status') {
				return [`${ability.name} is not a status move and cannot be used as a trademark.`];
			}
			// Contingent trademark bans
			if (this.ruleTable.isRestricted(`move:${ability.id}`)) {
				return [`${ability.name} is restricted from being used as a trademark.`];
			}
			if (set.moves.map(this.toID).includes(ability.id)) {
				return [`${set.name} may not use ${ability.name} as both a trademark and one of its moves simultaneously.`];
			}
			const customRules = this.format.customRules || [];
			if (!customRules.includes('!obtainableabilities')) customRules.push('!obtainableabilities');
			if (!customRules.includes('+noability')) customRules.push('+noability');

			const TeamValidator: typeof import('../sim/team-validator').TeamValidator =
				require('../sim/team-validator').TeamValidator;

			const validator = new TeamValidator(dex.formats.get(`${this.format.id}@@@${customRules.join(',')}`));
			const moves = set.moves;
			set.moves = [ability.id];
			set.ability = 'No Ability';
			let problems = validator.validateSet(set, {}) || [];
			if (problems.length) return problems;
			set.moves = moves;
			set.ability = 'No Ability';
			problems = problems.concat(validator.validateSet(set, teamHas) || []);
			set.ability = ability.id;
			if (!teamHas.trademarks) teamHas.trademarks = {};
			teamHas.trademarks[ability.name] = (teamHas.trademarks[ability.name] || 0) + 1;
			return problems.length ? problems : null;
		},
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 9] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710568/">Almost Any Ability</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710571/">AAA Resources</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', '!Obtainable Abilities', 'Ability Clause = 1', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Baxcalibur', 'Dragapult', 'Dragonite', 'Flutter Mane', 'Great Tusk', 'Gholdengo', 'Houndstone', 'Iron Bundle',
			'Iron Hands', 'Iron Valiant', 'Koraidon', 'Miraidon', 'Noivern', 'Slaking', 'Walking Wake', 'Arena Trap', 'Comatose', 'Contrary',
			'Fur Coat', 'Good as Gold', 'Gorilla Tactics', 'Huge Power', 'Ice Scales', 'Illusion', 'Imposter', 'Innards Out', 'Magic Bounce',
			'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Orichalcum Pulse', 'Parental Bond', 'Poison Heal', 'Pure Power', 'Shadow Tag', 'Simple',
			'Speed Boost', 'Stakeout', 'Unburden', 'Water Bubble', 'Wonder Guard', 'King\'s Rock', 'Baton Pass', 'Revival Blessing', 'Shed Tail',
		],
	},
	{
		name: "[Gen 9] Mix and Mega",
		desc: `Mega evolve any Pok&eacute;mon with any mega stone, or transform them with Primal orbs, Origin orbs, and Rusted items with no limit. Mega and Primal boosts based on form changes from gen 7.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710921/">Mix and Mega</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3716385/">Mix and Mega Resources</a>`,
		],

		mod: 'mixandmega',
		ruleset: ['Standard OMs', 'Evasion Items Clause', 'Evasion Abilities Clause', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: ['Koraidon', 'Miraidon', 'Beedrillite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Moody', 'Rusted Sword', 'Shadow Tag', 'Baton Pass', 'Shed Tail'],
		restricted: ['Dragapult', 'Flutter Mane', 'Gengar', 'Iron Bundle', 'Kilowattrel', 'Sandy Shocks', 'Slaking'],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item.megaStone && !item.onPrimal &&
					!item.forcedForme?.endsWith('Origin') && !item.name.startsWith('Rusted')) continue;
				const natdex = this.ruleTable.has('standardnatdex');
				if (natdex && item.id !== 'ultranecroziumz') continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard && !this.ruleTable.has(`+pokemontag:${this.toID(species.isNonstandard)}`)) {
					return [`${species.baseSpecies} does not exist in gen 9.`];
				}
				if ((item.itemUser?.includes(species.name) && !item.megaStone && !item.onPrimal) ||
					(natdex && species.name.startsWith('Necrozma-') && item.id === 'ultranecroziumz')) {
					continue;
				}
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
					return [`${species.name} is not allowed to hold ${item.name}.`];
				}
				if (itemTable.has(item.id)) {
					return [
						`You are limited to one of each mega stone/orb/rusted item/sinnoh item.`,
						`(You have more than one ${item.name})`,
					];
				}
				itemTable.add(item.id);
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			const originalFormeSecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (originalFormeSecies.exists && pokemon.m.originalSpecies !== originalFormeSecies.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, originalFormeSecies.requiredItem || originalFormeSecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalSpecies);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-end', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 9] Godly Gift",
		desc: `Each Pok&eacute;mon receives one base stat from a God (AG/Uber Pok&eacute;mon) depending on its position in the team. If there is no Uber Pok&eacute;mon, it uses the Pok&eacute;mon in the first slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710734/">Godly Gift</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3718065/">Godly Gift Resources</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Godly Gift Mod', 'Min Source Gen = 9'],
		banlist: [
			'Blissey', 'Chansey', 'Great Tusk', 'Iron Hands', 'Iron Valiant', 'Kingambit', 'Walking Wake', 'Arena Trap',
			'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Swift Swim', 'Booster Energy', 'Baton Pass', 'Shed Tail',
		],
	},
	{
		name: "[Gen 9] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710577/">STABmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714664/">STABmons Resources</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'STABmons Move Legality', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: [
			'Chi-Yu', 'Chien-Pao', 'Cloyster', 'Dragapult', 'Dragonite', 'Flutter Mane', 'Garchomp', 'Iron Bundle', 'Komala', 'Koraidon',
			'Miraidon', 'Walking Wake', 'Zoroark-Hisui', 'Arena Trap', 'Moody', 'Shadow Tag', 'Booster Energy', 'King\'s Rock', 'Baton Pass',
		],
		restricted: [
			'Acupressure', 'Astral Barrage', 'Belly Drum', 'Dire Claw', 'Extreme Speed', 'Fillet Away', 'Last Respects', 'No Retreat',
			'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Shift Gear', 'V-create', 'Victory Dance', 'Wicked Blow',
		],
	},
	{
		name: "[Gen 9] NFE",
		desc: `Only Pok&eacute;mon that can evolve are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710638/">NFE</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712567/">NFE Resources</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Not Fully Evolved', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Bisharp', 'Chansey', 'Haunter', 'Magneton', 'Misdreavus', 'Naclstack', 'Primeape', 'Scyther', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
			// Shouldn't be legal
			'Stantler', 'Ursaring',
		],
	},
	{
		name: "[Gen 9] 2v2 Doubles",
		desc: `Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710849/">2v2 Doubles</a>`,
		],

		mod: 'gen9',
		gameType: 'doubles',
		ruleset: [
			'Picked Team Size = 2', 'Max Team Size = 4',
			'Standard Doubles', 'Accuracy Moves Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Evasion Items Clause',
		],
		banlist: ['Koraidon', 'Miraidon', 'Commander', 'Focus Sash', 'King\'s Rock', 'Ally Switch', 'Final Gambit', 'Moody', 'Perish Song', 'Swagger'],
	},
	{
		name: "[Gen 9] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710911/">AG Metagame Discussion</a>`,
		],

		mod: 'gen9',
		ruleset: ['Obtainable', 'Showdown'],
	},
	{
		name: "[Gen 9] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672423/">National Dex AG</a>`,
		],

		mod: 'gen9nationaldexag',
		ruleset: ['Standard NatDex'],
	},
	{
		name: "[Gen 9] Free-For-All",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711724/">Free-For-All</a>`,
		],

		mod: 'gen9',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard', '!Evasion Items Clause'],
		banlist: [
			'Annihilape', 'Flutter Mane', 'Houndstone', 'Koraidon', 'Iron Bundle', 'Miraidon', 'Palafin', 'Moody', 'Shadow Tag', 'Toxic Debris',
			'Acupressure', 'Aromatic Mist', 'Baton Pass', 'Court Change', 'Final Gambit', 'Flatter', 'Follow Me', 'Heal Pulse', 'Poison Fang',
			'Rage Powder', 'Spicy Extract', 'Swagger', 'Toxic', 'Toxic Spikes',
		],
	},
	{
		name: "[Gen 8] Bad'n'Boosted",
		desc: `Pok&eacute;mon with base stats of 70 or lower get those stats doubled.`,
		threads: [
			`None yet.`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'AG', 'Shadow Tag', 'Baton Pass',
			'Huge Power',
			'Eviolite',
		],
		onModifySpecies(species, target, source, effect) {
			if (!species.baseStats) return;
			const pokemon = this.dex.deepClone(species);
			pokemon.bst = 0;
			let statName: StatID;
			for (statName in pokemon.baseStats as StatsTable) {
				pokemon.baseStats[statName] = pokemon.baseStats[statName] <= 70 ?
					this.clampIntRange(pokemon.baseStats[statName] * 2, 1, 255) : pokemon.baseStats[statName];
				pokemon.bst += pokemon.baseStats[statName];
			}
			return pokemon;
		},
	},
	{
		name: "[Gen 8] Bonus Type",
		desc: `Pok&eacute;mon can be nicknamed the name of a type to have that type added onto their current ones.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3683173/">Bonus Type</a>`,
		],
		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', '!Nickname Clause'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Dragapult', 'Dragonite', 'Eternatus', 'Genesect',
			'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kartana', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia',
			'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Reshiram', 'Shedinja', 'Solgaleo', 'Spectrier', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned',
			'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		onModifySpeciesPriority: 1,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const typesSet = new Set(species.types);
			const bonusType = this.dex.types.get(target.set.name);
			if (bonusType.exists) typesSet.add(bonusType.name);
			return {...species, types: [...typesSet]};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Broken Record",
		desc: `Pok&eacute;mon can hold a TR to use that move in battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3701270/">Broken Record</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Broken Record Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Eternatus', 'Genesect', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Kartana', 'Kyogre', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Magearna', 'Marshadow',
			'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Regieleki', 'Reshiram', 'Solgaleo',
			'Spectrier', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Magnet Pull', 'Moody', 'Power Construct', 'Shadow Tag', 'TR29 (Baton Pass)', 'TR82 (Stored Power)', 'Baton Pass',
		],
	},
	{
		name: "[Gen 9] Camomons",
		desc: `Pok&eacute;mon have their types set to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711340/">Camomons</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Evasion Items Clause', 'Evasion Abilities Clause', 'Terastal Clause', 'Camomons Mod', 'Min Source Gen = 9'],
		banlist: [
			'Baxcalibur', 'Chien-Pao', 'Dragonite', 'Espathra', 'Flutter Mane', 'Iron Bundle', 'Koraidon', 'Miraidon', 'Palafin', 'Roaring Moon',
			'Arena Trap', 'Moody', 'Shadow Tag', 'Booster Energy', 'King\'s Rock', 'Baton Pass',
		],
	},
	{
		name: "[Gen 9] Category Swap",
		desc: `All physical moves become special, and all special moves become physical.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711668/">Category Swap</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Category Swap Mod', 'Min Source Gen = 9'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Draco Meteor', 'Overheat', 'Miraidon', 'Koraidon',
		],
	},
	{
		name: "[Gen 8] Chimera 1v1",
		desc: `Bring 6 Pok&eacute;mon and choose their order at Team Preview. The lead Pok&eacute;mon then receives the item, ability, stats, and moves of the other five Pok&eacute;mon, which play no further part in the battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661215/">Chimera 1v1</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Chimera 1v1 Rule', 'Standard OMs', 'Sleep Moves Clause'],
		banlist: ['Shedinja', 'Huge Power', 'Moody', 'Neutralizing Gas', 'Truant', 'Eviolite', 'Focus Sash', 'Perish Song', 'Transform', 'Trick', 'Fishious Rend', 'Bolt Beak', 'Disable', 'Double Iron Bash', 'Switcheroo'],
	},
	{
		name: "[Gen 9] Convergence",
		desc: `Allows all Pok&eacute;mon that have identical types to share moves and abilities.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714048/">Convergence</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Convergence Legality', '!Obtainable Abilities', 'Min Source Gen = 9'],
		banlist: [
			'Chi-Yu', 'Cyclizar', 'Dondozo', 'Flutter Mane', 'Iron Bundle', 'Koraidon', 'Miraidon', 'Palafin', 'Slaking', 'Arena Trap',
			'Comatose', 'Imposter', 'Moody', 'Pure Power', 'Shadow Tag', 'Speed Boost', 'Damp Rock', 'King\'s Rock', 'Baton Pass',
			'Extreme Speed', 'Last Respects', 'Rage Fist', 'Revival Blessing', 'Shell Smash', 'Spore', 'Transform',
		],
	},
	{
		name: "[Gen 9] Cross Evolution",
		desc: `Give a Pok&eacute;mon a Pok&eacute;mon name of the next evolution stage as a nickname to inherit stat changes, typing, abilities, and moves from the next stage Pok&eacute;mon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710953/">Cross Evolution</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Ability Clause = 2', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: ['Girafarig', 'Miraidon', 'Scyther', 'Sneasel', 'Ursaring', 'Arena Trap', 'Huge Power', 'Ice Scales', 'Pure Power', 'Shadow Tag', 'Speed Boost', 'Moody', 'King\'s Rock', 'Baton Pass', 'Revival Blessing'],
		restricted: ['Gallade', 'Gholdengo'],
		onValidateTeam(team) {
			const names = new Set<ID>();
			for (const set of team) {
				const name = set.name;
				if (names.has(this.dex.toID(name))) {
					return [
						`Your Pok\u00e9mon must have different nicknames.`,
						`(You have more than one Pok\u00e9mon named '${name}')`,
					];
				}
				names.add(this.dex.toID(name));
			}
			if (!names.size) {
				return [
					`${this.format.name} works using nicknames; your team has 0 nicknamed Pok\u00e9mon.`,
					`(If this was intentional, add a nickname to one Pok\u00e9mon that isn't the name of a Pok\u00e9mon species.)`,
				];
			}
		},
		checkCanLearn(move, species, lsetData, set) {
			// @ts-ignore
			if (!set.sp?.exists || !set.crossSpecies?.exists) {
				return this.checkCanLearn(move, species, lsetData, set);
			}
			// @ts-ignore
			const problem = this.checkCanLearn(move, set.sp);
			if (!problem) return null;
			// @ts-ignore
			if (this.checkCanLearn(move, set.crossSpecies)) return problem;
			return null;
		},
		validateSet(set, teamHas) {
			const crossSpecies = this.dex.species.get(set.name);
			let problems = this.dex.formats.get('Obtainable Misc').onChangeSet?.call(this, set, this.format) || null;
			if (Array.isArray(problems) && problems.length) return problems;
			const crossNonstandard = (!this.ruleTable.has('standardnatdex') && crossSpecies.isNonstandard === 'Past') ||
				crossSpecies.isNonstandard === 'Future';
			const crossIsCap = !this.ruleTable.has('+pokemontag:cap') && crossSpecies.isNonstandard === 'CAP';
			if (!crossSpecies.exists || crossNonstandard || crossIsCap) return this.validateSet(set, teamHas);
			const species = this.dex.species.get(set.species);
			const check = this.checkSpecies(set, species, species, {});
			if (check) return [check];
			const nonstandard = !this.ruleTable.has('standardnatdex') && species.isNonstandard === 'Past';
			const isCap = !this.ruleTable.has('+pokemontag:cap') && species.isNonstandard === 'CAP';
			if (!species.exists || nonstandard || isCap || species === crossSpecies) return this.validateSet(set, teamHas);
			if (!species.nfe) return [`${species.name} cannot cross evolve because it doesn't evolve.`];
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable" &&
				!this.ruleTable.has('+unobtainable'));
			if (crossSpecies.battleOnly || crossIsUnreleased || !crossSpecies.prevo) {
				return [`${species.name} cannot cross evolve into ${crossSpecies.name} because it isn't an evolution.`];
			}
			if (this.ruleTable.isRestrictedSpecies(crossSpecies)) {
				return [`${species.name} cannot cross evolve into ${crossSpecies.name} because it is banned.`];
			}
			const crossPrevoSpecies = this.dex.species.get(crossSpecies.prevo);
			if (!crossPrevoSpecies.prevo !== !species.prevo) {
				return [
					`${species.name} cannot cross evolve into ${crossSpecies.name} because they are not consecutive evolution stages.`,
				];
			}
			const item = this.dex.items.get(set.item);
			if (item.itemUser?.length) {
				if (!item.itemUser.includes(crossSpecies.name) || crossSpecies.name !== species.name) {
					return [`${species.name} cannot use ${item.name} because it is cross evolved into ${crossSpecies.name}.`];
				}
			}
			const ability = this.dex.abilities.get(set.ability);
			if (!this.ruleTable.isRestricted(`ability:${ability.id}`) || Object.values(species.abilities).includes(ability.name)) {
				set.species = crossSpecies.name;
			}

			// @ts-ignore
			set.sp = species;
			// @ts-ignore
			set.crossSpecies = crossSpecies;
			problems = this.validateSet(set, teamHas);
			set.name = crossSpecies.name;
			set.species = species.name;
			return problems;
		},
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // chat
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (target.set.name === target.set.species) return;
			const crossSpecies = this.dex.species.get(target.set.name);
			if (!crossSpecies.exists) return;
			if (species.battleOnly || !species.nfe) return;
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable" &&
				!this.ruleTable.has('+unobtainable'));
			if (crossSpecies.battleOnly || crossIsUnreleased || !crossSpecies.prevo) return;
			const crossPrevoSpecies = this.dex.species.get(crossSpecies.prevo);
			if (!crossPrevoSpecies.prevo !== !species.prevo) return;

			const mixedSpecies = this.dex.deepClone(species);
			mixedSpecies.weightkg =
				Math.max(0.1, +(species.weightkg + crossSpecies.weightkg - crossPrevoSpecies.weightkg)).toFixed(1);
			mixedSpecies.nfe = false;
			mixedSpecies.evos = [];
			mixedSpecies.eggGroups = crossSpecies.eggGroups;
			mixedSpecies.abilities = crossSpecies.abilities;
			mixedSpecies.bst = 0;
			let i: StatID;
			for (i in species.baseStats) {
				const statChange = crossSpecies.baseStats[i] - crossPrevoSpecies.baseStats[i];
				mixedSpecies.baseStats[i] = this.clampIntRange(species.baseStats[i] + statChange, 1, 255);
				mixedSpecies.bst += mixedSpecies.baseStats[i];
			}
			if (crossSpecies.types[0] !== crossPrevoSpecies.types[0]) mixedSpecies.types[0] = crossSpecies.types[0];
			if (crossSpecies.types[1] !== crossPrevoSpecies.types[1]) {
				mixedSpecies.types[1] = crossSpecies.types[1] || crossSpecies.types[0];
			}
			if (mixedSpecies.types[0] === mixedSpecies.types[1]) mixedSpecies.types = [mixedSpecies.types[0]];

			return mixedSpecies;
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.baseSpecies = pokemon.species;
			}
		},
	},
	{
		name: "[Gen 8] Flipped",
		desc: `All Pok&eacute;mon have their base stats flipped. (HP/Atk/Def/SpA/SpD/Spe --> Spe/SpD/SpA/Def/Atk/HP)`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3662020/">Flipped</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Flipped Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Dialga', 'Eternatus', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow',
			'Melmetal', 'Mewtwo', 'Necrozma-Dawn Wings', 'Necrozma-Dusk Mane', 'Palkia', 'Rayquaza',
			'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta',
			'Zamazenta-Crowned', 'Zekrom', 'Zygarde', 'Zygarde-Complete',
			'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak',
			'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Baton Pass',
			'Azumarill', 'Blissey', 'Steelix', 'Psychic Surge', 'Psychic Terrain', 'Shell Smash',
		],
	},
	{
		name: "[Gen 9] Fortemons",
		desc: `Put an attacking move in the item slot to have all of a Pok&eacute;mon's attacks inherit its properties.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3713983/">Fortemons</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Azumarill', 'Chi-Yu', 'Chien-Pao', 'Cloyster', 'Dragonite', 'Espathra', 'Flutter Mane', 'Great Tusk',
			'Houndstone', 'Iron Bundle', 'Koraidon', 'Miraidon', 'Palafin', 'Arena Trap', 'Moody', 'Serene Grace', 'Shadow Tag',
			'Covert Cloak', 'Beat Up', 'Baton Pass',
		],
		restricted: ['Dynamic Punch', 'Flail', 'Fury Cutter', 'Grass Knot', 'Heavy Slam', 'Inferno', 'Low Kick', 'Nuzzle', 'Power Trip', 'Reversal', 'Spit Up', 'Stored Power', 'Zap Cannon'],
		validateSet(set, teamHas) {
			const item = set.item;
			const species = this.dex.species.get(set.species);
			const move = this.dex.moves.get(item);
			if (!move.exists || move.id === 'metronome' || move.category === 'Status') {
				return this.validateSet(set, teamHas);
			}
			set.item = '';
			const problems = this.validateSet(set, teamHas) || [];
			set.item = item;
			if (this.checkCanLearn(move, species, this.allSources(species), set)) {
				problems.push(`${species.name} can't learn ${move.name}.`);
			}
			if (set.moves.map(this.toID).includes(move.id)) {
				problems.push(`Moves in the item slot can't be in the moveslots as well.`);
			}
			const accuracyLoweringMove =
				move.secondaries?.some(secondary => secondary.boosts?.accuracy && secondary.boosts?.accuracy < 0);
			const flinchMove = move.secondaries?.some(secondary => secondary.volatileStatus === 'flinch');
			const freezeMove = move.secondaries?.some(secondary => secondary.status === 'frz') || move.id === 'triattack';
			if (this.ruleTable.isRestricted(`move:${move.id}`) ||
				((accuracyLoweringMove || move.ohko || move.multihit || move.id === 'beatup' || move.flags['charge'] ||
					move.priority > 0 || move.damageCallback || flinchMove || freezeMove || move.selfSwitch) &&
				!this.ruleTable.has(`+move:${move.id}`))) {
				problems.push(`The move ${move.name} can't be used as an item.`);
			}
			return problems.length ? problems : null;
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				const move = this.dex.getActiveMove(pokemon.set.item);
				if (move.exists && move.category !== 'Status') {
					pokemon.m.forte = move;
					pokemon.item = 'mail' as ID;
				}
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			const forte: ActiveMove = pokemon.m.forte;
			if (move.category !== 'Status' && forte) {
				move.flags = {...move.flags, ...forte.flags};
				if (forte.self) {
					if (forte.self.onHit && move.self?.onHit) {
						for (const i in forte.self) {
							if (i.startsWith('onHit')) continue;
							(move.self as any)[i] = (forte.self as any)[i];
						}
					} else {
						move.self = {...(move.self || {}), ...forte.self};
					}
				}
				if (forte.selfBoost?.boosts) {
					if (!move.selfBoost?.boosts) move.selfBoost = {boosts: {}};
					let boostid: BoostID;
					for (boostid in forte.selfBoost.boosts) {
						if (!move.selfBoost.boosts![boostid]) move.selfBoost.boosts![boostid] = 0;
						move.selfBoost.boosts![boostid]! += forte.selfBoost.boosts[boostid]!;
					}
				}
				if (forte.secondaries) {
					move.secondaries = [...(move.secondaries || []), ...forte.secondaries];
				}
				move.critRatio = (move.critRatio || 1) + (forte.critRatio || 1) - 1;
				const VALID_PROPERTIES = [
					'alwaysHit', 'basePowerCallback', 'breaksProtect', 'drain', 'forceSTAB', 'forceSwitch', 'hasCrashDamage', 'hasSheerForce',
					'ignoreAbility', 'ignoreAccuracy', 'ignoreDefensive', 'ignoreEvasion', 'ignoreImmunity', 'mindBlownRecoil', 'noDamageVariance',
					'ohko', 'overrideDefensivePokemon', 'overrideDefensiveStat', 'overrideOffensivePokemon', 'overrideOffensiveStat', 'pseudoWeather',
					'recoil', 'selfdestruct', 'selfSwitch', 'sleepUsable', 'smartTarget', 'stealsBoosts', 'thawsTarget', 'volatileStatus', 'willCrit',
				] as const;
				for (const property of VALID_PROPERTIES) {
					if (forte[property]) {
						move[property] = forte[property] as any;
					}
				}
				// Added here because onEffectiveness doesn't have an easy way to reference the source
				if (forte.onEffectiveness) {
					move.onEffectiveness = function (typeMod, t, type, m) {
						return forte.onEffectiveness!.call(this, typeMod, t, type, m);
					};
				}
				forte.onModifyMove?.call(this, move, pokemon, target);
			}
		},
		onModifyPriority(priority, source, target, move) {
			const forte = source?.m.forte;
			if (move.category !== 'Status' && forte) {
				if (source.hasAbility('Triage') && forte.flags['heal']) {
					return priority + (move.flags['heal'] ? 0 : 3);
				}
				return priority + forte.priority;
			}
		},
		onModifyTypePriority: 1,
		onModifyType(move, pokemon, target) {
			const forte = pokemon.m.forte;
			if (move.category !== 'Status' && forte) {
				this.singleEvent('ModifyType', forte, null, pokemon, target, move, move);
			}
		},
		onHitPriority: 1,
		onHit(target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('Hit', forte, {}, target, source, move);
				if (forte.self) this.singleEvent('Hit', forte.self, {}, source, source, move);
				this.singleEvent('AfterHit', forte, {}, target, source, move);
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterSubDamage', forte, null, target, source, move);
			}
		},
		onModifySecondaries(secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		onAfterMoveSecondaryPriority: 1,
		onAfterMoveSecondarySelf(source, target, move) {
			const forte = source.m.forte;
			if (move?.category !== 'Status' && forte) {
				this.singleEvent('AfterMoveSecondarySelf', forte, null, source, target, move);
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, source, target, move) {
			const forte = source.m.forte;
			if (move.category !== 'Status' && forte?.onBasePower) {
				forte.onBasePower.call(this, basePower, source, target, move);
			}
		},
		pokemon: {
			getItem() {
				const move = this.battle.dex.moves.get(this.m.forte);
				if (!move.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {
					...this.battle.dex.items.get('mail'),
					name: move.name, id: move.id, ignoreKlutz: true, onTakeItem: false,
				};
			},
		},
	},
	{
		name: "[Gen 9] Full Potential",
		desc: `Pok&eacute;mon's moves hit off of their highest stat.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711127/">Full Potential</a>`,
		],

		mod: 'fullpotential',
		ruleset: ['Standard OMs', 'Evasion Abilities Clause', 'Evasion Items Clause', 'Sleep Moves Clause', 'Terastal Clause', 'Min Source Gen = 9'],
		banlist: [
			'Chien-Pao', 'Cyclizar', 'Dragapult', 'Espathra', 'Flutter Mane', 'Iron Bundle', 'Koraidon', 'Miraidon', 'Scream Tail', 'Arena Trap',
			'Chlorophyll', 'Drought', 'Moody', 'Sand Rush', 'Shadow Tag', 'Slush Rush', 'Swift Swim', 'Unburden', 'Booster Energy', 'Choice Scarf',
			'Heat Rock', 'King\'s Rock', 'Baton Pass', 'Tailwind',
		],
	},
	{
		name: "[Gen 9] Inheritance",
		desc: `Pok&eacute;mon may use the ability and moves of another, as long as they forfeit their own learnset.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712296/">Inheritance</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Ability Clause = 2', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: ['Koraidon', 'Miraidon', 'Slaking', 'Arena Trap', 'Huge Power', 'Imposter', 'Pure Power', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Shell Smash'],
		getEvoFamily(speciesid) {
			let species = Dex.species.get(speciesid);
			while (species.prevo) {
				species = Dex.species.get(species.prevo);
			}
			return species.id;
		},
		validateSet(set, teamHas) {
			const unreleased = (pokemon: Species) => pokemon.tier === "Unreleased" && pokemon.isNonstandard === "Unobtainable";
			if (!teamHas.abilityMap) {
				teamHas.abilityMap = Object.create(null);
				for (const pokemon of Dex.species.all()) {
					if (pokemon.isNonstandard || (unreleased(pokemon) && !this.ruleTable.has('+unobtainable'))) continue;
					if (pokemon.requiredAbility || pokemon.requiredItem || pokemon.requiredMove) continue;
					if (this.ruleTable.isBannedSpecies(pokemon)) continue;

					for (const key of Object.values(pokemon.abilities)) {
						const abilityId = this.dex.toID(key);
						if (abilityId in teamHas.abilityMap) {
							teamHas.abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](pokemon.id);
						} else {
							teamHas.abilityMap[abilityId] = [pokemon.id];
						}
					}
				}
			}

			const problem = this.validateForme(set);
			if (problem.length) return problem;

			const species = this.dex.species.get(set.species);
			if (!species.exists || species.num < 1) return [`The Pok\u00e9mon "${set.species}" does not exist.`];
			if (species.isNonstandard || (unreleased(species) && !this.ruleTable.has('+unobtainable'))) {
				return [`${species.name} is not obtainable in Generation ${this.dex.gen}.`];
			}

			const name = set.name;
			if (this.ruleTable.isBannedSpecies(species)) {
				return this.validateSet(set, teamHas);
			}

			const ability = this.dex.abilities.get(set.ability);
			if (!ability.exists || ability.isNonstandard) return [`${name} needs to have a valid ability.`];
			const pokemonWithAbility = teamHas.abilityMap[ability.id];
			if (!pokemonWithAbility) return [`${ability.name} is not available on a legal Pok\u00e9mon.`];

			(this.format as any).debug = true;

			if (!teamHas.abilitySources) teamHas.abilitySources = Object.create(null);
			const validSources: string[] = teamHas.abilitySources[this.dex.toID(set.species)] = []; // Evolution families

			let canonicalSource = ''; // Specific for the basic implementation of Donor Clause (see onValidateTeam).

			for (const donor of pokemonWithAbility) {
				const donorSpecies = this.dex.species.get(donor);
				let format = this.format;
				if (!format.getEvoFamily) format = this.dex.formats.get('gen9inheritance');
				const evoFamily = format.getEvoFamily!(donorSpecies.id);
				if (validSources.includes(evoFamily)) continue;

				set.species = donorSpecies.name;
				set.name = donorSpecies.baseSpecies;
				const problems = this.validateSet(set, teamHas) || [];
				if (!problems.length) {
					validSources.push(evoFamily);
					canonicalSource = donorSpecies.name;
				}
				// Specific for the basic implementation of Donor Clause (see onValidateTeam).
				if (validSources.length > 1) break;
			}
			(this.format as any).debug = false;

			set.name = name;
			set.species = species.name;
			if (!validSources.length) {
				if (pokemonWithAbility.length > 1) return [`${name}'s set is illegal.`];
				return [`${name} has an illegal set with an ability from ${this.dex.species.get(pokemonWithAbility[0]).name}.`];
			}

			// Protocol: Include the data of the donor species in the `ability` data slot.
			// Afterwards, we are going to reset the name to what the user intended.
			set.ability = `${set.ability}0${canonicalSource}`;
			return null;
		},
		onValidateTeam(team, f, teamHas) {
			if (this.ruleTable.has('abilityclause')) {
				const abilityTable = new Map<string, number>();
				const base: {[k: string]: string} = {
					airlock: 'cloudnine',
					armortail: 'queenlymajesty',
					battlearmor: 'shellarmor',
					clearbody: 'whitesmoke',
					dazzling: 'queenlymajesty',
					emergencyexit: 'wimpout',
					filter: 'solidrock',
					gooey: 'tanglinghair',
					insomnia: 'vitalspirit',
					ironbarbs: 'roughskin',
					libero: 'protean',
					minus: 'plus',
					moxie: 'chillingneigh',
					powerofalchemy: 'receiver',
					propellertail: 'stalwart',
					teravolt: 'moldbreaker',
					turboblaze: 'moldbreaker',
				};
				const num = parseInt(this.ruleTable.valueRules.get('abilityclause')!);
				for (const set of team) {
					let ability = this.toID(set.ability.split('0')[0]);
					if (!ability) continue;
					if (ability in base) ability = base[ability] as ID;
					if ((abilityTable.get(ability) || 0) >= num) {
						return [
							`You are limited to ${num} of each ability by ${num} Ability Clause.`,
							`(You have more than ${num} ${this.dex.abilities.get(ability).name} variants)`,
						];
					}
					abilityTable.set(ability, (abilityTable.get(ability) || 0) + 1);
				}
			}

			// Donor Clause
			const evoFamilyLists = [];
			for (const set of team) {
				const abilitySources = teamHas.abilitySources?.[this.dex.toID(set.species)];
				if (!abilitySources) continue;
				let format = this.format;
				if (!format.getEvoFamily) format = this.dex.formats.get('gen9inheritance');
				evoFamilyLists.push(abilitySources.map(format.getEvoFamily!));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			const requiredFamilies = Object.create(null);
			for (const evoFamilies of evoFamilyLists) {
				if (evoFamilies.length !== 1) continue;
				const [familyId] = evoFamilies;
				if (!(familyId in requiredFamilies)) {
					requiredFamilies[familyId] = 1;
				} else {
					requiredFamilies[familyId]++;
				}
				if (requiredFamilies[familyId] > 1) {
					return [
						`You are limited to up to one inheritance from each evolution family by the Donor Clause.`,
						`(You inherit more than once from ${this.dex.species.get(familyId).name}).`,
					];
				}
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.baseAbility.includes('0')) {
					const donor = pokemon.baseAbility.split('0')[1];
					pokemon.m.donor = this.toID(donor);
					pokemon.baseAbility = this.toID(pokemon.baseAbility.split('0')[0]);
					pokemon.ability = pokemon.baseAbility;
				}
			}
		},
		onSwitchIn(pokemon) {
			if (!pokemon.m.donor) return;
			const donorTemplate = this.dex.species.get(pokemon.m.donor);
			if (!donorTemplate.exists) return;
			// Place volatiles on the Pokémon to show the donor details.
			this.add('-start', pokemon, donorTemplate.name, '[silent]');
		},
	},
	{
		name: "[Gen 8] Linked",
		desc: `The first two moves in a Pok&eacute;mon's moveset are used simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660421/">Linked</a>`,
		],

		mod: 'gen8linked',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Cloyster', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Eternatus', 'Genesect', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kartana', 'Kyogre', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala',
			'Magearna', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Solgaleo', 'Spectrier', 'Urshifu-Base', 'Volcarona', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Zekrom', 'Zygarde-Base', 'Zygarde-Complete', 'Arena Trap', 'Chlorophyll', 'Moody', 'Power Construct', 'Sand Rush', 'Sand Veil', 'Shadow Tag',
			'Slush Rush', 'Snow Cloak', 'Speed Boost', 'Surge Surfer', 'Swift Swim', 'Unburden', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Baton Pass',
		],
		restricted: [
			'Baneful Bunker', 'Bounce', 'Protect', 'Detect', 'Dig', 'Dive', 'Fly', 'King\'s Shield', 'Nature\'s Madness', 'Night Shade',
			'Obstruct', 'Phantom Force', 'Seismic Toss', 'Shadow Force', 'Sky Drop', 'Spiky Shield', 'Super Fang', 'Trick Room',
		],
		onValidateSet(set) {
			const problems = [];
			for (const [i, moveid] of set.moves.entries()) {
				const move = this.dex.moves.get(moveid);
				if ([0, 1].includes(i) && this.ruleTable.isRestricted(`move:${move.id}`)) {
					problems.push(`${set.name || set.species}'s move ${move.name} cannot be linked.`);
				}
			}
			return problems;
		},
	},
	{
		name: "[Gen 9] Mirror Move",
		desc: `Two of your moves are chosen in the teambuilder, and the other two moves are copied from the opponent's moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572990/">Gen 6 Mirror Move</a>`,
		],

		mod: 'mirrormove',
		debug: true,
		ruleset: ['Standard OMs', '!Evasion Moves Clause', 'Evasion Clause', 'Min Source Gen = 9'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass',
			'Imprison',
		],
		onValidateSet(set) {
			if (set.moves.length > 2) {
				return [`${set.species} has more than 2 moves`];
			}
		},
	},
	{
		name: "[Gen 8] Multibility",
		desc: `Run a second ability at the cost of giving up a Pok&eacute;mon's item slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3688892/">Multibility</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Ability Clause = 2', 'Sleep Moves Clause'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Dragonite', 'Eternatus',
			'Genesect', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kartana', 'Kyogre', 'Kyurem-Black', 'Kyurem-White',
			'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shedinja', 'Solgaleo', 'Spectrier', 'Urshifu-Base', 'Xerneas',
			'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base', 'Arena Trap',
			'Chlorophyll', 'Magnet Pull', 'Moody', 'Power Construct', 'Sand Rush', 'Shadow Tag', 'Slush Rush', 'Swift Swim',
			'Stench', 'Trace', 'King\'s Rock', 'Baton Pass',
		],
		restricted: [
			'Comatose', 'Contrary', 'Fluffy', 'Fur Coat', 'Huge Power', 'Ice Scales', 'Illusion', 'Imposter', 'Innards Out',
			'Intrepid Sword', 'Libero', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Simple', 'Speed Boost',
			'Stakeout', 'Tinted Lens', 'Unaware', 'Water Bubble', 'Wonder Guard',
			'Emergency Exit + Regenerator', 'Wimp Out + Regenerator',
		],
		validateSet(set, teamHas) {
			const ability = this.dex.abilities.get(set.ability);
			const item = this.dex.abilities.get(set.item);
			if (!item.exists) return this.validateSet(set, teamHas);
			const problems = [];
			if (item.isNonstandard && !this.ruleTable.has(`+ability:${item.id}`)) {
				problems.push(`${item.name} is banned.`);
			}
			if (ability.id === item.id) {
				problems.push(`${set.species} has ${ability.name} as an ability and as an item.`);
			}
			if (this.ruleTable.isRestricted(`ability:${item.id}`) || this.ruleTable.isBanned(`ability:${item.id}`)) {
				problems.push(`${set.species}'s second ability (${item.name}) can only be used as an ability.`);
			}
			if ((ability.id === 'regenerator' && ['emergencyexit', 'wimpout'].includes(item.id)) ||
				(item.id === 'regenerator' && ['emergencyexit', 'wimpout'].includes(ability.id))) {
				problems.push(`${ability.name} and ${item.name} are banned together.`);
			}
			const itemStr = set.item;
			set.item = '';
			const problem = this.validateSet(set, teamHas);
			if (problem?.length) problems.push(...problem);
			set.item = itemStr;
			return problems;
		},
		onValidateTeam(team) {
			if (!this.ruleTable.has('abilityclause')) return;
			const abilityTable = new Map<string, number>();
			const base: {[k: string]: string} = {
				airlock: 'cloudnine',
				battlearmor: 'shellarmor',
				clearbody: 'whitesmoke',
				dazzling: 'queenlymajesty',
				emergencyexit: 'wimpout',
				filter: 'solidrock',
				gooey: 'tanglinghair',
				insomnia: 'vitalspirit',
				ironbarbs: 'roughskin',
				libero: 'protean',
				minus: 'plus',
				moxie: 'chillingneigh',
				powerofalchemy: 'receiver',
				propellertail: 'stalwart',
				teravolt: 'moldbreaker',
				turboblaze: 'moldbreaker',
			};
			const num = parseInt(this.ruleTable.valueRules.get('abilityclause')!);
			const abilities: [string, string][] = [];
			for (const set of team) {
				abilities.push([set.ability, set.item].map((abil) => {
					const id = this.toID(abil);
					return base[id] || id;
				}) as [string, string]);
			}
			for (const [abilityid, itemid] of abilities) {
				const ability = this.dex.abilities.get(abilityid);
				const item = this.dex.abilities.get(itemid);
				if (ability.exists) abilityTable.set(ability.id, (abilityTable.get(ability.id) || 0) + 1);
				if (item.exists) abilityTable.set(item.id, (abilityTable.get(item.id) || 0) + 1);
			}
			for (const [abilityid, size] of abilityTable) {
				if (size > num) {
					return [
						`You are limited to ${num} of each ability by ${num} Ability Clause.`,
						`(You have more than ${num} ${this.dex.abilities.get(abilityid).name} variants)`,
					];
				}
			}
		},
		onSwitchOut(pokemon) {
			const item = this.dex.abilities.get(pokemon.item);
			if (item.exists) {
				this.singleEvent('End', item, pokemon.itemState, pokemon);
			}
		},
		onFaint(pokemon) {
			const item = this.dex.abilities.get(pokemon.item);
			if (item.exists) {
				this.singleEvent('End', item, pokemon.itemState, pokemon);
			}
		},
		field: {
			suppressingWeather() {
				for (const pokemon of this.battle.getAllActive()) {
					const item = this.battle.dex.abilities.get(pokemon.item);
					if (pokemon && !pokemon.ignoringAbility() &&
						(pokemon.getAbility().suppressWeather || (item.exists && item.suppressWeather))) {
						return true;
					}
				}
				return false;
			},
		},
		pokemon: {
			getItem() {
				const ability = this.battle.dex.abilities.get(this.item);
				if (!ability.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {...ability, ignoreKlutz: true, onTakeItem: false};
			},
			hasItem(item) {
				const ownItem = this.item;
				if (this.battle.dex.abilities.get(ownItem).exists) return false;
				if (this.ignoringItem()) return false;
				if (!Array.isArray(item)) return ownItem === this.battle.toID(item);
				return item.map(this.battle.toID).includes(ownItem);
			},
			hasAbility(ability) {
				if (this.ignoringAbility()) return false;
				if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
				const abilityid = this.battle.toID(ability);
				const item = this.battle.dex.abilities.get(this.item);
				return this.ability === abilityid || (item.exists && item.id === abilityid);
			},
			ignoringAbility() {
				// Check if any active pokemon have the ability Neutralizing Gas
				let neutralizinggas = false;
				for (const pokemon of this.battle.getAllActive()) {
					// can't use hasAbility because it would lead to infinite recursion
					if ((pokemon.ability === ('neutralizinggas' as ID) || pokemon.item === ('neutralizinggas' as ID)) &&
						!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending) {
						neutralizinggas = true;
						break;
					}
				}
				return !!(
					(this.battle.gen >= 5 && !this.isActive) ||
					((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID) &&
						this.item !== ('neutralizinggas' as ID))) && !this.getAbility().isPermanent));
			},
			ignoringItem() {
				let nGas = false;
				for (const pokemon of this.battle.getAllActive()) {
					// can't use hasAbility because it would lead to infinite recursion
					if (((pokemon.ability === ('neutralizinggas' as ID) && !pokemon.abilityState.ending) ||
						(pokemon.item === ('neutralizinggas' as ID) && !pokemon.itemState.ending)) &&
						!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending) {
						nGas = true;
						break;
					}
				}
				const item = this.battle.dex.abilities.get(this.item);
				return !!((this.battle.gen >= 5 && !this.isActive) ||
					(this.hasAbility('klutz') && !this.getItem().ignoreKlutz) ||
					this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom'] ||
					(item.exists && item.id !== 'neutralizinggas' && (nGas || this.volatiles['gastroacid'])));
			},
			takeItem(source) {
				if (!this.isActive) return false;
				if (!this.item) return false;
				if (this.battle.dex.abilities.get(this.item).exists) return false;
				if (!source) source = this;
				if (this.battle.gen === 4) {
					if (this.battle.toID(this.ability) === 'multitype') return false;
					if (source && this.battle.toID(source.ability) === 'multitype') return false;
				}
				const item = this.getItem();
				if (this.battle.runEvent('TakeItem', this, source, null, item)) {
					this.item = '';
					this.itemState = {id: '', target: this};
					this.pendingStaleness = undefined;
					return item;
				}
				return false;
			},
		},
	},
	{
		name: "[Gen 8] Nature Swap",
		desc: `Pok&eacute;mon have their base stats swapped depending on their nature.`,
		threads: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3673622/">Nature Swap</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Blissey', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chansey', 'Cloyster', 'Dialga', 'Eternatus', 'Genesect', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala',
			'Marshadow', 'Melmetal', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram',
			'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		battle: {
			spreadModify(baseStats, set) {
				const modStats: SparseStatsTable = {atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
				const tr = this.trunc;
				const nature = this.dex.natures.get(set.nature);
				let statName: keyof StatsTable;
				for (statName in modStats) {
					const stat = baseStats[statName];
					let usedStat = statName;
					if (nature.plus) {
						if (statName === nature.minus) {
							usedStat = nature.plus;
						} else if (statName === nature.plus) {
							usedStat = nature.minus!;
						}
					}
					modStats[statName] = tr(tr(2 * stat + set.ivs[usedStat] + tr(set.evs[usedStat] / 4)) * set.level / 100 + 5);
				}
				if ('hp' in baseStats) {
					const stat = baseStats['hp'];
					modStats['hp'] = tr(tr(2 * stat + set.ivs['hp'] + tr(set.evs['hp'] / 4) + 100) * set.level / 100 + 10);
				}
				return this.natureModify(modStats as StatsTable, set);
			},
			natureModify(stats, set) {
				const tr = this.trunc;
				const nature = this.dex.natures.get(set.nature);
				let s: StatIDExceptHP;
				if (nature.plus) {
					s = nature.minus!;
					const stat = this.ruleTable.has('overflowstatmod') ? Math.min(stats[s], 595) : stats[s];
					stats[s] = this.ruleTable.has('overflowstatmod') ? Math.min(stats[nature.plus], 728) : stats[nature.plus];
					stats[nature.plus] = tr(tr(stat * 110, 16) / 100);
				}
				return stats;
			},
		},
	},
	{
		name: "[Gen 9] Partners in Crime",
		desc: `Doubles-based metagame where both active ally Pok&eacute;mon share abilities and moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710997/">Partners in Crime</a>`,
		],

		mod: 'partnersincrime',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Dynamax Clause'],
		banlist: ['Flutter Mane', 'Koraidon', 'Miraidon', 'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Ally Switch', 'Baton Pass', 'Revival Blessing', 'Swagger'],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.trackPP = new Map<string, number>();
			}
		},
		onBeforeSwitchIn(pokemon) {
			pokemon.m.curMoves = this.dex.deepClone(pokemon.moves);
			let ngas = false;
			for (const poke of this.getAllActive()) {
				if (this.toID(poke.ability) === ('neutralizinggas' as ID)) {
					ngas = true;
					break;
				}
			}
			const BAD_ABILITIES = ['trace', 'imposter', 'neutralizinggas', 'illusion', 'wanderingspirit'];
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.ability !== pokemon.ability) {
				if (!pokemon.m.innate && !BAD_ABILITIES.includes(this.toID(ally.ability))) {
					pokemon.m.innate = 'ability:' + ally.ability;
					if (!ngas || ally.getAbility().isPermanent || pokemon.hasItem('Ability Shield')) {
						pokemon.volatiles[pokemon.m.innate] = {id: pokemon.m.innate, target: pokemon};
						pokemon.m.startVolatile = true;
					}
				}
				if (!ally.m.innate && !BAD_ABILITIES.includes(this.toID(pokemon.ability))) {
					ally.m.innate = 'ability:' + pokemon.ability;
					if (!ngas || pokemon.getAbility().isPermanent || ally.hasItem('Ability Shield')) {
						ally.volatiles[ally.m.innate] = {id: ally.m.innate, target: ally};
						ally.m.startVolatile = true;
					}
				}
			}
		},
		// Starting innate abilities in scripts#actions
		onSwitchOut(pokemon) {
			if (pokemon.m.innate) {
				pokemon.removeVolatile(pokemon.m.innate);
				delete pokemon.m.innate;
			}
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.m.innate) {
				ally.removeVolatile(ally.m.innate);
				delete ally.m.innate;
			}
		},
		onFaint(pokemon) {
			if (pokemon.m.innate) {
				pokemon.removeVolatile(pokemon.m.innate);
				delete pokemon.m.innate;
			}
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.m.innate) {
				ally.removeVolatile(ally.m.innate);
				delete ally.m.innate;
			}
		},
	},
	{
		name: "[Gen 9] Pokebilities",
		desc: `Pok&eacute;mon have all of their released abilities simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712725/">Pok&eacute;bilities</a>`,
		],
		mod: 'pokebilities',
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Min Source Gen = 9'],
		banlist: ['Chi-Yu', 'Espathra', 'Flutter Mane', 'Houndstone', 'Iron Bundle', 'Koraidon', 'Miraidon', 'Palafin', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass'],
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const unSeenAbilities = Object.keys(species.abilities)
				.filter(key => key !== 'S' && (key !== 'H' || !species.unreleasedHidden))
				.map(key => species.abilities[key as "0" | "1" | "H" | "S"])
				.filter(ability => ability !== set.ability);
			if (unSeenAbilities.length && this.toID(set.ability) !== this.toID(species.abilities['S'])) {
				for (const abilityName of unSeenAbilities) {
					const banReason = this.ruleTable.check('ability:' + this.toID(abilityName));
					if (banReason) {
						return [`${set.name}'s ability ${abilityName} is ${banReason}.`];
					}
				}
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.ability === this.toID(pokemon.species.abilities['S'])) {
					continue;
				}
				pokemon.m.innates = Object.keys(pokemon.species.abilities)
					.filter(key => key !== 'S' && (key !== 'H' || !pokemon.species.unreleasedHidden))
					.map(key => this.toID(pokemon.species.abilities[key as "0" | "1" | "H" | "S"]))
					.filter(ability => ability !== pokemon.ability);
			}
		},
		onBeforeSwitchIn(pokemon) {
			// Abilities that must be applied before both sides trigger onSwitchIn to correctly
			// handle switch-in ability-to-ability interactions, e.g. Intimidate counters
			const neededBeforeSwitchInIDs = [
				'clearbody', 'competitive', 'contrary', 'defiant', 'fullmetalbody', 'hypercutter', 'innerfocus',
				'mirrorarmor', 'oblivious', 'owntempo', 'rattled', 'scrappy', 'simple', 'whitesmoke',
			];
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (!neededBeforeSwitchInIDs.includes(innate)) continue;
					if (pokemon.hasAbility(innate)) continue;
					pokemon.addVolatile("ability:" + innate, pokemon);
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (pokemon.hasAbility(innate)) continue;
					pokemon.addVolatile("ability:" + innate, pokemon);
				}
			}
		},
		onSwitchOut(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
		},
		onFaint(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				const innateEffect = this.dex.conditions.get(innate) as Effect;
				this.singleEvent('End', innateEffect, null, pokemon);
			}
		},
		onAfterMega(pokemon) {
			for (const innate of Object.keys(pokemon.volatiles).filter(i => i.startsWith('ability:'))) {
				pokemon.removeVolatile(innate);
			}
			pokemon.m.innates = undefined;
		},
	},
	{
		name: "[Gen 9] Pure Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712086/">Pure Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['-Nonexistent', 'Showdown'],
	},
	{
		name: "[Gen 9] National Dex Pure Hackmons",
		desc: `For Debug Use.`,

		mod: 'gen9',
		debug: true,
		ruleset: ['-Nonexistent', '+Unobtainable', '+Past', 'Showdown'],
	},
	{
		name: "[Gen 8] Re-Evolution",
		desc: `Pok&eacute;mon gain the stat changes they would gain from evolving again.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3703643/">Re-Evolution</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Re-Evolution Mod', 'Evasion Abilities Clause', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Shadow', 'Darmanitan-Galar', 'Gyarados', 'Lunala', 'Milotic', 'Naganadel', 'Solgaleo', 'Slowking-Galar', 'Urshifu-Base',
			'Volcarona', 'Zacian-Crowned', 'Arena Trap', 'Moody', 'Shadow Tag', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Baton Pass',
		],
	},
	{
		name: "[Gen 9] Shared Power",
		desc: `Once a Pok&eacute;mon switches in, its ability is shared with the rest of the team.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711011/">Shared Power</a>`,
		],

		mod: 'sharedpower',
		ruleset: ['Standard OMs', 'Evasion Abilities Clause', 'Evasion Items Clause', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: [
			'Chien-Pao', 'Gholdengo', 'Koraidon', 'Komala', 'Miraidon', 'Ting-Lu', 'Anger Shell', 'Arena Trap', 'Armor Tail', 'Contrary', 'Dazzling',
			'Drought', 'Electric Surge', 'Guts', 'Huge Power', 'Imposter', 'Magic Bounce', 'Magnet Pull', 'Mold Breaker', 'Moody', 'Poison Heal',
			'Prankster', 'Pure Power', 'Purifying Salt', 'Queenly Majesty', 'Quick Draw', 'Quick Feet', 'Regenerator', 'Sand Rush', 'Shadow Tag',
			'Simple', 'Slush Rush', 'Speed Boost', 'Stakeout', 'Stench', 'Sturdy', 'Swift Swim', 'Tinted Lens', 'Unaware', 'Unburden', 'Starf Berry',
			'King\'s Rock', 'Baton Pass',
		],
		getSharedPower(pokemon) {
			const sharedPower = new Set<string>();
			for (const ally of pokemon.side.pokemon) {
				if (ally.previouslySwitchedIn > 0) {
					if (pokemon.battle.dex.currentMod !== 'sharedpower' && ['trace', 'mirrorarmor'].includes(ally.baseAbility)) {
						sharedPower.add('noability');
						continue;
					}
					sharedPower.add(ally.baseAbility);
				}
			}
			sharedPower.delete(pokemon.baseAbility);
			return sharedPower;
		},
		onBeforeSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				const effect = 'ability:' + ability;
				pokemon.volatiles[effect] = {id: this.toID(effect), target: pokemon};
				if (!pokemon.m.abils) pokemon.m.abils = [];
				if (!pokemon.m.abils.includes(effect)) pokemon.m.abils.push(effect);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let format = this.format;
			if (!format.getSharedPower) format = this.dex.formats.get('gen9sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				if (ability === 'noability') {
					this.hint(`Mirror Armor and Trace break in Shared Power formats that don't use Shared Power as a base, so they get removed from non-base users.`);
				}
				const effect = 'ability:' + ability;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
	},
	{
		name: "[Gen 8] Tag Team Singles",
		desc: `Bring four Pok&eacute;mon to Team Preview and choose two to battle in a singles battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3705415/">Tag Team Singles</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Picked Team Size = 2', 'Max Team Size = 4', 'Standard OMs', 'Sleep Moves Clause', 'Evasion Abilities Clause'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Dialga', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black',
			'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Rayquaza', 'Reshiram', 'Solgaleo', 'Spectrier', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Zekrom', 'Moody', 'Power Construct', 'Bright Powder', 'Focus Sash', 'King\'s Rock', 'Lax Incense', 'Final Gambit',
		],
	},
	{
		name: "[Gen 9] Tera Donation",
		desc: `The first Pok&eacute;mon sent out immediately terastallizes. The other Pok&eacute;mon in the party inherit that Tera Type as an additional type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3715801/">Tera Donation</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Moves CLause', 'Tera Type Preview', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Chi-Yu', 'Chien-Pao', 'Cyclizar', 'Espathra', 'Flutter Mane', 'Houndstone', 'Iron Bundle', 'Koraidon',
			'Miraidon', 'Palafin', 'Arena Trap', 'Moody', 'Shadow Tag', 'Booster Energy', 'Heat Rock', 'King\'s Rock', 'Baton Pass',
		],
		onSwitchIn(pokemon) {
			if (this.turn === 0) {
				this.actions.terastallize(pokemon);
				const teraType = pokemon.teraType;
				for (const poke of pokemon.side.pokemon) {
					poke.m.thirdType = teraType;
				}
			}
			if (!pokemon.terastallized) {
				this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.id === 'terablast') {
				const teraType = pokemon.m.thirdType;
				if (teraType && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					move.category = 'Physical';
				}
			}
		},
		onModifyType(move, pokemon, target) {
			if (move.id === 'terablast') {
				const teraType = pokemon.m.thirdType;
				if (teraType) {
					move.type = teraType;
				}
			}
		},
		pokemon: {
			getTypes(excludeAdded, preterastallized) {
				if (!preterastallized && this.terastallized) return [this.terastallized];
				const types = this.battle.runEvent('Type', this, null, null, this.types);
				if (!excludeAdded && this.addedType) return types.concat(this.addedType);
				const addTeraType = this.m.thirdType;
				if (types.length) {
					if (addTeraType) return Array.from(new Set([...types, addTeraType]));
					return types;
				}
				return [this.battle.gen >= 5 ? 'Normal' : '???'];
			},
		},
	},
	{
		name: "[Gen 9] The Card Game",
		desc: `The type chart is simplified based off of the Pok&eacute;mon Trading Card Game.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3716838/">The Card Game</a>`,
		],

		mod: 'thecardgame',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Evasion Abilities Clause', 'Evasion Items Clause', 'Min Source Gen = 9'],
		banlist: ['Annihilape', 'Cyclizar', 'Dragonite', 'Espathra', 'Houndstone', 'Koraidon', 'Miraidon', 'Noivern', 'Palafin', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.hpType = pokemon.hpType.replace(/(Ghost|Fairy)/g, 'Psychic')
					.replace(/Bug/g, 'Grass')
					.replace(/Ice/g, 'Water')
					.replace(/(Rock|Ground)/g, 'Fighting')
					.replace(/Flying/g, 'Normal')
					.replace(/Poison/g, 'Dark');
				pokemon.teraType = pokemon.teraType.replace(/(Ghost|Fairy)/g, 'Psychic')
					.replace(/Bug/g, 'Grass')
					.replace(/Ice/g, 'Water')
					.replace(/(Rock|Ground)/g, 'Fighting')
					.replace(/Flying/g, 'Normal')
					.replace(/Poison/g, 'Dark');
			}
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			pokemon.apparentType = pokemon.getTypes(true).join('/');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
			pokemon.apparentType = pokemon.getTypes(true).join('/');
		},
	},
	{
		name: "[Gen 9] The Loser's Game",
		desc: `The first player to lose all of their Pok&eacute;mon wins.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714223/">The Loser's Game</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Clause Mod', '!OHKO Clause', 'Picked Team Size = 6', 'Adjust Level = 100', 'Min Source Gen = 9'],
		banlist: ['Infiltrator', 'Choice Scarf', 'Explosion', 'Final Gambit', 'Healing Wish', 'Lunar Dance', 'Magic Room', 'Memento', 'Misty Explosion', 'Self-Destruct'],
		onValidateTeam(team) {
			const familyTable = new Set<ID>();
			for (const set of team) {
				let species = this.dex.species.get(set.species);
				while (species.prevo) {
					species = this.dex.species.get(species.prevo);
				}
				if (familyTable.has(species.id)) {
					return [
						`You are limited to one Pok&eacute;mon from each family by the Family Clause.`,
						`(You have more than one evolution of ${species.name}.)`,
					];
				}
				familyTable.add(species.id);
			}
		},
		battle: {
			tiebreak() {
				if (this.ended) return false;

				this.inputLog.push(`>tiebreak`);
				this.add('message', "Time's up! Going to tiebreaker...");
				const notFainted = this.sides.map(side => (
					side.pokemon.filter(pokemon => !pokemon.fainted).length
				));
				this.add('-message', this.sides.map((side, i) => (
					`${side.name}: ${notFainted[i]} Pokemon left`
				)).join('; '));
				const maxNotFainted = Math.max(...notFainted);
				let tiedSides = this.sides.filter((side, i) => notFainted[i] === maxNotFainted);
				if (tiedSides.length <= 1) {
					return this.win(tiedSides[1]);
				}

				const hpPercentage = tiedSides.map(side => (
					side.pokemon.map(pokemon => pokemon.hp / pokemon.maxhp).reduce((a, b) => a + b) * 100 / 6
				));
				this.add('-message', tiedSides.map((side, i) => (
					`${side.name}: ${Math.round(hpPercentage[i])}% total HP left`
				)).join('; '));
				const maxPercentage = Math.max(...hpPercentage);
				tiedSides = tiedSides.filter((side, i) => hpPercentage[i] === maxPercentage);
				if (tiedSides.length <= 1) {
					return this.win(tiedSides[1]);
				}

				const hpTotal = tiedSides.map(side => (
					side.pokemon.map(pokemon => pokemon.hp).reduce((a, b) => a + b)
				));
				this.add('-message', tiedSides.map((side, i) => (
					`${side.name}: ${Math.round(hpTotal[i])} total HP left`
				)).join('; '));
				const maxTotal = Math.max(...hpTotal);
				tiedSides = tiedSides.filter((side, i) => hpTotal[i] === maxTotal);
				if (tiedSides.length <= 1) {
					return this.win(tiedSides[1]);
				}
				return this.tie();
			},
			checkWin(faintData) {
				const team1PokemonLeft = this.sides[0].pokemonLeft;
				const team2PokemonLeft = this.sides[1].pokemonLeft;
				if (!team1PokemonLeft && !team2PokemonLeft) {
					this.win(faintData?.target.side || null);
					return true;
				}
				for (const side of this.sides) {
					if (!side.pokemonLeft) {
						this.win(side);
						return true;
					}
				}
			},
		},
	},
	{
		name: "[Gen 8] Tier Shift",
		desc: `Pok&eacute;mon below OU get their stats, excluding HP, boosted. UU/RUBL get +10, RU/NUBL get +20, NU/PUBL get +30, and PU or lower get +40.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3662165/">Tier Shift</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Tier Shift Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
			'Damp Rock', 'Eviolite', 'Heat Rock',
		],
		unbanlist: ['Zamazenta-Crowned'],
	},
	{
		name: "[Gen 9] Trademarked",
		desc: `Sacrifice your Pok&eacute;mon's ability for a status move that activates on switch-in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3714688/">Trademarked</a>`,
		],

		mod: 'trademarked',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: ['Flutter Mane', 'Koraidon', 'Miraidon', 'Slaking', 'Arena Trap', 'Magnet Pull', 'Moody', 'Shadow Tag', 'Baton Pass'],
		restricted: [
			'Baneful Bunker', 'Block', 'Copycat', 'Detect', 'Destiny Bond', 'Encore', 'Fairy Lock', 'Ingrain', 'Instruct', 'Mean Look',
			'move:Metronome', 'Protect', 'Revival Blessing', 'Roar', 'Silk Trap', 'Spiky Shield', 'Sleep Talk', 'Shed Tail', 'Shell Smash',
			'Substitute', 'Trick Room', 'Whirlwind',
		],
		onValidateTeam(team, format, teamHas) {
			const problems = [];
			for (const trademark in teamHas.trademarks) {
				if (teamHas.trademarks[trademark] > 1) {
					problems.push(`You are limited to 1 of each Trademark.`, `(You have ${teamHas.trademarks[trademark]} Pok\u00e9mon with ${trademark} as a Trademark.)`);
				}
			}
			return problems;
		},
		validateSet(set, teamHas) {
			const dex = this.dex;
			const ability = dex.moves.get(set.ability);
			if (!ability.exists) { // Not even a real move
				return this.validateSet(set, teamHas);
			}
			// Absolute trademark bans
			if (ability.category !== 'Status') {
				return [`${ability.name} is not a status move and cannot be used as a trademark.`];
			}
			// Contingent trademark bans
			if (this.ruleTable.isRestricted(`move:${ability.id}`)) {
				return [`${ability.name} is restricted from being used as a trademark.`];
			}
			if (set.moves.map(this.toID).includes(ability.id)) {
				return [`${set.name} may not use ${ability.name} as both a trademark and one of its moves simultaneously.`];
			}
			const customRules = this.format.customRules || [];
			if (!customRules.includes('!obtainableabilities')) customRules.push('!obtainableabilities');
			if (!customRules.includes('+noability')) customRules.push('+noability');

			const TeamValidator: typeof import('../sim/team-validator').TeamValidator =
				require('../sim/team-validator').TeamValidator;

			const validator = new TeamValidator(dex.formats.get(`${this.format.id}@@@${customRules.join(',')}`));
			const moves = set.moves;
			set.moves = [ability.id];
			set.ability = 'No Ability';
			let problems = validator.validateSet(set, {}) || [];
			if (problems.length) return problems;
			set.moves = moves;
			set.ability = 'No Ability';
			problems = problems.concat(validator.validateSet(set, teamHas) || []);
			set.ability = ability.id;
			if (!teamHas.trademarks) teamHas.trademarks = {};
			teamHas.trademarks[ability.name] = (teamHas.trademarks[ability.name] || 0) + 1;
			return problems.length ? problems : null;
		},
	},
	{
		name: "[Gen 9] VoltTurn Mayhem",
		desc: `Every move that directly targets an opposing Pok&eacute;mon causes the user to switch out.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712615/">VoltTurn Mayhem</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'VoltTurn Mayhem Mod', 'Min Source Gen = 9'],
		banlist: ['Chien-Pao', 'Chi-Yu', 'Flutter Mane', 'Houndstone', 'Iron Bundle', 'Koraidon', 'Miraidon', 'Palafin', 'Fake Out', 'Revival Blessing'],
	},
	{
		section: "Retro OMs",
		column: 2,
	},
	{
		name: "[Gen 6] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8772336/">ORAS Almost Any Ability</a>`,
		],

		mod: 'gen6',
		ruleset: ['Standard', 'Swagger Clause', 'Ability Clause = 2', 'AAA Restricted Abilities', '!Obtainable Abilities'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass', 'Archeops', 'Bisharp', 'Chatot', 'Dragonite', 'Keldeo', 'Kyurem-Black', 'Mamoswine', 'Regigigas', 'Shedinja', 'Slaking', 'Smeargle', 'Snorlax', 'Suicune', 'Terrakion', 'Weavile', 'Dynamic Punch', 'Zap Cannon'],
		unbanlist: ['Aegislash', 'Blaziken', 'Deoxys-Defense', 'Deoxys-Speed', 'Genesect', 'Greninja', 'Landorus'],
		restricted: ['Arena Trap', 'Contrary', 'Fur Coat', 'Huge Power', 'Illusion', 'Imposter', 'Parental Bond', 'Protean', 'Pure Power', 'Simple', 'Speed Boost', 'Wonder Guard'],
	},
	{
		name: "[Gen 7] Mix and Mega",
		desc: `Mega Stones and Primal Orbs can be used on almost any Pok&eacute;mon with no Mega Evolution limit.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8778656/">USM Mix and Mega</a>`,
		],

		mod: 'gen7mixandmega',
		ruleset: ['Standard OMs', 'Mega Rayquaza Clause', 'Sleep Clause Mod'],
		banlist: ['Shadow Tag', 'Gengarite', 'Baton Pass', 'Electrify'],
		restricted: [
			'Arceus', 'Deoxys', 'Dialga', 'Dragonite', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem', 'Landorus-Therian', 'Lugia',
			'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma', 'Palkia', 'Pheromosa', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shuckle',
			'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Beedrillite', 'Blazikenite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite', 'Ultranecrozium Z',
		],
		unbanlist: ['Deoxys-Defense', 'Kyurem-Base', 'Necrozma-Base'],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item.exists) continue;
				if (itemTable.has(item.id) && (item.megaStone || item.onPrimal)) {
					return [
						`You are limited to one of each Mega Stone and Primal Orb.`,
						`(You have more than one ${item.name}.)`,
					];
				}
				itemTable.add(item.id);
			}
		},
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			const item = this.dex.items.get(set.item);
			if (!item.megaEvolves && !item.onPrimal && item.id !== 'ultranecroziumz') return;
			if (species.baseSpecies === item.megaEvolves || (item.onPrimal && item.itemUser?.includes(species.baseSpecies)) ||
				(species.name.startsWith('Necrozma-') && item.id === 'ultranecroziumz')) {
				return;
			}
			if (this.ruleTable.isRestricted(`item:${item.id}`) || this.ruleTable.isRestrictedSpecies(species) ||
				set.ability === 'Power Construct') {
				return [`${set.species} is not allowed to hold ${item.name}.`];
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseSpecies.name;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalMega);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-start', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
				const oSpecies = this.dex.species.get(pokemon.m.originalSpecies);
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			const oMegaSpecies = this.dex.species.get(pokemon.species.originalMega);
			if (oMegaSpecies.exists && pokemon.m.originalSpecies !== oMegaSpecies.baseSpecies) {
				this.add('-start', pokemon, oMegaSpecies.requiredItem || oMegaSpecies.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8697545/">USM STABmons</a>`,
		],

		mod: 'gen7',
		ruleset: ['Standard', 'STABmons Move Legality'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Aerodactyl', 'Aerodactyl-Mega', 'Araquanid', 'Blacephalon', 'Kartana', 'Komala', 'Kyurem-Black', 'Porygon-Z', 'Silvally', 'Tapu Koko', 'Tapu Lele', 'Thundurus', 'Thundurus-Therian', 'King\'s Rock', 'Razor Fang'],
		restricted: ['Acupressure', 'Belly Drum', 'Chatter', 'Extreme Speed', 'Geomancy', 'Lovely Kiss', 'Shell Smash', 'Shift Gear', 'Spore', 'Thousand Arrows'],
	},
	{
		name: "[Gen 6] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/9029427/">ORAS Pure Hackmons</a>`,
		],

		mod: 'gen6',
		ruleset: ['-Nonexistent', 'Showdown', 'EV limit = 510'],
	},
	{
		name: "[Gen 8] Free-For-All",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3681641/">SS Free-For-All</a>`,
		],

		mod: 'gen8',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard Doubles', 'Sleep Clause Mod', 'Dynamax Clause', '!Gravity Sleep Clause'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Dialga', 'Dracovish', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza',
			'Reshiram', 'Solgaleo', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom',
			'Zygarde-Complete', 'Moody', 'Power Construct', 'Shadow Tag', 'Acupressure', 'Aromatic Mist', 'Baton Pass', 'Coaching', 'Court Change',
			'Decorate', 'Final Gambit', 'Flatter', 'Floral Healing', 'Flower Shield', 'Follow Me', 'Heal Pulse', 'Rage Powder', 'Swagger',
		],
	},
	{
		name: "[Gen 7] Free-For-All",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3681641/">SS Free-For-All</a>`,
		],

		mod: 'gen7',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Obtainable', 'Showdown'],
		banlist: [
			'Aromatic Mist', 'Final Gambit', 'Flatter', 'Flower Shield', 'Follow Me', 'Gear Up', 'Magnetic Flux',
			'Rage Powder', 'Rototiller', 'Spotlight', 'Swagger',
		],
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 2,
	},
	{
		name: "[Gen 9] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen9',
		team: 'randomHC',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Nonexistent'],
	},
	{
		name: "[Gen 9] Doubles Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item. Now with TWICE the Pok&eacute;mon per side!`,

		mod: 'gen9',
		team: 'randomHC',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['[Gen 9] Hackmons Cup'],
	},
	{
		name: "[Gen 8] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen8',
		team: 'randomHC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable Formes', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 8] Doubles Hackmons Cup",

		mod: 'gen8',
		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any moves, types, and stats.`,

		mod: 'gen1',
		team: 'randomHC',
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Desync Clause Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Team Type Preview'],
		onModifySpecies(species, target, source, effect) {
			if (!target) return;
			return {...species, ...(target.set as any).hc};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			for (const i in pokemon.species.baseStats) {
				if (i === 'spd') continue;
				this.add('-start', pokemon, `${pokemon.species.baseStats[i as keyof StatsTable]}${i === 'spa' ? 'spc' : i}`, '[silent]');
			}
		},
	},

	// Custom Games
	///////////////////////////////////////////////////////////////////

	{
		section: "Custom Games",
		column: 3,
	},
	{
		name: "[Gen 9] Custom Game",

		mod: 'gen9',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 9] Doubles Custom Game",

		mod: 'gen9',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 8] Custom Game",

		mod: 'gen8',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 8] Doubles Custom Game",

		mod: 'gen8',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 7] Doubles Custom Game",

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 6] Custom Game",

		mod: 'gen6',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 6] Doubles Custom Game",

		mod: 'gen6',
		gameType: 'doubles',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 6] Triples Custom Game",

		mod: 'gen6',
		gameType: 'triples',
		searchShow: false,
		battle: {trunc: Math.trunc},
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 5] Custom Game",

		mod: 'gen5',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 5] Doubles Custom Game",

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 5] Triples Custom Game",

		mod: 'gen5',
		gameType: 'triples',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Custom Game",

		mod: 'gen4',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions
		ruleset: ['Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 4] Doubles Custom Game",

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions
		ruleset: ['Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 3] Custom Game",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 3] Doubles Custom Game",

		mod: 'gen3',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},
	{
		name: "[Gen 1] Custom Game",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Desync Clause Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	// Digimon
	///////////////////////////////////////////////////////////////////

	{
		section: "Digimon",
		column: 3,
	},
	{
		name: "[Gen 9] Digimon",

		mod: 'digimon',
		searchShow: false,
		debug: true,
		ruleset: ['Standard Digimon'],
	},
];
