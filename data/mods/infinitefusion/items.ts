export const Items: {[k: string]: ModdedItemData} = {
	adamantcrystal: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			const nums = [this.dex.species.get(user.name).num, user.baseSpecies.num];
			if (nums.includes(483) && (move.type === 'Steel' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			const sourceNums = [this.dex.species.get(source.name).num, source.baseSpecies.num];
			const pokemonNums = [this.dex.species.get(pokemon.name).num, pokemon.baseSpecies.num];
			if (sourceNums.includes(483) || pokemonNums.includes(483)) {
				return false;
			}
			return true;
		},
		forcedForme: undefined,
	},
	adamantorb: {
		inherit: true,
		onBasePower(basePower, user, target, move) {
			const nums = [this.dex.species.get(user.name).num, user.baseSpecies.num];
			if (nums.includes(483) && (move.type === 'Steel' || move.type === 'Dragon')) {
				return this.chainModify([4915, 4096]);
			}
		},
	},
	deepseascale: {
		inherit: true,
		onModifySpD(spd, pokemon) {
			const nums = [this.dex.species.get(pokemon.name).num, pokemon.baseSpecies.num];
			if (nums.includes(366)) {
				return this.chainModify(2);
			}
		},
	},
	deepseatooth: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			const nums = [this.dex.species.get(pokemon.name).num, pokemon.baseSpecies.num];
			if (nums.includes(366)) {
				return this.chainModify(2);
			}
		},
	},
};
