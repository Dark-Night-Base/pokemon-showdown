export const Conditions: {[k: string]: ModdedConditionData} = {
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			// cannot use hasItem() here, see scripts.ts and u'll know why
			if (attacker.hasItem('hydrosteam')) {
				this.debug('Sunny Day Hydro Steam boost');
				if (move.type === 'Fire' && !defender.hasItem('utilityumbrella')) {
					this.debug('Sunny Day fire boost');
					return this.chainModify(2.25);
				}
				return this.chainModify(1.5);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
};
