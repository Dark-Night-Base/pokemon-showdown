type TypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' |
	'Ice' | 'Dragon' | 'Dark' | 'Light';

const typeLearnsetTable: {[type in TypeName]: {[n: number]: {[k: string]: ["9L1"]}}} = {
	Bug: {
		0: {
			strugglebug: ["9L1"],
		},
		1: {
			bugbite: ["9L1"],
			silverwind: ["9L1"],
		},
		2: {
			bugbuzz: ["9L1"],
			xscissor: ["9L1"],
			uturn: ["9L1"],
		},
		3: {
			megahorn: ["9L1"],
		},
	},
	Dark: {
		1: {
			bite: ["9L1"],
			snarl: ["9L1"],
		},
		2: {
			crunch: ["9L1"],
			darkpulse: ["9L1"],
			nightslash: ["9L1"],
			knockoff: ["9L1"],
		},
	},
	Dragon: {
		0: {
			dragonrage: ["9L1"],
		},
		1: {
			dragonbreath: ["9L1"],
		},
		2: {
			dragonpulse: ["9L1"],
			dragonclaw: ["9L1"],
		},
		3: {
			outrage: ["9L1"],
		},
	},
	Electric: {
		1: {
			thunderfang: ["9L1"],
			shockwave: ["9L1"],
		},
		2: {
			thunderbolt: ["9L1"],
			thunderpunch: ["9L1"],
		},
		3: {
			thunder: ["9L1"],
			wildcharge: ["9L1"],
		},
	},
	Fighting: {
		0: {
			machpunch: ["9L1"],
		},
		1: {
			seismictoss: ["9L1"],
			brickbreak: ["9L1"],
			vacuumwave: ["9L1"],
		},
		2: {
			hammerarm: ["9L1"],
			aurasphere: ["9L1"],
			drainpunch: ["9L1"],
		},
		3: {
			highjumpkick: ["9L1"],
			closecombat: ["9L1"],
			focusblast: ["9L1"],
			superpower: ["9L1"],
		},
	},
	Fire: {
		1: {
			firefang: ["9L1"],
		},
		2: {
			flamethrower: ["9L1"],
			firepunch: ["9L1"],
		},
		3: {
			overheat: ["9L1"],
			flareblitz: ["9L1"],
			fireblast: ["9L1"],
		},
	},
	Flying: {
		0: {
			gust: ["9L1"],
		},
		1: {
			aerialace: ["9L1"],
			aircutter: ["9L1"],
		},
		2: {
			fly: ["9L1"],
			bounce: ["9L1"],
			drillpeck: ["9L1"],
			airslash: ["9L1"],
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
		},
		1: {
			nightshade: ["9L1"],
			ominouswind: ["9L1"],
			shadowpunch: ["9L1"],
		},
		2: {
			phantomforce: ["9L1"],
			shadowball: ["9L1"],
			shadowclaw: ["9L1"],
		},
	},
	Grass: {
		0: {
			absorb: ["9L1"],
		},
		1: {
			magicalleaf: ["9L1"],
			megadrain: ["9L1"],
		},
		2: {
			energyball: ["9L1"],
			leafblade: ["9L1"],
			seedbomb: ["9L1"],
			gigadrain: ["9L1"],
			hornleech: ["9L1"],
		},
		3: {
			leafstorm: ["9L1"],
			powerwhip: ["9L1"],
			solarbeam: ["9L1"],
			woodhammer: ["9L1"],
		},
	},
	Ground: {
		1: {
			dig: ["9L1"],
			mudbomb: ["9L1"],
		},
		2: {
			stompingtantrum: ["9L1"],
		},
		3: {
			earthquake: ["9L1"],
			earthpower: ["9L1"],
		},
	},
	Ice: {
		0: {
			iceshard: ["9L1"],
		},
		1: {
			aurorabeam: ["9L1"],
			icefang: ["9L1"],
		},
		2: {
			icebeam: ["9L1"],
			iciclecrash: ["9L1"],
			icepunch: ["9L1"],
		},
		3: {
			blizzard: ["9L1"],
		},
	},
	Light: {
		1: {
			drainingkiss: ["9L1"],
		},
		2: {
			dazzlinggleam: ["9L1"],
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
			hiddenpower: ["9L1"],
			swift: ["9L1"],
		},
		2: {
			hypervoice: ["9L1"],
			bodyslam: ["9L1"],
		},
		3: {
			gigaimpact: ["9L1"],
			hyperbeam: ["9L1"],
			doubleedge: ["9L1"],
		},
	},
	Poison: {
		1: {
			sludge: ["9L1"],
		},
		2: {
			sludgebomb: ["9L1"],
			poisonjab: ["9L1"],
		},
		3: {
			gunkshot: ["9L1"],
		},
	},
	Psychic: {
		1: {
			psywave: ["9L1"],
			psybeam: ["9L1"],
		},
		2: {
			psychic: ["9L1"],
			psyshock: ["9L1"],
			psychicfangs: ["9L1"],
			zenheadbutt: ["9L1"],
		},
	},
	Rock: {
		0: {
			accelerock: ["9L1"],
		},
		1: {
			ancientpower: ["9L1"],
			rocktomb: ["9L1"],
		},
		2: {
			powergem: ["9L1"],
			rockslide: ["9L1"],
		},
		3: {
			stoneedge: ["9L1"],
		},
	},
	Steel: {
		0: {
			bulletpunch: ["9L1"],
		},
		1: {
			mirrorshot: ["9L1"],
			magnetbomb: ["9L1"],
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
		},
		1: {
			bubblebeam: ["9L1"],
			waterpulse: ["9L1"],
		},
		2: {
			surf: ["9L1"],
			dive: ["9L1"],
			waterfall: ["9L1"],
		},
		3: {
			hydropump: ["9L1"],
		},
	},
};
