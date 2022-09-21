export const Abilities: {[k: string]: ModdedAbilityData} = {
	omegainforce: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Omega inForce weaken');
				// change this to [1, 3] if not good enough
				return this.chainModify(0.5);
			}
		},
		isBreakable: false,
		name: "Omega inForce",
		rating: 4.5,
		num: 40001,
	},
	lightaura: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Light Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Light') return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		name: "Light Aura",
		rating: 3,
		num: 40002,
	},
	overwrite: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			this.debug('Overwrite boost');
			return this.chainModify([5325, 4096]);
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			// same as speed boost
			// remove this if if it's too broken
			if (pokemon.activeTurns) {
				this.damage(pokemon.baseMaxhp / 10, pokemon, pokemon);
			}
		},
		name: "Overwrite",
		rating: 3,
		num: 40003,
	},
	ultimateforce: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		name: "Ultimate Force",
		rating: 4.5,
		num: 40004,
	},
	digitalhazard: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Digital Hazard');
		},
		// better to implement this with field effect or condition
		onFoeSwitchIn(this, pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
		// onAllySwitchIn(this, pokemon) {
		// 	this.damage(pokemon.baseMaxhp / 8);
		// },
		name: "Digital Hazard",
		rating: 3,
		num: 40005,
	},
	legendaryspirits: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			const legendaryTypes = ['Fire', 'Light', 'Flying', 'Ice', 'Electric', 
			'Ground', 'Grass', 'Water', 'Steel', 'Dark'];
			if (legendaryTypes.includes(move.type)) {
				this.debug('Legendary Spirits boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			const legendaryTypes = ['Fire', 'Light', 'Flying', 'Ice', 'Electric', 
			'Ground', 'Grass', 'Water', 'Steel', 'Dark'];
			if (legendaryTypes.includes(move.type)) {
				this.debug('Legendary Spirits boost');
				return this.chainModify([4915, 4096]);
			}
		},
		name: "Legendary Spirits",
		rating: 3.5,
		num: 40006,
	},
	dragonspower: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\'s Power boost');
				return this.chainModify([5448, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\'s Power boost');
				return this.chainModify([5448, 4096]);
			}
		},
		name: "Dragon's Power",
		rating: 3,
		num: 40007,
	},
	armorunequip: {
		onDamagingHit(damage, target, source, move) {
			this.boost({atk: 1, def: -1, spe: 1});
		},
		name: "Armor Unequip",
		rating: 3,
		num: 40008,
	},
	undeadbody: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.add('-ability', pokemon, 'Undead Body');
			this.heal(pokemon.baseMaxhp);
		},
		name: "Undead Body",
		rating: 5,
		num: 40009,
	},
	knightsuppressor: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Knight Suppressor');
		},
		// onAnyBasePowerPriority: 20,
		// onAnyBasePower(basePower, source, target, move) {
		onFoeBasePowerPriority: 20,
		onFoeBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status') return;
			const holyKnightNums = [40001, 40146, 40151, 40244, 40248, 40428, 40429, 40493, 40511, 40555, 40556];
			if (!holyKnightNums.includes(source.species.num)) return;
			return this.chainModify([2732, 4096]);
		},
		name: "Knight Suppressor",
		rating: 2,
		num: 40010,
	},
	alphainforce: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, source, target, move) {
			if (move.category !== 'Status') return 0.1;
		},
		name: "Alpha inForce",
		rating: 4.5,
		num: 40011,
	},
};