export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (const id in this.data.Items) {
			const item = this.data.Items[id];
			if (item.onPlate) {
				this.modData('Items', id).onTakeItem = function (item: Item, pokemon: Pokemon, source: Pokemon) {
					const sourceNums = [source.m.haedSpecies?.num, source.m.bodySpecies?.num];
					const pokemonNums = [pokemon.m.haedSpecies?.num, pokemon.m.bodySpecies?.num];
					if (sourceNums.includes(493) || pokemonNums.includes(493)) {
						return false;
					}
					return true;
				}
			}
			if (item.onDrive) {
				this.modData('Items', id).onTakeItem = function (item: Item, pokemon: Pokemon, source: Pokemon) {
					const sourceNums = [source.m.haedSpecies?.num, source.m.bodySpecies?.num];
					const pokemonNums = [pokemon.m.haedSpecies?.num, pokemon.m.bodySpecies?.num];
					if (sourceNums.includes(649) || pokemonNums.includes(649)) {
						return false;
					}
					return true;
				}
			}
			if (item.onMemory) {
				this.modData('Items', id).onTakeItem = function (item: Item, pokemon: Pokemon, source: Pokemon) {
					const sourceNums = [source.m.haedSpecies?.num, source.m.bodySpecies?.num];
					const pokemonNums = [pokemon.m.haedSpecies?.num, pokemon.m.bodySpecies?.num];
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
		formeChange(
			// @ts-ignore
			speciesId: string | Species, source: Effect = this.battle.effect,
			isPermanent?: boolean, message?: string
		) {
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
				// Nihilslave: add headname
				const headName = this.m.headSpecies ? this.m.headSpecies.name : this.name;
				this.details += ', head:' + headName;
				let details = (this.illusion || this).details;
				if (this.terastallized) details += `, tera:${this.terastallized}`;
				this.battle.add('detailschange', this, details);
				if (source.effectType === 'Item') {
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.onPrimal) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion);
						} else {
							this.battle.add('-primal', this);
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
				if (source.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			if (isPermanent && !['disguise', 'iceface'].includes(source.id)) {
				if (this.illusion) {
					this.ability = ''; // Don't allow Illusion to wear off
				}
				this.setAbility(species.abilities['0'], null, true);
				this.baseAbility = this.ability;
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			return true;
		},
	},
};
