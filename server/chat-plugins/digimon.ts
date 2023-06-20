import {FS} from "../../lib";
import {universalLearnset, typeLearnsetTable, eggGroupLearnsetTable, deltaLearnsetTable} from '../../data/mods/digimon/delta-learnsets';

type TypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' |
	'Ice' | 'Dragon' | 'Dark' | 'Light';
type StageName = 'Child' | 'Adult' | 'Perfect' | 'Ultimate';
const stageToNumber: {[stage in StageName]: number[]} = {
	Child: [0],
	Adult: [0, 1],
	Perfect: [1, 2],
	Ultimate: [1, 2, 3],
};
const stageToTier: {[stage in StageName]: TierTypes.Singles} = {
	Child: "LC",
	Adult: "NFE",
	Perfect: "UU",
	Ultimate: "OU",
};
const dex = Dex.mod('digimon');
const gen = 1;
const genToParsed = {
	1: '[[1,141],[234,237],-29,-36,-89,-90,-92,-106,-107]',
};

function getStage(species: Species): StageName {
	const exceptAdult = [46, 59, 63, 64, 98, 116, 146, 192, 369, 370, 543, 550];
	const exceptPerfect = [5, 60, 65, 96, 108, 130, 164, 215, 236, 248, 371, 372, 452, 459, 460, 464, 472];
	const exceptUltimate = [120, 339, 544];
	const exceptXevo = [146, 248, 452];
	if (species.num === 451) return "Child";
	if (exceptAdult.includes(species.num)) return "Adult";
	if (exceptPerfect.includes(species.num)) return "Perfect";
	if (exceptUltimate.includes(species.num)) return "Ultimate";
	if (exceptXevo.includes(species.num) && species.forme === 'X') return "Ultimate";
	const bst = species.forme === 'X' ? dex.species.get(species.baseSpecies).bst : species.bst;
	if (bst <= 280) return "Child";
	if (bst <= 380) return "Adult";
	if (bst <= 480) return "Perfect";
	return "Ultimate";
}
function getLearnset(species: Species) {
	const stageNumbers = stageToNumber[getStage(species)];
	let learnset: string[] = [];
	for (const n of stageNumbers) {
		for (const type of species.types) {
			if (!(type in typeLearnsetTable)) continue;
			learnset = learnset.concat(typeLearnsetTable[type as TypeName][n] || []);
		}
		for (const eggGroup of species.eggGroups) {
			if (!(eggGroup in eggGroupLearnsetTable)) continue;
			if (!eggGroupLearnsetTable[eggGroup][n]) continue;
			learnset = learnset.concat(eggGroupLearnsetTable[eggGroup][n](species) || []);
		}
		learnset = learnset.concat(universalLearnset[n] || []);
	}
	const delta = deltaLearnsetTable[species.id] || {};
	const adds = delta.adds || [];
	for (const add of adds) {
		if (!(add in typeLearnsetTable)) {
			learnset.push(add);
			continue;
		}
		for (const n of stageNumbers) learnset = learnset.concat(typeLearnsetTable[add as TypeName][n] || []);
	}
	const learnsetSet = new Set(learnset);
	const deletes = delta.deletes || [];
	for (const del of deletes) {
		if (!(del in typeLearnsetTable)) {
			learnsetSet.delete(del);
			continue;
		}
		for (const n of stageNumbers) {
			const moves = typeLearnsetTable[del as TypeName][n] || [];
			for (const move in moves) learnsetSet.delete(move);
		}
	}
	learnset = Array.from(learnsetSet);
	return learnset.reduce((prevValue, currValue) => {
		prevValue[currValue] = ["9L1"];
		return prevValue;
	}, {} as {[k: string]: any});
}
function isInNums(num: number, nums: (number | [number, number])[]) {
	for (const n of nums) {
		if (typeof n === 'number') {
			if (num === -n) return false;
			if (num === n) return true;
			continue;
		}
		if (num >= n[0] && num <= n[1]) return true;
	}
	return false;
}
function generateLearnsets() {
	for (const id in dex.data.Pokedex) {
		const digimon = dex.species.get(id);
		if (['X', 'Burst'].includes(digimon.forme)) continue;
		if (!dex.data.Learnsets[id]) dex.data.Learnsets[id] = { learnset: {}, };
		dex.data.Learnsets[id].learnset = getLearnset(digimon);
	}
	let buf = `export const Learnsets: {[k: string]: ModdedLearnsetData} = {\n`;
	for (const id in dex.data.Pokedex) {
		if (!dex.data.Learnsets[id]) continue;
		buf += `\t${id}: {\n`;
		buf += `\t\tlearnset: {\n`
		buf += `\t\t\t${Object.keys(dex.data.Learnsets[id].learnset!).sort().join(`: ["9L1"],\n\t\t\t`)}: ["9L1"],\n`;
		buf += `\t\t},\n`;
		buf += `\t},\n`;
	}
	buf += `};\n`;
	FS(`data/mods/digimon/learnsets.ts`).writeSync(buf);
}
function generateFormatsData(nums: (number | [number, number])[]) {
	const includeX = nums.findIndex(value => Array.isArray(value) && value[1] > 454 || typeof value === 'number' && value > 454) !== -1;
	for (const id in dex.data.Pokedex) {
		const digimon = dex.species.get(id);
		if (!isInNums(digimon.num, nums)) continue;
		if (!includeX && digimon.forme === 'X') continue;
		const tier = stageToTier[getStage(digimon)];
		if (!dex.data.FormatsData[id]) dex.data.FormatsData[id] = { tier: "Illegal" };
		if (['Color', 'Sub', 'Burst']) dex.data.FormatsData[id].tier = "Unreleased"; // manually release these formes
		// if it already has a tier, don't override
		// mark digimon as unreleased when it's already in formats-data.ts and u don't want it
		if (dex.data.FormatsData[id].tier !== 'Illegal') continue;
		dex.data.FormatsData[id].tier = tier;
	}
	let buf = `export const FormatsData: {[k: string]: ModdedSpeciesFormatsData} = {\n`;
	for (const id in dex.data.Pokedex) {
		if (!dex.data.FormatsData[id]) continue;
		buf += `\t${id}: {\n`;
		buf += `\t\ttier: "${dex.data.FormatsData[id].tier}",\n`;
		buf += `\t},\n`;
	}
	buf += `};\n`;
	FS(`data/mods/digimon/formats-data.ts`).writeSync(buf);
}

export const commands: Chat.ChatCommands = {
	dggf: 'digimongenerateformats',
	digimongenerateformats(target, room, user, connection, cmd) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (room?.type === 'battle') return this.errorReply('Do not use this command in a battle room.');
		if (!target) target = genToParsed[gen];
		let parsed: any[] = [];
		try {
			parsed = JSON.parse(target);
		} catch (e) {
			return this.errorReply('JSON.Parse() failed! Please check the input format.');
		}
		for (const i of parsed) {
			if (Array.isArray(i)) {
				if (i.length !== 2) return this.errorReply('Please check input format.');
				if (typeof i[0] !== 'number' || typeof i[1] !== 'number') return this.errorReply('Please check input format.');
				if (isNaN(i[0]) || isNaN(i[1])) return this.errorReply('Please check input format.');
				continue;
			}
			if (typeof i !== 'number') return this.errorReply('Please check input format.');
			if (isNaN(i)) return this.errorReply('Please check input format.');
		}
		// [...negative numbers, ...positive numbers, ...number arrays]
		parsed = parsed.sort((a, b) => {
			if (typeof a === 'number') {
				if (typeof b === 'number') return (a - b);
				return -1;
			}
			if (typeof b === 'number') return 1;
			return 0;
		});
		generateFormatsData(parsed);
		this.sendReply('Done');
	},
	digimongenerateformatshelp: [
		`/dggf (number | [number, number])[]: generates formats-data for certain Digimon.`,
	],
	dggl: 'digimongeneratelearnsets',
	digimongeneratelearnsets(target, room, user, connection, cmd) {
		if (user.id !== 'asouchihiro') return this.errorReply('Access Denied by Nihilslave!');
		if (room?.type === 'battle') return this.errorReply('Do not use this command in a battle room.');
		generateLearnsets();
		this.sendReply('Done');
	},
	dg: 'digimon',
	digi: 'digimon',
	dm: 'digimon',
	digimon(target, room, user, connection, cmd) {
		if (!this.runBroadcast()) return;

		let buffer = '';

		const targets = target.split(',');
		const targetId = toID(target);
		if (!targetId) return this.parse('/help digimon');
		const type1 = dex.types.get(targets[0]);
		if (type1.exists) {
			let species: {types: string[], [k: string]: any} = dex.species.get(targets[0]);
			const types = [type1.name];
			const type2 = dex.types.get(targets[1]);
			const type3 = dex.types.get(targets[2]);
			const weaknesses = [];
			const resistances = [];
			const immunities = [];
			const supereffectiveto = [];
			const neutralto = [];
			const resistedby = [];
			const ineffectiveto = [];

			if (type2.exists && type2 !== type1) {
				types.push(type2.name);
			}
			if (type3.exists && type3 !== type1 && type3 !== type2) {
				types.push(type3.name);
			}
			species = {types: types};

			if (types.length === 1) {
				switch (type1.name) {
				case 'Vaccine':
					buffer += `Vaccine: <br />`;
					buffer += `<b>As Defensive Typing</b>:<br />`;
					buffer += `<span class="message-effect-weak">Weaknesses</span>: <font color=#999999>None</font><br />`;
					buffer += `<span class="message-effect-resist">Resistances</span>: <font color=#999999>None</font><br />`;
					buffer += `<b>As Offensive Typing</b>:<br />`;
					buffer += `<b><font color=#559955>Super Effective to</font></b>: Virus <font color=#999999>(Attacks from Vaccine-type Digimon deal 1.5x damage to Virus-type Digimon.)</font><br />`;
					buffer += `<span class="message-effect-weak">Resisted by</span>: Data <font color=#999999>(Attacks from Vaccine-type Digimon deal 0.67x damage to Data-type Digimon.)</font><br />`;
					this.sendReplyBox(buffer);
					return;
				case 'Data':
					buffer += `Data: <br />`;
					buffer += `<b>As Defensive Typing</b>:<br />`;
					buffer += `<span class="message-effect-weak">Weaknesses</span>: Virus <font color=#999999>(Data-type Digimon receive 1.5x damage from Virus-type Digimon's attacks.)</font><br />`;
					buffer += `<span class="message-effect-resist">Resistances</span>: Vaccine <font color=#999999>(Data-type Digimon receive 0.67x damage from Vaccine-type Digimon's attacks.)</font><br />`;
					buffer += `<b>As Offensive Typing</b>:<br />`;
					buffer += `<b><font color=#559955>Super Effective to</font></b>: <font color=#999999>None</font><br />`;
					buffer += `<span class="message-effect-weak">Resisted by</span>: <font color=#999999>None</font><br />`;
					this.sendReplyBox(buffer);
					return;
				case 'Virus':
					buffer += `Virus: <br />`;
					buffer += `<b>As Defensive Typing</b>:<br />`;
					buffer += `<span class="message-effect-weak">Weaknesses</span>: Vaccine <font color=#999999>(Virus-type Digimon receive 1.5x damage from Vaccine-type Digimon's attacks.)</font><br />`;
					buffer += `<span class="message-effect-resist">Resistances</span>: <font color=#999999>None</font><br />`;
					buffer += `<b>As Offensive Typing</b>:<br />`;
					buffer += `<b><font color=#559955>Super Effective to</font></b>: Data <font color=#999999>(Attacks from Virus-type Digimon deal 1.5x damage to Data-type Digimon.)</font><br />`;
					buffer += `<span class="message-effect-weak">Resisted by</span>: <font color=#999999>None</font><br />`;
					this.sendReplyBox(buffer);
					return;
				}
			}

			for (const type of dex.types.names()) {
				if (type === 'Fairy') continue;
				const notImmune = dex.getImmunity(type, species);
				if (notImmune) {
					const typeMod = dex.getEffectiveness(type, species);
					switch (typeMod) {
					case 1:
						if (['Vaccine', 'Data', 'Virus'].includes(type)) {
							weaknesses.push(`(${type})`);
						} else {
							weaknesses.push(type);
						}
						break;
					case 2:
						weaknesses.push(`<b>${type}</b>`);
						break;
					case 3:
						weaknesses.push(`<b><i>${type}</i></b>`);
						break;
					case -1:
						if (['Vaccine', 'Data', 'Virus'].includes(type)) {
							resistances.push(`(${type})`);
						} else {
							resistances.push(type);
						}
						break;
					case -2:
						resistances.push(`<b>${type}</b>`);
						break;
					case -3:
						resistances.push(`<b><i>${type}</i></b>`);
						break;
					}
				} else {
					immunities.push(type);
				}

				switch (type) {
				case 'Vaccine':
					neutralto.push(`(Vaccine)`);
					continue;
				case 'Data':
					if (types.includes('Vaccine')) {
						resistedby.push(`(Data)`);
					} else if (types.includes('Virus')) {
						supereffectiveto.push(`(Data)`);
					} else {
						neutralto.push(`(Data)`);
					}
					continue;
				case 'Virus':
					if (types.includes('Vaccine')) {
						supereffectiveto.push(`(Virus)`);
					} else {
						neutralto.push(`(Virus)`);
					}
					continue;
				}
				let attackTypeMod = -2;
				for (const t of types) {
					const tempTypeMod = dex.getImmunity(t, type) ? dex.getEffectiveness(t, type) : -2;
					attackTypeMod = tempTypeMod > attackTypeMod ? tempTypeMod : attackTypeMod;
				}
				switch (attackTypeMod) {
				case 1:
					supereffectiveto.push(type);
					break;
				case 0:
					neutralto.push(type);
					break;
				case -1:
					resistedby.push(type);
					break;
				case -2:
					ineffectiveto.push(type);
					break;
				}
			}
			const statuses: {[k: string]: string} = {
				brn: "Burn",
				frz: "Frozen",
				hail: "Hail damage",
				par: "Paralysis",
				powder: "Powder moves",
				prankster: "Prankster",
				sandstorm: "Sandstorm damage",
				tox: "Toxic",
				trapped: "Trapping",
			};
			for (const status in statuses) {
				if (!dex.getImmunity(status, species)) {
					immunities.push(statuses[status]);
				}
			}

			buffer += `${types.join('/')}:<br />`;
			buffer += `<b>As Defensive Typing</b>:<br />`;
			buffer += `<span class="message-effect-weak">Weaknesses</span>: ${weaknesses.join(', ') || '<font color=#999999>None</font>'}<br />`;
			buffer += `<span class="message-effect-resist">Resistances</span>: ${resistances.join(', ') || '<font color=#999999>None</font>'}<br />`;
			buffer += immunities.length ?
				`<span class="message-effect-immune">Immunities</span>: ${immunities.join(', ')}<br />` : '';
			buffer += `<b>As Offensive Typing</b>:<br />`;
			// `<span class="message-effect-immune">Immunities</span>: ${immunities.join(', ') || '<font color=#999999>None</font>'}<br />`;
			buffer += `<b><font color=#559955>Super Effective to</font></b>: ${supereffectiveto.join(', ') || '<font color=#999999>None</font>'}<br />`;
			buffer += `<span class="message-effect-resist">Neutral to</span>: ${neutralto.join(', ') || '<font color=#999999>None</font>'}<br />`;
			buffer += `<span class="message-effect-weak">Resisted by</span>: ${resistedby.join(', ') || '<font color=#999999>None</font>'}<br />`;
			buffer += ineffectiveto.length ?
				`<span class="message-effect-immune">No Effect to</span>: ${ineffectiveto.join(', ')}<br />` : '';
			// `<span class="message-effect-immune">No effect to</span>: ${ineffectiveto.join(', ') || '<font color=#999999>None</font>'}<br />`;
			this.sendReplyBox(buffer);
			return;
		}

		const targetNum = parseInt(target);
		if (!isNaN(targetNum) && `${targetNum}` === target) {
			// if (targetNum <= 40000) return this.parse(`/dt ${targetNum}`);
			for (const pokemon of dex.species.all()) {
				if (pokemon.num === targetNum) {
					target = pokemon.baseSpecies;
					break;
				}
			}
		}

		const newTargets = dex.dataSearch(target);
		if (!newTargets || !newTargets.length) {
			return this.errorReply(`No Digimon, item, move, ability or type named '${target}' was found. (Check your spelling?)`);
		}
		for (const [i, newTarget] of newTargets.entries()) {
			if (newTarget.isInexact && !i) {
				buffer = `No Digimon, item, move, ability or type named '${target}' was found. Showing the data of '${newTargets[0].name}' instead.\n`;
			}

			let details: {[k: string]: string} = {};
			switch (newTarget.searchType) {
			case 'pokemon':
				const pokemon = dex.species.get(newTarget.name);
				// if (pokemon.num <= 40000) return this.parse(`/dt ${pokemon.id}`);
				buffer += `|raw|${Chat.getDataPokemonHTML(pokemon, dex.gen, pokemon.tier)}\n`;

				details = {
					"Dex#": String(pokemon.num),
				};
				details["Stage"] = getStage(pokemon);

				const organizations = [];
				const royalKnights = [1, 146, 151, 244, 428, 429, 493, 511, 555, 556];
				const archangels = [32, 39, 264];
				const greatDragons = [33, 38, 243, 316];
				const demonLords = [228, 259, 450, 452, 491, 492, 554];
				const olympos = [449];
				if (royalKnights.includes(pokemon.num)) organizations.push("Royal Knights");
				if (archangels.includes(pokemon.num)) organizations.push("3 Archangels");
				if (demonLords.includes(pokemon.num)) organizations.push("7 Great Demon Lords");
				if (olympos.includes(pokemon.num)) organizations.push("Olympos XII");
				if (pokemon.num >= 40302 && pokemon.num <= 40313) organizations.push("Deva");
				if (pokemon.num >= 40314 && pokemon.num <= 40317) organizations.push("4 Holy Beasts");
				if (pokemon.num >= 40430 && pokemon.num <= 40439) organizations.push("10 Warriors");
				if (greatDragons.includes(pokemon.num)) organizations.push("4 Great Dragons");
				if (organizations.length) {
					details["Organization"] = organizations.join(", ");
				}
				if (pokemon.evos.length) {
					details["Pre-Evolution"] = pokemon.evos.join(", ");
				} else {
					details[`<font color="#686868">No Pre-Evolution</font>`] = "";
				}
				// add type detail info
				// todo: let this show after the main data
				// this.parse(`/dg ${pokemon.types.join(',')}`);
				break;
			case 'item':
				const item = dex.items.get(newTarget.name);
				buffer += `|raw|${Chat.getDataItemHTML(item)}\n`;
				details = {};

				if (item.fling) {
					details["Fling Base Power"] = String(item.fling.basePower);
					if (item.fling.status) details["Fling Effect"] = item.fling.status;
					if (item.fling.volatileStatus) details["Fling Effect"] = item.fling.volatileStatus;
					if (item.isBerry) details["Fling Effect"] = "Activates the Berry's effect on the target.";
					if (item.id === 'whiteherb') details["Fling Effect"] = "Restores the target's negative stat stages to 0.";
					if (item.id === 'mentalherb') {
						const flingEffect = "Removes the effects of Attract, Disable, Encore, Heal Block, Taunt, and Torment from the target.";
						details["Fling Effect"] = flingEffect;
					}
				} else {
					details["Fling"] = "This item cannot be used with Fling.";
				}
				if (item.naturalGift) {
					details["Natural Gift Type"] = item.naturalGift.type;
					details["Natural Gift Base Power"] = String(item.naturalGift.basePower);
				}
				if (item.isNonstandard) {
					details[`Unobtainable in Digimon Formats`] = "";
				}

				details["Full Description"] = item.desc;
				break;
			case 'move':
				const move = dex.moves.get(newTarget.name);
				// if (move.num <= 40000) return this.parse(`/dt ${move.id}`);
				buffer += `|raw|${Chat.getDataMoveHTML(move)}\n`;
				details = {
					Priority: String(move.priority),
				};

				if (move.isNonstandard) details["&#10007; Not exist in Digimon"] = "";
				if (move.secondary || move.secondaries) details["&#10003; Secondary effect"] = "";
				if (move.flags['contact']) details["&#10003; Contact"] = "";
				if (move.flags['sound']) details["&#10003; Sound"] = "";
				if (move.flags['bullet']) details["&#10003; Bullet"] = "";
				if (move.flags['pulse']) details["&#10003; Pulse"] = "";
				if (!move.flags['protect'] && move.target !== 'self') details["&#10003; Bypasses Protect"] = "";
				if (move.flags['bypasssub']) details["&#10003; Bypasses Substitutes"] = "";
				if (move.flags['defrost']) details["&#10003; Thaws user"] = "";
				if (move.flags['bite']) details["&#10003; Bite"] = "";
				if (move.flags['punch']) details["&#10003; Punch"] = "";
				if (move.flags['powder']) details["&#10003; Powder"] = "";
				if (move.flags['reflectable']) details["&#10003; Bounceable"] = "";
				if (move.flags['charge']) details["&#10003; Two-turn move"] = "";
				if (move.flags['recharge']) details["&#10003; Has recharge turn"] = "";
				if (move.flags['gravity'] && dex.gen >= 4) details["&#10007; Suppressed by Gravity"] = "";
				if (move.flags['dance'] && dex.gen >= 7) details["&#10003; Dance move"] = "";

				const targetTypes: {[k: string]: string} = {
					normal: "One Adjacent Pok\u00e9mon",
					self: "User",
					adjacentAlly: "One Ally",
					adjacentAllyOrSelf: "User or Ally",
					adjacentFoe: "One Adjacent Opposing Pok\u00e9mon",
					allAdjacentFoes: "All Adjacent Opponents",
					foeSide: "Opposing Side",
					allySide: "User's Side",
					allyTeam: "User's Side",
					allAdjacent: "All Adjacent Pok\u00e9mon",
					any: "Any Pok\u00e9mon",
					all: "All Pok\u00e9mon",
					scripted: "Chosen Automatically",
					randomNormal: "Random Adjacent Opposing Pok\u00e9mon",
					allies: "User and Allies",
				};
				details["Target"] = targetTypes[move.target] || "Unknown";

				if (move.id === 'snatch') {
					details[`<a href="https://${Config.routes.dex}/tags/nonsnatchable">Non-Snatchable Moves</a>`] = '';
				}
				if (move.id === 'mirrormove') {
					details[`<a href="https://${Config.routes.dex}/tags/nonmirror">Non-Mirrorable Moves</a>`] = '';
				}

				details["Full Description"] = move.desc;
				break;
			case 'ability':
				const ability = dex.abilities.get(newTarget.name);
				buffer += `|raw|${Chat.getDataAbilityHTML(ability)}\n`;
				details = {};
				if (ability.isPermanent) details["&#10003; Not affected by Gastro Acid"] = "";
				if (ability.isBreakable) details["&#10003; Ignored by Mold Breaker"] = "";

				details["Full Description"] = ability.desc;
				break;
			default:
				throw new Error(`Unrecognized searchType`);
			}

			buffer += `|raw|<font size="1">${Object.entries(details).map(([detail, value]) => (
				value === '' ? detail : `<font color="#686868">${detail}:</font> ${value}`
			)).join("&nbsp;|&ThickSpace;")}</font>\n`;
		}
		this.sendReply(buffer);
	},
	digimonhelp: [
		`/digi [digimon/item/move/ability/type] - Get details on this digimon/item/move/ability/type.`,
		`!digi [digimon/item/move/ability/type] - Show everyone these details. Requires: + % @ # &`,
	],
};
