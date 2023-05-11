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
		// Nihilslave: we should put as many as possible props in onModifyMove
		// cuz in that case we don't need to write a lot of `if (move.category === 'Status')`s
		const retValComplexProperties = [
			'onPrepareHit', 'onHit', 'onTryHit', 'onTryImmunity', 'onTryMove'
		] as const;
		for (const prop of retValComplexProperties) {
			move[prop] = mergeCallback(move, forte, prop);
		}

		forte.onModifyMove?.call(this, move, pokemon, target);
	};
}
function setMoveCallbacksTrade(itemOrAbility: any, move: Move) {}
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
};
