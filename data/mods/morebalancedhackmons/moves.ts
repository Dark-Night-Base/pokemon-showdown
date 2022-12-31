export const Moves: {[k: string]: ModdedMoveData} = {
	bitterblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1, heal: 1},
	},
	boltbeak: {
		inherit: true,
		basePower: 75,
	},
	direclaw: {
		inherit: true,
		secondary: {
			chance: 40,
			onHit(target, source) {
				const result = this.random(2);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else {
					target.trySetStatus('par', source);
				}
			},
		},
		desc: "Has a 40% chance to cause the target to either become poisoned or become paralyzed.",
		shortDesc: "40% chance to poison or paralyze target.",
	},
	fishiousrend: {
		inherit: true,
		basePower: 75,
	},
	magicaltorque: {
		inherit: true,
		flags: {contact: 1, protect: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	ragefist: {
		inherit: true,
		basePowerCallback(pokemon) {
			// todo: check sim/battle-actions.ts:979 and modify it in scripts.ts
			return Math.min(200, 50 + 25 * pokemon.timesAttacked);
		},
		desc: "Power is equal to 50+(X*25), where X is the total number of times the user has been hit by a damaging attack since switch-in, even if the user did not lose HP from the attack. X cannot be greater than 6. Each hit of a multi-hit attack is counted, but confusion damage is not counted.",
		shortDesc: "+25 power for each time user was hit. Max 6 hits.",
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	spinout: {
		inherit: true,
		basePower: 60,
		pp: 20,
		selfSwitch: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
	},
	trickroom: {
		// for room service
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('roomservice')) {
					return 8;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Trick Room');
					return 7;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	vcreate: {
		inherit: true,
		accuracy: 100,
		basePower: 120,
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`v-create super effective buff`);
				return this.chainModify(1.5);
			}
		},
		desc: "Lowers the user's Speed, Defense, and Special Defense by 1 stage. Damage is multiplied by 1.5 if this move is super effective against the target.",
		shortDesc: "-1 Def, -1 Sp. Def, -1 Spe. Deals 1.5x damage with supereffective hits.",
	},
};
