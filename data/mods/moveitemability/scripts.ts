import { Ability } from "../../../sim/dex-abilities";
import { Item } from "../../../sim/dex-items";

/**
 * listen, the plan is to get everything done in getItem() and getAbility()
 * otherwise things will be too complex
 * sim/battle.ts::Battle.findPokemonEventHandlers() will find callback functions of items and abilities
 * by getItem() and getAbility()
 * so i think this should be the best way to solve code the mod
 */

function setMoveCallbacksForte(itemOrAbility: any, forte: Move) {
	itemOrAbility.onModifyPriorityPriority = 1;
	itemOrAbility.onModifyPriority = function (priority: number, source: Pokemon, target: Pokemon, move: ActiveMove) {
		move.flags['heal'] = move.flags['heal'] || forte.flags['heal'];
		return forte.onModifyPriority?.call(this, priority, source, target, move);
	};
	itemOrAbility.onBeforeMovePriority = 11;
	itemOrAbility.onBeforeMove = function (source: Pokemon, target: Pokemon, move: ActiveMove) {
		move.sleepUsable = move.sleepUsable || forte.sleepUsable;
		move.flags['defrost'] = move.flags['defrost'] || forte.flags['defrost'];
		// yea we have to modify beforeMoveCallback here since such property of itemOrAbility won't be called
		if (forte.beforeMoveCallback) {
			if (move.beforeMoveCallback) {
				move.beforeMoveCallback = function (pkm, tgt, mv) {
					const ret1 = this.dex.moves.get(move.id).beforeMoveCallback!.call(this, pkm, tgt, mv);
					const ret2 = forte.beforeMoveCallback!.call(this, pkm, tgt, mv);
					return this.actions.combineResults(ret1 as any, ret2 as any);
				}
			} else {
				move.beforeMoveCallback = forte.beforeMoveCallback;
			}
		}
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
			return Object.getPrototypeOf(this).hasItem.call(this, item);
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
			return this.hasAbility.call(this, ability);
		},
	},
};
