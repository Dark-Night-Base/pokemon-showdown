type TypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' |
	'Ice' | 'Dragon' | 'Dark' | 'Light';

interface deltaLearnsetData {
	adds?: string[],
	deletes?: string[],
}

export const universalLearnset: {[n: number]: {[k: string]: ["9L1"]}} = {
	0: {
		scratch: ["9L1"],
		tackle: ["9L1"],
		protect: ["9L1"],
		rest: ["9L1"],
		sleeptalk: ["9L1"],
		substitute: ["9L1"],
	},
	1: {
		hiddenpower: ["9L1"],
		protect: ["9L1"],
		rest: ["9L1"],
		sleeptalk: ["9L1"],
		substitute: ["9L1"],
		workup: ["9L1"],
	},
	3: {
		gigaimpact: ["9L1"],
		hyperbeam: ["9L1"],
	},
};
/**
 * Child: 0
 * Adult: 0 + 1
 * Perfect: 1 + 2
 * Ultimate: 1 + 2 + 3
 */
export const typeLearnsetTable: {[type in TypeName]: {[n: number]: {[k: string]: ["9L1"]}}} = {
	Bug: {
		0: {
			strugglebug: ["9L1"],
			furycutter: ["9L1"],
			stringshot: ["9L1"],
		},
		1: {
			bugbite: ["9L1"],
			silverwind: ["9L1"],
			pinmissile: ["9L1"],
			infestation: ["9L1"],
		},
		2: {
			bugbuzz: ["9L1"],
			leechlife: ["9L1"],
			xscissor: ["9L1"],
			uturn: ["9L1"],
		},
		3: {
			megahorn: ["9L1"],
		},
	},
	Dark: {
		0: {
			faketears: ["9L1"],
		},
		1: {
			bite: ["9L1"],
			snarl: ["9L1"],
			pursuit: ["9L1"],
			beatup: ["9L1"],
			honeclaws: ["9L1"],
		},
		2: {
			foulplay: ["9L1"],
			crunch: ["9L1"],
			darkpulse: ["9L1"],
			nightslash: ["9L1"],
			suckerpunch: ["9L1"],
			knockoff: ["9L1"],
			powertrip: ["9L1"],
			nastyplot: ["9L1"],
			taunt: ["9L1"],
		},
	},
	Dragon: {
		0: {
			dragonrage: ["9L1"],
		},
		1: {
			dragonbreath: ["9L1"],
			dragontail: ["9L1"],
		},
		2: {
			dragonpulse: ["9L1"],
			dragonclaw: ["9L1"],
			dragondance: ["9L1"],
		},
		3: {
			outrage: ["9L1"],
		},
	},
	Electric: {
		0: {
			thundershock: ["9L1"],
			thunderwave: ["9L1"],
		},
		1: {
			thunderfang: ["9L1"],
			shockwave: ["9L1"],
			chargebeam: ["9L1"],
			charge: ["9L1"],
			thunderwave: ["9L1"],
		},
		2: {
			thunderbolt: ["9L1"],
			discharge: ["9L1"],
			thunderpunch: ["9L1"],
			voltswitch: ["9L1"],
			electricterrain: ["9L1"],
		},
		3: {
			zapcannon: ["9L1"],
			thunder: ["9L1"],
			wildcharge: ["9L1"],
			risingvoltage: ["9L1"],
		},
	},
	Fighting: {
		0: {
			machpunch: ["9L1"],
		},
		1: {
			seismictoss: ["9L1"],
			brickbreak: ["9L1"],
			circlethrow: ["9L1"],
			poweruppunch: ["9L1"],
			vacuumwave: ["9L1"],
			detect: ["9L1"],
		},
		2: {
			hammerarm: ["9L1"],
			aurasphere: ["9L1"],
			bodypress: ["9L1"],
			drainpunch: ["9L1"],
			bulkup: ["9L1"],
		},
		3: {
			focuspunch: ["9L1"],
			highjumpkick: ["9L1"],
			closecombat: ["9L1"],
			focusblast: ["9L1"],
			superpower: ["9L1"],
			dynamicpunch: ["9L1"],
		},
	},
	Fire: {
		0: {
			ember: ["9L1"],
			willowisp: ["9L1"],
		},
		1: {
			firefang: ["9L1"],
			flamecharge: ["9L1"],
			firespin: ["9L1"],
			willowisp: ["9L1"],
		},
		2: {
			heatwave: ["9L1"],
			flamethrower: ["9L1"],
			lavaplume: ["9L1"],
			firepunch: ["9L1"],
			sunnyday: ["9L1"],
		},
		3: {
			overheat: ["9L1"],
			flareblitz: ["9L1"],
			fireblast: ["9L1"],
			inferno: ["9L1"],
		},
	},
	Flying: {
		0: {
			gust: ["9L1"],
			peck: ["9L1"],
		},
		1: {
			fly: ["9L1"],
			aerialace: ["9L1"],
			aircutter: ["9L1"],
			pluck: ["9L1"],
			wingattack: ["9L1"],
			defog: ["9L1"],
			whirlwind: ["9L1"],
		},
		2: {
			drillpeck: ["9L1"],
			airslash: ["9L1"],
			acrobatics: ["9L1"],
			dualwingbeat: ["9L1"],
			tailwind: ["9L1"],
		},
		3: {
			skyattack: ["9L1"],
			bravebird: ["9L1"],
			hurricane: ["9L1"],
		},
	},
	Ghost: {
		0: {
			shadowsneak: ["9L1"],
			astonish: ["9L1"],
			lick: ["9L1"],
		},
		1: {
			nightshade: ["9L1"],
			ominouswind: ["9L1"],
			shadowpunch: ["9L1"],
			curse: ["9L1"],
		},
		2: {
			phantomforce: ["9L1"],
			shadowball: ["9L1"],
			shadowclaw: ["9L1"],
			hex: ["9L1"],
			destinybond: ["9L1"],
			spite: ["9L1"],
		},
		3: {
			grudge: ["9L1"],
		},
	},
	Grass: {
		0: {
			vinewhip: ["9L1"],
			leafage: ["9L1"],
			absorb: ["9L1"],
		},
		1: {
			magicalleaf: ["9L1"],
			razorleaf: ["9L1"],
			megadrain: ["9L1"],
			bulletseed: ["9L1"],
			leechseed: ["9L1"],
			growth: ["9L1"],
		},
		2: {
			energyball: ["9L1"],
			leafblade: ["9L1"],
			seedbomb: ["9L1"],
			gigadrain: ["9L1"],
			hornleech: ["9L1"],
			grassyterrain: ["9L1"],
			ingrain: ["9L1"],
			worryseed: ["9L1"],
		},
		3: {
			leafstorm: ["9L1"],
			petaldance: ["9L1"],
			powerwhip: ["9L1"],
			solarbeam: ["9L1"],
			woodhammer: ["9L1"],
		},
	},
	Ground: {
		0: {
			mudslap: ["9L1"],
			mudsport: ["9L1"],
		},
		1: {
			dig: ["9L1"],
			mudbomb: ["9L1"],
			sandtomb: ["9L1"],
			sandattack: ["9L1"],
		},
		2: {
			highhorsepower: ["9L1"],
			stompingtantrum: ["9L1"],
			bulldoze: ["9L1"],
		},
		3: {
			earthquake: ["9L1"],
			earthpower: ["9L1"],
		},
	},
	Ice: {
		0: {
			iceshard: ["9L1"],
			powdersnow: ["9L1"],
		},
		1: {
			aurorabeam: ["9L1"],
			icefang: ["9L1"],
			icywind: ["9L1"],
			iciclespear: ["9L1"],
		},
		2: {
			icebeam: ["9L1"],
			iciclecrash: ["9L1"],
			icepunch: ["9L1"],
			freezedry: ["9L1"],
			avalanche: ["9L1"],
			hail: ["9L1"],
		},
		3: {
			blizzard: ["9L1"],
		},
	},
	Light: {
		0: {
			drainingkiss: ["9L1"],
		},
		1: {
			heavensknuckle: ["9L1"],
			dazzlinggleam: ["9L1"],
		},
		2: {
			mistyterrain: ["9L1"],
		},
	},
	Normal: {
		0: {
			sonicboom: ["9L1"],
			quickattack: ["9L1"],
		},
		1: {
			headbutt: ["9L1"],
			slash: ["9L1"],
			swift: ["9L1"],
		},
		2: {
			hypervoice: ["9L1"],
			bodyslam: ["9L1"],
			facade: ["9L1"],
		},
		3: {
			gigaimpact: ["9L1"],
			hyperbeam: ["9L1"],
			doubleedge: ["9L1"],
			thrash: ["9L1"],
		},
	},
	Poison: {
		0: {
			acid: ["9L1"],
			smog: ["9L1"],
			poisongas: ["9L1"],
		},
		1: {
			sludge: ["9L1"],
			clearsmog: ["9L1"],
			poisonfang: ["9L1"],
			acidspray: ["9L1"],
			toxic: ["9L1"],
		},
		2: {
			sludgebomb: ["9L1"],
			poisonjab: ["9L1"],
			venoshock: ["9L1"],
			corrosivegas: ["9L1"],
			gastroacid: ["9L1"],
			toxicspikes: ["9L1"],
		},
		3: {
			gunkshot: ["9L1"],
		},
	},
	Psychic: {
		0: {
			confusion: ["9L1"],
		},
		1: {
			psywave: ["9L1"],
			psybeam: ["9L1"],
			hypnosis: ["9L1"],
		},
		2: {
			psychic: ["9L1"],
			psyshock: ["9L1"],
			psychicfangs: ["9L1"],
			zenheadbutt: ["9L1"],
			storedpower: ["9L1"],
			calmmind: ["9L1"],
			lightscreen: ["9L1"],
			magiccoat: ["9L1"],
			psychicterrain: ["9L1"],
			reflect: ["9L1"],
		},
		3: {
			expandingforce: ["9L1"],
			futuresight: ["9L1"],
		},
	},
	Rock: {
		0: {
			accelerock: ["9L1"],
		},
		1: {
			ancientpower: ["9L1"],
			rocktomb: ["9L1"],
			smackdown: ["9L1"],
			rockblast: ["9L1"],
			rockpolish: ["9L1"],
		},
		2: {
			powergem: ["9L1"],
			rockslide: ["9L1"],
			sandstorm: ["9L1"],
			stealthrock: ["9L1"],
		},
		3: {
			stoneedge: ["9L1"],
		},
	},
	Steel: {
		0: {
			metalclaw: ["9L1"],
			bulletpunch: ["9L1"],
		},
		1: {
			mirrorshot: ["9L1"],
			magnetbomb: ["9L1"],
			autotomize: ["9L1"],
			irondefense: ["9L1"],
			metalsound: ["9L1"],
		},
		2: {
			irontail: ["9L1"],
			flashcannon: ["9L1"],
			ironhead: ["9L1"],
		},
		3: {
			meteormash: ["9L1"],
		},
	},
	Water: {
		0: {
			aquajet: ["9L1"],
			bubble: ["9L1"],
			watergun: ["9L1"],
			watersport: ["9L1"],
		},
		1: {
			bubblebeam: ["9L1"],
			waterpulse: ["9L1"],
			whirlpool: ["9L1"],
		},
		2: {
			surf: ["9L1"],
			dive: ["9L1"],
			scald: ["9L1"],
			waterfall: ["9L1"],
			aquaring: ["9L1"],
			raindance: ["9L1"],
		},
		3: {
			hydropump: ["9L1"],
		},
	},
};
export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: ['greysword', 'dragonhammer', 'sacredsword'],
		deletes: ['blizzard'],
	},
};
