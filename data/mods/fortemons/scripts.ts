import { Dex } from "../../../sim";
import { Item } from "../../../sim/dex-items";

/**
 * subset of moveitemability
 */

function mergeFraction(r1?: [number, number], r2?: [number, number], lcm: number = 100): [number, number] | undefined {
	if (!r1) return r2;
	if (!r2) return r1;
	return [r1[0] * lcm / r1[1] + r2[0] * lcm / r2[1], lcm];
}
function mergeBoosts(b1?: Partial<BoostsTable> | null, b2?: Partial<BoostsTable> | null): Partial<BoostsTable> | null | undefined {
	if (!b1) return b2;
	if (!b2) return b1;
	const resultBoosts: Partial<BoostsTable> = {};
	const boostidSet = new Set<BoostID>([...Object.keys(b1) as BoostID[], ...Object.keys(b2) as BoostID[]]);
	let boostid: BoostID;
	for (boostid of boostidSet) resultBoosts[boostid] = (b1[boostid] || 0) + (b2[boostid] || 0);
	for (boostid in resultBoosts) {
		if (!resultBoosts[boostid]) delete resultBoosts[boostid];
	}
	if (!Object.keys(resultBoosts).length) return null;
	return resultBoosts;
}
function mergeVolatileStatus(v1?: string, v2?: string): string | undefined {
	if (!v1) return v2;
	if (!v2) return v1;
	if (!v1.split('+').includes(v2)) return `${v1}+${v2}`;
	return v1;
}
/**
 * note: see conditions.ts for future move mechanics
 * when a future move hit, it calls trySpreadMoveHit()
 * which will not trigger many things, such as onModifyMove
 */
function mergeOnTry(move: ActiveMove, forte: Move) {
	if (!forte.flags['futuremove']) return mergeCallback(move.onTry as any, forte.onTry as any);
	if (move.flags['futuremove']) return move.onTry;
	move.flags['futuremove'] = 1;
	const forteFutureOnTry = function (this: Battle, src: Pokemon, tgt: Pokemon, mv: ActiveMove) {
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
		this.add('-start', src, move.name);
		return this.NOT_FAIL;
	};
	return mergeCallback(move.onTry as any, forteFutureOnTry);
}
function getDamageCallback(forte: Move | ActiveMove): ((this: Battle, pokemon: Pokemon, target: Pokemon) => number | false) | undefined {
	if (forte.damageCallback) return forte.damageCallback;
	if (typeof forte.damage === 'number') return (function (pkm: Pokemon, tgt: Pokemon) { return forte.damage as number; });
	if (forte.damage === 'level') return (function (pkm: Pokemon, tgt: Pokemon) { return pkm.level; });
}
function mergeCallback(
	c1?: (this: Battle, ...args: any[]) => any,
	c2?: (this: Battle, ...args: any[]) => any,
): ((this: Battle, ...args: any[]) => any) | undefined {
	if (!c1) return c2;
	if (!c2) return c1;
	return (function (...a) {
		const ret1 = c1.call(this, ...a);
		const ret2 = c2.call(this, ...a);
		return this.actions.combineResults(ret1, ret2);
	});
}
/**
 * everytime a move is used, the simulator will summon a temporary ActiveMove for it
 * so move will never get modified by the same itemOrAbility twice I guess
 * by saying that, I mean the use of mergeProperty is safe
 */
function mergeProperty(move: any, forte: any, property: string): any {
	let p1 = move[property];
	let p2 = forte[property];
	switch (property) {
	case 'drain':
	case 'recoil':
		return mergeFraction(p1, p2);
	case 'boosts':
		return mergeBoosts(p1, p2);
	case 'volatileStatus':
		return mergeVolatileStatus(p1, p2);
	case 'onTry':
		return mergeOnTry(move, forte);
	// case 'damageCallback':
	// 	p1 = getDamageCallback(move);
	// 	p2 = getDamageCallback(forte);
	default:
		return mergeCallback(p1, p2);
	}
}

function setMoveCallbacksForte(itemOrAbility: any, forte: Move) {
	// complexProperties
	// part 0 - before onModifyMove
	itemOrAbility.onModifyPriorityPriority = 1;
	itemOrAbility.onModifyPriority = function (priority: number, source: Pokemon, target: Pokemon, move: ActiveMove) {
		// if you aren't really familiar with battle events, don't even touch this function
		// it's more complex than you think, read sim/battle.ts::runEvent()
		if (move.category === 'Status') return;
		move.flags['heal'] = move.flags['heal'] || forte.flags['heal'];
		const forteModifiedPriority = forte.onModifyPriority?.call(this, priority, source, target, move);
		if (forteModifiedPriority === undefined) {
			if (!forte.priority) return;
			return priority + forte.priority;
		}
		return forteModifiedPriority + forte.priority;
	};
	itemOrAbility.onBeforeMovePriority = 11;
	itemOrAbility.onBeforeMove = function (source: Pokemon, target: Pokemon, move: ActiveMove) {
		if (move.category === 'Status') return;
		move.sleepUsable = move.sleepUsable || forte.sleepUsable;
		move.flags['defrost'] = move.flags['defrost'] || forte.flags['defrost'];
		// yea we have to modify beforeMoveCallback here since such property of itemOrAbility won't be called
		move.beforeMoveCallback = mergeProperty(move, forte, 'beforeMoveCallback');
	};
	// this should be -1 imo to be the same as -ate abilities
	itemOrAbility.onModifyTypePriority = -1;
	itemOrAbility.onModifyType = function (move: ActiveMove, pokemon: Pokemon, target: Pokemon) {
		if (move.category === 'Status') return;
		return forte.onModifyType?.call(this, move, pokemon, target);
	};

	// set this to 1 for sheer force
	itemOrAbility.onModifyMovePriority = 1;
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
	itemOrAbility.onModifyMove = function (move: ActiveMove, pokemon: Pokemon, target: Pokemon) {
		if (move.category === 'Status') return;
		// simple properties
		// part 0 - flags
		move.flags = {...move.flags, ...forte.flags, futuremove: move.flags.futuremove}; // futuremove flag will be set later
		// selected from sim/dex-moves.ts:MoveData
		const simpleProperties = ['ohko', 'thawsTarget', 'forceSwitch', 'selfSwitch', 'selfdestruct', 'breaksProtect',
			'mindBlownRecoil', 'stealsBoosts', 'struggleRecoil', 'hasSheerForce',
			'overrideDefensivePokemon', 'overrideDefensiveStat', 'overrideOffensivePokemon', 'overrideOffensiveStat',
			'forceSTAB', 'ignoreAbility', 'ignoreAccuracy', 'ignoreDefensive', 'ignoreEvasion', 'ignoreImmunity',
			'ignoreNegativeOffensive', 'ignoreOffensive', 'ignorePositiveDefensive', 'ignorePositiveEvasion',
			'sleepUsable', 'smartTarget', 'tracksTarget', 'willCrit', 'hasCrashDamage', 'noSketch',
			'pseudoWeather',
			// Nihilslave: the final decision is to make these 2 unstackable like low kick
			'damage', 'damageCallback',
			// function properties
			'onDamagePriority', 'onDamage', 'onUseMoveMessage',
		] as const;
		for (const prop of simpleProperties) {
			if (forte[prop]) move[prop] = forte[prop] as any;
		}
		// otherwise the move still won't break protect
		if (move.breaksProtect) delete move.flags['protect'];

		// part 1 - secondary&status&self
		move.secondaries = (move.secondaries || []).concat(forte.secondaries || []);
		if (!move.secondaries.length) move.secondaries = null;
		move.volatileStatus = mergeProperty(move, forte, 'volatileStatus');
		// Nihilslave: diamond storm has a chance of 50 (won't fix)
		if (forte.self) {
			if (!move.self) move.self = {};
			for (const i in forte.self) {
				if (['onHit', 'boosts', 'volatileStatus'].includes(i)) (move.self as any)[i] = mergeProperty(move.self, forte.self, i);
				else (move.self as any)[i] = (forte.self as any)[i];
			}
		}

		// part 2 - numberic properties
		move.critRatio = (move.critRatio || 1) + (forte.critRatio || 1) - 1;
		// move.damageCallback = mergeProperty(move, forte, 'damageCallback');
		move.drain = mergeProperty(move, forte, 'drain');
		move.recoil = mergeProperty(move, forte, 'recoil');
		if (forte.selfBoost?.boosts) {
			if (!move.selfBoost?.boosts) move.selfBoost = {boosts: {}};
			move.selfBoost.boosts = mergeProperty(move.selfBoost, forte.selfBoost, 'boosts');
			if (!move.selfBoost.boosts) delete move.selfBoost;
		}

		// complexProperties
		// part 1 - really complex ones
		if (forte.basePowerCallback) {
			const moveCallback = move.basePowerCallback;
			if (moveCallback) {
				move.basePowerCallback = function (pkm, tgt, mv) {
					let baseMove = this.dex.deepClone(mv);
					let basePower = moveCallback.call(this, pkm, tgt, mv);
					baseMove.basePower = basePower || 0;
					// should use baseMove here, instead of mv
					basePower = forte.basePowerCallback!.call(this, pkm, tgt, baseMove);
					return basePower;
				};
			} else move.basePowerCallback = forte.basePowerCallback;
		}
		if (forte.onEffectiveness) {
			const moveOnEffectiveness = move.onEffectiveness;
			if (moveOnEffectiveness) {
				move.onEffectiveness = function (typeMod, tgt, tp, mv) {
					const moveEffectiveness = moveOnEffectiveness!.call(this, typeMod, tgt, tp, mv);
					if (moveEffectiveness !== undefined) typeMod = moveEffectiveness; 
					const forteEffectiveness = forte.onEffectiveness!.call(this, typeMod, tgt, tp, mv);
					if (forteEffectiveness !== undefined) return forteEffectiveness;
					return typeMod;
				};
			} else move.onEffectiveness = forte.onEffectiveness;
		}
		move.onTry = mergeProperty(move, forte, 'onTry');

		// part 2 - homographs
		// these properties have different meanings on moves and on items/abilities
		// so we cannot write them outside
		const complexProperties = [
			'onHit', 'onPrepareHit', 'onTryHit', 'onTryImmunity', 'onTryMove', 'onAfterHit', 'onAfterSubDamage', 'onMoveFail'
		] as const;
		for (const prop of complexProperties) move[prop] = mergeProperty(move, forte, prop);

		forte.onModifyMove?.call(this, move, pokemon, target);
	};
	// part 3 - after onModifyMove
	// the following 3 can be written inside onModifyMove, but be done outside to potentially give future moves more effects
	itemOrAbility.onAfterMove = function (source: Pokemon, target: Pokemon, move: ActiveMove) {
		if (move.category === 'Status') return;
		return forte.onAfterMove?.call(this, source, target, move);
	};
	itemOrAbility.onAfterMoveSecondarySelf = function (source: Pokemon, target: Pokemon, move: ActiveMove) {
		if (move.category === 'Status') return;
		return forte.onAfterMoveSecondarySelf?.call(this, source, target, move);
	};
	itemOrAbility.onBasePowerPriority = -1;
	itemOrAbility.onBasePower = function (basePower: number, source: Pokemon, target: Pokemon, move: ActiveMove) {
		if (move.category === 'Status') return;
		return forte.onBasePower?.call(this, basePower, source, target, move);
	};
	// let omittedProperties = ['beforeTurnCallback', 'onDisableMove', 'onModifyTarget'];
	// omitted cuz they are both unobtainable and complex
	// there are other omitted properties, not specified here since they are quite irrelevant
}

function resolveMoveforItem(move: Move): Item {
	const result = new Item({
		id: move.id,
		name: move.name,
		num: 137,
		ignoreKlutz: true,
		onTakeItem: false,
	});
	// sanity check
	if (move.category !== 'Status') setMoveCallbacksForte(result, move);
	return result;
}
export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	// core
	pokemon: {
		getItem() {
			const item = this.battle.dex.items.getByID(this.item);
			if (item.exists) return item;
			const move = this.battle.dex.moves.getByID(this.item);
			if (move.exists && move.category !== 'Status') return resolveMoveforItem(move);
			return item;
		},
	},
	actions: {
		/**
		 * without this, something like vcreate+poweruppunch won't trigger pup's secondaries
		 * here the 'Drop' in `selfDropped` means 'throw'
		 * a move with `selfDropped=true` means it has already thrown and is now without its `self` part
		 * at least from my understanding
		 * commented by Nihilslave
		 */
		secondaries(targets: SpreadMoveTargets, source: Pokemon, move: ActiveMove, moveData: ActiveMove, isSelf?: boolean) {
			if (!moveData.secondaries) return;
			for (const target of targets) {
				if (target === false) continue;
				const secondaries: Dex.SecondaryEffect[] =
					this.battle.runEvent('ModifySecondaries', target, source, moveData, moveData.secondaries.slice());
				for (const secondary of secondaries) {
					// Nihilslave: here
					if (!!secondary.self) move.selfDropped = false;
					const secondaryRoll = this.battle.random(100);
					// User stat boosts or target stat drops can possibly overflow if it goes beyond 256 in Gen 8 or prior
					const secondaryOverflow = (secondary.boosts || secondary.self) && this.battle.gen <= 8;
					if (typeof secondary.chance === 'undefined' ||
						secondaryRoll < (secondaryOverflow ? secondary.chance % 256 : secondary.chance)) {
						this.moveHit(target, source, move, secondary, true, isSelf);
					}
				}
			}
		},
		// for volatileStatus stack
		runMoveEffects(
			damage: SpreadMoveDamage, targets: SpreadMoveTargets, source: Pokemon,
			move: ActiveMove, moveData: ActiveMove, isSecondary?: boolean, isSelf?: boolean
		) {
			let didAnything: number | boolean | null | undefined = damage.reduce(this.combineResults);
			for (const [i, target] of targets.entries()) {
				if (target === false) continue;
				let hitResult;
				let didSomething: number | boolean | null | undefined = undefined;

				if (target) {
					if (moveData.boosts && !target.fainted) {
						hitResult = this.battle.boost(moveData.boosts, target, source, move, isSecondary, isSelf);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.heal && !target.fainted) {
						if (target.hp >= target.maxhp) {
							this.battle.add('-fail', target, 'heal');
							this.battle.attrLastMove('[still]');
							damage[i] = this.combineResults(damage[i], false);
							didAnything = this.combineResults(didAnything, null);
							continue;
						}
						const amount = target.baseMaxhp * moveData.heal[0] / moveData.heal[1];
						const d = target.heal((this.battle.gen < 5 ? Math.floor : Math.round)(amount));
						if (!d && d !== 0) {
							this.battle.add('-fail', source);
							this.battle.attrLastMove('[still]');
							this.battle.debug('heal interrupted');
							damage[i] = this.combineResults(damage[i], false);
							didAnything = this.combineResults(didAnything, null);
							continue;
						}
						this.battle.add('-heal', target, target.getHealth);
						didSomething = true;
					}
					if (moveData.status) {
						hitResult = target.trySetStatus(moveData.status, source, moveData.ability ? moveData.ability : move);
						if (!hitResult && move.status) {
							damage[i] = this.combineResults(damage[i], false);
							didAnything = this.combineResults(didAnything, null);
							continue;
						}
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.forceStatus) {
						hitResult = target.setStatus(moveData.forceStatus, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.volatileStatus) {
						// Nihilslave: here
						const vStatus = moveData.volatileStatus.split('+');
						for (const status of vStatus) {
							hitResult = target.addVolatile(status, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
					}
					if (moveData.sideCondition) {
						hitResult = target.side.addSideCondition(moveData.sideCondition, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.slotCondition) {
						hitResult = target.side.addSlotCondition(target, moveData.slotCondition, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.weather) {
						hitResult = this.battle.field.setWeather(moveData.weather, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.terrain) {
						hitResult = this.battle.field.setTerrain(moveData.terrain, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.pseudoWeather) {
						hitResult = this.battle.field.addPseudoWeather(moveData.pseudoWeather, source, move);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					if (moveData.forceSwitch) {
						hitResult = !!this.battle.canSwitch(target.side);
						didSomething = this.combineResults(didSomething, hitResult);
					}
					// Hit events
					//   These are like the TryHit events, except we don't need a FieldHit event.
					//   Scroll up for the TryHit event documentation, and just ignore the "Try" part. ;)
					if (move.target === 'all' && !isSelf) {
						if (moveData.onHitField) {
							hitResult = this.battle.singleEvent('HitField', moveData, {}, target, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
					} else if ((move.target === 'foeSide' || move.target === 'allySide') && !isSelf) {
						if (moveData.onHitSide) {
							hitResult = this.battle.singleEvent('HitSide', moveData, {}, target.side, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
					} else {
						if (moveData.onHit) {
							hitResult = this.battle.singleEvent('Hit', moveData, {}, target, source, move);
							didSomething = this.combineResults(didSomething, hitResult);
						}
						if (!isSelf && !isSecondary) {
							this.battle.runEvent('Hit', target, source, move);
						}
					}
				}
				if (moveData.selfdestruct === 'ifHit' && damage[i] !== false) {
					this.battle.faint(source, source, move);
				}
				if (moveData.selfSwitch) {
					if (this.battle.canSwitch(source.side)) {
						didSomething = true;
					} else {
						didSomething = this.combineResults(didSomething, false);
					}
				}
				// Move didn't fail because it didn't try to do anything
				if (didSomething === undefined) didSomething = true;
				damage[i] = this.combineResults(damage[i], didSomething === null ? false : didSomething);
				didAnything = this.combineResults(didAnything, didSomething);
			}

			if (!didAnything && didAnything !== 0 && !moveData.self && !moveData.selfdestruct) {
				if (!isSelf && !isSecondary) {
					if (didAnything === false) {
						this.battle.add('-fail', source);
						this.battle.attrLastMove('[still]');
					}
				}
				this.battle.debug('move failed because it did nothing');
			} else if (move.selfSwitch && source.hp) {
				source.switchFlag = move.id;
			}

			return damage;
		},
	},
	// for beakblast / focuspunch forte
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
					revivalblessing: 6,

					runUnnerve: 100,
					runSwitch: 101,
					runPrimal: 102,
					switch: 103,
					megaEvo: 104,
					runDynamax: 105,
					terastallize: 106,
					priorityChargeMove: 107,

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
					if (action.terastallize && !action.pokemon.terastallized) {
						actions.unshift(...this.resolveAction({
							choice: 'terastallize',
							pokemon: action.pokemon,
						}));
					}
					if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
						actions.unshift(...this.resolveAction({
							choice: 'runDynamax',
							pokemon: action.pokemon,
						}));
					}
					// Nihilslave: here
					const abilityCallback = this.battle.dex.moves.get(action.pokemon.ability).priorityChargeCallback;
					const itemCallback = this.battle.dex.moves.get(action.pokemon.item).priorityChargeCallback;
					if (
						!action.maxMove && !action.zmove &&
						(
							action.move.priorityChargeCallback ||
							action.move.category !== 'Status' &&
							(abilityCallback || itemCallback)
						)
					) {
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
		},
	},
	// for beakblast / focuspunch forte
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
		case 'terastallize':
			this.actions.terastallize(action.pokemon);
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
			// Nihilslave: here
			this.debug(`priority charge callback: ${action.move.id}|${action.pokemon.item}`);
			if (action.move.priorityChargeCallback) action.move.priorityChargeCallback.call(this, action.pokemon);
			const actionPokemonItem = this.dex.moves.get(action.pokemon.item);
			if (actionPokemonItem.priorityChargeCallback) actionPokemonItem.priorityChargeCallback.call(this, action.pokemon);
			// throw new Error(`priorityChargeMove has no priorityChargeCallback`);
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
		case 'revivalblessing':
			action.pokemon.side.pokemonLeft++;
			if (action.target.position < action.pokemon.side.active.length) {
				this.queue.addChoice({
					choice: 'instaswitch',
					pokemon: action.target,
					target: action.target,
				});
			}
			action.target.fainted = false;
			action.target.faintQueued = false;
			action.target.subFainted = false;
			action.target.status = '';
			action.target.hp = 1; // Needed so hp functions works
			action.target.sethp(action.target.maxhp / 2);
			this.add('-heal', action.target, action.target.getHealth, '[from] move: Revival Blessing');
			action.pokemon.side.removeSlotCondition(action.pokemon, 'revivalblessing');
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
			let reviveSwitch = false; // Used to ignore the fake switch for Revival Blessing
			if (switches[i] && !this.canSwitch(this.sides[i])) {
				for (const pokemon of this.sides[i].active) {
					if (this.sides[i].slotConditions[pokemon.position]['revivalblessing']) {
						reviveSwitch = true;
						continue;
					}
					pokemon.switchFlag = false;
				}
				if (!reviveSwitch) switches[i] = false;
			} else if (switches[i]) {
				for (const pokemon of this.sides[i].active) {
					if (pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' && !pokemon.skipBeforeSwitchOutEventFlag) {
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
	},
};
