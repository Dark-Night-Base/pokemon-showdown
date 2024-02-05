export const Abilities: {[k: string]: ModdedAbilityData} = {
	illusion: {
		inherit: true,
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				let details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				// Nihilslave: here, 3
				details += `, createmons:`;
				details += `${Object.values(pokemon.set.evs || [0, 0, 0, 0, 0, 0]).join(',')},`;
				details += `${pokemon.hpType},${pokemon.teraType}`;
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
