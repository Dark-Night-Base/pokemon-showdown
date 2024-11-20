export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (const id in this.data.Learnsets) {
			this.modData('Learnsets', id).eventOnly = false;
		}
		for (const id in this.data.Items) {
			const item = this.data.Items[id];
			if (item.onPlate) {
				this.modData('Items', id).onTakeItem = function (item: Item, pokemon: Pokemon, source: Pokemon) {
					const sourceNums = [source.m.headSpecies?.num, source.m.bodySpecies?.num];
					const pokemonNums = [pokemon.m.headSpecies?.num, pokemon.m.bodySpecies?.num];
					if (sourceNums.includes(493) || pokemonNums.includes(493)) {
						return false;
					}
					return true;
				}
			}
			if (item.onDrive) {
				this.modData('Items', id).onTakeItem = function (item: Item, pokemon: Pokemon, source: Pokemon) {
					const sourceNums = [source.m.headSpecies?.num, source.m.bodySpecies?.num];
					const pokemonNums = [pokemon.m.headSpecies?.num, pokemon.m.bodySpecies?.num];
					if (sourceNums.includes(649) || pokemonNums.includes(649)) {
						return false;
					}
					return true;
				}
			}
			if (item.onMemory) {
				this.modData('Items', id).onTakeItem = function (item: Item, pokemon: Pokemon, source: Pokemon) {
					const sourceNums = [source.m.headSpecies?.num, source.m.bodySpecies?.num];
					const pokemonNums = [pokemon.m.headSpecies?.num, pokemon.m.bodySpecies?.num];
					if (sourceNums.includes(773) || pokemonNums.includes(773)) {
						return false;
					}
					return true;
				}
			}
			if (item.forcedForme) {
				this.modData('Items', id).forcedForme = undefined;
			}
		}
	},
	pokemon: {
		/**
		 * Changes this Pokemon's forme to match the given speciesId (or species).
		 * This function handles all changes to stats, ability, type, species, etc.
		 * as well as sending all relevant messages sent to the client.
		 */
		formeChange(speciesId, source, isPermanent, message) {
			const rawSpecies = this.battle.dex.species.get(speciesId);

			const species = this.setSpecies(rawSpecies, source);
			if (!species) return false;

			if (this.battle.gen <= 2) return true;

			// The species the opponent sees
			const apparentSpecies =
				this.illusion ? this.illusion.species.name : species.baseSpecies;
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
				let details = (this.illusion || this).details;
				// Nihilslave: here, 2
				if (!this.illusion && this.m.headSpecies) details += `, headname:${this.m.headSpecies.name}`;
				if (this.illusion && this.illusion.m.headSpecies) details += `, headname:${this.illusion.m.headSpecies.name}`;
				if (this.terastallized) details += `, tera:${this.terastallized}`;
				this.battle.add('detailschange', this, details);
				if (!source) {
					// Tera forme
					// Ogerpon/Terapagos text goes here
				} else if (source.effectType === 'Item') {
					this.canTerastallize = null; // National Dex behavior
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.onPrimal) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion, species.requiredItem);
						} else {
							this.battle.add('-primal', this, species.requiredItem);
						}
					} else {
						this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
					}
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source?.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			if (isPermanent && (!source || !['disguise', 'iceface'].includes(source.id))) {
				if (this.illusion) {
					this.ability = ''; // Don't allow Illusion to wear off
				}
				// Nihilslave: here, 2
				// Ogerpon's forme change doesn't override permanent abilities
				if (source || !this.getAbility().flags['cantsuppress']) this.setAbility(rawSpecies.abilities[0], null, true);
				// However, its ability does reset upon switching out
				this.baseAbility = this.battle.toID(rawSpecies.abilities[0]);
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			return true;
		}
	}
};
