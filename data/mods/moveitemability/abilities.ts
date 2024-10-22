export const Abilities: {[k: string]: ModdedAbilityData} = {
	parentalbond: {
		inherit: true,
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && (move.id === 'secretpower' || source.hasItem('secretpower')) && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
	},
};
