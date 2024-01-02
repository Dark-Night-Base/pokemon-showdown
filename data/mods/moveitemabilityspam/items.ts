export const Items: {[k: string]: ModdedItemData} = {
	blueorb: {
		inherit: true,
		onPrimal(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Kyogre') {
				pokemon.formeChange('Kyogre-Primal', this.effect, true);
			}
		},
	},
	redorb: {
		inherit: true,
		onPrimal(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Groudon') {
				pokemon.formeChange('Groudon-Primal', this.effect, true);
			}
		},
	},
};
