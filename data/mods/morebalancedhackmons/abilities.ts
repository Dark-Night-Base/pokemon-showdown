export const Abilities: {[k: string]: ModdedAbilityData} = {
	purepower: {
		onModifyBoost(boosts, pokemon) {
			boosts['atk'] = Math.max(0, boosts['atk']!);
			boosts['spa'] = Math.max(0, boosts['spa']!);
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		name: "Pure Power",
		rating: 3,
		num: 74,
	},
};
