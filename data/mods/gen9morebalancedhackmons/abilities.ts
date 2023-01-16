export const Abilities: {[k: string]: ModdedAbilityData} = {
	beadsofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Beads of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifySpD(spd, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (!move.ruinedSpD) move.ruinedSpD = abilityHolder;
			if (move.ruinedSpD !== abilityHolder) return;
			this.debug('Beads of Ruin SpD drop');
			return this.chainModify(0.75);
		},
		shortDesc: "The Special Defense stat of all active Pokemon is multiplied by 0.75.",
	},
	contrary: {
		inherit: true,
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			if (this.effectState.contrary) return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
			this.effectState.contrary = true;
		},
		onSwitchIn() {
			delete this.effectState.contrary;
		},
		shortDesc: "This Pokemon's stat changes are reversed. Once per switch-in.",
	},
	deltastream: {
		inherit: true,
		// implemented in conditions.ts
		desc: "On switch-in, the weather becomes Delta Stream, which removes the weaknesses of the Flying type from Flying-type Pokemon. The damage of Flying-type attacks is multiplied by 1.3. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by the Desolate Land or Primordial Sea Abilities.",
		shortDesc: "On switch-in, this Pokemon summons Delta Stream. 1.3x Flying attacks damage.",
	},
	eartheater: {
		inherit: true,
		// implemented in moves.ts
		desc: "This Pokemon is immune to Ground-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Ground-type move. It also absorbs Spikes and then restores 1/4 of its maximum HP on switch-in.",
		shortDesc: "Heals 1/4 HP when hit by Ground moves; Absorbs spikes on switch-in; Ground immunity.",
	},
	galewings: {
		// for ngas
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.type === 'Flying' && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1, spd: -1}, source, target, null, true);
				} else {
					this.boost({spe: -2}, source, target, null, true);
				}
				target.formeChange('cramorant', move);
			}
		},
		desc: "If this Pokemon is a Cramorant, it changes forme when it hits a target with Surf or uses the first turn of Dive successfully. It becomes Gulping Form with an Arrokuda in its mouth if it has more than 1/2 of its maximum HP remaining, or Gorging Form with a Pikachu in its mouth if it has 1/2 or less of its maximum HP remaining. If Cramorant gets hit in Gulping or Gorging Form, it spits the Arrokuda or Pikachu at its attacker, even if it has no HP remaining. The projectile deals damage equal to 1/4 of the target's maximum HP, rounded down; this damage is blocked by the Magic Guard Ability but not by a substitute. An Arrokuda also lowers the target's Defense and Special Defense by 1 stage, and a Pikachu lowers the target's Speed by 2 stage. Cramorant will return to normal if it spits out a projectile, switches out, or Dynamaxes.",
		shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Defenses or -2 Speed.",
	},
	magician: {
		inherit: true,
		onAfterMoveSecondarySelf(source, target, move) {},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Magician');
		},
		onTryMove(source, target, move) {
			if (move.category !== 'Status') {
				target.addVolatile('magician');
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
			},
			onResidualOrder: 4,
			onResidualSubOrder: 2,
		},
		desc: "This Pokemon's attacks and their effects ignore certain Items of other Pokemon.",
		shortDesc: "This Pokemon's attacks and their effects ignore the Items of other Pokemon.",
	},
	neutralizinggas: {
		inherit: true,
		// Ability suppression cancelled in scripts.ts
		// new Ability suppression implemented in scripts.ts
		onPreStart(pokemon) {},
		onEnd(source) {},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
		},
		// onModifyPriority implemented in relevant abilities
		onFoeBeforeMovePriority: 13,
		onFoeBeforeMove(attacker, defender, move) {
			attacker.addVolatile('neutralizinggas');
		},
		condition: {
			onAfterMove(pokemon) {
				pokemon.removeVolatile('neutralizinggas');
			},
		},
		desc: "While this Pokemon is active, opposing Pokemon's moves and their effects ignore its own Ability. Does not affect the As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode Abilities.",
		shortDesc: "While this Pokemon is active, opposing Pokemon's Ability has no effect when it attacks.",
	},
	prankster: {
		// for ngas
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
	purepower: {
		inherit: true,
		onModifyAtkPriority: undefined,
		onModifyAtk(atk) {},
		onModifyBoost(boosts, pokemon) {
			boosts['atk'] = Math.max(0, boosts['atk']!);
			boosts['def'] = Math.max(0, boosts['def']!);
			boosts['spa'] = Math.max(0, boosts['spa']!);
			boosts['spd'] = Math.max(0, boosts['spd']!);
			// todo: test this and think if it should modify spe
		},
		// according to designer (anaconja)
		onModifyMove(move) {
			move.mindBlownRecoil = false;
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		shortDesc: "This Pokemon's attacks ignore its own stat drops and have no recoil.",
	},
	shadowtag: {
		inherit: true,
		onFoeTrapPokemon(pokemon) {},
		onFoeMaybeTrapPokemon(pokemon, source) {},
		onDamagingHit(damage, target, source, move) {
			if ((!source.hasType('Ghost')) && source.addType('Ghost')) {
				this.add('-start', source, 'typeadd', 'Ghost', '[from] ability: Shadow Tag');
			}
		},
		desc: "When this Pokemon is hit by an attack, the attacker gains Ghost type.",
		shortDesc: "If this Pokemon is hit, the attacker gains Ghost type.",
	},
	swordofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Sword of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (!move.ruinedDef) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Sword of Ruin Def drop');
			// TODO Placeholder
			return this.chainModify(0.75);
		},
		shortDesc: "The Defense stat of all active Pokemon is multiplied by 0.75.",
	},
	tabletsofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Tablets of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifyAtk(atk, source, target, move) {
			// the original implement of this ability is different from the first 2 ruin abilities, why?
			// but yea we should use this
			const abilityHolder = this.effectState.target;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Tablets of Ruin Atk drop');
			// TODO Placeholder
			return this.chainModify(0.75);
		},
		shortDesc: "The Attack stat of all active Pokemon is multiplied by 0.75.",
	},
	triage: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			// for ngas
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.flags['heal']) return priority + 1;
		},
		shortDesc: "This Pokemon's healing moves have their priority increased by 1.",
	},
	vesselofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Vessel of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Vessel of Ruin SpA drop');
			// TODO Placeholder
			return this.chainModify(0.75);
		},
		shortDesc: "The Special Attack stat of all active Pokemon is multiplied by 0.75.",
	},
	waterbubble: {
		inherit: true,
		onSourceModifyAtkPriority: undefined,
		onSourceModifyAtk(atk, attacker, defender, move) {},
		onSourceModifySpAPriority: undefined,
		onSourceModifySpA(atk, attacker, defender, move) {},
		onModifyAtk(atk, attacker, defender, move) {},
		onModifySpA(atk, attacker, defender, move) {},
		isBreakable: false, // accoding to designer (akira)
		// ignoring weather implemented in conditions.ts
		onModifyMove(move) {
			if (move.type === 'Water') {
				this.debug('Water Bubble modification');
				move.ignoreAbility = true;
				move.ignoreDefensive = true;
				move.ignoreEvasion = true;
			}
		},
		onTryMove(source, target, move) {
			if (move.type === 'Water') {
				// ignoring items effect moved to magician
				target.addVolatile('magician');
			}
		},
		desc: "This Pokemon's Water-type moves ignore the effect of weather, abilities, target's stat changes, and target's items. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		shortDesc: "Water moves ignore weather, abilities, target's stat changes and items; No burns.",
	},
};
