export const Scripts: ModdedBattleScriptsData = {
	init() {
		for (const i in this.data.Moves) {
			this.modData('Moves', i).isNonstandard = null;
		}
	},
	actions: {
		canMegaEvo(pokemon) {
			if (pokemon.species.forme === "X") return null;

			const item = pokemon.getItem();
			const baseSpecies = this.dex.species.get(pokemon.species.baseSpecies);
			if (item.id === 'xantibody' && baseSpecies.otherFormes) {
				for (const forme of baseSpecies.otherFormes) {
					const xforme = this.dex.species.get(forme);
					if (xforme.forme === "X" && xforme.baseSpecies === pokemon.species.name) {
						return xforme.name;
					}
				}
			}
			return null;
		},
		// runMegaEvo(pokemon) {
		// 	if (pokemon.species.forme === "X") return false;

		// 	if (pokemon.baseSpecies.otherFormes) {
		// 		for (const forme of pokemon.baseSpecies.otherFormes) {
		// 			const xforme = this.dex.species.get(forme);
		// 			if (xforme.forme === "X") {
		// 				pokemon.formeChange(xforme, pokemon.getItem(), true);					
		// 				pokemon.canMegaEvo = null;
		// 				return true;
		// 			}
		// 		}
		// 	}
		// 	return false;
		// },

		// #region getDamage
		// getDamage(this, pokemon, target, move, suppressMessages) {
		// 	if (typeof move === 'string') move = this.dex.getActiveMove(move);

		// 	if (typeof move === 'number') {
		// 		const basePower = move;
		// 		move = new Dex.Move({
		// 			basePower,
		// 			type: '???',
		// 			category: 'Physical',
		// 			willCrit: false,
		// 		}) as ActiveMove;
		// 		move.hit = 0;
		// 	}

		// 	if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
		// 		if (!target.runImmunity(move.type, !suppressMessages)) {
		// 			return false;
		// 		}
		// 	}

		// 	if (move.ohko) return target.maxhp;
		// 	if (move.damageCallback) return move.damageCallback.call(this.battle, pokemon, target);
		// 	if (move.damage === 'level') {
		// 		return pokemon.level;
		// 	} else if (move.damage) {
		// 		return move.damage;
		// 	}

		// 	const category = this.battle.getCategory(move);

		// 	let basePower: number | false | null = move.basePower;
		// 	if (move.basePowerCallback) {
		// 		basePower = move.basePowerCallback.call(this.battle, pokemon, target, move);
		// 	}
		// 	if (!basePower) return basePower === 0 ? undefined : basePower;
		// 	basePower = this.battle.clampIntRange(basePower, 1);

		// 	let critMult;
		// 	let critRatio = this.battle.runEvent('ModifyCritRatio', pokemon, target, move, move.critRatio || 0);
		// 	if (this.battle.gen <= 5) {
		// 		critRatio = this.battle.clampIntRange(critRatio, 0, 5);
		// 		critMult = [0, 16, 8, 4, 3, 2];
		// 	} else {
		// 		critRatio = this.battle.clampIntRange(critRatio, 0, 4);
		// 		if (this.battle.gen === 6) {
		// 			critMult = [0, 16, 8, 2, 1];
		// 		} else {
		// 			critMult = [0, 24, 8, 2, 1];
		// 		}
		// 	}

		// 	const moveHit = target.getMoveHitData(move);
		// 	moveHit.crit = move.willCrit || false;
		// 	if (move.willCrit === undefined) {
		// 		if (critRatio) {
		// 			moveHit.crit = this.battle.randomChance(1, critMult[critRatio]);
		// 		}
		// 	}

		// 	if (moveHit.crit) {
		// 		moveHit.crit = this.battle.runEvent('CriticalHit', target, null, move);
		// 	}

		// 	// happens after crit calculation
		// 	basePower = this.battle.runEvent('BasePower', pokemon, target, move, basePower, true);

		// 	if (!basePower) return 0;
		// 	basePower = this.battle.clampIntRange(basePower, 1);
		// 	// Hacked Max Moves have 0 base power, even if you Dynamax
		// 	if ((!pokemon.volatiles['dynamax'] && move.isMax) || (move.isMax && this.dex.moves.get(move.baseMove).isMax)) {
		// 		basePower = 0;
		// 	}

		// 	const level = pokemon.level;

		// 	const attacker = move.overrideOffensivePokemon === 'target' ? target : pokemon;
		// 	const defender = move.overrideDefensivePokemon === 'source' ? pokemon : target;

		// 	const isPhysical = move.category === 'Physical';
		// 	let attackStat: StatIDExceptHP = move.overrideOffensiveStat || (isPhysical ? 'atk' : 'spa');
		// 	const defenseStat: StatIDExceptHP = move.overrideDefensiveStat || (isPhysical ? 'def' : 'spd');

		// 	const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};

		// 	let atkBoosts = attacker.boosts[attackStat];
		// 	let defBoosts = defender.boosts[defenseStat];

		// 	let ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
		// 	let ignorePositiveDefensive = !!move.ignorePositiveDefensive;

		// 	if (moveHit.crit) {
		// 		ignoreNegativeOffensive = true;
		// 		ignorePositiveDefensive = true;
		// 	}
		// 	const ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
		// 	const ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));

		// 	if (ignoreOffensive) {
		// 		this.battle.debug('Negating (sp)atk boost/penalty.');
		// 		atkBoosts = 0;
		// 	}
		// 	if (ignoreDefensive) {
		// 		this.battle.debug('Negating (sp)def boost/penalty.');
		// 		defBoosts = 0;
		// 	}

		// 	let attack = attacker.calculateStat(attackStat, atkBoosts);
		// 	let defense = defender.calculateStat(defenseStat, defBoosts);

		// 	attackStat = (category === 'Physical' ? 'atk' : 'spa');

		// 	// Apply Stat Modifiers
		// 	attack = this.battle.runEvent('Modify' + statTable[attackStat], pokemon, target, move, attack);
		// 	defense = this.battle.runEvent('Modify' + statTable[defenseStat], target, pokemon, move, defense);

		// 	if (this.battle.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
		// 		defense = this.battle.clampIntRange(Math.floor(defense / 2), 1);
		// 	}

		// 	const tr = this.battle.trunc;

		// 	// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
		// 	const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

		// 	// Calculate damage modifiers separately (order differs between generations)
		// 	return this.modifyDamage(baseDamage, pokemon, target, move, suppressMessages);
		// },
		// #endregion getDamage

		modifyDamage(this, baseDamage, pokemon, target, move, suppressMessages?) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;
	
			baseDamage += 2;
	
			if (move.spreadHit) {
				// multi-target modifier (doubles only)
				const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
				this.battle.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}
	
			// weather modifier
			baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);
	
			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
			}
	
			// random factor - also not a modifier
			baseDamage = this.battle.randomizer(baseDamage);
	
			// STAB
			if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
				// The "???" type never gets STAB
				// Not even if you Roost in Gen 4 and somehow manage to use
				// Struggle in the same turn.
				// (On second thought, it might be easier to get a MissingNo.)
				baseDamage = this.battle.modify(baseDamage, move.stab || 1.5);
			}
			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.battle.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.battle.add('-supereffective', target);
	
				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target);
	
				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}
			// Digimon types
			if (pokemon.hasType('Vaccine') && target.hasType('Virus')
			|| pokemon.hasType('Virus') && target.hasType('Data')
			|| pokemon.hasType('Data') && target.hasType('Vaccine')) {
				if (!suppressMessages && typeMod === 0) this.battle.add('-supereffective', target);
				baseDamage = tr(baseDamage * 1.5);
				this.battle.debug('Digimon Type modifier: 1.5');
			}
	
			if (isCrit && !suppressMessages) this.battle.add('-crit', target);
	
			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				if (this.battle.gen < 6 || move.id !== 'facade') {
					baseDamage = this.battle.modify(baseDamage, 0.5);
				}
			}
	
			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;
	
			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);
	
			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				this.battle.add('-zbroken', target);
			}
	
			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.battle.gen !== 5 && !baseDamage) return 1;
	
			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);			
		},
	},
};