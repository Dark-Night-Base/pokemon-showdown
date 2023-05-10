import { Ability } from "../../../sim/dex-abilities";
import { Item } from "../../../sim/dex-items";

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	pokemon: {
		getItem() {
			const item = this.battle.dex.items.getByID(this.ability);
			if (item.exists) return item;
			const ability = this.battle.dex.abilities.getByID(this.ability);
			if (ability.exists) {
				const result = new Item({
					id: ability.id,
					name: ability.name,
					num: 137,
					ignoreKlutz: true,
					onTakeItem: false,
				});
				return result;
			}
			const move = this.battle.dex.moves.getByID(this.ability);
			if (move.exists) {
				const result = new Item({
					id: move.id,
					name: move.name,
					num: 137,
					ignoreKlutz: true,
					onTakeItem: false,
				});
				return result;
			}
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
			const item = this.battle.dex.items.getByID(this.ability);
			if (item.exists) {
				const result = new Ability({
					id: item.id,
					name: item.name,
					num: 0,
					isPermanent: true,
				});
				return result;
			}
			const move = this.battle.dex.moves.getByID(this.ability);
			if (move.exists) {
				const result = new Ability({
					id: move.id,
					name: move.name,
					num: 0,
					isPermanent: true,
				});
				return result;
			}
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
