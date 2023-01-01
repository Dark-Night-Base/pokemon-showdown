export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	field: {
		suppressingWeather() {
			for (const side of this.battle.sides) {
				for (const pokemon of side.active) {
					if (pokemon && !pokemon.fainted && !pokemon.ignoringAbility() && pokemon.getAbility().suppressWeather) {
						return true;
					}
					if (pokemon.getItem().id === 'utilityumbrella') {
						return true;
					}
				}
			}
			return false;
		},
	},
	pokemon: {
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().isPermanent) return false;
			if (this.volatiles['gastroacid']) return true;
	
			// Check if any active pokemon have the ability Neutralizing Gas
			if (this.hasItem('Ability Shield')) return false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				// todo: fix the wrong implement
				// ngas doesn't nullify furscales, bounce, ph, and etc
				if (pokemon.ability === ('neutralizinggas' as ID) && pokemon.side.id !== this.side.id &&
					!pokemon.volatiles['gastroacid'] && !pokemon.transformed && !pokemon.abilityState.ending) {
					return true;
				}
			}
	
			return false;
		},
		ignoringItem() {
			return !!(
				this.itemState.knockedOff || // Gen 3-4
				(this.battle.gen >= 5 && !this.isActive) ||
				(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
				this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom']
			);
		},
	},
};
