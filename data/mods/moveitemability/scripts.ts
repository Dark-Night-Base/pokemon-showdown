import { Ability } from "../../../sim/dex-abilities";
import { Item } from "../../../sim/dex-items";

/**
 * listen, the plan is to get everything done in getItem() and getAbility()
 * otherwise things will be too complex
 * sim/battle.ts::Battle.findPokemonEventHandlers() will find callback functions of items and abilities
 * by getItem() and getAbility()
 * so i think this should be the best way to code the mod
 */

function mergeFractions(r1?: [number, number], r2?: [number, number], lcm: number = 100): [number, number] | undefined {
	if (!r1) return r2;
	if (!r2) return r1;
	return [r1[0] * lcm / r1[1] + r2[0] * lcm / r2[1], lcm];
}
function getDamageCallback(forte: Move | ActiveMove): ((this: Battle, pokemon: Pokemon, target: Pokemon) => number | false) | undefined {
	if (forte.damageCallback) return forte.damageCallback;
	if (typeof forte.damage === 'number') return (function (pkm: Pokemon, target: Pokemon) { return forte.damage as number; });
	if (forte.damage === 'level') return (function (pkm: Pokemon, target: Pokemon) { return pkm.level; });
}
function mergeDamageCallback(
	dc1?: (this: Battle, pokemon: Pokemon, target: Pokemon) => number | false,
	dc2?: (this: Battle, pokemon: Pokemon, target: Pokemon) => number | false
): ((this: Battle, pokemon: Pokemon, target: Pokemon) => number | false) | undefined {
	if (!dc1) return dc2;
	if (!dc2) return dc1;
	return (function (pkm: Pokemon, tgt: Pokemon) {
		const ret1 = dc1.call(this, pkm, tgt);
		const ret2 = dc2.call(this, pkm, tgt);
		return this.actions.combineResults(ret1, ret2);
	});
}
function mergeGeneralCallback(
	c1?: (this: Battle, arg1: any, arg2: any, arg3: any) => any,
	c2?: (this: Battle, arg1: any, arg2: any, arg3: any) => any,
): ((this: Battle, arg1: any, arg2: any, arg3: any) => any) | undefined {
	if (!c1) return c2;
	if (!c2) return c1;
	return (function (a1: any, a2: any, a3: any) {
		const ret1 = c1.call(this, a1, a2, a3);
		const ret2 = c2.call(this, a1, a2, a3);
		return this.actions.combineResults(ret1, ret2);
	});
}
function mergeCallback(move: any, forte: any, property: string) {
	// @ts-ignore - dynamic lookup
	return mergeGeneralCallback(move[property], forte[property]);
}

function setMoveCallbacksForte(itemOrAbility: any, forte: Move) {
	// complexProperties - part 0 - before onModifyMove
	itemOrAbility.onModifyPriorityPriority = 1;
	itemOrAbility.onModifyPriority = function (priority: number, source: Pokemon, target: Pokemon, move: ActiveMove) {
		if (move.category === 'Status') return;
		move.flags['heal'] = move.flags['heal'] || forte.flags['heal'];
		return forte.onModifyPriority?.call(this, priority, source, target, move);
	};
	itemOrAbility.onBeforeMovePriority = 11;
	// everytime a move is used, the simulator will summon a temporary ActiveMove for it
	// so move will never get modified by the same itemOrAbility twice I guess
	// by saying that, I mean the use of moveCallback is safe
	itemOrAbility.onBeforeMove = function (source: Pokemon, target: Pokemon, move: ActiveMove) {
		if (move.category === 'Status') return;
		move.sleepUsable = move.sleepUsable || forte.sleepUsable;
		move.flags['defrost'] = move.flags['defrost'] || forte.flags['defrost'];
		// yea we have to modify beforeMoveCallback here since such property of itemOrAbility won't be called
		move.beforeMoveCallback = mergeCallback(move, forte, 'beforeMoveCallback');
	};
	itemOrAbility.onModifyTypePriority = 1;
	itemOrAbility.onModifyType = function (move: ActiveMove, pokemon: Pokemon, target: Pokemon) {
		if (move.category === 'Status') return;
		return forte.onModifyType?.call(this, move, pokemon, target);
	}

	itemOrAbility.onModifyMovePriority = 1;
	itemOrAbility.onModifyMove = function (move: ActiveMove, pokemon: Pokemon, target: Pokemon) {
		if (move.category === 'Status') return;
		// simple properties
		// part 0 - flags
		move.flags = {...move.flags, ...forte.flags};
		const simpleProperties = ['breaksProtect', 'forceSwitch', 'hasCrashDamage', 'hasSheerForce',
			'ignoreAbility', 'ignoreDefensive', 'ignoreEvasion', 'ignoreImmunity', 'mindBlownRecoil',
			'ohko', 'overrideDefensiveStat', 'overrideOffensivePokemon', 'overrideOffensiveStat',
			// note: check pseudoWeather in further generations
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

		// part 1 - secondary&status&self
		move.secondaries = (move.secondaries || []).concat(forte.secondaries || []);
		if (forte.volatileStatus) {
			if (move.volatileStatus && move.volatileStatus !== forte.volatileStatus) {
				move.volatileStatus += '+' + forte.volatileStatus;
			} else {
				move.volatileStatus = forte.volatileStatus;
			}
		}
		if (forte.self) {
			if (!move.self) {
				move.self = {};
			}
			for (const i in forte.self) {
				if (['onHit', 'boosts', 'volatileStatus'].includes(i)) continue;
				(move.self as any)[i] = (forte.self as any)[i];
			}
			move.self.onHit = mergeCallback(move.self, forte.self, 'onHit');
			// todo: fix diamond storm, it has a chance of 50%
			if (forte.self.boosts) {
				if (!move.self.boosts) move.self.boosts = {};
				let boostid: BoostID;
				for (boostid in forte.self.boosts) {
					if (!move.self.boosts[boostid]) move.self.boosts[boostid] = 0;
					move.self.boosts[boostid]! += forte.self.boosts[boostid]!;
				}
			}
			if (forte.self.volatileStatus) {
				if (move.self.volatileStatus && move.self.volatileStatus !== forte.self.volatileStatus) {
					move.self.volatileStatus += '+' + forte.self.volatileStatus;
				} else {
					move.self.volatileStatus = forte.self.volatileStatus;
				}
			}
		}

		// part 2 - numberic properties
		move.critRatio = (move.critRatio || 1) + (forte.critRatio || 1) - 1;
		// ;-; we can't use mergeCallback() here
		const moveDamageCallback = getDamageCallback(move);
		const forteDamageCallback = getDamageCallback(forte);
		move.damageCallback = mergeDamageCallback(moveDamageCallback, forteDamageCallback);
		move.drain = mergeFractions(move.drain, forte.drain, 4);
		move.recoil = mergeFractions(move.recoil, forte.recoil);
		if (forte.selfBoost?.boosts) {
			if (!move.selfBoost?.boosts) move.selfBoost = {boosts: {}};
			let boostid: BoostID;
			for (boostid in forte.selfBoost.boosts) {
				if (!move.selfBoost.boosts![boostid]) move.selfBoost.boosts![boostid] = 0;
				move.selfBoost.boosts![boostid]! += forte.selfBoost.boosts[boostid]!;
			}
		}

		// complexProperties - part 1
		if (forte.basePowerCallback) {
			const moveCallback = move.basePowerCallback;
			if (moveCallback) {
				move.basePowerCallback = function (pkm, tgt, mv) {
					let baseMove = this.dex.deepClone(mv);
					let basePower = moveCallback.call(this, pkm, tgt, mv);
					baseMove.basePower = basePower || 1;
					// should use baseMove here, instead of mv
					basePower = forte.basePowerCallback!.call(this, pkm, tgt, baseMove);
					return basePower;
				};
			} else {
				move.basePowerCallback = forte.basePowerCallback;
			}
		}
		if (forte.onEffectiveness) {
			const moveOnEffectiveness = move.onEffectiveness;
			if (moveOnEffectiveness) {
				move.onEffectiveness = function (typeMod, tgt, tp, mv) {
					const moveEffectiveness = moveOnEffectiveness!.call(this, typeMod, tgt, tp, mv);
					const forteEffectiveness = forte.onEffectiveness!.call(this, moveEffectiveness || typeMod, tgt, tp, mv);
					return forteEffectiveness || 0;
				};
			} else {
				move.onEffectiveness = forte.onEffectiveness;
			}
		}
		// i give up, just pretend it will work
		if (forte.onTry) {
			const moveonTry = move.onTry;
			if (moveonTry) {
				move.onTry = function (src, tgt, mv) {
					const ret1 = (moveonTry as any).call(this, src, tgt, mv);
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
		// Nihilslave: we should put as many as possible props in onModifyMove
		// cuz in that case we don't need to write a lot of `if (move.category === 'Status')`s
		const generalComplexProperties = [
			// relevant return values
			'onHit', 'onPrepareHit', 'onTryHit', 'onTryImmunity', 'onTryMove',
			// irrelevant return values
			'onAfterHit', 'onAfterMove', 'onAfterMoveSecondarySelf'
		] as const;
		for (const prop of generalComplexProperties) {
			move[prop] = mergeCallback(move, forte, prop);
		}

		forte.onModifyMove?.call(this, move, pokemon, target);
	};
	itemOrAbility.onAfterSubDamage = function (damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) {
		if (move.category === 'Status') return;
		return forte.onAfterSubDamage?.call(this, damage, target, source, move);
	};
	// we no longer need this since we implement everything property, i think
	// itemOrAbility.onModifySecondaries = function () {};
}
function setMoveCallbacksTrade(itemOrAbility: any, move: Move) {
	itemOrAbility.onStart = function (target: Pokemon) {
		// Nihilslave: not quite sure under which case infinite loop will happen, just go without check
		this.actions.useMove({...move, accuracy: true}, target);
	};
}
function setItemCallbacks(ability: Ability, item: Item) {}
function setAbilityCallbacks(item: Item, ability: Ability) {}

function resolveMoveforItem(move: Move): Item {
	const result = new Item({
		id: move.id,
		name: move.name,
		num: 137,
		ignoreKlutz: true,
		onTakeItem: false,
	});
	if (move.category === 'Status') {
		setMoveCallbacksTrade(result, move)
	} else {
		setMoveCallbacksForte(result, move);
	}
	return result;
}
function resolveMoveforAbility(move: Move): Ability {
	const result = new Ability({
		id: move.id,
		name: move.name,
		num: 0,
		isPermanent: true,
	});
	if (move.category === 'Status') {
		setMoveCallbacksTrade(result, move)
	} else {
		setMoveCallbacksForte(result, move);
	}
	return result;
}
function resolveItemforAbility(item: Item): Ability {
	const result = new Ability({
		id: item.id,
		name: item.name,
		num: 0,
		isPermanent: true,
	});
	setItemCallbacks(result, item);
	return result;
}
function resolveAbilityforItem(ability: Ability): Item {
	const result = new Item({
		id: ability.id,
		name: ability.name,
		num: 137,
		ignoreKlutz: true,
		onTakeItem: false,
	});
	setAbilityCallbacks(result, ability);
	return result;
}
export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	// core
	pokemon: {
		getItem() {
			const item = this.battle.dex.items.getByID(this.ability);
			if (item.exists) return item;
			const move = this.battle.dex.moves.getByID(this.ability);
			if (move.exists) return resolveMoveforItem(move);
			const ability = this.battle.dex.abilities.getByID(this.ability);
			if (ability.exists) return resolveAbilityforItem(ability);
			return item;
		},
		hasItem(item) {
			if (
				this.battle.dex.moves.get(this.item).exists ||
				this.battle.dex.abilities.get(this.item).exists
			) return false;
			// todo: modify ignoringItem() and ignoringAbility()
			return (
				Object.getPrototypeOf(this).hasItem.call(this, item) ||
				Object.getPrototypeOf(this).hasAbility.call(this, item)
			);
		},
		takeItem(source) {
			if (!this.isActive) return false;
			if (!this.item || this.itemState.knockedOff) return false;
			if (
				this.battle.dex.moves.get(this.item).exists ||
				this.battle.dex.abilities.get(this.item).exists
			) return false;
			return Object.getPrototypeOf(this).takeItem.call(this, source);
		},
		getAbility() {
			const ability = this.battle.dex.abilities.getByID(this.ability);
			if (ability.exists) return ability;
			const move = this.battle.dex.moves.getByID(this.ability);
			if (move.exists) return resolveMoveforAbility(move);
			const item = this.battle.dex.items.getByID(this.ability);
			if (item.exists) return resolveItemforAbility(item);
			return ability;
		},
		hasAbility(ability) {
			if (
				this.battle.dex.items.get(this.item).exists ||
				this.battle.dex.moves.get(this.item).exists
			) return false;
			return (
				Object.getPrototypeOf(this).hasAbility.call(this, ability) ||
				Object.getPrototypeOf(this).hasItem.call(this, ability)
			);
		},
	},
	// for volatileStatus stack
	actions: {
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
						(action.move.priorityChargeCallback || abilityCallback || itemCallback)
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
			this.debug(`priority charge callback: ${action.move.id}|${action.pokemon.ability}|${action.pokemon.item}`);
			if (action.move.priorityChargeCallback) action.move.priorityChargeCallback.call(this, action.pokemon);
			const actionPokemonAbility = this.dex.moves.get(action.pokemon.ability);
			if (actionPokemonAbility.priorityChargeCallback) actionPokemonAbility.priorityChargeCallback.call(this, action.pokemon);
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
