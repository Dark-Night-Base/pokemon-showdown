export const Abilities: {[k: string]: ModdedAbilityData} = {
	// multitype, rkssystem should be implemented in conditions.ts?
	battlebond: {
		inherit: true,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.abilityState.battleBondTriggered) return;
			if (source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-activate', source, 'ability: Battle Bond');
				this.boost({atk: 1, spa: 1, spe: 1}, source, source, this.effect);
				source.abilityState.battleBondTriggered = true;
			}
		},
	},
	disguise: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (target.abilityState.disguiseTriggered) return;
			if (effect && effect.effectType === 'Move' && !target.transformed) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				target.abilityState.disguiseTriggered = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (this.effectState.busted) {
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(pokemon.species.id));
			}
		},
	},
	flowergift: {
		inherit: true,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		// todo: maybe make it protosynthesis-like
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	forecast: {
		inherit: true,
		onWeatherChange(pokemon) {
			const ids = [pokemon.m.headSpecies?.id, pokemon.m.bodySpecies?.id];
			if (!ids.includes('castform') || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (!ids.includes('castformsunny')) forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (!ids.includes('castformrainy')) forme = 'Castform-Rainy';
				break;
			case 'hail':
			case 'snow':
				if (!ids.includes('castformsnowy')) forme = 'Castform-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			const ids = [target.m.headSpecies?.id, target.m.bodySpecies?.id];
			if (ids.includes('cramorantgulping') || ids.includes('cramorantgorging')) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (ids.includes('cramorantgulping')) {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			const ids = [source.m.headSpecies?.id, source.m.bodySpecies?.id];
			if (
				effect && effect.id === 'surf' && source.hasAbility('gulpmissile') &&
				ids.includes('cramorant') && !source.transformed
			) {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				source.formeChange(forme, effect);
			}
		},
	},
	iceface: {
		inherit: true,
		onStart(pokemon) {
			const ids = [pokemon.m.headSpecies?.id, pokemon.m.bodySpecies?.id];
			if (this.field.isWeather(['hail', 'snow']) &&
				ids.includes('eiscuenoice') && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onDamage(damage, target, source, effect) {
			const ids = [target.m.headSpecies?.id, target.m.bodySpecies?.id];
			if (
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				ids.includes('eiscue') && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			const ids = [target.m.headSpecies?.id, target.m.bodySpecies?.id];
			if (move.category !== 'Physical' || !ids.includes('eiscue') || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			const ids = [target.m.headSpecies?.id, target.m.bodySpecies?.id];
			if (move.category !== 'Physical' || !ids.includes('eiscue') || target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			const ids = [pokemon.m.headSpecies?.id, pokemon.m.bodySpecies?.id];
			if (ids.includes('eiscue') && this.effectState.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			const ids = [pokemon.m.headSpecies?.id, pokemon.m.bodySpecies?.id];
			if (this.field.isWeather(['hail', 'snow']) &&
				ids.includes('eiscuenoice') && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
	},
};
