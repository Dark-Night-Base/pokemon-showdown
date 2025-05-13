export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	illusion: {
		inherit: true,
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.getUpdatedDetails();
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
				// Nihilslave: here, 2
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[silent]');
				this.add('-start', pokemon, 'bcstats', Object.values(pokemon.set.evs).join('/'), '[silent]');
				if (this.ruleTable.has('illusionlevelmod')) {
					this.hint("Illusion Level Mod is active, so this Pok\u00e9mon's true level was hidden.", true);
				}
			}
		},
	},
};
