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

export const Formats: FormatList = [

	// Sw/Sh Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "Sw/Sh Singles",
	},
	{
		name: "[Gen 8] Random Battle",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656537/">Random Battle Suggestions</a>`,
		],

		mod: 'gen8',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Unrated Random Battle",

		mod: 'gen8',
		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Free-For-All Random Battle",

		mod: 'gen8',
		team: 'random',
		gameType: 'freeforall',
		tournamentShow: false,
		rated: false,
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Random Battle (Blitz)",

		mod: 'gen8',
		team: 'random',
		ruleset: ['[Gen 8] Random Battle', 'Blitz'],
	},
	{
		name: "[Gen 8] Multi Random Battle",

		mod: 'gen8',
		team: 'random',
		gameType: 'multi',
		searchShow: false,
		tournamentShow: false,
		rated: false,
		ruleset: [
			'Max Team Size = 3',
			'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod',
		],
	},
	{
		name: "[Gen 8] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672210/">OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672556/">OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3674058/">OU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'],
	},
	{
		name: "[Gen 8] OU (Blitz)",

		mod: 'gen8',
		ruleset: ['[Gen 8] OU', 'Blitz'],
	},
	{
		name: "[Gen 8] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3676539/">Ubers Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3675564/">Ubers Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3675194/">Ubers Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['AG', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3681331/">UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3679621/">UU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3674793/">UU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU'],
		banlist: ['OU', 'UUBL', 'Light Clay'],
	},
	{
		name: "[Gen 8] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3687060/">RU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661013/">RU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3676023/">RU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] UU'],
		banlist: ['UU', 'RUBL'],
	},
	{
		name: "[Gen 8] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3687023/">NU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673598/">NU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3676265/">NU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] RU'],
		banlist: ['RU', 'NUBL', 'Drizzle', 'Drought', 'Slush Rush'],
	},
	{
		name: "[Gen 8] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3707179/">PU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3676106/">PU Viability Rankings</a>`,
		],

export const Formats: FormatList = [

		mod: 'gen8',
		ruleset: ['Little Cup', 'Standard', 'Dynamax Clause'],
		banlist: [
			'Corsola-Galar', 'Cutiefly', 'Drifloon', 'Gastly', 'Gothita', 'Magby', 'Rufflet', 'Scraggy', 'Scyther', 'Sneasel', 'Swirlix',
			'Tangela', 'Vullaby', 'Vulpix-Alola', 'Woobat', 'Zigzagoon-Base', 'Chlorophyll', 'Moody', 'Baton Pass', 'Sticky Web',
		],
	},
	{
		section: "Server Special",
	},
	{
		name: "[Gen 8] Balanced Hackmons 500 Cup",
		desc: `BH，但禁止使用种族和大于 500 的精灵。<br />BH but Pok&eacute;mon with BST > 500 are banned.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
			`&bullet; <a href="https://replay.pokemonshowdown.com/gen8balancedhackmons-1611966917">示例录像 Sample Replay</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] Balanced Hackmons'],
		banlist: [
			'Barraskewda', 'Chansey', 'Darmanitan', 'Darmanitan-Galar',
			'Drizzle',
		],
		unbanlist: [
			'Bolt Beak',
		],
		onValidateSet(set) {
			const bst = this.dex.species.get(set.species).bst;
			if (bst > 500) {
				if (set.species.endsWith('s') || set.species.endsWith('S')) {
					return [`${set.species}' BST is greater than 500.`];
				}
				else {
					return [`${set.species}'s BST is greater than 500.`];
				}
			}
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
		ruleset: ['Standard NatDex', '!Obtainable', '2 Ability Clause', 'OHKO Clause', 'CFZ Clause', 'Evasion Moves Clause', 'Forme Clause', 'Dynamax Clause', 'Sleep Moves Clause', 'Johto Pokedex'],
		banlist: [
			'PU', 'Arctovish', 'Aurorus', 'Basculin', 'Centiskorch', 'Drampa', 'Exeggutor-Alola', 'Gallade', 'Glastrier', 'Haunter', 'Magmortar', 'Magneton',
			'Malamar', 'Ninjask', 'Omastar', 'Rotom-Frost', 'Turtonator', 'Vanilluxe', 'Vikavolt', 'Silvally-Dragon', 'Silvally-Ground', 'Sneasel',
			'Damp Rock', 'Grassy Seed',
		],
	},
	{
		name: "[Gen 8] National Dex LC Balanced Hackmons",
		desc: `NDBH + LC. S/o to Onyx and Sevag for coding and rules.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/om-mashup-megathread.3657159/post-8299984">Balanced Hackmons Little Cup</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/#post-9217527">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Little Cup', 'Forme Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable'],
		banlist: [
			// LC OU
			'Abra', 'Carvanha', 'Diglett-Base', 'Dwebble', 'Ferroseed', 'Foongus', 'Frillish', 'Grookey', 'Koffing',
			'Larvesta', 'Magnemite', 'Mareanie', 'Mienfoo', 'Mudbray', 'Natu', 'Onix', 'Pawniard', 'Ponyta-Base',
			'Porygon', 'Staryu', 'Timburr', 'Trapinch', 'Tyrunt',
			// LC UUBL
			'Archen', 'Farfetch\u2019d-Galar', 'Scorbunny', 'Shellder', 'Wingull',
		],
	},
	{
		name: "[Gen 8] CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656824/">CAP Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3671157/">CAP Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3674024/">CAP Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU', '+CAP'],
		banlist: ['Crucibellite'],
	},
	{
		name: "[Gen 8] CAP LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3691918/">CAP LC Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8997714/">CAP LC Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8997713/">CAP LC Viability Rankings</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['[Gen 8] LC', '+CAP'],
		banlist: ['Cawdet'],
	},
	{
		name: "[Gen 8] Battle Stadium Singles",

		mod: 'gen8',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer', 'Limit Two Restricted'],
		restricted: ['Restricted Legendary'],
	},
	{
		name: "[Gen 8] Battle Stadium Singles Series 13",

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8'],
		banlist: ['Eternatus-Eternamax'],
		unbanlist: ['Mythical', 'Restricted Legendary'],
	},
	{
		name: "[Gen 8] Custom Game",

		mod: 'gen8',
		searchShow: false,
		debug: true,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3690179/">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] National Dex BH'],
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
		onValidateTeam(team, format, teamHas) {
			for (const set of team) {
				if (set.moves.length < 4) return [`You are forced to bring 4 moves by 24 Points Rule.`,
				`${set.species} has less than 4 moves.`];
				const moveTable = new Map<string, number>();
				for (const move of set.moves) {
					const moveId = this.dex.moves.get(move).id;
					moveTable.set(moveId, (moveTable.get(moveId) || 0) + 1);
					if ((moveTable.get(moveId) || 2) > 1) return [`${set.species} has multiple copies of ${this.dex.moves.get(moveId)}`];
				}
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				for (const moveSlot of pokemon.baseMoveSlots) {
					// @ts-ignore
					moveSlot.TFUsed = false;
				}
			}
		},
		actions: {
			runMove(
				moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
				zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
			) {
				pokemon.activeMoveActions++;
				let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
				let baseMove = this.dex.getActiveMove(moveOrMoveName);
				const pranksterBoosted = baseMove.pranksterBoosted;
				if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
					const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
					if (changedMove && changedMove !== true) {
						baseMove = this.dex.getActiveMove(changedMove);
						if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
						target = this.battle.getRandomTarget(pokemon, baseMove);
					}
				}
				let move = baseMove;
				if (zMove) {
					move = this.getActiveZMove(baseMove, pokemon);
				} else if (maxMove) {
					move = this.getActiveMaxMove(baseMove, pokemon);
				}
		
				move.isExternal = externalMove;
		
				this.battle.setActiveMove(move, pokemon, target);
		
				/* if (pokemon.moveThisTurn) {
					// THIS IS PURELY A SANITY CHECK
					// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
					// USE this.queue.cancelMove INSTEAD
					this.battle.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
					this.battle.clearActiveMove(true);
					return;
				} */
				const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
				if (!willTryMove) {
					this.battle.runEvent('MoveAborted', pokemon, target, move);
					this.battle.clearActiveMove(true);
					// The event 'BeforeMove' could have returned false or null
					// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
					// null indicates the opposite, as the Pokemon didn't have an option to choose anything
					pokemon.moveThisTurnResult = willTryMove;
					return;
				}
				if (move.beforeMoveCallback) {
					if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						return;
					}
				}
				pokemon.lastDamage = 0;
				let lockedMove;
				if (!externalMove) {
					lockedMove = this.battle.runEvent('LockMove', pokemon);
					if (lockedMove === true) lockedMove = false;
					if (!lockedMove) {
						if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
							this.battle.add('cant', pokemon, 'nopp', move);
							this.battle.clearActiveMove(true);
							pokemon.moveThisTurnResult = false;
							return;
						}
					} else {
						sourceEffect = this.dex.conditions.get('lockedmove');
					}
					pokemon.moveUsed(move, targetLoc);
				}
		
				// Dancer Petal Dance hack
				// TODO: implement properly
				const noLock = externalMove && !pokemon.volatiles['lockedmove'];
		
				if (zMove) {
					if (pokemon.illusion) {
						this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
					}
					this.battle.add('-zpower', pokemon);
					pokemon.side.zMoveUsed = true;
				}
				const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
				this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
				if (this.battle.activeMove) move = this.battle.activeMove;
				this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
				this.battle.runEvent('AfterMove', pokemon, target, move);
		
				// Dancer's activation order is completely different from any other event, so it's handled separately
				if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
					const dancers = [];
					for (const currentPoke of this.battle.getAllActive()) {
						if (pokemon === currentPoke) continue;
						if (currentPoke.hasAbility('dancer') && !currentPoke.isSemiInvulnerable()) {
							dancers.push(currentPoke);
						}
					}
					// Dancer activates in order of lowest speed stat to highest
					// Note that the speed stat used is after any volatile replacements like Speed Swap,
					// but before any multipliers like Agility or Choice Scarf
					// Ties go to whichever Pokemon has had the ability for the least amount of time
					dancers.sort(
						(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityOrder - a.abilityOrder
					);
					for (const dancer of dancers) {
						if (this.battle.faintMessages()) break;
						if (dancer.fainted) continue;
						this.battle.add('-activate', dancer, 'ability: Dancer');
						const dancersTarget = !target!.isAlly(dancer) && pokemon.isAlly(dancer) ? target! : pokemon;
						const dancersTargetLoc = dancer.getLocOf(dancersTarget);
						this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('dancer'), undefined, true);
					}
				}
				if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];

				// here we add the code
				const slotMove = pokemon.baseMoveSlots.find((value) => value.id === move.id);
				// @ts-ignore
				slotMove.TFUsed = true;

				this.battle.faintMessages();

				// here we add the code
				let canRuleWin = true;
				for (const mon of pokemon.side.pokemon) {
					for (const moveSlot of mon.baseMoveSlots) {
						// @ts-ignore
						if (moveSlot.TFUsed === false) {
							this.battle.debug(`${mon.name}'s move ${moveSlot.id} is not used.`);
							canRuleWin = false;
							break;
						}
					}
					if (canRuleWin === false) break;
				}
				if (canRuleWin === true) this.battle.win(pokemon.side);

				this.battle.checkWin();
			}
		},
	},
	{
		name: "[Gen 8] ND Almost No Ability BH",
		desc: `NDBH, but Pokemon can only use their original abilities.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3690179/">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] National Dex BH', 'Obtainable Abilities', '!2 Ability Clause', '!Arceus Clause'],
		banlist: [
			'Zacian-Crowned',
		],
		unbanlist: [
			'Rayquaza-Mega', 'Shedinja',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Protean', 'Pure Power', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 
			'Chatter', 'Electrify', 
		],

		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer', 'Limit Two Restricted'],
		restricted: ['Restricted Legendary'],
	},
	{
		name: "[Gen 8] Battle Stadium Doubles Series 13",

		mod: 'gen8',
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer'],
		banlist: ['Eternatus-Eternamax'],
		unbanlist: ['Mythical', 'Restricted Legendary'],
	},
	{
		name: "[Gen 8] Spikemuth Cup",

		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['Flat Rules', 'Dynamax Clause', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer'],
	},
	{
		name: "[Gen 8] VGC 2021",

		mod: 'gen8',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer'],
	},
	{
		name: "[Gen 8] VGC 2020",

		mod: 'gen8dlc1',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 8', 'VGC Timer'],
	},
	{
		name: "[Gen 8] 2v2 Doubles",
		desc: `Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3690179/">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] National Dex BH', '!Arceus Clause', 'Camomons Mod'],
		unbanlist: [
			'Calyrex-Shadow', 'Darmanitan-Galar-Zen', 'Groudon-Primal', 'Rayquaza-Mega', 
			'Protean', 'Libero', 
		],
	},
	{
		name: "[Gen 8] ND Fortemons BH",
		desc: `NDBH，但精灵可以在道具栏携带攻击招式，然后该精灵的所有攻击招式共享其特效。<br />如，一只精灵道具栏带高速旋转，则其所有攻击招式都额外拥有扫钉和速度 +1 效果。<br />以下招式禁止作为道具携带：<br />&bullet; LGPE专属招式、Z招式、极巨招式<br />&bullet; 一击必杀招式<br />&bullet; 降低命中率的招式<br />&bullet; 多段招式<br />&bullet; 正先制度招式<br />&bullet; 抓人招式<br />&bullet; 反击招式<br />&bullet; 比例伤害招式<br />&bullet; 蓄力招式<br />&bullet; 其它被禁止的招式：酸液炸弹、忍耐、电喙、爆裂拳、回声、诡异咒语、鳃咬、快速折返、冰息、冰球、炼狱、蹭蹭脸颊、嚣张、追打、电力上升、滚动、臂贝武器、自由落体、辅助力量、山岚摔、大地波动、急速折返、伏特替换、气象球、暗冥强击、电磁炮<br />NDBH, but Pok&eacute;mon can have attack moves in their item slot as fortes. Every attack move of a Pok&eacute;mon will additionally have the move effects of its forte.<br />E.g. A Pok&eacute;mon with Rapid Spin as its forte will give all its attacks the effect of hazard removal and +1 Spe, along with their original effects.<br />The following moves are banned as forte:<br />&bullet; LGPE Moves, Z-Moves, Max Moves<br />&bullet; OHKO Moves<br />&bullet; Moves That Lower Accuracy<br />&bullet; Multi-hit Moves<br />&bullet; Positive Priority Moves<br />&bullet; Trapping Moves<br />&bullet; Counter-like Moves<br />&bullet; Ratio Damage Moves<br />&bullet; Charge Moves<br />&bullet; Other Banned Moves: Acid Spray, Bide, Bolt Beak, Dynamic Punch, Echoed Voice, Eerie Spell, Fishious Rend, Flip Turn, Frost Breath, Ice Ball, Inferno, Nuzzle, Power Trip, Pursuit, Rising Voltage, Rollout, Shell Side Arm, Sky Drop, Stored Power, Storm Throw, Terrain Pulse, U-turn, Volt Switch, Weather Ball, Wicked Blow, Zap Cannon`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3638520/">Fortemons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3690179/">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		// debug: true,
		ruleset: ['[Gen 8] National Dex BH', 'Forte Clause'],
		banlist: [
			'Copycat', 'Nature Power',
			'Serene Grace', 'Triage', 
			'Endeavor', 'Nature\'s Madness', 'Super Fang', 
			'Arm Thrust', 'Barrage', 'Beat Up', 'Bone Rush', 'Bullet Seed', 'Comet Punch', 'Double Slap', 'Fury Attack', 'Fury Swipes', 'Icicle Spear', 
			'Pin Missile', 'Rock Blast', 'Scale Shot', 'Spike Cannon', 'Tail Slap', 'Water Shuriken', 'Bonemerang', 'Double Hit', 'Double Kick', 
			'Dragon Darts', 'Dual Chop', 'Dual Wingbeat', 'Gear Grind', 'Surging Strikes', 'Twineedle', 'Triple Axel', 'Triple Kick',
		],
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
		validateSet(set, teamHas) {
			const item = this.dex.moves.get(set.item);
			if (!item.exists) return this.validateSet(set, teamHas);
			const problems = [];
			const restrictedMoves = ['Acid Spray', 'Anchor Shot', 'Beat Up', 'Bide', 'Bolt Beak', 'Dynamic Punch', 'Echoed Voice', 'Eerie Spell', 'Fishious Rend', 
			'Flip Turn', 'Frost Breath', 'Ice Ball', 'Inferno', 'Jaw Lock', 'Nuzzle', 'Power Trip', 'Pursuit', 'Rising Voltage', 'Rollout', 'Shell Side Arm', 
			'Spirit Shackle', 'Stored Power', 'Storm Throw', 'Terrain Pulse', 'Thousand Waves', 'U-turn', 'Volt Switch', 'Weather Ball', 'Wicked Blow', 'Zap Cannon',];
			if (!item.exists || item.type === 'Status'
			|| item.isNonstandard == "LGPE"
			|| item.isZ
			|| item.isMax
			|| item.ohko
			// @ts-ignore
			|| item.secondaries && item.secondaries.some(secondary => secondary.boosts && secondary.boosts.accuracy < 0)
			|| item.multihit
			|| item.priority > 0
			|| item.volatileStatus == 'partiallytrapped'
			|| item.damageCallback && item.id !== 'psywave'
			|| item.flags['charge']
			|| restrictedMoves.includes(item.name)) 
				problems.push(`${item.name} is banned as a forte.`);
			const itemStr = set.item;
			set.item = '';
			const problem = this.validateSet(set, teamHas);
			if (problem?.length) problems.push(...problem);
			set.item = itemStr;
			return problems;
		},
		onBegin() {
			for (const pokemon of this.p1.pokemon.concat(this.p2.pokemon)) {
				let move = this.dex.moves.get(pokemon.set.item);
				if (move.exists && move.category !== 'Status') {
					// @ts-ignore
					pokemon.forte = move;
					
					if (pokemon.baseSpecies.name.startsWith('Necrozma')) {
						pokemon.item = this.dex.toID('mimikiumz');
					}
					else {
						pokemon.item = this.dex.toID('ultranecroziumz');
					}
				}
			}
		},
		// we should deal with the following properties here instead of in onModifyMove, cuz they're called before onModifyMove
		// see simulator-doc.txt and sim/battle-actions.ts
		onBeforeMovePriority: 1,
		onBeforeMove(source, target, move) {
			// @ts-ignore
			if (move && move.category !== 'Status' && source.forte && source.forte.beforeMoveCallback) {
				// @ts-ignore
				move.beforeMoveCallback = source.forte.beforeMoveCallback;
			}
		},
		onModifyPriorityPriority: 1,
		onModifyPriority(priority, source, target, move) {
			// @ts-ignore
			if (move && move.category !== 'Status' && source.forte) {
				let additionalPriority = 0;
				// @ts-ignore
				if (source.forte.id === 'grassyglide' && this.field.isTerrain('grassyterrain') && source.isGrounded()) additionalPriority += 1;
				// @ts-ignore
				if (source.getAbility().id === 'triage' && source.forte.flags.heal && !move.flags.heal) additionalPriority += 3;
				// @ts-ignore
				return priority + source.forte.priority + additionalPriority;
			}
		},
		onModifyTypePriority: 1,
		onModifyType(move, pokemon, target) {
			// @ts-ignore
			if (move && move.category !== 'Status' && pokemon.forte && pokemon.forte.onModifyType) {
				// @ts-ignore
				this.singleEvent('ModifyType', pokemon.forte, null, pokemon, target, move, move);
			}
		},
		// don't know what this does, just keep it
		onModifySecondaries(secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		// for sheer force i guess
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			// @ts-ignore
			if (move.category !== 'Status' && pokemon.forte) {
				// @ts-ignore
				const forte = pokemon.forte;

				Object.assign(move.flags, forte.flags);
				
				// pseudoWeather theoretically shouldn't be a simple property, but it is in practice cuz plasma fists is the only attack with it, maybe change this in later generations
				// the same applies to volatileStatus, the only such property on attacks are partiallytrapped and smackdown, and partiallytrapped moves are banned
				// + seflBoost, the only related attack is scale shot
				const simpleProperties = ['breaksProtect', 'forceSwitch', 'hasCrashDamage', 'ignoreAbility', 'ignoreDefensive', 'ignoreEvasion', 'ignoreImmunity', 'isFutureMove', 'mindBlownRecoil', 
				'overrideDefensiveStat', 'overrideOffensivePokemon', 'overrideOffensiveStat', 'pseudoWeather', 'selfBoost', 'selfdestruct', 'selfSwitch', 'sleepUsable', 'stealsBoosts', 'struggleRecoil', 
				'thawsTarget', 'volatileStatus', 'willCrit', 
				// function properties
				'onDamage', 'onMoveFail', 'onUseMoveMessage'];
				// omitted properties:
				// onPrepareHit
				for (let prop of simpleProperties) {
					if (forte[prop]) {
						// @ts-ignore
						move[prop] = forte[prop];
					}
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
				// if (forte.id === 'diamondstorm') { // it's a very strange sf move
				// 	if (move.secondaries) {
				// 		move.secondaries = move.secondaries.concat(forte.self);
				// 	} else if (move.secondary) {
				// 		move.secondaries = [move.secondary].concat(forte.self);
				// 		move.secondary = undefined;
				// 	} else {
				// 		move.secondary = forte.self;
				// 	}
				// }
				// self
				if (forte.self) {// && forte.id !== 'diamondstorm') {
					if (move.self) {
						for (const i in forte.self) {
							// @ts-ignore
							if (move.self[i]) {
								if (i === 'boosts') {
									for (const stat of ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion']) {
										if (forte.self.boosts[stat]) {
											// @ts-ignore
											if (move.self.boosts[stat]) {
												// @ts-ignore
												move.self.boosts[stat] += forte.self.boosts[stat];
											} else {
												// @ts-ignore
												move.self.boosts[stat] = forte.self.boosts[stat];
											}
										}
									}
								} else if (i === 'onHit') {
									// only burnup relevant
									move.self[i] = forte.self[i];
								} else if (i === 'volatileStatus') {
									// ;-; not perfect
									move.self[i] = forte.self[i];
								} else {
									// @ts-ignore
									move.self[i] = forte.self[i];
								}
							} else {
								// @ts-ignore
								move.self[i] = forte.self[i];
							}
						}
					} else {
						move.self = forte.self;
					}
				}

				// number properties
				if (forte.critRatio) {
					if (move.critRatio) {
						move.critRatio += forte.critRatio - 1;
					} else {
						move.critRatio = forte.critRatio;
					}
				}
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
							move.damageCallback = function (pokemon) {
								return (this.random(50, 151) * pokemon.level) / 100 + pokemon.level;
							};
							break;
						case 25:
							move.damageCallback = function (pokemon) {
								return pokemon.level * 2;
							};
							break;
						case 21:
							move.damageCallback = function (pokemon) {
								// @ts-ignore
								return (this.random(50, 151) * pokemon.level) / 100 + move.damage;
							};
							break;
						case 15:
							move.damageCallback = function (pokemon) {
								// @ts-ignore
								return pokemon.level + move.damage;
							};
							break;
						case 14:
							move.damageCallback = function (pokemon) {
								return (this.random(50, 151) * pokemon.level) / 100 + forte.damage;
							};
							break;
						case 10:
							move.damageCallback = function (pokemon) {
								return pokemon.level + forte.damage;
							};
							break;
						case 6:
							move.damage += forte.damage;
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

		mod: 'gen8',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: ['ND Uber', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Razor Fang', 'Quick Claw', 'Baton Pass'],
	},
	{
		name: "[Gen 8] National Dex UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660920/">National Dex UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672486/">National Dex UU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672482/">National Dex UU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] National Dex'],
		banlist: ['ND OU', 'ND UUBL', 'Drizzle', 'Drought', 'Light Clay', 'Slowbronite'],
		unbanlist: ['Hydreigon'],
	},
	{
		name: "[Gen 8] National Dex RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3691290/">National Dex RU</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['[Gen 8] National Dex UU'],
		banlist: ['ND UU', 'ND RUBL', 'Hydreigon'],
	},
	{
		name: "[Gen 8] ND Letter Cup BH",
		desc: `NDBH，但一只精灵携带的所有技能的英文首字母必须相同。`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Clause Mod', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable', 'Arceus Clause'],
		banlist: [
			'Arceus', 'Blastoise-Mega', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Dracovish', 'Dragapult',
			'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kartana', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo',
			'Moltres-Galar', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky',
			'Solgaleo', 'Spectrier', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
			'Battle Bond', 'Moody', 'Power Construct', 'Shadow Tag',
			'Bright Powder', 'Damp Rock', 'Focus Band', 'King\'s Rock', 'Lax Incense', 'Quick Claw', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672423/">National Dex AG</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex'],
	},

	// Pet Mods
	///////////////////////////////////////////////////////////////////

	{
		section: "Pet Mods",
	},
	{
		name: "[Gen 8] National Dex BH",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex Balanced Hackmons</a>`,
		],
		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable'],
		banlist: [
			// Pokemon
			'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Cramorant-Gorging', 'Calyrex-Shadow', 'Darmanitan-Galar-Zen',
			// Abilities
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			// Items
			'Gengarite',
			// Moves
			'Chatter', 'Double Iron Bash', 'Octolock', 'Shell Smash', 'Bolt Beak', 'Belly Drum', 'Electrify', 'Court Change',
			// Other
			'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		onValidateSet(set) {
			if (this.toID(set.ability) === 'intrepidsword' &&
				!this.toID(set.species).startsWith('zacian') && this.toID(set.item) !== 'rustedsword') {
				return [`${set.ability} is banned.`];
			}
			if (set.species === 'Zacian-Crowned' &&
				(this.toID(set.item) !== 'rustedsword' || this.toID(set.ability) !== 'intrepidsword')) {
				return [`${set.species} is banned.`];
			}
		},
		onValidateTeam(team) {
			let arceus = 0;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.baseSpecies === "Arceus") arceus++;
			}
			if (arceus > 1) {
				return [`You are limited to one Arceus forme.`, `(You have ${arceus} Arceus formes.)`];
			}
		},
	},
	{
		name: "[Gen 8] JolteMons Random Battle",
		desc: `Pok&eacute;mon, items, abilities, and moves are redesigned for OU, and new items, abilities, and moves are added, all without changing base stats.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694234/">JolteMons</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Z-Move Clause'],
	},
	{
		name: "[Gen 6] NEXT OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3476151/">Gen-NEXT Development Thread</a>`,
		],

		mod: 'gennext',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},

	// OM of the Month
	///////////////////////////////////////////////////////////////////

	{
		section: "OM of the Month",
		column: 2,
	},
	{
		name: "[Gen 8] Pure Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656851/">Pure Hackmons</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 8] Balanced Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3688892/">Multibility</a>`, 
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/#post-9217527">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Shedinja', 'Zacian-Crowned',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero',
			'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout',
			'Water Bubble', 'Wonder Guard', 'Comatose + Sleep Talk', 'Rusted Sword', 'Belly Drum', 'Bolt Beak', 'Court Change',
			'Double Iron Bash', 'Octolock', 'Shell Smash', 'Transform',
		],
	},
	{
		name: "[Gen 8] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/scalemons.3658482/">Scalemons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/#post-9217527">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],
		mod: 'gen8',
		ruleset: ['[Gen 8] National Dex BH', 'Scalemons Mod'],
		banlist: [
			'Abra', 'Beedrill-Mega', 'Gastly',
			'Eviolite', 'Light Ball', 'Thick Club',
		],
		unbanlist: [
			'Calyrex-Shadow', 'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega',
			'Belly Drum', 'Bolt Beak', 'Chatter', 'Electrify',
		],
		onValidateSet(set) {
			// we do nothing here
		},
	},
	{
		name: "[Gen 8] ND Turn Tables BH",
		desc: `NDBH + Turn Tables.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/#post-9217527">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Clause Mod', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable', 'Arceus Clause', 'Turn Tables Mod'],
		banlist: [
			'Archeops', 'Blacephalon', 'Buzzwole', 'Calyrex-Ice', 'Calyrex-Shadow', 'Dialga', 'Dracovish', 'Dragapult', 'Dragonite', 'Eternatus', 'Genesect',
			'Gengar', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kartana', 'Keldeo', 'Kyogre', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Lugia',
			'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Noivern', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja', 'Solgaleo', 'Spectrier', 'Urshifu', 'Urshifu-Rapid-Strike', 'Victini', 'Weavile', 'Xerneas',
			'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta-Base', 'Zekrom', 'Zeraora', 'Zygarde-Base', 'Arena Trap', 'Comatose', 'Contrary', 'Fluffy',
			'Fur Coat', 'Gorilla Tactics', 'Huge Power', 'Ice Scales', 'Illusion', 'Imposter', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magic Bounce',
			'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Poison Heal', 'Protean', 'Pure Power', 'Shadow Tag', 'Simple', 'Stakeout',
			'Speed Boost', 'Unburden', 'Water Bubble', 'Wonder Guard', 'King\'s Rock', 'Baton Pass', 'Electrify',
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
	},
	{
		section: "Server Special OMs",
	},
	{
		name: "[Gen 8] 24 Points",
		desc: `当你使用过队伍中的所有24个技能后，你获胜。<br />You win after you use all 24 Moves in your team.`,
		debug: true,
		threads: [
			`None yet.`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Baton Pass'
		],
		onValidateTeam(team, format, teamHas) {
			for (const set of team) {
				if (set.moves.length < 4) return [`You are forced to bring 4 moves by 24 Points Rule.`,
				`${set.species} has less than 4 moves.`];
				const moveTable = new Map<string, number>();
				for (const move of set.moves) {
					const moveId = this.dex.moves.get(move).id;
					moveTable.set(moveId, (moveTable.get(moveId) || 0) + 1);
					if ((moveTable.get(moveId) || 2) > 1) return [`${set.species} has multiple copies of ${this.dex.moves.get(moveId)}`];
				}
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				for (const moveSlot of pokemon.baseMoveSlots) {
					// @ts-ignore
					moveSlot.TFUsed = false;
				}
			}
		},
		actions: {
			runMove(
				moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
				zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
			) {
				pokemon.activeMoveActions++;
				let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
				let baseMove = this.dex.getActiveMove(moveOrMoveName);
				const pranksterBoosted = baseMove.pranksterBoosted;
				if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
					const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
					if (changedMove && changedMove !== true) {
						baseMove = this.dex.getActiveMove(changedMove);
						if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
						target = this.battle.getRandomTarget(pokemon, baseMove);
					}
				}
				let move = baseMove;
				if (zMove) {
					move = this.getActiveZMove(baseMove, pokemon);
				} else if (maxMove) {
					move = this.getActiveMaxMove(baseMove, pokemon);
				}
		
				move.isExternal = externalMove;
		
				this.battle.setActiveMove(move, pokemon, target);
		
				/* if (pokemon.moveThisTurn) {
					// THIS IS PURELY A SANITY CHECK
					// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
					// USE this.queue.cancelMove INSTEAD
					this.battle.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
					this.battle.clearActiveMove(true);
					return;
				} */
				const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
				if (!willTryMove) {
					this.battle.runEvent('MoveAborted', pokemon, target, move);
					this.battle.clearActiveMove(true);
					// The event 'BeforeMove' could have returned false or null
					// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
					// null indicates the opposite, as the Pokemon didn't have an option to choose anything
					pokemon.moveThisTurnResult = willTryMove;
					return;
				}
				if (move.beforeMoveCallback) {
					if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						return;
					}
				}
				pokemon.lastDamage = 0;
				let lockedMove;
				if (!externalMove) {
					lockedMove = this.battle.runEvent('LockMove', pokemon);
					if (lockedMove === true) lockedMove = false;
					if (!lockedMove) {
						if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
							this.battle.add('cant', pokemon, 'nopp', move);
							this.battle.clearActiveMove(true);
							pokemon.moveThisTurnResult = false;
							return;
						}
					} else {
						sourceEffect = this.dex.conditions.get('lockedmove');
					}
					pokemon.moveUsed(move, targetLoc);
				}
		
				// Dancer Petal Dance hack
				// TODO: implement properly
				const noLock = externalMove && !pokemon.volatiles['lockedmove'];
		
				if (zMove) {
					if (pokemon.illusion) {
						this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
					}
					this.battle.add('-zpower', pokemon);
					pokemon.side.zMoveUsed = true;
				}
				const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
				this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
				if (this.battle.activeMove) move = this.battle.activeMove;
				this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
				this.battle.runEvent('AfterMove', pokemon, target, move);
		
				// Dancer's activation order is completely different from any other event, so it's handled separately
				if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
					const dancers = [];
					for (const currentPoke of this.battle.getAllActive()) {
						if (pokemon === currentPoke) continue;
						if (currentPoke.hasAbility('dancer') && !currentPoke.isSemiInvulnerable()) {
							dancers.push(currentPoke);
						}
					}
					// Dancer activates in order of lowest speed stat to highest
					// Note that the speed stat used is after any volatile replacements like Speed Swap,
					// but before any multipliers like Agility or Choice Scarf
					// Ties go to whichever Pokemon has had the ability for the least amount of time
					dancers.sort(
						(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityOrder - a.abilityOrder
					);
					for (const dancer of dancers) {
						if (this.battle.faintMessages()) break;
						if (dancer.fainted) continue;
						this.battle.add('-activate', dancer, 'ability: Dancer');
						const dancersTarget = !target!.isAlly(dancer) && pokemon.isAlly(dancer) ? target! : pokemon;
						const dancersTargetLoc = dancer.getLocOf(dancersTarget);
						this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('dancer'), undefined, true);
					}
				}
				if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];

				// here we add the code
				const slotMove = pokemon.baseMoveSlots.find((value) => value.id === move.id);
				// @ts-ignore
				slotMove.TFUsed = true;

				this.battle.faintMessages();

				// here we add the code
				let canRuleWin = true;
				for (const mon of pokemon.side.pokemon) {
					for (const moveSlot of mon.baseMoveSlots) {
						// @ts-ignore
						if (moveSlot.TFUsed === false) {
							this.battle.debug(`${mon.name}'s move ${moveSlot.id} is not used.`);
							canRuleWin = false;
							break;
						}
					}
					if (canRuleWin === false) break;
				}
				if (canRuleWin === true) this.battle.win(pokemon.side);

				this.battle.checkWin();
			}
		},
	},
	{
		// asked by boingk#6794
		name: "[Gen 8] Godly Gift LC",
		desc: `Each Pok&eacute;mon receives one base stat from a (smol) God (LC Ubers Pok&eacute;mon) depending on its position in the team. If there is no LC Ubers Pok&eacute;mon, it uses the Pok&eacute;mon in the first (HP) slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660461/">Godly Gift</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Evasion Items Clause', 'Little Cup'],
		banlist: [
			'Scyther', 'Swirlix',
			'Chlorophyll', 'Moody', 'Baton Pass', 'Sticky Web',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 
			'Focus Band', 'King\'s Rock', 'Quick Claw', 
			'Sand Veil', 'Snow Cloak', 
		],
		restricted: [
			'Acupressure', 'Astral Barrage', 'Belly Drum', 'Bolt Beak', 'Clangorous Soul', 'Double Iron Bash', 'Electrify', 'Extreme Speed', 'Final Gambit',
			'Fishious Rend', 'Geomancy', 'Glacial Lance', 'Oblivion Wing', 'Precipice Blades', 'Shell Smash', 'Shift Gear', 'Thousand Arrows', 'Thunderous Kick',
			'V-create', 'Wicked Blow',
		],
	},
	{
		name: "[Gen 8] NFE",
		desc: `Only Pok&eacute;mon that can evolve are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656332/">NFE Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672463/">NFE Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Not Fully Evolved', 'Sleep Clause Mod'],
		banlist: [
			'Chansey', 'Doublade', 'Golbat', 'Haunter', 'Kadabra', 'Magmar', 'Magneton', 'Mr. Mime-Galar', 'Pawniard', 'Pikachu',
			'Porygon2', 'Rhydon', 'Scyther', 'Sneasel', 'Type: Null', 'Vulpix-Base', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Godly Gift",
		desc: `Each Pok&eacute;mon receives one base stat from a God (AG/Uber Pok&eacute;mon) depending on its position in the team. If there is no Uber Pok&eacute;mon, it uses the Pok&eacute;mon in the first slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660461/">Godly Gift</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Godly Gift Mod'],
		banlist: [
			'Blissey', 'Calyrex-Shadow', 'Chansey', 'Crawdaunt', 'Dragapult', 'Eternatus', 'Hawlucha', 'Kyogre', 'Marowak-Alola', 'Melmetal',
			'Nidoking', 'Nidoqueen', 'Pikachu', 'Toxapex', 'Xerneas', 'Zacian', 'Zacian-Crowned', 'Arena Trap', 'Huge Power', 'Moody',
			'Pure Power', 'Shadow Tag', 'Swift Swim', 'Bright Powder', 'Focus Band', 'King\'s Rock', 'Lax Incense', 'Quick Claw', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Turn Tables",
		desc: `Base stats below 100 get doubled, excluding HP.`,
		threads: [
			`None yet.`,
		],

		mod: 'gen8',
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
		name: "[Gen 8] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause'],
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
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable', 'Arceus Clause'],
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
		name: "[Gen 8 BDSP] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694036/">BDSP Ubers Discussion &amp; Resources</a>`,
		],

		mod: 'gen8bdsp',
		searchShow: false,
		ruleset: ['Standard'],
		banlist: ['AG', 'Baton Pass'],
	},
	{
		name: "[Gen 8 BDSP] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694307/">BDSP UU</a>`,
		],

		mod: 'gen8bdsp',
		searchShow: false,
		ruleset: ['[Gen 8 BDSP] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 8 BDSP] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3695563/">BDSP RU</a>`,
		],

		mod: 'gen8bdsp',
		searchShow: false,
		ruleset: ['[Gen 8 BDSP] UU'],
		banlist: ['UU', 'RUBL', 'Drought'],
	},
	{
		name: "[Gen 8 BDSP] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3697080/">BDSP NU</a>`,
		],

		mod: 'gen8bdsp',
		searchShow: false,
		ruleset: ['[Gen 8 BDSP] RU'],
		banlist: ['RU', 'NUBL', 'Damp Rock', 'Heat Rock'],
	},
	{
		name: "[Gen 8 BDSP] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3700009/">BDSP PU</a>`,
		],

		mod: 'gen8bdsp',
		searchShow: false,
		ruleset: ['[Gen 8 BDSP] NU'],
		banlist: ['NU', 'PUBL'],
	},
	{
		name: "[Gen 8 BDSP] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3696004/">BDSP LC</a>`,
		],

		mod: 'gen8bdsp',
		searchShow: false,
		ruleset: ['Little Cup', 'Standard'],
		banlist: ['Gligar', 'Meditite', 'Misdreavus', 'Munchlax', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Vulpix', 'Yanma', 'Moody', 'Baton Pass', 'Sticky Web'],
	},
	{
		name: "[Gen 8 BDSP] Monotype",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694267/">BDSP Monotype</a>`,
		],

		mod: 'gen8bdsp',
		searchShow: false,
		ruleset: ['[Gen 8 BDSP] OU', 'Same Type Clause'],
	},
	{
		name: "[Gen 8 BDSP] CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/9043074">BDSP Balanced Hackmons</a>`,
		],

		mod: 'gen8bdsp',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Moves Clause', 'Endless Battle Clause'],
		banlist: [
			'Shedinja', 'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword',
			'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble',
			'Wonder Guard', 'Comatose + Sleep Talk', 'Shell Smash',
		],
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8407209/">USUM Balanced Hackmons</a>`,
		],

		mod: 'gen7',
		ruleset: ['-Nonexistent', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
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
		ruleset: ['-Nonexistent', '2 Ability Clause', 'ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Groudon-Primal', 'Kyogre-Primal',
			'Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard',
			'Assist', 'Chatter'
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
		ruleset: ['-Nonexistent', 'OHKO Clause', 'HP Percentage Mod', 'Cancel Mod', '2 Ability Clause', 'Endless Battle Clause'],
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
		ruleset: ['-Nonexistent', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Mewtwo > 1', 
			'Mean Look + Hypnosis', 'Mean Look + Lovely Kiss', 'Mean Look + Sing', 'Mean Look + Sleep Powder', 'Mean Look + Spore', 
			'Spider Web + Hypnosis', 'Spider Web + Lovely Kiss', 'Spider Web + Sing', 'Spider Web + Sleep Powder', 'Spider Web + Spore'
		],
	},
	{
		name: "[Gen 1] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/balanced-hackmons-old-gens-hub.3661782/#post-8407359">RBY Balanced Hackmons</a>`,
		],

		mod: 'gen1',
		ruleset: ['-Nonexistent', 'Freeze Clause Mod', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Mewtwo', 
			'Bind', 'Clamp', 'Fire Spin', 'Wrap'
		],
	},
	{
		name: "[Gen 8 BDSP] Battle Festival Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3694269/">Battle Festival Doubles</a>`,
		],

		mod: 'gen8bdsp',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Flat Rules', 'Min Source Gen = 8'],
	},

	// BH Mashups
	///////////////////////////////////////////////////////////////////

	{
		section: "BH Mashups",
	},
	{
		name: "[Gen 8] Balanced Hackmons Doubles",

		mod: 'gen8',
		gameType: 'doubles', 
		ruleset: ['Standard Doubles', '!Gravity Sleep Clause', '!Obtainable', '-Nonexistent', 'Forme Clause', '!Species Clause',],
		banlist: [
			'Eternatus-Eternamax', 'Shedinja',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Imposter', 'Innards Out', 'Libero', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Justified', 'Anger Point', 'Steam Engine', 'Stamina', 'Rattled', 'Wandering Spirit', 'Soul-Heart', 
			'Comatose + Sleep Talk', 'Double Iron Bash', 'Octolock',
		],
	},
	{
		name: "[Gen 8] Balanced Hackmons Multi Battle",
		desc: `Balanced Hackmons + Multi Battle.`,

		mod: 'gen8',
		gameType: 'multi', 
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard Doubles', '!Gravity Sleep Clause', '!Obtainable', '-Nonexistent', 'Forme Clause', '!Species Clause', 'Picked Team Size = 3', ],
		banlist: [
			'Eternatus-Eternamax', 'Shedinja',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Imposter', 'Innards Out', 'Libero', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Justified', 'Anger Point', 'Steam Engine', 'Stamina', 'Rattled', 'Wandering Spirit', 'Soul-Heart', 
			'Comatose + Sleep Talk', 'Double Iron Bash', 'Octolock',
		],
	},
	{
		name: "[Gen 8] Free-For-All BH",
		desc: `Still in alpha phase`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3681641/">Free-For-All</a>`,
		],

		mod: 'gen8',
		gameType: 'freeforall',
		rated: false,
		tournamentShow: false,
		ruleset: ['Standard Doubles', '!Obtainable', '-Nonexistent', '!Species Clause', 'Forme Clause', 'Sleep Clause Mod', '!Gravity Sleep Clause'],
		banlist: [
			'Eternatus-Eternamax', 'Shedinja',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Moody',
			'Neutralizing Gas', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Soul-Heart', 
			'Comatose + Sleep Talk', 'Double Iron Bash', 'Octolock',
			'Acupressure', 'Aromatic Mist', 'Coaching', 'Court Change', 
			'Decorate', 'Final Gambit', 'Floral Healing', 'Follow Me', 
			'Heal Pulse', 'Rage Powder',
		],
	},
	{
		name: "[Gen 8] Balanced Hackmons LC",

		mod: 'gen8',
		ruleset: ['Little Cup', 'Standard OMs', 'Sleep Clause Mod', '!Obtainable', '-Nonexistent', '-Past'],
		banlist: [
			'Scyther', 'Sneasel', 'Type: Null', 
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Baton Pass', 'Bolt Beak', 'Double Iron Bash', 'Shell Smash',
		],
	},
	{
		name: "[Gen 8] Bonus Type BH",
		desc: `BH but Pok&eacute;mon can be nicknamed the name of a type to have that type added onto their current ones.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3683173/">Bonus Type</a>`,
		],

		mod: 'gen8',
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
		name: "[Gen 8] Camomons BH",
		desc: `BH but Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] Balanced Hackmons', 'Camomons Mod'],
		unbanlist: [
			'Darmanitan-Galar-Zen', 
		],
	},
	{
		name: "[Gen 8] Flipped BH",
		desc: `BH + Flipped.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3662020/">Flipped</a>`, 
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		// ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause', 'Flipped Mod'],
		// banlist: [
		// 	'Cramorant-Gorging', 'Eternatus-Eternamax', 'Shedinja',
		// 	'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
		// 	'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		// 	'Comatose + Sleep Talk', 'Belly Drum', 'Bolt Beak', 'Court Change', 'Double Iron Bash', 'Octolock', 'Shell Smash',
		// ],
		ruleset: ['[Gen 8] Balanced Hackmons', 'Flipped Mod'],
		banlist: ['Fur Coat', 'Ice Scales'],
		unbanlist: [
			'Calyrex-Shadow', 'Darmanitan-Galar-Zen', 'Zacian-Crowned', 'Shell Smash', 'Rusted Sword', 'Intrepid Sword',
		],
		restricted: ['Intrepid Sword'],
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
		name: "[Gen 8] Godly Gift BH",
		desc: `Godly Gift，但你可以如在 BH 那样自由编辑特性、技能和努力值。`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660461/">Godly Gift</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause'],
		banlist: [
			'Calyrex-Shadow',
			'Zacian-Crowned', 'Arena Trap', 'Huge Power', 'Moody', 'Pure Power',
			'Shadow Tag',
			'Pikachu',
			'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Shedinja',
			'Contrary', 'Gorilla Tactics', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero',
			'Magnet Pull', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Stakeout',
			'Water Bubble', 'Wonder Guard', 'Comatose + Sleep Talk', 'Rusted Sword', 'Court Change', 'Bolt Beak', 'Double Iron Bash',
			'Octolock', 'Shell Smash',
		],
		restricted: [
			'Calyrex-Ice', 'Dialga', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zamazenta-Crowned', 
			'Zekrom', 'Zygarde-Complete',
		],
		onValidateTeam(team) {
			const gods = new Set<string>();
			for (const set of team) {
				let species = this.dex.species.get(set.species);
				// if (typeof species.battleOnly === 'string') species = this.dex.species.get(species.battleOnly);
				if (this.ruleTable.isRestrictedSpecies(species) || this.toID(set.ability) === 'powerconstruct') {
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
				let godSpecies = this.dex.species.get(set.species);
				// const validator = this.dex.formats.getRuleTable(this.dex.formats.get(`gen${this.gen}ou`));
				if (this.toID(set.ability) === 'powerconstruct') {
					return true;
				}
				if (set.item) {
					const item = this.dex.items.get(set.item);
					if (item.megaEvolves === set.species) godSpecies = this.dex.species.get(item.megaStone);
				}
				return this.ruleTable.isRestrictedSpecies(godSpecies);
			}) || target.side.team[0];
			const stat = Dex.stats.ids()[target.side.team.indexOf(target.set)];
			const newSpecies = this.dex.deepClone(species);
			let godSpecies = this.dex.species.get(god.species);
			// if (godSpecies.forme === 'Crowned') {
			// 	godSpecies = this.dex.species.get(godSpecies.changesFrom || godSpecies.baseSpecies);
			// }
			newSpecies.bst -= newSpecies.baseStats[stat];
			newSpecies.baseStats[stat] = godSpecies.baseStats[stat];
			newSpecies.bst += newSpecies.baseStats[stat];
			return newSpecies;
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
		name: "[Gen 8] (Advanced) Godly Gift BH",
		desc: `BH, 但队伍中种族最高的精灵成为神，其种族值被队友依次继承。若有多个精灵种族并列最高则最靠前的成为神。`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/godly-gift.3660461/">Godly Gift</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Shedinja', 'Zacian-Crowned',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Bolt Beak', 'Court Change', 'Double Iron Bash', 'Octolock', 'Shell Smash',
			'Rusted Sword'
		],
		onModifySpeciesPriority: 3,
		onModifySpecies(species, target, source) {
			if (source || !target?.side) return;

			var godIndex = 0, godBst = 0;
			for (var i = 0; i < target.side.team.length; i++) {
				var tempSpecies = this.dex.species.get(target.side.team[i].species);
				if (tempSpecies.bst > godBst) {
					godBst = tempSpecies.bst;
					godIndex = i;
				}
			}
			var god = target.side.team[godIndex];

			// const god = target.side.team.find(set => {
			// 	let godSpecies = this.dex.species.get(set.species);
			// 	const validator = this.dex.formats.getRuleTable(this.dex.formats.get(`gen${this.gen}ou`));
			// 	if (this.toID(set.ability) === 'powerconstruct') {
			// 		return true;
			// 	}
			// 	if (set.item) {
			// 		const item = this.dex.items.get(set.item);
			// 		if (item.megaEvolves === set.species) godSpecies = this.dex.species.get(item.megaStone);
			// 	}
			// 	const isBanned = validator.isBannedSpecies(godSpecies);
			// 	return isBanned;
			// }) || target.side.team[0];

			const stat = Dex.stats.ids()[target.side.team.indexOf(target.set)];
			const newSpecies = this.dex.deepClone(species);
			let godSpecies = this.dex.species.get(god.species);
			// if (godSpecies.forme === 'Crowned') {
			// 	godSpecies = this.dex.species.get(godSpecies.changesFrom || godSpecies.baseSpecies);
			// }
			newSpecies.bst -= newSpecies.baseStats[stat];
			newSpecies.baseStats[stat] = godSpecies.baseStats[stat];
			newSpecies.bst += newSpecies.baseStats[stat];
			return newSpecies;
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
		name: "[Gen 8] Inverse BH",
		desc: `Still in alpha phase`,

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Inverse Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Shedinja',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Double Iron Bash', 'Octolock', 'Shell Smash',
		],
		restricted: ['Intrepid Sword'],
		onValidateSet(set) {
			const ability = this.dex.abilities.get(set.ability);
			if (ability.id === 'intrepidsword') {
				if (set.species !== 'Zacian-Crowned' || this.dex.toID(set.item) !== 'rustedsword') {
					return [`${set.name}'s ability ${ability.name} is banned.`];
				}
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
		name: "[Gen 8] Monotype BH",
		desc: `BH but all Pok&eacute;mon on a team must share a type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/om-mashup-megathread.3657159/post-9124457">Monotype BH</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause', 'Same Type Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Shedinja', 'Zacian-Crowned',
			'Eternatus',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Drizzle', 'Normalize',
			'Comatose + Sleep Talk', 'Bolt Beak', 'Court Change', 'Double Iron Bash', 'Octolock', 'Shell Smash',
			'Rusted Sword'
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
				newSpecies.baseStats[statName] = this.clampIntRange(newSpecies.baseStats[statName] + baseSpecies.baseStats[statName] - prevoSpecies.baseStats[statName], 1, 255);
				newSpecies.bst += newSpecies.baseStats[statName];
			}
			return newSpecies;
		},
	},
	{
		name: "[Gen 8] Scalemons BH",
		desc: `BH + Scalemons.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/scalemons.3658482/">Scalemons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],
		mod: 'gen8',
		ruleset: ['[Gen 8] Balanced Hackmons', 'Scalemons Mod'],
		banlist: [
			'Abra', 'Gastly',
			'Eviolite', 'Light Ball', 'Thick Club',
		],
		unbanlist: [
			'Calyrex-Shadow', 'Eternatus-Eternamax', 'Zacian-Crowned',
			'Belly Drum', 'Bolt Beak',
			'Rusted Sword',
		],
	},
	{
		name: "[Gen 8] Partners in Crime",
		desc: `Doubles-based metagame where both active ally Pok&eacute;mon share abilities and moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3706080/">Partners in Crime</a>`,
		],

		mod: 'partnersincrime',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Standard Doubles', 'Dynamax Clause'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Dialga', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Jirachi', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo',
			'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Urshifu-Base',
			'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Contrary',
			'Emergency Exit', 'Huge Power', 'Moody', 'Power Construct', 'Serene Grace', 'Shadow Tag', 'Wimp Out',
			'Wonder Guard', 'Ally Switch', 'Bolt Beak', 'Fishious Rend', 'Shell Smash', 'Swagger',
		],
		onBeforeSwitchIn(pokemon) {
			pokemon.m.curMoves = this.dex.deepClone(pokemon.moves);
			let ngas = false;
			for (const poke of this.getAllActive()) {
				if (this.toID(poke.ability) === ('neutralizinggas' as ID)) {
					ngas = true;
					break;
				}
			}
			const BAD_ABILITIES = ['trace', 'imposter', 'neutralizinggas'];
			// Abilities that must be applied before both sides trigger onSwitchIn to correctly
			// handle switch-in ability-to-ability interactions, e.g. Intimidate counters
			const NEEDED_BEFORE_SWITCH_IN_ABILITIES = [
				'clearbody', 'competitive', 'contrary', 'defiant', 'fullmetalbody', 'hypercutter', 'innerfocus',
				'mirrorarmor', 'oblivious', 'owntempo', 'rattled', 'scrappy', 'simple', 'whitesmoke',
			];
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.ability !== pokemon.ability) {
				if (!pokemon.m.innate && !BAD_ABILITIES.includes(this.toID(ally.ability)) &&
					NEEDED_BEFORE_SWITCH_IN_ABILITIES.includes(this.toID(ally.ability))) {
					pokemon.m.innate = 'ability:' + ally.ability;
					delete pokemon.volatiles[pokemon.m.innate];
					if (!ngas || ally.getAbility().isPermanent) pokemon.addVolatile(pokemon.m.innate);
				}
				if (!ally.m.innate && !BAD_ABILITIES.includes(this.toID(pokemon.ability)) &&
					NEEDED_BEFORE_SWITCH_IN_ABILITIES.includes(this.toID(pokemon.ability))) {
					ally.m.innate = 'ability:' + pokemon.ability;
					delete ally.volatiles[ally.m.innate];
					if (!ngas || pokemon.getAbility().isPermanent) ally.addVolatile(ally.m.innate);
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			let ngas = false;
			for (const poke of this.getAllActive()) {
				if (this.toID(poke.ability) === ('neutralizinggas' as ID)) {
					ngas = true;
					break;
				}
			}
			const BAD_ABILITIES = ['trace', 'imposter', 'neutralizinggas'];
			const ally = pokemon.side.active.find(mon => mon && mon !== pokemon && !mon.fainted);
			if (ally && ally.ability !== pokemon.ability) {
				if (!pokemon.m.innate && !BAD_ABILITIES.includes(this.toID(ally.ability))) {
					pokemon.m.innate = 'ability:' + ally.ability;
					delete pokemon.volatiles[pokemon.m.innate];
					if (!ngas || ally.getAbility().isPermanent) pokemon.addVolatile(pokemon.m.innate);
				}
				if (!ally.m.innate && !BAD_ABILITIES.includes(this.toID(pokemon.ability))) {
					ally.m.innate = 'ability:' + pokemon.ability;
					delete ally.volatiles[ally.m.innate];
					if (!ngas || pokemon.getAbility().isPermanent) ally.addVolatile(ally.m.innate);
				}
			}
		},
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
		name: "[Gen 8] Pokebilities",
		desc: `Pok&eacute;mon have all of their released abilities simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658482/">Scalemons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],
		mod: 'gen8',
		ruleset: ['[Gen 8] Balanced Hackmons', 'Scalemons Mod', 'Camomons Mod', 'Overflow Stat Mod'],
		banlist: [
			'Eviolite', 'Light Ball', 'Thick Club', 
		],
		unbanlist: [
			'Calyrex-Shadow', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Zacian-Crowned', 
			'Bolt Beak', 
			'Rusted Sword', 
		],
		restricted: ['Intrepid Sword'],
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
		onValidateSet(set) {
			const ability = this.dex.abilities.get(set.ability);
			if (ability.id === 'intrepidsword') {
				if (set.species !== 'Zacian-Crowned' || this.dex.toID(set.item) !== 'rustedsword') {
					return [`${set.name}'s ability ${ability.name} is banned.`];
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
		name: "[Gen 8] Shared Power",
		desc: `Once a Pok&eacute;mon switches in, its ability is shared with the rest of the team.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660877/">Shared Power</a>`,
		],

		mod: 'sharedpower',
		searchShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Eternatus', 'Genesect', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna',
			'Marshadow', 'Melmetal', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Shedinja', 'Solgaleo', 'Urshifu-Base', 'Urshifu-Rapid-Strike',
			'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom',
			'Arena Trap', 'Contrary', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Electric Surge ++ Surge Surfer',
			'Fur Coat', 'Guts', 'Harvest', 'Huge Power', 'Imposter', 'Innards Out', 'Libero', 'Magic Bounce', 'Magic Guard',
			'Magnet Pull', 'Mold Breaker', 'Moody', 'Neutralizing Gas', 'Power Construct', 'Queenly Majesty', 'Quick Draw',
			'Regenerator', 'Sand Rush', 'Sand Veil', 'Shadow Tag', 'Simple', 'Snow Cloak', 'Snow Warning ++ Slush Rush',
			'Speed Boost', 'Stakeout', 'Steelworker ++ Steely Spirit', 'Stench', 'Tinted Lens', 'Triage', 'Unaware',
			'Unburden', 'Water Bubble', 'King\'s Rock', 'Baton Pass',
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
			if (!format.getSharedPower) format = this.dex.formats.get('gen8sharedpower');
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
			if (!format.getSharedPower) format = this.dex.formats.get('gen8sharedpower');
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
		ruleset: ['Picked Team Size = 2', 'Max Team Size = 4', 'Standard OMs', 'Sleep Moves Clause', 'Evasion Abilities Clause'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Dialga', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black',
			'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Rayquaza', 'Reshiram', 'Solgaleo', 'Spectrier', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Zekrom', 'Moody', 'Power Construct', 'Bright Powder', 'Focus Sash', 'King\'s Rock', 'Lax Incense', 'Final Gambit',
		],
	},
	{
		name: "[Gen 8] Trademarked",
		desc: `Sacrifice your Pok&eacute;mon's ability for a status move that activates on switch-in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656980/">Trademarked</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Bolt Beak', 'Double Iron Bash', 'Octolock',
		],
		restricted: [
			'Zacian-Crowned', 
			'Baneful Bunker', 'Block', 'Copycat', 'Corrosive Gas', 'Detect', 'Destiny Bond', 'Disable', 'Encore', 'Fairy Lock', 'Ingrain', 'Instruct',
			'King\'s Shield', 'Mat Block', 'Mean Look', 'Obstruct', 'Octolock', 'Nature Power', 'Parting Shot', 'Psycho Shift',
			'Protect', 'Roar', 'Skill Swap', 'Sleep Talk', 'Spiky Shield', 'Substitute', 'Teleport', 'Whirlwind', 'Wish', 'Yawn',
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
		onValidateSet(set) {
			const ability = this.dex.abilities.get(set.ability);
			if (set.species === 'Zacian-Crowned') {
				if (this.dex.toID(set.item) !== 'rustedsword' || ability.id !== 'intrepidsword') {
					return [`${set.species} is banned.`];
				}
			}
		},
		validateSet(set, teamHas) {
			const dex = this.dex;
			const ability = dex.moves.get(set.ability);
			if (ability.category !== 'Status' || ability.status === 'slp' ||
				this.ruleTable.isRestricted(`move:${ability.id}`) || set.moves.map(this.dex.toID).includes(ability.id)) {
				return this.validateSet(set, teamHas);
			}
			if (ability.forceSwitch || ability.selfSwitch) {
				return [
					`Force-switching and self-switching moves are banned from being used as trademarks.`,
					`(${ability.name} is a ${ability.forceSwitch ? 'force' : 'self'}-switching move.)`,
				];
			}
			const customRules = this.format.customRules || [];
			if (!customRules.includes('!obtainableabilities')) customRules.push('!obtainableabilities');

			const TeamValidator: typeof import('../sim/team-validator').TeamValidator =
				require('../sim/team-validator').TeamValidator;

			const validator = new TeamValidator(dex.formats.get(`${this.format.id}@@@${customRules.join(',')}`));
			const moves = set.moves;
			set.moves = [ability.id];
			set.ability = dex.species.get(set.species).abilities['0'];
			let problems = validator.validateSet(set, {}) || [];
			if (problems.length) return problems;
			set.moves = moves;
			set.ability = dex.species.get(set.species).abilities['0'];
			problems = problems.concat(validator.validateSet(set, teamHas) || []);
			set.ability = ability.id;
			if (!teamHas.trademarks) teamHas.trademarks = {};
			teamHas.trademarks[ability.name] = (teamHas.trademarks[ability.name] || 0) + 1;
			return problems.length ? problems : null;
		},
		pokemon: {
			getAbility() {
				const move = this.battle.dex.moves.get(this.battle.toID(this.ability));
				if (!move.exists) return Object.getPrototypeOf(this).getAbility.call(this);
				return {
					id: move.id,
					name: move.name,
					onStart(this: Battle, pokemon: Pokemon) {
						this.add('-activate', pokemon, 'ability: ' + move.name);
						this.actions.useMove(move, pokemon);
					},
					toString() {
						return "";
					},
				};
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
		name: "[Gen 8] 350 Cup BH",
		desc: `BH，但所有种族和在350及以下的宝可梦种族值翻倍。`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/350-cup.3656554/">350 Cup</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Moves Clause', 'Endless Battle Clause'],
		banlist: [
			'Cramorant-Gorging', 'Eternatus-Eternamax', 'Shedinja',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Court Change','Double Iron Bash', 'Octolock', 'Shell Smash',
			'Eviolite', 'Light Ball',
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
		onModifySpecies(species, target, source, effect) {
			if (!species.baseStats) return;
			const pokemon = this.dex.deepClone(species);
			const pokemonBST = pokemon.bst;
			if (pokemonBST <= 350) {
				pokemon.bst = 0;
				let statName: StatID;
				for (statName in pokemon.baseStats as StatsTable) {
					pokemon.baseStats[statName] = this.clampIntRange(pokemon.baseStats[statName] * 2, 1, 255);
					pokemon.bst += pokemon.baseStats[statName];
				}
			}
			return pokemon;
		},
	},

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
			faintMessages(lastFirst) {
				if (this.ended) return;
				const length = this.faintQueue.length;
				if (!length) return false;
				if (lastFirst) {
					this.faintQueue.unshift(this.faintQueue[this.faintQueue.length - 1]);
					this.faintQueue.pop();
				}
				let faintData;
				while (this.faintQueue.length) {
					faintData = this.faintQueue.shift()!;
					const pokemon: Pokemon = faintData.target;
					if (!pokemon.fainted &&
						this.runEvent('BeforeFaint', pokemon, faintData.source, faintData.effect)) {
						this.add('faint', pokemon);
						pokemon.side.pokemonLeft--;
						this.runEvent('Faint', pokemon, faintData.source, faintData.effect);
						this.singleEvent('End', pokemon.getAbility(), pokemon.abilityState, pokemon);
						pokemon.clearVolatile(false);
						pokemon.fainted = true;
						pokemon.isActive = false;
						pokemon.isStarted = false;
						pokemon.side.faintedThisTurn = pokemon;
					}
				}

				if (this.gen <= 1) {
					// in gen 1, fainting skips the rest of the turn
					// residuals don't exist in gen 1
					this.queue.clear();
				} else if (this.gen <= 3 && this.gameType === 'singles') {
					// in gen 3 or earlier, fainting in singles skips to residuals
					for (const pokemon of this.getAllActive()) {
						if (this.gen <= 2) {
							// in gen 2, fainting skips moves only
							this.queue.cancelMove(pokemon);
						} else {
							// in gen 3, fainting skips all moves and switches
							this.queue.cancelAction(pokemon);
						}
					}
				}

				if (!this.p1.pokemonLeft && !this.p2.pokemonLeft) {
					this.win(faintData ? faintData.target.side.foe : null);
					return true;
				}
				if (!this.p1.pokemonLeft) {
					this.win(this.p1);
					return true;
				}
				if (!this.p2.pokemonLeft) {
					this.win(this.p2);
					return true;
				}
				if (faintData) {
					this.runEvent('AfterFaint', faintData.target, faintData.source, faintData.effect, length);
				}
				return false;
			},
		},
	},

	// Randomized Format Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Format Spotlight",
		column: 2,
	},
	{
		name: "[Gen 4] Shared Power Random Battle",
		desc: `[Gen 4] Random Battle with aspects of [Gen 8] Shared Power`,

		mod: 'gen4',
		team: 'random',
		ruleset: ['[Gen 4] Random Battle', 'Team Preview'],
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
			if (!format.getSharedPower) format = this.dex.formats.get('gen8sharedpower');
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
			if (!format.getSharedPower) format = this.dex.formats.get('gen8sharedpower');
			for (const ability of format.getSharedPower!(pokemon)) {
				if (ability === 'noability') {
					this.hint(`Mirror Armor and Trace break in Shared Power formats that don't use Shared Power as a base, so they get removed from non-base users.`);
				}
				const effect = 'ability:' + ability;
				delete pokemon.volatiles[effect];
				pokemon.addVolatile(effect);
			}
		},
		field: {
			suppressingWeather() {
				for (const pokemon of this.battle.getAllActive()) {
					const innates = Object.keys(pokemon.volatiles).filter(x => x.startsWith('ability:'));
					if (pokemon && !pokemon.ignoringAbility() &&
						(pokemon.getAbility().suppressWeather || innates.some(x => (
							this.battle.dex.abilities.get(x.replace('ability:', '')).suppressWeather
						)))) {
						return true;
					}
				}
				return false;
			},
		},
		pokemon: {
			hasAbility(ability) {
				if (this.ignoringAbility()) return false;
				if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
				const abilityid = this.battle.toID(ability);
				return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
			},
			ignoringAbility() {
				// Check if any active pokemon have the ability Neutralizing Gas
				let neutralizinggas = false;
				for (const pokemon of this.battle.getAllActive()) {
					// can't use hasAbility because it would lead to infinite recursion
					if (
						(pokemon.ability === ('neutralizinggas' as ID) || pokemon.m.abils?.includes('ability:neutralizinggas')) &&
						!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending
					) {
						neutralizinggas = true;
						break;
					}
				}

				return !!(
					(this.battle.gen >= 5 && !this.isActive) ||
					((this.volatiles['gastroacid'] ||
						(neutralizinggas && (this.ability !== ('neutralizinggas' as ID) ||
							this.m.abils?.includes('ability:neutralizinggas'))
						)) && !this.getAbility().isPermanent
					)
				);
			},
		},
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 8] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656414/">Almost Any Ability</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3682690/">AAA Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', '!Obtainable Abilities', '2 Ability Clause', 'Sleep Moves Clause'],
		banlist: [
			'Archeops', 'Blacephalon', 'Buzzwole', 'Calyrex-Ice', 'Calyrex-Shadow', 'Dialga', 'Dracovish', 'Dragapult', 'Dragonite', 'Eternatus', 'Gengar',
			'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kartana', 'Keldeo', 'Kommo-o', 'Kyogre', 'Kyurem', 'Kyurem-Black', 'Kyurem-White',
			'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Noivern',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja', 'Solgaleo', 'Spectrier', 'Urshifu', 'Urshifu-Rapid-Strike',
			'Victini', 'Weavile', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta-Base', 'Zekrom', 'Zeraora', 'Zygarde-Base',
			'Arena Trap', 'Comatose', 'Contrary', 'Fluffy', 'Fur Coat', 'Gorilla Tactics', 'Huge Power', 'Ice Scales', 'Illusion', 'Imposter',
			'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Poison Heal', 'Protean',
			'Pure Power', 'Shadow Tag', 'Simple', 'Stakeout', 'Speed Boost', 'Water Bubble', 'Wonder Guard', 'King\'s Rock', 'Baton Pass',
		],
	},
	{
		name: "[Gen 6] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8772336/">ORAS Almost Any Ability</a>`,
		],

		mod: 'gen6',
		ruleset: ['Standard', 'Swagger Clause', '2 Ability Clause', 'AAA Restricted Abilities', '!Obtainable Abilities'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass', 'Archeops', 'Bisharp', 'Chatot', 'Dragonite', 'Keldeo', 'Kyurem-Black', 'Mamoswine', 'Regigigas', 'Shedinja', 'Slaking', 'Smeargle', 'Snorlax', 'Suicune', 'Terrakion', 'Weavile', 'Dynamic Punch', 'Zap Cannon'],
		unbanlist: ['Aegislash', 'Blaziken', 'Deoxys-Defense', 'Deoxys-Speed', 'Genesect', 'Greninja', 'Landorus'],
		restricted: ['Arena Trap', 'Contrary', 'Fur Coat', 'Huge Power', 'Illusion', 'Imposter', 'Parental Bond', 'Protean', 'Pure Power', 'Simple', 'Speed Boost', 'Wonder Guard'],
	},
	{
		name: "[Gen 8] Mix and Mega",
		desc: `Mega evolve any Pok&eacute;mon with any mega stone and no limit. Boosts based on mega evolution from gen 7.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656469/">Mix and Mega</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659028/">M&amp;M Resources</a>`,
		],

		mod: 'mixandmega',
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Shadow', 'Eternatus', 'Kyogre', 'Zacian',
			'Beedrillite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite',
			'Moody', 'Shadow Tag', 'Baton Pass', 'Electrify',
		],
		restricted: [
			'Calyrex-Ice', 'Dialga', 'Gengar', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyurem-Black', 'Kyurem-White', 'Lugia',
			'Lunala', 'Marshadow', 'Melmetal', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Regigigas', 'Reshiram', 'Urshifu', 'Urshifu-Rapid-Strike', 'Xerneas',
			'Yveltal', 'Zekrom', 'Zygarde-Complete',
		],
		onValidateTeam(team) {
			const itemTable = new Set<ID>();
			for (const set of team) {
				const item = this.dex.items.get(set.item);
				if (!item.megaStone) continue;
				const natdex = this.ruleTable.has('standardnatdex');
				if (natdex && item.id !== 'ultranecroziumz') continue;
				const species = this.dex.species.get(set.species);
				if (species.isNonstandard && !this.ruleTable.has(`+${this.toID(species.isNonstandard)}`)) {
					return [`${species.baseSpecies} does not exist in gen 8.`];
				}
				if (natdex && species.name.startsWith('Necrozma-') && item.id === 'ultranecroziumz') {
					continue;
				}
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
	},
	{
		name: "[Gen 8] Battle Factory",
		desc: `Randomized teams of Pok&eacute;mon for a generated Smogon tier with sets that are competitively viable.`,

		mod: 'gen8',
		team: 'randomFactory',
		ruleset: ['Standard', 'Dynamax Clause'],
	},
	{
		name: "[Gen 8] BSS Factory",
		desc: `Randomized 3v3 Singles featuring Pok&eacute;mon and movesets popular in Battle Stadium Singles.`,
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
		name: "[Gen 8] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656429/">STABmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3695169/">STABmons Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'STABmons Move Legality', 'Sleep Moves Clause'],
		banlist: [
			'Aegislash', 'Blacephalon', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Dragapult', 'Dragonite', 'Eternatus',
			'Genesect', 'Garchomp', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kartana', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus',
			'Landorus-Therian', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Porygon-Z', 'Rayquaza', 'Reshiram', 'Silvally', 'Solgaleo', 'Spectrier', 'Tapu Bulu', 'Tapu Koko', 'Tapu Lele', 'Thundurus-Base',
			'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zapdos-Galar', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Magnet Pull', 'Moody', 'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Baton Pass',
		],
		restricted: [
			'Acupressure', 'Astral Barrage', 'Belly Drum', 'Bolt Beak', 'Clangorous Soul', 'Double Iron Bash', 'Electrify', 'Extreme Speed', 'Final Gambit',
			'Fishious Rend', 'Geomancy', 'Glacial Lance', 'Oblivion Wing', 'Precipice Blades', 'Shell Smash', 'Shift Gear', 'Thousand Arrows', 'Thunderous Kick',
			'V-create', 'Wicked Blow',
		],
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
		name: "[Gen 8] Camomons",
		desc: `Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Camomons Mod', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Dragonite', 'Eternatus', 'Genesect', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Hydreigon', 'Kartana', 'Kyogre', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Marshadow',
			'Mew', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shedinja', 'Solgaleo',
			'Spectrier', 'Tornadus-Therian', 'Volcarona', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zeraora',
			'Zygarde-Base', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Calm Mind',
		],
	},
	{
		name: "[Gen 8] NFE",
		desc: `Only Pok&eacute;mon that can evolve are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656332/">NFE Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3672463/">NFE Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Not Fully Evolved', 'Sleep Clause Mod'],
		banlist: [
			'Chansey', 'Doublade', 'Golbat', 'Haunter', 'Kadabra', 'Magmar', 'Magneton', 'Mr. Mime-Galar', 'Pawniard', 'Pikachu',
			'Porygon2', 'Rhydon', 'Scyther', 'Sneasel', 'Type: Null', 'Vulpix-Base', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Godly Gift",
		desc: `Each Pok&eacute;mon receives one base stat from a God (AG/Uber Pok&eacute;mon) depending on its position in the team. If there is no Uber Pok&eacute;mon, it uses the Pok&eacute;mon in the first slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660461/">Godly Gift</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Sleep Moves Clause'],
		banlist: [
			'Blissey', 'Calyrex-Shadow', 'Chansey', 'Crawdaunt', 'Dragapult', 'Eternatus', 'Hawlucha', 'Kyogre', 'Marowak-Alola', 'Melmetal',
			'Nidoking', 'Nidoqueen', 'Pikachu', 'Toxapex', 'Xerneas', 'Zacian', 'Zacian-Crowned', 'Uber > 1', 'AG ++ Uber > 1', 'Arena Trap',
			'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Swift Swim', 'Bright Powder', 'Focus Band', 'King\'s Rock', 'Lax Incense',
			'Quick Claw', 'Baton Pass',
		],
		onValidateTeam(team) {
			const gods = new Set<string>();
			for (const set of team) {
				let species = this.dex.species.get(set.species);
				if (typeof species.battleOnly === 'string') species = this.dex.species.get(species.battleOnly);
				if (set.item && this.dex.items.get(set.item).megaStone) {
					const item = this.dex.items.get(set.item);
					if (item.megaEvolves === species.baseSpecies) {
						species = this.dex.species.get(item.megaStone);
					}
				}
				if (this.ruleTable.has('standardnatdex')) {
					const format = this.dex.formats.getRuleTable(this.dex.formats.get('gen8nationaldex'));
					if (format.isBannedSpecies(species)) gods.add(species.name);
				} else {
					if (['ag', 'uber'].includes(this.toID(species.tier)) || this.toID(set.ability) === 'powerconstruct') {
						gods.add(species.name);
					}
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
				let godSpecies = this.dex.species.get(set.species);
				const isNatDex = this.format.ruleTable?.has('standardnatdex');
				const validator = this.dex.formats.getRuleTable(
					this.dex.formats.get(`gen${isNatDex && this.gen < 8 ? 8 : this.gen}${isNatDex ? 'nationaldex' : 'ou'}`)
				);
				if (this.toID(set.ability) === 'powerconstruct') {
					return true;
				}
				if (set.item) {
					const item = this.dex.items.get(set.item);
					if (item.megaEvolves === set.species) godSpecies = this.dex.species.get(item.megaStone);
				}
				const isBanned = validator.isBannedSpecies(godSpecies);
				return isBanned;
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
		name: "[Gen 6] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286277/">ORAS Ubers</a>`,
		],

		mod: 'gen6',
		// searchShow: false,
		ruleset: ['Standard', 'Swagger Clause', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 3] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3666831/">ADV Doubles OU</a>`,
		],

		mod: 'gen3',
		// searchShow: false,
		gameType: 'doubles',
		ruleset: ['Standard', '!Switch Priority Clause Mod'],
		banlist: ['Uber', 'Soul Dew', 'Swagger'],
		unbanlist: ['Deoxys-Defense', 'Latias', 'Wobbuffet', 'Wynaut'],
	},
	{
		name: "[Gen 3] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3585923/">ADV UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3548578/">ADV UU Viability Rankings</a>`,
		],

		mod: 'gen3',
		// searchShow: false,
		ruleset: ['Standard'],
		banlist: ['Uber', 'OU', 'UUBL', 'Smeargle + Ingrain', 'Arena Trap', 'Baton Pass', 'Swagger'],
	},

	// Past Gens OU
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Gens OU",
		column: 3,
	},
	{
		name: "[Gen 7] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/sm/tags/ou/">USM OU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8162240/">USM OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3667522/">USM OU Viability Rankings</a>`,
		],
		onModifySpecies(species, target, source, effect) {
			if (!species.baseStats) return;
			const pokemon = this.dex.deepClone(species);
			pokemon.bst = 0;
			let statName: StatID;
			for (statName in pokemon.baseStats as StatsTable) {
				pokemon.baseStats[statName] = pokemon.baseStats[statName] <= 70 ? this.clampIntRange(pokemon.baseStats[statName] * 2, 1, 255) : pokemon.baseStats[statName];
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
		name: "[Gen 8] Category Swap",
		desc: `All physical moves become special, and all special moves become physical.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3702709/">Category Swap</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Category Swap Mod', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Giratina',
			'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala',
			'Magearna', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Nidoking', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Arena Trap', 'Moody',
			'Power Construct', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Draco Meteor', 'Overheat',
		],
	},
	{
		name: "[Gen 8] Chimera 1v1",
		desc: `Bring 6 Pok&eacute;mon and choose their order at Team Preview. The lead Pok&eacute;mon then receives the item, ability, stats, and moves of the other five Pok&eacute;mon, which play no further part in the battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661215/">Chimera 1v1</a>`,
		],

		mod: 'gen8',
		ruleset: ['Chimera 1v1 Rule', 'Standard OMs', 'Sleep Moves Clause'],
		banlist: ['Shedinja', 'Huge Power', 'Moody', 'Neutralizing Gas', 'Truant', 'Eviolite', 'Focus Sash', 'Perish Song', 'Transform', 'Trick', 'Fishious Rend', 'Bolt Beak', 'Disable', 'Double Iron Bash', 'Switcheroo'],
	},
	{
		name: "[Gen 8] Cross Evolution",
		desc: `Give a Pok&eacute;mon a Pok&eacute;mon name of the next evolution stage as a nickname to inherit stat changes, typing, abilities, and up to 2 moves from the next stage Pok&eacute;mon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657562/">Cross Evolution</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},

	// Retro Other Metagames
	///////////////////////////////////////////////////////////////////
	{
		section: "Retro Other Metagames",
		column: 3,
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8407209/">USM Balanced Hackmons</a>`,
		],

		mod: 'gen7',
		ruleset: ['-Nonexistent', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'CFZ Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Groudon-Primal', 'Rayquaza-Mega', 'Gengarite', 'Comatose + Sleep Talk', 'Chatter',
			'Arena Trap', 'Contrary', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
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
			if (!set.crossMovesLeft) return problem;
			// @ts-ignore
			if (this.checkCanLearn(move, set.crossSpecies)) return problem;
			// @ts-ignore
			set.crossMovesLeft--;
			return null;
		},
		validateSet(set, teamHas) {
			const crossSpecies = this.dex.species.get(set.name);
			let problems = this.dex.formats.get('Pokemon').onChangeSet?.call(this, set, this.format) || null;
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
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable");
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
			// @ts-ignore
			set.crossMovesLeft = 2;
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
			const crossIsUnreleased = (crossSpecies.tier === "Unreleased" && crossSpecies.isNonstandard === "Unobtainable");
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
		name: "[Gen 8] Inheritance",
		desc: `Pok&eacute;mon may use the ability and moves of another, as long as they forfeit their own learnset.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656811/">Inheritance</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', '2 Ability Clause', 'Sleep Moves Clause'],
		banlist: [
			'Blacephalon', 'Blaziken', 'Butterfree', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chansey', 'Combusken', 'Cresselia', 'Darmanitan-Galar', 'Dialga',
			'Dracovish', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kartana', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia',
			'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo', 'Natu', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza',
			'Regieleki', 'Regigigas', 'Reshiram', 'Sableye', 'Shedinja', 'Solgaleo', 'Spectrier', 'Tapu Koko', 'Toxtricity', 'Torkoal', 'Urshifu-Base',
			'Xatu', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zeraora', 'Zekrom', 'Arena Trap', 'Contrary',
			'Drizzle', 'Huge Power', 'Imposter', 'Innards Out', 'Libero', 'Moody', 'Power Construct', 'Pure Power', 'Quick Draw', 'Shadow Tag', 'Sheer Force',
			'Simple', 'Unaware', 'Unburden', 'Water Bubble', 'King\'s Rock', 'Quick Claw', 'Baton Pass', 'Bolt Beak', 'Fishious Rend', 'Shell Smash',
			'Thousand Arrows',
		],
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
					if (pokemon.isNonstandard || unreleased(pokemon)) continue;
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
			if (species.isNonstandard || unreleased(species)) {
				return [`${species.name} is not obtainable in Generation ${this.dex.gen}.`];
			}

			const name = set.name;
			if (this.ruleTable.isBannedSpecies(species)) {
				return this.validateSet(set, teamHas);
			}

		mod: 'gen7',
		searchShow: false,
		ruleset: ['Same Type Clause', 'Standard', 'Swagger Clause'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Gengar-Mega', 'Giratina', 'Giratina-Origin',
			'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kartana', 'Kyogre', 'Kyurem-White', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna',
			'Marshadow', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Focus Band', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 7] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031460/">USUM 1v1</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Swagger Clause', 'Evasion Moves Clause', 'Accuracy Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
		],
		banlist: [
			'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mew', 'Mewtwo',
			'Mimikyu', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky',
			'Snorlax', 'Solgaleo', 'Tapu Koko', 'Xerneas', 'Yveltal', 'Zekrom', 'Moody', 'Focus Sash', 'Grass Whistle', 'Hypnosis',
			'Perish Song', 'Sing', 'Detect + Fightinium Z',
		],
	},
	{
		name: "[Gen 7] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3587441/">Anything Goes Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3591711/">Anything Goes Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3646736/">Anything Goes Sample Teams</a>`,
		],

			if (!teamHas.abilitySources) teamHas.abilitySources = Object.create(null);
			const validSources: string[] = teamHas.abilitySources[this.dex.toID(set.species)] = []; // Evolution families

			let canonicalSource = ''; // Specific for the basic implementation of Donor Clause (see onValidateTeam).

			for (const donor of pokemonWithAbility) {
				const donorSpecies = this.dex.species.get(donor);
				let format = this.format;
				if (!format.getEvoFamily) format = this.dex.formats.get('gen8inheritance');
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
			if (this.ruleTable.has('2abilityclause')) {
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
				for (const set of team) {
					let ability = this.toID(set.ability.split('0')[0]);
					if (!ability) continue;
					if (ability in base) ability = base[ability] as ID;
					if ((abilityTable.get(ability) || 0) >= 2) {
						return [
							`You are limited to two of each ability by 2 Ability Clause.`,
							`(You have more than two ${this.dex.abilities.get(ability).name} variants)`,
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
				if (!format.getEvoFamily) format = this.dex.formats.get('gen8inheritance');
				evoFamilyLists.push(abilitySources.map(format.getEvoFamily!));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			const requiredFamilies = Object.create(null);
			for (const evoFamilies of evoFamilyLists) {
				if (evoFamilies.length !== 1) continue;
				const [familyId] = evoFamilies;
				if (!(familyId in requiredFamilies)) requiredFamilies[familyId] = 1;
				requiredFamilies[familyId]++;
				if (requiredFamilies[familyId] > 2) {
					return [
						`You are limited to up to two inheritances from each evolution family by the Donor Clause.`,
						`(You inherit more than twice from ${this.dex.species.get(familyId).name}).`,
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

		mod: 'linked',
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
		name: "[Gen 8] Mirror Move",
		desc: `Two of your moves are chosen in the teambuilder, and the other two moves are copied from the opponent's moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/mirror-move.3572990/">Mirror Move</a>`,
		],

		mod: 'mirrormove',
		debug: true,
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak',
			'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Baton Pass',
			'Imprison',
		],
		onValidateSet(set) {
			if (set.moves.length > 2) {
				return ["You are allowed to bring only 2 moves on a Pokemon.", "(" + set.species + " has more than 2 moves)"];
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
		ruleset: ['Standard OMs', '2 Ability Clause', 'Sleep Moves Clause'],
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
			if (!this.ruleTable.has('2abilityclause')) return;
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
						`You are limited to two of each ability by 2 Ability Clause.`,
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
		name: "[Gen 8] Nature Swap",
		desc: `Pok&eacute;mon have their base stats swapped depending on their nature.`,
		threads: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3673622/">Nature Swap</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Flat Rules', 'Min Source Gen = 6'],
		banlist: ['Battle Bond'],
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

	// OR/AS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "OR/AS Singles",
		column: 4,
	},
	{
		name: "[Gen 6] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3679692/">Pok&eacute;bilities</a>`,
		],
		mod: 'pokebilities',
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Conkeldurr', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Dracozolt',
			'Eternatus', 'Excadrill', 'Genesect', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black',
			'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Porygon-Z', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Spectrier', 'Urshifu-Base',
			'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta-Base', 'Zekrom', 'Zygarde-Base', 'Power Construct',
			'Baton Pass', 'King\'s Rock',
			// Moody users
			'Glalie', 'Octillery', 'Remoraid', 'Snorunt',
			// Shadow Tag/Arena Trap
			'Diglett-Base', 'Dugtrio-Base', 'Gothita', 'Gothitelle', 'Gothorita', 'Trapinch', 'Wobbuffet', 'Wynaut',
		],
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
		name: "[Gen 8] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656851/">Pure Hackmons</a>`,
		],

		mod: 'gen8',
		debug: true,
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8 BDSP] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3693868/">Pure Hackmons</a>`,
		],

		mod: 'gen8bdsp',
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 6] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/9029427/">ORAS Pure Hackmons</a>`,
		],

		mod: 'gen6',
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'EV limit = 510'],
	},
	{
		name: "[Gen 8] Re-Evolution",
		desc: `Pok&eacute;mon gain the stat changes they would gain from evolving again.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3703643/">Re-Evolution</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Re-Evolution Mod', 'Evasion Abilities Clause', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Shadow', 'Darmanitan-Galar', 'Gyarados', 'Lunala', 'Milotic', 'Naganadel', 'Solgaleo', 'Slowking-Galar', 'Urshifu-Base',
			'Volcarona', 'Zacian-Crowned', 'Arena Trap', 'Moody', 'Shadow Tag', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Shared Power",
		desc: `Once a Pok&eacute;mon switches in, its ability is shared with the rest of the team.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660877/">Shared Power</a>`,
		],

		mod: 'sharedpower',
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Aegislash', 'Altaria-Mega', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect',
			'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-White',
			'Lucario-Mega', 'Lugia', 'Mawile-Mega', 'Medicham-Mega', 'Metagross-Mega', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Sableye-Mega',
			'Salamence-Mega', 'Shaymin-Sky', 'Slowbro-Mega', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Shadow Tag', 'Damp Rock', 'Focus Band', 'King\'s Rock', 'Quick Claw', 'Razor Fang', 'Smooth Rock', 'Soul Dew', 'Baton Pass',
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
			if (!format.getSharedPower) format = this.dex.formats.get('gen8sharedpower');
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
			if (!format.getSharedPower) format = this.dex.formats.get('gen8sharedpower');
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
		name: "[Gen 8] The Loser's Game",
		desc: `The first player to lose all of their Pok&eacute;mon wins.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657270/">The Loser's Game</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Sleep Clause Mod', '!OHKO Clause', 'Picked Team Size = 6', 'Adjust Level = 100'],
		banlist: [
			'Sandshrew-Alola', 'Shedinja', 'Infiltrator', 'Magic Guard', 'Choice Scarf',
			'Explosion', 'Final Gambit', 'Healing Wish', 'Lunar Dance', 'Magic Room', 'Memento', 'Misty Explosion', 'Self-Destruct',
		],
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

		mod: 'gen5',
		searchShow: false,
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Sleep Clause Mod'],
		banlist: ['Uber', 'OU', 'UUBL', 'Arena Trap', 'Drought', 'Sand Stream', 'Snow Warning', 'Prankster + Assist', 'Prankster + Copycat', 'Baton Pass'],
	},
	{
		name: "[Gen 5] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3473124/">BW2 RU Viability Rankings</a>`,
		],

		mod: 'gen5',
		searchShow: false,
		ruleset: ['[Gen 5] UU', 'Baton Pass Clause', '!Sleep Clause Mod', 'Sleep Moves Clause'],
		banlist: ['UU', 'RUBL', 'Shadow Tag', 'Shell Smash + Baton Pass'],
		unbanlist: ['Prankster + Assist', 'Prankster + Copycat', 'Baton Pass'],
	},
	{
		name: "[Gen 5] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/6431094/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3484121/">BW2 NU Viability Rankings</a>`,
		],

				if (this.gen <= 1) {
					// in gen 1, fainting skips the rest of the turn
					// residuals don't exist in gen 1
					this.queue.clear();
				} else if (this.gen <= 3 && this.gameType === 'singles') {
					// in gen 3 or earlier, fainting in singles skips to residuals
					for (const pokemon of this.getAllActive()) {
						if (this.gen <= 2) {
							// in gen 2, fainting skips moves only
							this.queue.cancelMove(pokemon);
						} else {
							// in gen 3, fainting skips all moves and switches
							this.queue.cancelAction(pokemon);
						}
					}
				}

				if (!this.p1.pokemonLeft && !this.p2.pokemonLeft) {
					this.win(faintData ? faintData.target.side.foe : null);
					return true;
				}
				if (!this.p1.pokemonLeft) {
					this.win(this.p1);
					return true;
				}
				if (!this.p2.pokemonLeft) {
					this.win(this.p2);
					return true;
				}
				if (faintData) {
					this.runEvent('AfterFaint', faintData.target, faintData.source, faintData.effect, length);
				}
				return false;
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
		ruleset: ['Standard OMs', 'Sleep Clause Mod', 'Tier Shift Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 
			'Damp Rock', 'Eviolite', 'Heat Rock'
		],
		unbanlist: ['Zamazenta-Crowned'],
	},
	{
		name: "[Gen 8] Trademarked",
		desc: `Sacrifice your Pok&eacute;mon's ability for a status move that activates on switch-in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656980/">Trademarked</a>`,
		],

		mod: 'gen8',
		// While bugs are being fixed
		searchShow: false,
		challengeShow: false,
		tournamentShow: false,
		ruleset: ['Standard OMs', 'Sleep Clause Mod'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Darmanitan-Galar', 'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Kyurem-Black', 'Kyurem-White', 'Giratina',
			'Giratina-Origin', 'Genesect', 'Groudon', 'Ho-Oh', 'Kartana', 'Kyogre', 'Lugia', 'Lunala', 'Magearna', 'Marowak-Alola', 'Marshadow', 'Melmetal',
			'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Spectrier',
			'Urshifu-Base', 'Victini', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Neutralizing Gas', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		banlist: ['Uber', 'Cottonee', 'Dragonite', 'Jirachi', 'Kyurem-Black', 'Mew', 'Togekiss', 'Whimsicott', 'Victini', 'Focus Band', 'Focus Sash', 'Quick Claw', 'Soul Dew', 'Perish Song'],
		unbanlist: ['Genesect', 'Landorus', 'Manaphy', 'Thundurus', 'Tornadus-Therian'],
	},
	{
		name: "[Gen 5] ZU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8034680/">BW2 ZU</a>`,
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
				return [`${ability.name} is not a status move, and cannot be used as a trademark.`];
			}
			if (ability.forceSwitch || ability.selfSwitch) {
				return [
					`Force-switching and self-switching moves are banned from being used as trademarks.`,
					`(${ability.name} is a ${ability.forceSwitch ? 'force' : 'self'}-switching move.)`,
				];
			}
			const irrevokablyRestricted = [
				'Assist', 'Copycat', 'Metronome', 'Mirror Move', 'Sleep Talk', // Could call another unsafe trademark
				'Recycle', 'Trace', // Causes endless turns
				'Skill Swap', // Self-propagates indefinitely
			];
			for (const m of set.moves) {
				const move = dex.moves.get(m);
				if (irrevokablyRestricted.includes(move.name)) {
					return [`${move.name} is banned from Trademark, irrespective of custom rules, because it can cause endless turns.`];
				}
			}
			if (irrevokablyRestricted.includes(ability.name)) {
				return [`${ability.name} cannot safely function as a trademark.`];
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

			const TeamValidator: typeof import('../sim/team-validator').TeamValidator =
				require('../sim/team-validator').TeamValidator;

			const validator = new TeamValidator(dex.formats.get(`${this.format.id}@@@${customRules.join(',')}`));
			const moves = set.moves;
			set.moves = [ability.id];
			set.ability = dex.species.get(set.species).abilities['0'];
			let problems = validator.validateSet(set, {}) || [];
			if (problems.length) return problems;
			set.moves = moves;
			set.ability = dex.species.get(set.species).abilities['0'];
			problems = problems.concat(validator.validateSet(set, teamHas) || []);
			set.ability = ability.id;
			if (!teamHas.trademarks) teamHas.trademarks = {};
			teamHas.trademarks[ability.name] = (teamHas.trademarks[ability.name] || 0) + 1;
			return problems.length ? problems : null;
		},
		pokemon: {
			getAbility() {
				const move = this.battle.dex.moves.get(this.battle.toID(this.ability));
				if (!move.exists) return Object.getPrototypeOf(this).getAbility.call(this);
				return {
					id: move.id,
					name: move.name,
					onStart(this: Battle, pokemon: Pokemon) {
						this.add('-activate', pokemon, 'ability: ' + move.name);
						this.actions.useMove(move, pokemon);
					},
					toString() {
						return "";
					},
				};
			},
		},
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 2,
	},
	{
		name: "[Gen 8] Hackmons Cup",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item.`,

		mod: 'gen8',
		team: 'randomHC',
		ruleset: ['Obtainable Formes', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 8] Doubles Hackmons Cup",

		mod: 'gen8',
		gameType: 'doubles',
		team: 'randomHC',
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

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 5,
	},
	{
		name: "[Gen 3] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286280/">ADV Ubers</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		ruleset: ['Standard', 'Deoxys Camouflage Clause', 'One Baton Pass Clause'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3503540/">ADV NU Viability Rankings</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		ruleset: ['Standard'],
		banlist: ['Uber', 'OU', 'UUBL', 'UU', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 3] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031456/">ADV 1v1</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'[Gen 3] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview', '!Freeze Clause Mod',
		],
		banlist: [
			'Clefable', 'Slaking', 'Snorlax', 'Suicune', 'Zapdos', 'Destiny Bond', 'Explosion', 'Ingrain', 'Perish Song',
			'Self-Destruct', 'Focus Band', 'King\'s Rock', 'Quick Claw',
		],
		unbanlist: ['Mr. Mime', 'Wobbuffet', 'Wynaut', 'Sand Veil', 'Soundproof'],
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
		name: "[Gen 2] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286282/">GSC Ubers</a>`,
		],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 2] UU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3576710/">GSC UU</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['[Gen 2] OU'],
		banlist: ['OU', 'UUBL', 'Agility + Baton Pass'],
		unbanlist: ['Mean Look + Baton Pass', 'Spider Web + Baton Pass'],
	},
	{
		name: "[Gen 2] NU",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3642565/">GSC NU</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['[Gen 2] UU'],
		banlist: ['UU', 'NUBL'],
		unbanlist: ['Agility + Baton Pass'],
	},
	{
		name: "[Gen 2] 1v1",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/posts/8031463/">GSC 1v1</a>`],

		mod: 'gen2',
		searchShow: false,
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'[Gen 2] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview',
		],
		banlist: [
			'Alakazam', 'Clefable', 'Snorlax', 'Zapdos', 'Berserk Gene', 'Focus Band', 'King\'s Rock', 'Quick Claw',
			'Attract', 'Destiny Bond', 'Explosion', 'Perish Song', 'Present', 'Self-Destruct', 'Swagger',
		],
	},
	{
		name: "[Gen 2] Nintendo Cup 2000",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3682691/">Nintendo Cup 2000 Resource Hub</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3677370/">Differences between Nintendo Cup 2000 and GSC OU</a>`,
		],

		mod: 'gen2stadium2',
		searchShow: false,
		ruleset: [
			'Picked Team Size = 3', 'Min Level = 50', 'Max Level = 55', 'Max Total Level = 155',
			'Obtainable', 'Stadium Sleep Clause', 'Freeze Clause Mod', 'Species Clause', 'Item Clause', 'Endless Battle Clause', 'Cancel Mod', 'Event Moves Clause', 'Nickname Clause', 'Team Preview', 'Nintendo Cup 2000 Move Legality',
		],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Stadium OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3677370/">Placeholder</a>`,
		],

		mod: 'gen2stadium2',
		searchShow: false,
		ruleset: ['Standard'],
		banlist: ['Uber'],
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
		name: "[Gen 1] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286283/">RBY Ubers</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 1] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3573896/">RBY UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647713/">RBY UU Viability Rankings</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['[Gen 1] OU', 'APT Clause', 'Sleep Moves Clause'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 1] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3679758/">RBY NU Metagame Discussion &amp; Resources</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['[Gen 1] UU', '!APT Clause', '!Sleep Moves Clause'],
		banlist: ['UU', 'NUBL'],
	},
	{
		name: "[Gen 1] 1v1",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031462">RBY 1v1</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: [
			'Picked Team Size = 1', 'Max Team Size = 3',
			'[Gen 1] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview',
		],
		banlist: ['Bind', 'Clamp', 'Explosion', 'Fire Spin', 'Self-Destruct', 'Wrap'],
	},
	{
		name: "[Gen 1] Japanese OU",
		desc: `Generation 1 with Japanese battle mechanics.`,

	// Digimon
	///////////////////////////////////////////////////////////////////

		mod: 'gen1jpn',
		searchShow: false,
		ruleset: [
			'Picked Team Size = 3', 'Min Level = 50', 'Max Level = 55', 'Max Total Level = 155',
			'Obtainable', 'Team Preview', 'Stadium Sleep Clause', 'Species Clause', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Nintendo Cup 1997 Move Legality',
		],
		banlist: ['Uber'],
	},
	{
		section: "Digimon(Alpha)",
		column: 3,
	},
	{
		name: "[Gen 8] Digimon(Alpha)",

		mod: 'digimon',
		searchShow: false,
		debug: true,
		ruleset: ['Standard Digimon'],
	},
	{
		name: "[Gen 8] Digimon Doubles(Alpha)",

		mod: 'digimon',
		gameType: 'doubles',
		searchShow: false,
		debug: true,
		ruleset: ['Standard Digimon'],
	},
];