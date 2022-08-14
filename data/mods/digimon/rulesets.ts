export const Rulesets: {[k: string]: ModdedFormatData} = {
	obtainable: {
		inherit: true,
		onValidateSet(this, set, format, setHas, teamHas) {
			const species = this.dex.species.get(set.species);
			if (species.num <= 40000) {
				return [`${species.baseSpecies} is not a Digimon.`];
			}
		},
	},
};