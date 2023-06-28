export const Abilities: {[k: string]: ModdedAbilityData} = {
	damp: {
		inherit: true,
		onAnyTryMove(target, source, effect) {
			// for testament
			if (['explosion', 'mindblown', 'mistyexplosion', 'selfdestruct', 'testament'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
	},
	disguise: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && !target.transformed) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			// i'm not sure about using this.effectState.busted here
			if (this.effectState.busted || target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (this.effectState.busted || target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (this.effectState.busted && !this.effectState.busteded) {
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(pokemon.baseSpecies.id));
				this.effectState.busteded = true;
			}
		},
	},
	libero: {
		inherit: true,
		onPrepareHit: undefined,
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			if (!this.effectState.switchingIn) return;
			// copies across in doubles/triples
			// (also copies across in multibattle and diagonally in free-for-all,
			// but side.foe already takes care of those)
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				const pokemonDigimonTypeIndex = pokemon.types.findIndex(value => ['Data', 'Vaccine', 'Virus'].includes(value));
				const targetDigimonType = target.types.find(value => ['Data', 'Vaccine', 'Virus'].includes(value));
				const digimonTypeChart: {[k: string]: string} = {
					Data: 'Virus',
					Vaccine: 'Data',
					Virus: 'Vaccine',
				};
				if (targetDigimonType && pokemon.types[pokemonDigimonTypeIndex] !== digimonTypeChart[targetDigimonType]) {
					const newType = digimonTypeChart[targetDigimonType];
					const newTypes = pokemon.types.map((value, index) => value = (index === pokemonDigimonTypeIndex) ? newType : value);
					if (pokemon.setType(newTypes)) {
						this.add('-start', pokemon, 'typechange', newTypes.join('/'), '[from] ability: Libero');
					}
				}
			}
			this.effectState.switchingIn = false;
		},
	},
	protean: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSwitchIn: undefined,
		rating: 4.5,
	},
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
		onAnySwitchIn(pokemon) {
			const abilityHolder = this.effectState.target;
			if (pokemon.hasAbility('Digital Hazard')) return;
			this.add('-activate', abilityHolder, 'ability: Digital Hazard');
			this.damage(pokemon.maxhp / 8);
		},
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
			if (pokemon.species.id === 'lucemonsatan' && !pokemon.transformed) {
				this.add('-ability', pokemon, 'Undead Body');
				this.heal(pokemon.baseMaxhp);
			}
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
			const holyKnightNums = [1, 146, 151, 244, 248, 428, 429, 493, 511, 555, 556];
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
			if (source.hasType(move.type) && move.category !== 'Status') return 0.1;
		},
		name: "Alpha inForce",
		rating: 4.5,
		num: 40011,
	},
};
