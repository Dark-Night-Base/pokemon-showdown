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
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (move.secondaries === null || move.secondaries === undefined) move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			}
		},
		secondary: {},
	},
};
