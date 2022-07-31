export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen8',
	init() {
		for (const i in this.data.Moves) {
			this.modData('Moves', i).isNonstandard = null; // doesn't work, don't know why
		}
	},
	actions: {
		// still doesn't work, don't know why (maybe related to the three mega properties)
		canMegaEvo(pokemon) {
			if (pokemon.species.forme === "X") return null;

			const item = pokemon.getItem();
			if (item.id === 'xantibody' && pokemon.baseSpecies.otherFormes) {
				for (const forme of pokemon.baseSpecies.otherFormes) {
					const xforme = this.dex.species.get(forme);
					if (xforme.forme === "X") {
						return xforme.name;
					}
				}
			}
			return null;
		},
		runMegaEvo(pokemon) {
			if (pokemon.species.forme === "X") return false;

			const item = pokemon.getItem();
			if (pokemon.baseSpecies.otherFormes) {
				for (const forme of pokemon.baseSpecies.otherFormes) {
					const xforme = this.dex.species.get(forme);
					if (xforme.forme === "X") {
						pokemon.formeChange(xforme, pokemon.getItem(), true);					
						pokemon.canMegaEvo = null;
						return true;
					}
				}
			}
			return false;
		},
	},
};