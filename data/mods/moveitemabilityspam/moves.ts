export const Moves: {[k: string]: ModdedMoveData} = {
	grassknot: {
		inherit: true,
		onTryHit(target, pokemon, move) {
			if (target.volatiles['dynamax']) {
				this.add('-fail', pokemon, 'Dynamax');
				this.attrLastMove('[still]');
				return null;
			}
		},
	},
	judgment: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (!pokemon.ignoringAbility()) {
				const ability = pokemon.getAbility() as unknown as Item;
				if (ability.id && ability.onPlate && !ability.zMove) {
					move.type = ability.onPlate;
				}
			}
			if (!pokemon.ignoringItem()) {
				const item = pokemon.getItem();
				if (item.id && item.onPlate && !item.zMove) {
					move.type = item.onPlate;
				}
			}
		},
	},
};
