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

import { Species } from '../sim/dex-species';

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
			'Barraskewda', 'Chansey', 
		],
	},
	{
		name: "[Gen 8] Johto Dex BH",
		desc: `BH, but only things that are native to Kanto and Johto regions are usable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],

		mod: 'gen8',
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
		name: "[Gen 8] National Dex LC Balanced Hackmons",
		desc: `NDBH + LC. S/o to Onyx and Sevag for coding and rules.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/om-mashup-megathread.3657159/post-8299984">Balanced Hackmons Little Cup</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/#post-9217527">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Little Cup', 'Forme Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable'],
		banlist: [
			'Corsola-Galar', 
			'Archen', 'Gligar', 'Scyther', 'Sneasel', 'Tangela', 'Type: Null', 'Yanma', 
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 
			'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard', 
			'Psychic Surge', 
			'Comatose + Sleep Talk', 
			'Bolt Beak', 'Chatter', 'Dragon Rage', 'Double Iron Bash', 'Fishious Rend', 'Glacial Lance', 'Knock Off', 'Octolock', 'Photon Geyser', 
			'Shell Smash', 'Sonic Boom', 'Surging Strikes', 'Triple Axel', 'V-Create', 'Wicked Blow', 
		],
	},
	{
		name: "[Gen 8] ND 24 Points BH",
		desc: `NDBH + 24点。当你使用过队伍中的所有24个技能后，你获胜。<br />NDBH + 24 Points. You win after you use all 24 Moves in your team.`,
		debug: true,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3690179/">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 8] National Dex BH', 'Obtainable Abilities', '!Ability Clause', '!Arceus Clause'],
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
	},
	{
		name: "[Gen 8] ND Camomons BH",
		desc: `NDBH + Camomons`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3690179/">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
		searchShow: false,
		challengeShow: false,
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

				// complexProperties
				// Nihilslave: just have a try, i'm not sure if it's the right place to deal with this
				// but yea it works
				if (forte.basePowerCallback) {
					if (move.basePowerCallback) {
						move.basePowerCallback = function (pokemon, target, move) {
							// the "move" here is the move param in the function
							let basePower = this.dex.moves.get(move.id).basePowerCallback!.call(this, pokemon, target, move);
							const forteMove = this.dex.getActiveMove(forte.id);
							forteMove.basePower = basePower || 1;
							basePower = forteMove.basePowerCallback!.call(this, pokemon, target, forteMove);
							return basePower;
						};
					} else {
						move.basePowerCallback = forte.basePowerCallback;
					}
				}
				if (forte.onAfterHit) {
					if (move.onAfterHit) {
						move.onAfterHit = function (source, target, move) {
							this.dex.moves.get(move.id).onAfterHit?.call(this, source, target, move);
							forte.onAfterHit.call(this, source, target, this.dex.getActiveMove(forte.id));
						}
					} else {
						move.onAfterHit = forte.onAfterHit;
					}
				}
				if (forte.onAfterMove) {
					if (move.onAfterMove) {
						move.onAfterMove = function (source, target, move) {
							this.dex.moves.get(move.id).onAfterMove?.call(this, source, target, move);
							forte.onAfterMove.call(this, source, target, this.dex.getActiveMove(forte.id));
						};
					} else {
						move.onAfterMove = forte.onAfterMove;
					}
				}
				if (forte.onAfterMoveSecondarySelf) {
					if (move.onAfterMoveSecondarySelf) {
						move.onAfterMoveSecondarySelf = function (source, target, move) {
							this.dex.moves.get(move.id).onAfterMoveSecondarySelf?.call(this, source, target, move);
							forte.onAfterMoveSecondarySelf.call(this, source, target, this.dex.getActiveMove(forte.id));
						};
					} else {
						move.onAfterMoveSecondarySelf = forte.onAfterMoveSecondarySelf;
					}
				}
				if (forte.onAfterSubDamage) {
					if (move.onAfterSubDamage) {
						move.onAfterSubDamage = function (damage, target, source, move) {
							this.dex.moves.get(move.id).onAfterSubDamage?.call(this, damage, target, source, move);
							forte.onAfterSubDamage.call(this, damage, target, source, this.dex.getActiveMove(forte.id));
						}
					} else {
						move.onAfterSubDamage = forte.onAfterSubDamage;
					}
				}
				if (forte.onBasePower) {
					if (move.onBasePower) {
						move.onBasePower = function (basePower, source, target, move) {
							// it will never return a number believe me
							// the last param will not be used except for knock off
							this.dex.moves.get(move.id).onBasePower?.call(this, basePower, source, target, move);
							forte.onBasePower.call(this, basePower, source, target, this.dex.getActiveMove(forte.id));
						};
					} else {
						move.onBasePower = forte.onBasePower;
					}
				}
				if (forte.onEffectiveness) {
					if (move.onEffectiveness) {
						move.onEffectiveness = function (typeMod, target, type, move) {
							const moveEffectiveness = this.dex.moves.get(move.id).onEffectiveness?.call(this, typeMod, target, type, move);
							const forteEffectiveness = forte.onEffectiveness.call(this, typeMod, target, type, this.dex.getActiveMove(forte.id));
							return (moveEffectiveness || 0) + (forteEffectiveness || 0);
						};
					} else {
						move.onEffectiveness = forte.onEffectiveness;
					}
				}
				if (forte.onHit) {
					if (move.onHit) {
						move.onHit = function (target, source, move) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onHit.call(this, target, source, move);
							const ret2 = forte.onHit.call(this, target, source, this.dex.getActiveMove(forte.id));
							if (ret1 === this.NOT_FAIL || ret2 === this.NOT_FAIL) return this.NOT_FAIL;
						};
					} else {
						move.onHit = forte.onHit;
					}
				}
				// not sure about the following two
				if (forte.onTry) {
					if (move.onTry) {
						move.onTry = function (source, target, move) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onTry.call(this, source, target, move);
							var ret2;
							if (forte.id !== 'doomdesire' && forte.id !== 'futuresight') {
								ret2 = forte.onTry.call(this, source, target, this.dex.getActiveMove(forte.id));
							} else {
								if (!target.side.addSlotCondition(target, 'futuremove')) { 
									ret2 = false;
								} else {
									Object.assign(target.side.slotConditions[target.position]['futuremove'], {
										move: move.id,
										source: source,
										moveData: {
											id: move.id,
											name: move.name,
											accuracy: move.accuracy,
											basePower: move.basePower,
											category: move.category,
											priority: move.priority,
											flags: move.flags,
											effectType: 'Move',
											isFutureMove: true,
											type: move.baseMoveType,
										},
									});
									this.add('-start', source, forte.name);
									ret2 = this.NOT_FAIL;
								}
							}
							if (ret1 === false || ret2 === false) return false;
							if (ret1 === null || ret2 === null) return null;
							if (ret1 === this.NOT_FAIL || ret2 === this.NOT_FAIL) return this.NOT_FAIL;
							if (ret1 === true || ret2 === true) return true;
						};
					} else {
						if (forte.id !== 'doomdesire' && forte.id !== 'futuresight') {
							move.onTry = forte.onTry;
						} else {
							move.onTry = function (source, target, move) {
								if (!target.side.addSlotCondition(target, 'futuremove')) return false;
								Object.assign(target.side.slotConditions[target.position]['futuremove'], {
									move: move.id,
									source: source,
									moveData: {
										id: move.id,
										name: move.name,
										accuracy: move.accuracy,
										basePower: move.basePower,
										category: move.category,
										priority: move.priority,
										flags: move.flags,
										effectType: 'Move',
										isFutureMove: true,
										type: move.baseMoveType,
									},
								});
								this.add('-start', source, forte.name);
								return this.NOT_FAIL;
							};
						}
					}
				}
				if (forte.onTryHit) {
					if (move.onTryHit) {
						move.onTryHit = function (source, target, move) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onTryHit.call(this, source, target, move);
							const ret2 = forte.onTryHit.call(this, source, target, this.dex.getActiveMove(forte.id));
							if (ret1 === false || ret2 === false) return false;
							if (ret1 === null || ret2 === null) return null;
						};
					} else {
						move.onTryHit = forte.onTryHit;
					}
				}
				if (forte.onTryImmunity) {
					if (move.onTryImmunity) {
						move.onTryImmunity = function (target, source) {
							// @ts-ignore
							return this.dex.moves.get(move.id).onTryImmunity.call(this, target, source) && forte.onTryImmunity.call(this, target, source);
						};
					} else {
						move.onTryImmunity = forte.onTryImmunity;
					}
				}
				if (forte.onTryMove) {
					if (move.onTryMove) {
						move.onTryMove = function (pokemon) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onTryMove.call(this, pokemon);
							const ret2 = forte.onTryMove.call(this, pokemon);
							if (ret1 === null || ret2 === null) return null;
						}
					} else {
						move.onTryMove = forte.onTryMove;
					}
				}

				if (forte.onModifyMove) {
					// @ts-ignore
					this.singleEvent('ModifyMove', forte, null, pokemon, target, move, move);
				}
			}
		},
		// Nihilslave: trying to use an extremely hard code to make beak blast / focus punch forte work
		queue: {
			resolveAction(action: ActionChoice, midTurn = false): Action[] {
				if (!action) throw new Error(`Action not passed to resolveAction`);
				if (action.choice === 'pass') return [];
				const actions = [action];
		
				if (!action.side && action.pokemon) action.side = action.pokemon.side;
				if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
				if (!action.order) {
					const orders: {[choice: string]: number} = {
						team: 1,
						start: 2,
						instaswitch: 3,
						beforeTurn: 4,
						beforeTurnMove: 5,
		
						runUnnerve: 100,
						runSwitch: 101,
						runPrimal: 102,
						switch: 103,
						megaEvo: 104,
						runDynamax: 105,
						priorityChargeMove: 106,
		
						shift: 200,
						// default is 200 (for moves)
		
						residual: 300,
					};
					if (action.choice in orders) {
						action.order = orders[action.choice];
					} else {
						action.order = 200;
						if (!['move', 'event'].includes(action.choice)) {
							throw new Error(`Unexpected orderless action ${action.choice}`);
						}
					}
				}
				if (!midTurn) {
					if (action.choice === 'move') {
						if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
							actions.unshift(...this.resolveAction({
								choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
							}));
						}
						if (action.mega && !action.pokemon.isSkyDropped()) {
							actions.unshift(...this.resolveAction({
								choice: 'megaEvo',
								pokemon: action.pokemon,
							}));
						}
						if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
							actions.unshift(...this.resolveAction({
								choice: 'runDynamax',
								pokemon: action.pokemon,
							}));
						}
						// here we change the code
						if (!action.maxMove && !action.zmove && (action.move.priorityChargeCallback || action.pokemon.forte && action.pokemon.forte.priorityChargeCallback)) {
							actions.unshift(...this.resolveAction({
								choice: 'priorityChargeMove',
								pokemon: action.pokemon,
								move: action.move,
							}));
						}
						action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
					} else if (['switch', 'instaswitch'].includes(action.choice)) {
						if (typeof action.pokemon.switchFlag === 'string') {
							action.sourceEffect = this.battle.dex.moves.get(action.pokemon.switchFlag as ID) as any;
						}
						action.pokemon.switchFlag = false;
					}
				}
		
				const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
				if (action.move) {
					let target = null;
					action.move = this.battle.dex.getActiveMove(action.move);
		
					if (!action.targetLoc) {
						target = this.battle.getRandomTarget(action.pokemon, action.move);
						// TODO: what actually happens here?
						if (target) action.targetLoc = action.pokemon.getLocOf(target);
					}
					action.originalTarget = action.pokemon.getAtLoc(action.targetLoc);
				}
				if (!deferPriority) this.battle.getActionSpeed(action);
				return actions as any;
			}
		},
		battle: {
			runAction(action: Action) {
				const pokemonOriginalHP = action.pokemon?.hp;
				let residualPokemon: (readonly [Pokemon, number])[] = [];
				// returns whether or not we ended in a callback
				switch (action.choice) {
				case 'start': {
					for (const side of this.sides) {
						if (side.pokemonLeft) side.pokemonLeft = side.pokemon.length;
					}
		
					this.add('start');
		
					// Change Zacian/Zamazenta into their Crowned formes
					for (const pokemon of this.getAllPokemon()) {
						let rawSpecies: Species | null = null;
						if (pokemon.species.id === 'zacian' && pokemon.item === 'rustedsword') {
							rawSpecies = this.dex.species.get('Zacian-Crowned');
						} else if (pokemon.species.id === 'zamazenta' && pokemon.item === 'rustedshield') {
							rawSpecies = this.dex.species.get('Zamazenta-Crowned');
						}
						if (!rawSpecies) continue;
						const species = pokemon.setSpecies(rawSpecies);
						if (!species) continue;
						pokemon.baseSpecies = rawSpecies;
						pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
							(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						pokemon.setAbility(species.abilities['0'], null, true);
						pokemon.baseAbility = pokemon.ability;
		
						const behemothMove: {[k: string]: string} = {
							'Zacian-Crowned': 'behemothblade', 'Zamazenta-Crowned': 'behemothbash',
						};
						const ironHead = pokemon.baseMoves.indexOf('ironhead');
						if (ironHead >= 0) {
							const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
							pokemon.baseMoveSlots[ironHead] = {
								move: move.name,
								id: move.id,
								pp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
								maxpp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
								target: move.target,
								disabled: false,
								disabledSource: '',
								used: false,
							};
							pokemon.moveSlots = pokemon.baseMoveSlots.slice();
						}
					}
		
					if (this.format.onBattleStart) this.format.onBattleStart.call(this);
					for (const rule of this.ruleTable.keys()) {
						if ('+*-!'.includes(rule.charAt(0))) continue;
						const subFormat = this.dex.formats.get(rule);
						if (subFormat.onBattleStart) subFormat.onBattleStart.call(this);
					}
		
					for (const side of this.sides) {
						for (let i = 0; i < side.active.length; i++) {
							if (!side.pokemonLeft) {
								// forfeited before starting
								side.active[i] = side.pokemon[i];
								side.active[i].fainted = true;
								side.active[i].hp = 0;
							} else {
								this.actions.switchIn(side.pokemon[i], i);
							}
						}
					}
					for (const pokemon of this.getAllPokemon()) {
						this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
					}
					this.midTurn = true;
					break;
				}
		
				case 'move':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.actions.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect,
						action.zmove, undefined, action.maxMove, action.originalTarget);
					break;
				case 'megaEvo':
					this.actions.runMegaEvo(action.pokemon);
					break;
				case 'runDynamax':
					action.pokemon.addVolatile('dynamax');
					action.pokemon.side.dynamaxUsed = true;
					if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = true;
					break;
				case 'beforeTurnMove':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.debug('before turn callback: ' + action.move.id);
					const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
					if (!target) return false;
					if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
					action.move.beforeTurnCallback.call(this, action.pokemon, target);
					break;
				case 'priorityChargeMove':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.debug('priority charge callback: ' + action.move.id);
					// here we change the code
					if (action.move.priorityChargeCallback) action.move.priorityChargeCallback.call(this, action.pokemon);
					// @ts-ignore
					if (action.pokemon.forte.priorityChargeCallback) action.pokemon.forte.priorityChargeCallback.call(this, action.pokemon);
					break;
		
				case 'event':
					this.runEvent(action.event!, action.pokemon);
					break;
				case 'team':
					if (action.index === 0) {
						action.pokemon.side.pokemon = [];
					}
					action.pokemon.side.pokemon.push(action.pokemon);
					action.pokemon.position = action.index;
					// we return here because the update event would crash since there are no active pokemon yet
					return;
		
				case 'pass':
					return;
				case 'instaswitch':
				case 'switch':
					if (action.choice === 'switch' && action.pokemon.status) {
						this.singleEvent('CheckShow', this.dex.abilities.getByID('naturalcure' as ID), null, action.pokemon);
					}
					if (this.actions.switchIn(action.target, action.pokemon.position, action.sourceEffect) === 'pursuitfaint') {
						// a pokemon fainted from Pursuit before it could switch
						if (this.gen <= 4) {
							// in gen 2-4, the switch still happens
							this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
							action.priority = -101;
							this.queue.unshift(action);
							break;
						} else {
							// in gen 5+, the switch is cancelled
							this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
							break;
						}
					}
					break;
				case 'runUnnerve':
					this.singleEvent('PreStart', action.pokemon.getAbility(), action.pokemon.abilityState, action.pokemon);
					break;
				case 'runSwitch':
					this.actions.runSwitch(action.pokemon);
					break;
				case 'runPrimal':
					if (!action.pokemon.transformed) {
						this.singleEvent('Primal', action.pokemon.getItem(), action.pokemon.itemState, action.pokemon);
					}
					break;
				case 'shift':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.swapPosition(action.pokemon, 1);
					break;
		
				case 'beforeTurn':
					this.eachEvent('BeforeTurn');
					break;
				case 'residual':
					this.add('');
					this.clearActiveMove(true);
					this.updateSpeed();
					residualPokemon = this.getAllActive().map(pokemon => [pokemon, pokemon.getUndynamaxedHP()] as const);
					this.residualEvent('Residual');
					this.add('upkeep');
					break;
				}
		
				// phazing (Roar, etc)
				for (const side of this.sides) {
					for (const pokemon of side.active) {
						if (pokemon.forceSwitchFlag) {
							if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
							pokemon.forceSwitchFlag = false;
						}
					}
				}
		
				this.clearActiveMove();
		
				// fainting
		
				this.faintMessages();
				if (this.ended) return true;
		
				// switching (fainted pokemon, U-turn, Baton Pass, etc)
		
				if (!this.queue.peek() || (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))) {
					// in gen 3 or earlier, switching in fainted pokemon is done after
					// every move, rather than only at the end of the turn.
					this.checkFainted();
				} else if (action.choice === 'megaEvo' && this.gen === 7) {
					this.eachEvent('Update');
					// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
					for (const [i, queuedAction] of this.queue.list.entries()) {
						if (queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move') {
							this.queue.list.splice(i, 1);
							queuedAction.mega = 'done';
							this.queue.insertChoice(queuedAction, true);
							break;
						}
					}
					return false;
				} else if (this.queue.peek()?.choice === 'instaswitch') {
					return false;
				}
		
				if (this.gen >= 5) {
					this.eachEvent('Update');
					for (const [pokemon, originalHP] of residualPokemon) {
						const maxhp = pokemon.getUndynamaxedHP(pokemon.maxhp);
						if (pokemon.hp && pokemon.getUndynamaxedHP() <= maxhp / 2 && originalHP > maxhp / 2) {
							this.runEvent('EmergencyExit', pokemon);
						}
					}
				}
		
				if (action.choice === 'runSwitch') {
					const pokemon = action.pokemon;
					if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP! > pokemon.maxhp / 2) {
						this.runEvent('EmergencyExit', pokemon);
					}
				}
		
				const switches = this.sides.map(
					side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
				);
		
				for (let i = 0; i < this.sides.length; i++) {
					if (switches[i] && !this.canSwitch(this.sides[i])) {
						for (const pokemon of this.sides[i].active) {
							pokemon.switchFlag = false;
						}
						switches[i] = false;
					} else if (switches[i]) {
						for (const pokemon of this.sides[i].active) {
							if (pokemon.switchFlag && !pokemon.skipBeforeSwitchOutEventFlag) {
								this.runEvent('BeforeSwitchOut', pokemon);
								pokemon.skipBeforeSwitchOutEventFlag = true;
								this.faintMessages(); // Pokemon may have fainted in BeforeSwitchOut
								if (this.ended) return true;
								if (pokemon.fainted) {
									switches[i] = this.sides[i].active.some(sidePokemon => sidePokemon && !!sidePokemon.switchFlag);
								}
							}
						}
					}
				}
		
				for (const playerSwitch of switches) {
					if (playerSwitch) {
						this.makeRequest('switch');
						return true;
					}
				}
		
				if (this.gen < 5) this.eachEvent('Update');
		
				if (this.gen >= 8 && (this.queue.peek()?.choice === 'move' || this.queue.peek()?.choice === 'runDynamax')) {
					// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
					this.updateSpeed();
					for (const queueAction of this.queue.list) {
						if (queueAction.pokemon) this.getActionSpeed(queueAction);
					}
					this.queue.sort();
				}
		
				return false;
			}
		},
	},
	{
		name: "[Gen 8] ND Letter Cup BH",
		desc: `NDBH，但一只精灵携带的所有技能的英文首字母必须相同。`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Clause Mod', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable', 'Arceus Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Shell Smash', 'Spore', 
			'Gengarite',
		],
		restricted: ['Zacian-Crowned', 'Intrepid Sword'],
		onValidateSet(set) {
			const problems = [];
			const ability = this.dex.abilities.get(set.ability);
			if (set.species === 'Zacian-Crowned') {
				if (this.dex.toID(set.item) !== 'rustedsword' || ability.id !== 'intrepidsword') {
					problems.push(`${set.species} is banned.`);
				}
			} else if (ability.id === 'intrepidsword') {
				problems.push(`${set.name}'s ability ${ability.name} is banned.`);
			}
			var c = set.moves[0].charAt(0).toUpperCase();
			for (var i = 1; i < set.moves.length; ++i) {
				const letter = set.moves[i].charAt(0).toUpperCase();
				if (letter !== c) {
					problems.push(`${set.name || set.species}'s moves have different initial letters.`);
					break;
				}
			}
			return problems;
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
		name: "[Gen 8] ND Multibility BH",
		desc: `NDBH + Multibility.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3688892/">Multibility</a>`, 
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/#post-9217527">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
				problems.push(`${set.species} has the combination of Comatose + Sleep Talk, which is banned by [Gen 8] National Dex BH.`);
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
		name: "[Gen 8] ND Scalemons BH",
		desc: `NDBH + Scalemons.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/scalemons.3658482/">Scalemons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/#post-9217527">National Dex BH v3</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh.3658587/">National Dex BH</a>`,
		],
		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
		searchShow: false,
		challengeShow: false,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Clause Mod', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', '!Obtainable', 'Arceus Clause', 'Turn Tables Mod'],
		banlist: [
			'Cramorant-Gorging', 'Eternatus-Eternamax', 'Shedinja', 'Silvally', 
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Intrepid Sword', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Imprison + Transform', 
			'Belly Drum', 'Court Change', 'Double Iron Bash', 'Electrify', 'Octolock', 'Shell Smash',
			'Gengarite', 
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
		searchShow: false,
		challengeShow: false,
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
		name: "[Gen 9] Balanced Createmons",
		desc: `自定义你的精灵，包括种族值、属性、特性和招式。<br />` + 
			`&bullet; 通过在组队器中调整努力值来调整种族值：你的真实种族值等于你的努力值，你的真实努力值强制每项全满；<br />` + 
			`&bullet; 在组队器细节栏（就是调整钛晶属性的地方）设定第一属性及第二属性；<br />` + 
			`&bullet; 特性和招式可以自由选择。（但有很小一部分被禁用。）<br />` + 
			`&bullet; 根据你的配置，每只精灵都会算出一个固定的分数。每支队伍分数上限 100000，超过上限的队伍视为不合法。<br />` + 
			`&bullet; 可通过命令 /crtm formula 或 /crtm f 查看分数计算公式，也可按组队窗中的 Check 按钮快速计算精灵分数；<br />` + 
			`&bullet; 可通过命令 /crtm 属性/特性/招式 来查看该属性/特性/招式对应的分数，如用 /crtm fairy 查看妖精系的分数，得知其分数为 3 分。<br />` + 

			`<br />` + 

			`DIY your own Pok&eacute;mon with any base stats, type, ability, and moves. <br />` + 
			`&bullet; Customize Base Stats by adjusting EVs in teambuilder. The true Base Stats of a Pok&eacute;mon equal to its EVs. And the true EVs of a Pok&eacute;mon are forced to be all 252. <br />` + 
			`&bullet; Set First Type and Second Type in the details cell of teambuilder. <br />` + 
			`&bullet; Select Ability and Moves freely. (With a few bans though.) <br />` + 
			`&bullet; The Point of a Pok&eacute;mon will be calculated based on its set. Teams with Total Point exceeding 100000 are invalid.<br />` + 
			`&bullet; Use the command /crtm formula or /crtm f to see the formula used for Point calculation. Click the "Check" button in teambuilder to check a Pok&eacute;mon's Point quickly. <br />` + 
			`&bullet; Use the command /crtm [type/ability/move] to see the Point of that type/ability/move. E.g. use /crtm fairy to see the Point of fairy type, which is 3. <br />`,

		mod: 'gen9',
		debug: true,
		searchShow: false,
		tournamentShow: false,
		ruleset: ['Createmons Mod = 100000', 'Team Species Preview', 'Species Clause', 'Signature Items Clause', 'Z-Move Clause', 'CFZ Clause', 'Terastal Clause', 'Overflow Stat Mod', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Nickname Clause', '-CAP'],
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
				let godSpecies = this.dex.species.get(set.species);
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
		],

		mod: 'gen9',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Moves Clause', 'Endless Battle Clause'],
		banlist: [
			'Arena Trap', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Neutralizing Gas', 'Parental Bond', 'Pure Power', 
			'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 
			'Rage Fist', 'Shed Tail', 'Shell Smash', 
		],
	},
	{
		name: "[Gen 9] National Dex BH",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711099/">National Dex BH</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard NatDex', '!Obtainable', 'Forme Clause', 'Sleep Clause Mod', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Clause', 'CFZ Clause', 'Dynamax Clause', 'Arceus Clause'],
		banlist: [
			'Calyrex-Shadow', 'Cramorant-Gorging', 'Darmanitan-Galar-Zen', 'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody','Neutralizing Gas', 
			'Parental Bond', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
			'Comatose + Sleep Talk', 'Imprison + Transform', 
			'Belly Drum', 'Bolt Beak', 'Chatter', 'Double Iron Bash', 'Electrify', 'Octolock', 'Shell Smash',
			'Gengarite',
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
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Moves Clause', 'Endless Battle Clause'],
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
		ruleset: ['-Nonexistent', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Forme Clause', 'CFZ Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
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
		ruleset: ['-Nonexistent', 'Ability Clause = 2', 'ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
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
		ruleset: ['-Nonexistent', 'Freeze Clause Mod', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Mewtwo', 
			'Bind', 'Clamp', 'Fire Spin', 'Wrap'
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
			// TBA
			'Acupressure', 'Aromatic Mist', 'Coaching', 'Court Change', 'Decorate', 'Final Gambit', 'Floral Healing', 'Follow Me', 
			'Heal Pulse', 'Rage Powder', 
		],
		unbanlist: [
			// TBA
			'Parental Bond', 
		],
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
		name: "[Gen 8] Balanced Hackmons LC",

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
		desc: `BH，但精灵可以在道具栏携带攻击招式，然后该精灵的所有攻击招式共享其特效。<br />如，一只精灵道具栏带高速旋转，则其所有攻击招式都额外拥有扫钉和速度 +1 效果。<br />以下招式禁止作为道具携带：<br />&bullet; 一击必杀招式<br />&bullet; 降低命中率的招式<br />&bullet; 多段招式<br />&bullet; 正先制度招式<br />&bullet; 抓人招式<br />&bullet; 反击招式<br />&bullet; 比例伤害招式<br />&bullet; 蓄力招式<br />&bullet; 其它被禁止的招式：酸液炸弹、爆裂拳、回声、诡异咒语、快速折返、冰息、炼狱、扫墓、琉光冲激、蹭蹭脸颊、嚣张、愤怒之拳、电力上升、滚动、臂贝武器、自由落体、辅助力量、大地波动、急速折返、伏特替换、气象球、暗冥强击、电磁炮<br />BH, but Pok&eacute;mon can have attack moves in their item slot as fortes. Every attack move of a Pok&eacute;mon will additionally have the move effects of its forte.<br />E.g. A Pok&eacute;mon with Rapid Spin as its forte will give all its attacks the effect of hazard removal and +1 Spe, along with their original effects.<br />The following moves are banned as forte:<br />&bullet; OHKO Moves<br />&bullet; Moves That Lower Accuracy<br />&bullet; Multi-hit Moves<br />&bullet; Positive Priority Moves<br />&bullet; Trapping Moves<br />&bullet; Counter-like Moves<br />&bullet; Ratio Damage Moves<br />&bullet; Charge Moves<br />&bullet; Other Banned Moves: Acid Spray, Dynamic Punch, Echoed Voice, Eerie Spell, Flip Turn, Frost Breath, Inferno, Last Respects, Lumina Crash, Nuzzle, Power Trip, Rage Fist, Rising Voltage, Rollout, Shell Side Arm, Stored Power, Terrain Pulse, U-turn, Volt Switch, Weather Ball, Wicked Blow, Zap Cannon`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3638520/">Fortemons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons', 'Forte Clause'],
		banlist: [
			// TBA
			'Copycat', 
			'Serene Grace', 'Triage', 
			'Endeavor', 'Ruination', 'Super Fang', 
			'Arm Thrust', 'Beat Up', 'Bone Rush', 'Bullet Seed', 'Fury Attack', 'Fury Swipes', 'Icicle Spear', 
			'Pin Missile', 'Population Bomb', 'Rock Blast', 'Scale Shot', 'Tail Slap', 'Water Shuriken', 'Double Hit', 'Double Kick', 
			'Dragon Darts', 'Dual Wingbeat', 'Surging Strikes', 'Triple Axel', 
		],
		validateSet(set, teamHas) {
			const item = this.dex.moves.get(set.item);
			if (!item.exists) return this.validateSet(set, teamHas);
			const problems = [];
			// keep nd moves just in case they are back one day
			const restrictedMoves = ['Acid Spray', 'Anchor Shot', 'Beat Up', 'Bide', 'Bolt Beak', 'Dynamic Punch', 'Echoed Voice', 'Eerie Spell', 'Fishious Rend', 
			'Flip Turn', 'Frost Breath', 'Ice Ball', 'Inferno', 'Jaw Lock', 'Last Respects', 'Lumina Crash', 'Nuzzle', 'Power Trip', 'Pursuit', 'Rage Fist', 
			'Rising Voltage', 'Rollout', 'Shell Side Arm', 'Spirit Shackle', 'Stored Power', 'Storm Throw', 'Terrain Pulse', 'Thousand Waves', 'U-turn', 'Volt Switch', 
			'Weather Ball', 'Wicked Blow', 'Zap Cannon', ];
			if (item.type === 'Status'
			|| (!!item.isNonstandard && item.isNonstandard !== 'Unobtainable') // check if move is in gen 9
			|| item.ohko
			// @ts-ignore
			|| item.secondaries && item.secondaries.some(secondary => secondary.boosts && secondary.boosts.accuracy < 0)
			|| item.multihit
			|| item.priority > 0
			|| item.volatileStatus == 'partiallytrapped'
			|| item.damageCallback && item.id !== 'psywave'
			|| item.flags['charge']
			|| restrictedMoves.includes(item.name)) 
				problems.push(`${item.name} is banned as a Forte.`);
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
					
					// we have a better way for this now
					
					// if (pokemon.baseSpecies.name.startsWith('Necrozma')) {
					// 	pokemon.item = this.dex.toID('mimikiumz');
					// }
					// else {
					// 	pokemon.item = this.dex.toID('ultranecroziumz');
					// }
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
		// set this to 1 for sheer force
		onModifyMovePriority: 1,
		/**
		 * but listen, here we get an unsolvable bug (or feature)
		 * usually items like king's rock, which give ur move a secondary, won't trigger sheer force
		 * because they have their onModifyMovePriority set to -1, which is later than sheer force's onModifyMovePriority (0)
		 * but here we want sheer force to work for forte's secondaries, so we set it to 1, adding them before sheer force works
		 * you may think ahh it's totally ok, where's the bug?
		 * check the code of diamond storm, a move without any secondary, but can trigger sheer force and have its "self" property disabled as the effect
		 * actually just check the code of sheer force, it's triggered by secondary, but will remove self along with secondary
		 * and the following two effects are also implemented by self property: stats drop of v-create, draco meteor, and etc; must recharge of hyper beam, etc;
		 * there are more, but these two are the most important
		 * so, by having sheer force ability and anything with secondary as forte, you will get a v-create that doesn't drop stats, or a hyper beam that doesn't requre recharge
		 * i say this is unsolvable because we have to add secondary and self at the same time for diamond storm
		 * which should be earlier than sheer force
		 * commented by Nihilslave
		 */		
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

				// complexProperties
				// Nihilslave: just have a try, i'm not sure if it's the right place to deal with this
				// but yea it works
				if (forte.basePowerCallback) {
					if (move.basePowerCallback) {
						move.basePowerCallback = function (pokemon, target, move) {
							// the "move" here is the move param in the function
							let basePower = this.dex.moves.get(move.id).basePowerCallback!.call(this, pokemon, target, move);
							const forteMove = this.dex.getActiveMove(forte.id);
							forteMove.basePower = basePower || 1;
							basePower = forteMove.basePowerCallback!.call(this, pokemon, target, forteMove);
							return basePower;
						};
					} else {
						move.basePowerCallback = forte.basePowerCallback;
					}
				}
				if (forte.onAfterHit) {
					if (move.onAfterHit) {
						move.onAfterHit = function (source, target, move) {
							this.dex.moves.get(move.id).onAfterHit?.call(this, source, target, move);
							forte.onAfterHit.call(this, source, target, this.dex.getActiveMove(forte.id));
						}
					} else {
						move.onAfterHit = forte.onAfterHit;
					}
				}
				if (forte.onAfterMove) {
					if (move.onAfterMove) {
						move.onAfterMove = function (source, target, move) {
							this.dex.moves.get(move.id).onAfterMove?.call(this, source, target, move);
							forte.onAfterMove.call(this, source, target, this.dex.getActiveMove(forte.id));
						};
					} else {
						move.onAfterMove = forte.onAfterMove;
					}
				}
				if (forte.onAfterMoveSecondarySelf) {
					if (move.onAfterMoveSecondarySelf) {
						move.onAfterMoveSecondarySelf = function (source, target, move) {
							this.dex.moves.get(move.id).onAfterMoveSecondarySelf?.call(this, source, target, move);
							forte.onAfterMoveSecondarySelf.call(this, source, target, this.dex.getActiveMove(forte.id));
						};
					} else {
						move.onAfterMoveSecondarySelf = forte.onAfterMoveSecondarySelf;
					}
				}
				if (forte.onAfterSubDamage) {
					if (move.onAfterSubDamage) {
						move.onAfterSubDamage = function (damage, target, source, move) {
							this.dex.moves.get(move.id).onAfterSubDamage?.call(this, damage, target, source, move);
							forte.onAfterSubDamage.call(this, damage, target, source, this.dex.getActiveMove(forte.id));
						}
					} else {
						move.onAfterSubDamage = forte.onAfterSubDamage;
					}
				}
				if (forte.onBasePower) {
					if (move.onBasePower) {
						move.onBasePower = function (basePower, source, target, move) {
							// it will never return a number believe me
							// the last param will not be used except for knock off
							this.dex.moves.get(move.id).onBasePower?.call(this, basePower, source, target, move);
							forte.onBasePower.call(this, basePower, source, target, this.dex.getActiveMove(forte.id));
						};
					} else {
						move.onBasePower = forte.onBasePower;
					}
				}
				if (forte.onEffectiveness) {
					if (move.onEffectiveness) {
						move.onEffectiveness = function (typeMod, target, type, move) {
							const moveEffectiveness = this.dex.moves.get(move.id).onEffectiveness?.call(this, typeMod, target, type, move);
							const forteEffectiveness = forte.onEffectiveness.call(this, typeMod, target, type, this.dex.getActiveMove(forte.id));
							return (moveEffectiveness || 0) + (forteEffectiveness || 0);
						};
					} else {
						move.onEffectiveness = forte.onEffectiveness;
					}
				}
				if (forte.onHit) {
					if (move.onHit) {
						move.onHit = function (target, source, move) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onHit.call(this, target, source, move);
							const ret2 = forte.onHit.call(this, target, source, this.dex.getActiveMove(forte.id));
							if (ret1 === this.NOT_FAIL || ret2 === this.NOT_FAIL) return this.NOT_FAIL;
						};
					} else {
						move.onHit = forte.onHit;
					}
				}
				// not sure about the following two
				if (forte.onTry) {
					if (move.onTry) {
						move.onTry = function (source, target, move) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onTry.call(this, source, target, move);
							var ret2;
							if (forte.id !== 'doomdesire' && forte.id !== 'futuresight') {
								ret2 = forte.onTry.call(this, source, target, this.dex.getActiveMove(forte.id));
							} else {
								if (!target.side.addSlotCondition(target, 'futuremove')) { 
									ret2 = false;
								} else {
									Object.assign(target.side.slotConditions[target.position]['futuremove'], {
										move: move.id,
										source: source,
										moveData: {
											id: move.id,
											name: move.name,
											accuracy: move.accuracy,
											basePower: move.basePower,
											category: move.category,
											priority: move.priority,
											flags: move.flags,
											effectType: 'Move',
											isFutureMove: true,
											type: move.baseMoveType,
										},
									});
									this.add('-start', source, forte.name);
									ret2 = this.NOT_FAIL;
								}
							}
							if (ret1 === false || ret2 === false) return false;
							if (ret1 === null || ret2 === null) return null;
							if (ret1 === this.NOT_FAIL || ret2 === this.NOT_FAIL) return this.NOT_FAIL;
							if (ret1 === true || ret2 === true) return true;
						};
					} else {
						if (forte.id !== 'doomdesire' && forte.id !== 'futuresight') {
							move.onTry = forte.onTry;
						} else {
							move.onTry = function (source, target, move) {
								if (!target.side.addSlotCondition(target, 'futuremove')) return false;
								Object.assign(target.side.slotConditions[target.position]['futuremove'], {
									move: move.id,
									source: source,
									moveData: {
										id: move.id,
										name: move.name,
										accuracy: move.accuracy,
										basePower: move.basePower,
										category: move.category,
										priority: move.priority,
										flags: move.flags,
										effectType: 'Move',
										isFutureMove: true,
										type: move.baseMoveType,
									},
								});
								this.add('-start', source, forte.name);
								return this.NOT_FAIL;
							};
						}
					}
				}
				if (forte.onTryHit) {
					if (move.onTryHit) {
						move.onTryHit = function (source, target, move) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onTryHit.call(this, source, target, move);
							const ret2 = forte.onTryHit.call(this, source, target, this.dex.getActiveMove(forte.id));
							if (ret1 === false || ret2 === false) return false;
							if (ret1 === null || ret2 === null) return null;
						};
					} else {
						move.onTryHit = forte.onTryHit;
					}
				}
				if (forte.onTryImmunity) {
					if (move.onTryImmunity) {
						move.onTryImmunity = function (target, source) {
							// @ts-ignore
							return this.dex.moves.get(move.id).onTryImmunity.call(this, target, source) && forte.onTryImmunity.call(this, target, source);
						};
					} else {
						move.onTryImmunity = forte.onTryImmunity;
					}
				}
				if (forte.onTryMove) {
					if (move.onTryMove) {
						move.onTryMove = function (pokemon) {
							// @ts-ignore
							const ret1 = this.dex.moves.get(move.id).onTryMove.call(this, pokemon);
							const ret2 = forte.onTryMove.call(this, pokemon);
							if (ret1 === null || ret2 === null) return null;
						}
					} else {
						move.onTryMove = forte.onTryMove;
					}
				}

				if (forte.onModifyMove) {
					// @ts-ignore
					this.singleEvent('ModifyMove', forte, null, pokemon, target, move, move);
				}
			}
		},
		// Nihilslave: show forte in battle like multibility
		pokemon: {
			getItem() {
				const move = this.battle.dex.moves.get(this.item);
				if (!move.exists) return Object.getPrototypeOf(this).getItem.call(this);
				return {...move, ignoreKlutz: true, onTakeItem: false};
			},
			hasItem(item) {
				const ownItem = this.item;
				if (this.battle.dex.moves.get(ownItem).exists) return false;
				if (this.ignoringItem()) return false;
				if (!Array.isArray(item)) return ownItem === this.battle.toID(item);
				return item.map(this.battle.toID).includes(ownItem);
			},
			takeItem(source) {
				if (!this.isActive) return false;
				if (!this.item) return false;
				if (this.battle.dex.moves.get(this.item).exists) return false;
				if (!source) source = this;
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
		// Nihilslave: trying to use an extremely hard code to make beak blast / focus punch forte work
		queue: {
			resolveAction(action: ActionChoice, midTurn = false): Action[] {
				if (!action) throw new Error(`Action not passed to resolveAction`);
				if (action.choice === 'pass') return [];
				const actions = [action];
		
				if (!action.side && action.pokemon) action.side = action.pokemon.side;
				if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
				if (!action.order) {
					const orders: {[choice: string]: number} = {
						team: 1,
						start: 2,
						instaswitch: 3,
						beforeTurn: 4,
						beforeTurnMove: 5,
		
						runUnnerve: 100,
						runSwitch: 101,
						runPrimal: 102,
						switch: 103,
						megaEvo: 104,
						runDynamax: 105,
						priorityChargeMove: 106,
		
						shift: 200,
						// default is 200 (for moves)
		
						residual: 300,
					};
					if (action.choice in orders) {
						action.order = orders[action.choice];
					} else {
						action.order = 200;
						if (!['move', 'event'].includes(action.choice)) {
							throw new Error(`Unexpected orderless action ${action.choice}`);
						}
					}
				}
				if (!midTurn) {
					if (action.choice === 'move') {
						if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
							actions.unshift(...this.resolveAction({
								choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
							}));
						}
						if (action.mega && !action.pokemon.isSkyDropped()) {
							actions.unshift(...this.resolveAction({
								choice: 'megaEvo',
								pokemon: action.pokemon,
							}));
						}
						if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
							actions.unshift(...this.resolveAction({
								choice: 'runDynamax',
								pokemon: action.pokemon,
							}));
						}
						// here we change the code
						if (!action.maxMove && !action.zmove && (action.move.priorityChargeCallback || action.pokemon.forte && action.pokemon.forte.priorityChargeCallback)) {
							actions.unshift(...this.resolveAction({
								choice: 'priorityChargeMove',
								pokemon: action.pokemon,
								move: action.move,
							}));
						}
						action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
					} else if (['switch', 'instaswitch'].includes(action.choice)) {
						if (typeof action.pokemon.switchFlag === 'string') {
							action.sourceEffect = this.battle.dex.moves.get(action.pokemon.switchFlag as ID) as any;
						}
						action.pokemon.switchFlag = false;
					}
				}
		
				const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
				if (action.move) {
					let target = null;
					action.move = this.battle.dex.getActiveMove(action.move);
		
					if (!action.targetLoc) {
						target = this.battle.getRandomTarget(action.pokemon, action.move);
						// TODO: what actually happens here?
						if (target) action.targetLoc = action.pokemon.getLocOf(target);
					}
					action.originalTarget = action.pokemon.getAtLoc(action.targetLoc);
				}
				if (!deferPriority) this.battle.getActionSpeed(action);
				return actions as any;
			}
		},
		battle: {
			runAction(action: Action) {
				const pokemonOriginalHP = action.pokemon?.hp;
				let residualPokemon: (readonly [Pokemon, number])[] = [];
				// returns whether or not we ended in a callback
				switch (action.choice) {
				case 'start': {
					for (const side of this.sides) {
						if (side.pokemonLeft) side.pokemonLeft = side.pokemon.length;
					}
		
					this.add('start');
		
					// Change Zacian/Zamazenta into their Crowned formes
					for (const pokemon of this.getAllPokemon()) {
						let rawSpecies: Species | null = null;
						if (pokemon.species.id === 'zacian' && pokemon.item === 'rustedsword') {
							rawSpecies = this.dex.species.get('Zacian-Crowned');
						} else if (pokemon.species.id === 'zamazenta' && pokemon.item === 'rustedshield') {
							rawSpecies = this.dex.species.get('Zamazenta-Crowned');
						}
						if (!rawSpecies) continue;
						const species = pokemon.setSpecies(rawSpecies);
						if (!species) continue;
						pokemon.baseSpecies = rawSpecies;
						pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
							(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						pokemon.setAbility(species.abilities['0'], null, true);
						pokemon.baseAbility = pokemon.ability;
		
						const behemothMove: {[k: string]: string} = {
							'Zacian-Crowned': 'behemothblade', 'Zamazenta-Crowned': 'behemothbash',
						};
						const ironHead = pokemon.baseMoves.indexOf('ironhead');
						if (ironHead >= 0) {
							const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
							pokemon.baseMoveSlots[ironHead] = {
								move: move.name,
								id: move.id,
								pp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
								maxpp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
								target: move.target,
								disabled: false,
								disabledSource: '',
								used: false,
							};
							pokemon.moveSlots = pokemon.baseMoveSlots.slice();
						}
					}
		
					if (this.format.onBattleStart) this.format.onBattleStart.call(this);
					for (const rule of this.ruleTable.keys()) {
						if ('+*-!'.includes(rule.charAt(0))) continue;
						const subFormat = this.dex.formats.get(rule);
						if (subFormat.onBattleStart) subFormat.onBattleStart.call(this);
					}
		
					for (const side of this.sides) {
						for (let i = 0; i < side.active.length; i++) {
							if (!side.pokemonLeft) {
								// forfeited before starting
								side.active[i] = side.pokemon[i];
								side.active[i].fainted = true;
								side.active[i].hp = 0;
							} else {
								this.actions.switchIn(side.pokemon[i], i);
							}
						}
					}
					for (const pokemon of this.getAllPokemon()) {
						this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
					}
					this.midTurn = true;
					break;
				}
		
				case 'move':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.actions.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect,
						action.zmove, undefined, action.maxMove, action.originalTarget);
					break;
				case 'megaEvo':
					this.actions.runMegaEvo(action.pokemon);
					break;
				case 'runDynamax':
					action.pokemon.addVolatile('dynamax');
					action.pokemon.side.dynamaxUsed = true;
					if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = true;
					break;
				case 'beforeTurnMove':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.debug('before turn callback: ' + action.move.id);
					const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
					if (!target) return false;
					if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
					action.move.beforeTurnCallback.call(this, action.pokemon, target);
					break;
				case 'priorityChargeMove':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.debug('priority charge callback: ' + action.move.id);
					// here we change the code
					if (action.move.priorityChargeCallback) action.move.priorityChargeCallback.call(this, action.pokemon);
					// @ts-ignore
					if (action.pokemon.forte.priorityChargeCallback) action.pokemon.forte.priorityChargeCallback.call(this, action.pokemon);
					break;
		
				case 'event':
					this.runEvent(action.event!, action.pokemon);
					break;
				case 'team':
					if (action.index === 0) {
						action.pokemon.side.pokemon = [];
					}
					action.pokemon.side.pokemon.push(action.pokemon);
					action.pokemon.position = action.index;
					// we return here because the update event would crash since there are no active pokemon yet
					return;
		
				case 'pass':
					return;
				case 'instaswitch':
				case 'switch':
					if (action.choice === 'switch' && action.pokemon.status) {
						this.singleEvent('CheckShow', this.dex.abilities.getByID('naturalcure' as ID), null, action.pokemon);
					}
					if (this.actions.switchIn(action.target, action.pokemon.position, action.sourceEffect) === 'pursuitfaint') {
						// a pokemon fainted from Pursuit before it could switch
						if (this.gen <= 4) {
							// in gen 2-4, the switch still happens
							this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
							action.priority = -101;
							this.queue.unshift(action);
							break;
						} else {
							// in gen 5+, the switch is cancelled
							this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
							break;
						}
					}
					break;
				case 'runUnnerve':
					this.singleEvent('PreStart', action.pokemon.getAbility(), action.pokemon.abilityState, action.pokemon);
					break;
				case 'runSwitch':
					this.actions.runSwitch(action.pokemon);
					break;
				case 'runPrimal':
					if (!action.pokemon.transformed) {
						this.singleEvent('Primal', action.pokemon.getItem(), action.pokemon.itemState, action.pokemon);
					}
					break;
				case 'shift':
					if (!action.pokemon.isActive) return false;
					if (action.pokemon.fainted) return false;
					this.swapPosition(action.pokemon, 1);
					break;
		
				case 'beforeTurn':
					this.eachEvent('BeforeTurn');
					break;
				case 'residual':
					this.add('');
					this.clearActiveMove(true);
					this.updateSpeed();
					residualPokemon = this.getAllActive().map(pokemon => [pokemon, pokemon.getUndynamaxedHP()] as const);
					this.residualEvent('Residual');
					this.add('upkeep');
					break;
				}
		
				// phazing (Roar, etc)
				for (const side of this.sides) {
					for (const pokemon of side.active) {
						if (pokemon.forceSwitchFlag) {
							if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
							pokemon.forceSwitchFlag = false;
						}
					}
				}
		
				this.clearActiveMove();
		
				// fainting
		
				this.faintMessages();
				if (this.ended) return true;
		
				// switching (fainted pokemon, U-turn, Baton Pass, etc)
		
				if (!this.queue.peek() || (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))) {
					// in gen 3 or earlier, switching in fainted pokemon is done after
					// every move, rather than only at the end of the turn.
					this.checkFainted();
				} else if (action.choice === 'megaEvo' && this.gen === 7) {
					this.eachEvent('Update');
					// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
					for (const [i, queuedAction] of this.queue.list.entries()) {
						if (queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move') {
							this.queue.list.splice(i, 1);
							queuedAction.mega = 'done';
							this.queue.insertChoice(queuedAction, true);
							break;
						}
					}
					return false;
				} else if (this.queue.peek()?.choice === 'instaswitch') {
					return false;
				}
		
				if (this.gen >= 5) {
					this.eachEvent('Update');
					for (const [pokemon, originalHP] of residualPokemon) {
						const maxhp = pokemon.getUndynamaxedHP(pokemon.maxhp);
						if (pokemon.hp && pokemon.getUndynamaxedHP() <= maxhp / 2 && originalHP > maxhp / 2) {
							this.runEvent('EmergencyExit', pokemon);
						}
					}
				}
		
				if (action.choice === 'runSwitch') {
					const pokemon = action.pokemon;
					if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP! > pokemon.maxhp / 2) {
						this.runEvent('EmergencyExit', pokemon);
					}
				}
		
				const switches = this.sides.map(
					side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
				);
		
				for (let i = 0; i < this.sides.length; i++) {
					if (switches[i] && !this.canSwitch(this.sides[i])) {
						for (const pokemon of this.sides[i].active) {
							pokemon.switchFlag = false;
						}
						switches[i] = false;
					} else if (switches[i]) {
						for (const pokemon of this.sides[i].active) {
							if (pokemon.switchFlag && !pokemon.skipBeforeSwitchOutEventFlag) {
								this.runEvent('BeforeSwitchOut', pokemon);
								pokemon.skipBeforeSwitchOutEventFlag = true;
								this.faintMessages(); // Pokemon may have fainted in BeforeSwitchOut
								if (this.ended) return true;
								if (pokemon.fainted) {
									switches[i] = this.sides[i].active.some(sidePokemon => sidePokemon && !!sidePokemon.switchFlag);
								}
							}
						}
					}
				}
		
				for (const playerSwitch of switches) {
					if (playerSwitch) {
						this.makeRequest('switch');
						return true;
					}
				}
		
				if (this.gen < 5) this.eachEvent('Update');
		
				if (this.gen >= 8 && (this.queue.peek()?.choice === 'move' || this.queue.peek()?.choice === 'runDynamax')) {
					// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
					this.updateSpeed();
					for (const queueAction of this.queue.list) {
						if (queueAction.pokemon) this.getActionSpeed(queueAction);
					}
					this.queue.sort();
				}
		
				return false;
			}
		},
	},
	{
		name: "[Gen 9] Godly Gift BH",
		desc: `Godly Gift + BH. Pok&eacute;mon with BST greater than or equal to 650 are Gods.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710734/">Godly Gift</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710859/">Balanced Hackmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['[Gen 9] Balanced Hackmons'],
		restricted: [
			'Mewtwo', 'Slaking', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Dialga-Origin', 'Palkia', 'Palkia-Origin', 
			'Giratina', 'Giratina-Origin', 'Arceus', 'Hoopa-Unbound', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 
			'Eternatus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Palafin-Hero', 'Koraidon', 'Miraidon', 
		],
		onValidateTeam(team) {
			const gods = new Set<string>();
			for (const set of team) {
				let species = this.dex.species.get(set.species);
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
				let godSpecies = this.dex.species.get(set.species);
				if (godSpecies.baseSpecies === 'Arceus') return true;
				return this.ruleTable.isRestrictedSpecies(godSpecies);
			}) || target.side.team[0];
			const stat = Dex.stats.ids()[target.side.team.indexOf(target.set)];
			const newSpecies = this.dex.deepClone(species);
			let godSpecies = this.dex.species.get(god.species);
			newSpecies.bst -= newSpecies.baseStats[stat];
			newSpecies.baseStats[stat] = godSpecies.baseStats[stat];
			newSpecies.bst += newSpecies.baseStats[stat];
			return newSpecies;
		},
	},
	{
		name: "[Gen 8] (Advanced) Godly Gift BH",
		desc: `BH, 但队伍中种族最高的精灵成为神，其种族值被队友依次继承。若有多个精灵种族并列最高则最靠前的成为神。`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/godly-gift.3660461/">Godly Gift</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
				newSpecies.baseStats[statName] = this.clampIntRange(newSpecies.baseStats[statName] + baseSpecies.baseStats[statName] - prevoSpecies.baseStats[statName], 1, 255);
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
		name: "[Gen 8] SCAMO BH",
		desc: `Scalemons + Camomons BH。BH，但是所有精灵的种族值按比例调整到接近600，且属性改为与自己的前两个技能一致。<br />输入“/scale &lt;宝可梦名称&gt;”来查看精灵在该规则下的种族值。例如：/scale pikachu。`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658482/">Scalemons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659817/">BH Resources</a>`,
		],
		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
			}
		},
	},
	{
		name: "[Gen 8] Trademarked BH",
		desc: `Still in alpha phase`,

		mod: 'gen8',
		searchShow: false,
		challengeShow: false,
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
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', '!Obtainable Abilities', 'Ability Clause = 1', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: [
			'Annihilape', 'Koraidon', 'Miraidon', 'Slaking', 'Arena Trap', 'Comatose', 'Contrary', 'Gorilla Tactics', 'Huge Power',
			'Illusion', 'Imposter', 'Innards Out', 'Magnet Pull', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Pure Power',
			'Shadow Tag', 'Simple', 'Speed Boost', 'Water Bubble', 'Wonder Guard', 'King\'s Rock', 'Baton Pass',
		],
	},
	{
		name: "[Gen 9] Mix and Mega",
		desc: `Mega evolve any Pok&eacute;mon with any mega stone and no limit. Boosts based on mega evolution from gen 7.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710921/">Mix and Mega</a>`,
		],

		mod: 'mixandmega',
		ruleset: ['Standard OMs', 'Evasion Items Clause', 'Evasion Abilities Clause', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: [
			'Miraidon', 'Beedrillite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite',
			'Moody', 'Shadow Tag', 'Baton Pass', 'Electrify', 'Shed Tail', 'Zap Cannon',
		],
		restricted: [
			'Flutter Mane', 'Gengar', 'Iron Bundle', 'Koraidon', 'Slaking',
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
					return [`${species.baseSpecies} does not exist in gen 9.`];
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
		name: "[Gen 9] Godly Gift",
		desc: `Each Pok&eacute;mon receives one base stat from a God (AG/Uber Pok&eacute;mon) depending on its position in the team. If there is no Uber Pok&eacute;mon, it uses the Pok&eacute;mon in the first slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710734/">Godly Gift</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Sleep Moves Clause', 'Godly Gift Mod', 'Min Source Gen = 9'],
		banlist: ['Blissey', 'Chansey', 'Cyclizar', 'Iron Hands', 'Arena Trap', 'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Booster Energy', 'Baton Pass'],
	},
	{
		name: "[Gen 9] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710577/">STABmons</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'STABmons Move Legality', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: ['Dragapult', 'Flutter Mane', 'Komala', 'Koraidon', 'Miraidon', 'Arena Trap', 'Moody', 'Shadow Tag', 'Booster Energy', 'King\'s Rock', 'Baton Pass'],
		restricted: [
			'Acupressure', 'Astral Barrage', 'Belly Drum', 'Extreme Speed', 'Fillet Away', 'Last Respects',
			'No Retreat', 'Shed Tail', 'Shell Smash', 'V-create', 'Victory Dance', 'Wicked Blow',
		],
	},
	{
		name: "[Gen 9] NFE",
		desc: `Only Pok&eacute;mon that can evolve are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710638/">NFE</a>`,
		],

		mod: 'gen9',
		ruleset: ['Standard OMs', 'Not Fully Evolved', 'Sleep Moves Clause', 'Min Source Gen = 9'],
		banlist: [
			'Bisharp', 'Chansey', 'Haunter', 'Magneton', 'Primeape', 'Scyther', 'Arena Trap', 'Shadow Tag', 'Baton Pass',
			// Shouldn't be legal
			'Stantler', 'Ursaring',
		],
	},
	{
		name: "[Gen 8] Free-For-All",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3681641/">Free-For-All</a>`,
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
		banlist: ['Koraidon', 'Miraidon', 'Commander', 'Focus Sash', 'King\'s Rock', 'Ally Switch', 'Final Gambit', 'Perish Song', 'Swagger'],
	},
	{
		name: "[Gen 9] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3710911/">AG Metagame Discussion</a>`,
		],

		mod: 'gen9',
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] Bad'n'Boosted",
		desc: `Pok&eacute;mon with base stats of 70 or lower get those stats doubled.`,
		threads: [
			`None yet.`,
		],

		mod: 'gen8',
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

		mod: 'gen8',
		ruleset: ['Standard OMs', 'Ability Clause = 2', 'Sleep Clause Mod'],
		banlist: ['Corsola-Galar', 'Sneasel', 'Type: Null', 'Arena Trap', 'Ice Scales', 'Moody', 'King\'s Rock', 'Baton Pass'],
		restricted: ['Chansey', 'Lunala', 'Shedinja', 'Solgaleo', 'Gorilla Tactics', 'Huge Power', 'Pure Power', 'Shadow Tag'],
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
		ruleset: ['Standard OMs', 'Ability Clause = 2', 'Sleep Moves Clause'],
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
			if (this.ruleTable.has('abilityclause')) {
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
		name: "[Gen 8] Partners in Crime",
		desc: `Doubles-based metagame where both active ally Pok&eacute;mon share abilities and moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3706080/">Partners in Crime</a>`,
		],

		mod: 'partnersincrime',
		gameType: 'doubles',
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
		name: "[Gen 9] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656851/">(Gen 8) Pure Hackmons</a>`,
		],

		mod: 'gen9',
		debug: true,
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
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
		ruleset: ['Picked Team Size = 2', 'Max Team Size = 4', 'Standard OMs', 'Sleep Moves Clause', 'Evasion Abilities Clause'],
		banlist: [
			'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Dialga', 'Eternatus', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black',
			'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Melmetal', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia',
			'Rayquaza', 'Reshiram', 'Solgaleo', 'Spectrier', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned',
			'Zekrom', 'Moody', 'Power Construct', 'Bright Powder', 'Focus Sash', 'King\'s Rock', 'Lax Incense', 'Final Gambit',
		],
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
		restricted: [
			'Baneful Bunker', 'Block', 'Copycat', 'Corrosive Gas', 'Detect', 'Destiny Bond', 'Disable', 'Encore', 'Fairy Lock', 'Hypnosis', 'Ingrain',
			'Instruct', 'Lovely Kiss', 'King\'s Shield', 'Mat Block', 'Mean Look', 'Memento', 'move:Metronome', 'Obstruct', 'Octolock', 'Nature Power',
			'Parting Shot', 'Psycho Shift', 'Protect', 'Roar', 'Sing', 'Skill Swap', 'Sleep Powder', 'Sleep Talk', 'Spiky Shield', 'Spore', 'Substitute',
			'Switcheroo', 'Teleport', 'Trick', 'Whirlwind', 'Wish', 'Yawn',
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
		name: "[Gen 6] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/9029427/">ORAS Pure Hackmons</a>`,
		],

		mod: 'gen6',
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'EV limit = 510'],
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
		name: "[Gen 9] Custom Game",

		mod: 'gen9',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
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