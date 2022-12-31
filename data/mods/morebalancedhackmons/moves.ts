export const Moves: {[k: string]: ModdedMoveData} = {
	bitterblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1, heal: 1},
	},
	boltbeak: {
		inherit: true,
		basePower: 75,
	},
	fishiousrend: {
		inherit: true,
		basePower: 75,
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
	},
	milkdrink: {
		inherit: true,
		pp: 10,
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
};
