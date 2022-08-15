export const Rulesets: {[k: string]: ModdedFormatData} = {
	standarddigimon: {
		effectType: 'ValidatorRule',
		name: 'Standard Digimon',
		desc: "The standard ruleset for Digimon.",
		ruleset: [
			'Cancel Mod', 'Dynamax Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Obtainable', 'Team Preview', 
			'Nickname Clause', 'Species Clause', 
		],
		onChangeSet(set) {
			const species = this.dex.species.get(set.species);
			const isX = species.forme === 'X';
			if (isX) {
				const baseSpecies = this.dex.species.get(species.baseSpecies);
				const ability = this.dex.abilities.get(set.ability);
				set.species = baseSpecies.name;
				set.item = 'X-Antibody';
				for (const a in baseSpecies.abilities) {
					if (this.dex.abilities.get(a) === ability) {
						return;
					}
				}
				set.ability = baseSpecies.abilities[0];
			}
		},
	},
	dynamaxclause: {
		inherit: true,
		onBegin() {
			for (const side of this.sides) {
				side.dynamaxUsed = true;
			}
		},
	},
	endlessbattleclause: {
		inherit: true,
		onBegin() {},
	},
	hppercentagemod: {
		inherit: true,
		onBegin() {
			this.reportPercentages = true;
		},
	},
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