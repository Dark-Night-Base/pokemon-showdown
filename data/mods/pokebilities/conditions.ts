export const Conditions: {[k: string]: ModdedConditionData} = {
	arceus: {
		name: 'Arceus',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed ||
				pokemon.ability !== 'multitype' &&
				!pokemon.m.innates?.includes('multitype') &&
				this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype' || pokemon.m.innates?.includes('multitype')) {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	silvally: {
		name: 'Silvally',
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed ||
				pokemon.ability !== 'rkssystem' &&
				!pokemon.m.innates?.includes('rkssystem') &&
				this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem' || pokemon.m.innates?.includes('rkssystem')) {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
};
