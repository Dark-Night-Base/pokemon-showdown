export const Scripts: ModdedBattleScriptsData = {
	gen: 8,
	init() {
		for (const i in this.data.Abilities) {
			this.modData('Abilities', i).isNonstandard = null;
		}
		for (const i in this.data.Items) {
			this.modData('Items', i).isNonstandard = null;
		}
		for (const i in this.data.Moves) {
			this.modData('Moves', i).isNonstandard = null;
			if (this.data.Moves[i].type === "Fairy") {
				this.modData('Moves', i).type = "Light";
			}
		}
		for (const i in this.data.Pokedex) {
			if (this.data.Pokedex[i].num > 40000) {
				this.modData('Pokedex', i).isNonstandard = null;
				if (this.data.Pokedex[i].types.includes("Fairy")) {
					const index = this.data.Pokedex[i].types.findIndex(type => type === "Fairy");
					this.modData('Pokedex', i).types[index] = "Light";
				}
			}
		}
		// todo: make all pokemon isNonstandard here
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
			// if (pokemon.hasType('Vaccine') && target.hasType('Virus')
			// || pokemon.hasType('Virus') && target.hasType('Data')
			// || pokemon.hasType('Data') && target.hasType('Vaccine')) {
			// 	if (!suppressMessages && typeMod === 0) this.battle.add('-supereffective', target);
			// 	baseDamage = tr(baseDamage * 1.5);
			// 	this.battle.debug('Digimon Type modifier: 1.5');
			// }

			// try to make this less simple
			if (pokemon.hasType('Vaccine') && target.hasType('Virus')
			|| pokemon.hasType('Virus') && target.hasType('Data')) {
				if (!suppressMessages && typeMod === 0) this.battle.add('-supereffective', target);
				baseDamage = tr(baseDamage * 1.5);
				this.battle.debug('Digimon Type modifier: 1.5');
			}
			if (pokemon.hasType('Vaccine') && target.hasType('Data')) {
				if (!suppressMessages && typeMod === 0) this.battle.add('-resisted', target);
				baseDamage = tr(baseDamage / 1.5);
				this.battle.debug('Digimon Type modifier: 0.67');
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