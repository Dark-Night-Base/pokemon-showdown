type TypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' |
	'Ice' | 'Dragon' | 'Dark' | 'Light';

interface deltaLearnsetData {
	adds?: string[],
	deletes?: string[],
}

export const universalLearnset: {[n: number]: string[]} = {
	0: ['scratch', 'tackle', 'protect', 'rest', 'sleeptalk', 'substitute'],
	1: ['hiddenpower', 'protect', 'rest', 'sleeptalk', 'substitute', 'workup'],
	3: ['gigaimpact', 'hyperbeam'],
};
/**
 * Child: 0
 * Adult: 0 + 1
 * Perfect: 1 + 2
 * Ultimate: 1 + 2 + 3
 */
export const typeLearnsetTable: {[type in TypeName]: {[n: number]: string[]}} = {
	Bug: {
		0: ['strugglebug', 'furycutter', 'stringshot'],
		1: ['bugbite', 'silverwind', 'pinmissile', 'infestation'],
		2: ['bugbuzz', 'leechlife', 'xscissor', 'uturn'],
		3: ['megahorn'],
	},
	Dark: {
		0: ['faketears'],
		1: ['bite', 'snarl', 'pursuit', 'beatup', 'honeclaws'],
		2: ['foulplay', 'crunch', 'darkpulse', 'nightslash', 'suckerpunch', 'knockoff', 'powertrip', 'nastyplot', 'taunt'],
	},
	Dragon: {
		0: ['dragonrage'],
		1: ['dragonbreath', 'dragontail'],
		2: ['dragonpulse', 'dragonclaw', 'dragondance'],
		3: ['outrage'],
	},
	Electric: {
		0: ['thundershock', 'thunderwave'],
		1: ['thunderfang', 'shockwave', 'chargebeam', 'charge', 'thunderwave'],
		2: ['thunderbolt', 'discharge', 'thunderpunch', 'voltswitch', 'electricterrain'],
		3: ['zapcannon', 'thunder', 'wildcharge', 'risingvoltage'],
	},
	Fighting: {
		0: ['machpunch'],
		1: ['seismictoss', 'brickbreak', 'circlethrow', 'poweruppunch', 'vacuumwave', 'detect'],
		2: ['hammerarm', 'aurasphere', 'bodypress', 'drainpunch', 'bulkup'],
		3: ['focuspunch', 'highjumpkick', 'closecombat', 'focusblast', 'superpower', 'dynamicpunch'],
	},
	Fire: {
		0: ['ember', 'willowisp'],
		1: ['firefang', 'flamecharge', 'firespin', 'willowisp'],
		2: ['heatwave', 'flamethrower', 'lavaplume', 'firepunch', 'sunnyday'],
		3: ['overheat', 'flareblitz', 'fireblast', 'inferno'],
	},
	Flying: {
		0: ['gust', 'peck'],
		1: ['fly', 'aerialace', 'aircutter', 'pluck', 'wingattack', 'defog', 'whirlwind'],
		2: ['drillpeck', 'airslash', 'acrobatics', 'dualwingbeat', 'tailwind'],
		3: ['skyattack', 'bravebird', 'hurricane'],
	},
	Ghost: {
		0: ['shadowsneak', 'astonish', 'lick'],
		1: ['nightshade', 'ominouswind', 'shadowpunch', 'curse'],
		2: ['phantomforce', 'shadowball', 'shadowclaw', 'hex', 'destinybond', 'spite'],
		3: ['grudge'],
	},
	Grass: {
		0: ['vinewhip', 'leafage', 'absorb'],
		1: ['magicalleaf', 'razorleaf', 'megadrain', 'bulletseed', 'leechseed', 'growth'],
		2: ['energyball', 'leafblade', 'seedbomb', 'gigadrain', 'hornleech', 'grassyterrain', 'ingrain', 'worryseed'],
		3: ['leafstorm', 'petaldance', 'powerwhip', 'solarbeam', 'woodhammer'],
	},
	Ground: {
		0: ['mudslap', 'mudsport'],
		1: ['dig', 'mudbomb', 'sandtomb', 'sandattack'],
		2: ['highhorsepower', 'stompingtantrum', 'bulldoze'],
		3: ['earthquake', 'earthpower'],
	},
	Ice: {
		0: ['iceshard', 'powdersnow'],
		1: ['aurorabeam', 'icefang', 'icywind', 'iciclespear'],
		2: ['icebeam', 'iciclecrash', 'icepunch', 'freezedry', 'avalanche', 'hail'],
		3: ['blizzard'],
	},
	Light: {
		0: ['drainingkiss'],
		1: ['heavensknuckle', 'dazzlinggleam'],
		2: ['mistyterrain'],
	},
	Normal: {
		0: ['sonicboom', 'quickattack'],
		1: ['headbutt', 'slash', 'swift'],
		2: ['hypervoice', 'bodyslam', 'facade'],
		3: ['gigaimpact', 'hyperbeam', 'doubleedge', 'thrash'],
	},
	Poison: {
		0: ['acid', 'smog', 'poisongas'],
		1: ['sludge', 'clearsmog', 'poisonfang', 'acidspray', 'toxic'],
		2: ['sludgebomb', 'poisonjab', 'venoshock', 'corrosivegas', 'gastroacid', 'toxicspikes'],
		3: ['gunkshot'],
	},
	Psychic: {
		0: ['confusion'],
		1: ['psywave', 'psybeam', 'hypnosis'],
		2: ['psychic', 'psyshock', 'psychicfangs', 'zenheadbutt', 'storedpower', 'calmmind', 'lightscreen', 'magiccoat', 'psychicterrain', 'reflect'],
		3: ['expandingforce', 'futuresight'],
	},
	Rock: {
		0: ['rockthrow', 'accelerock'],
		1: ['ancientpower', 'rocktomb', 'smackdown', 'rockblast', 'rockpolish'],
		2: ['powergem', 'rockslide', 'sandstorm', 'stealthrock'],
		3: ['stoneedge'],
	},
	Steel: {
		0: ['metalclaw', 'bulletpunch'],
		1: ['mirrorshot', 'magnetbomb', 'autotomize', 'irondefense', 'metalsound'],
		2: ['irontail', 'flashcannon', 'ironhead'],
		3: ['meteormash'],
	},
	Water: {
		0: ['aquajet', 'bubble', 'watergun', 'watersport'],
		1: ['bubblebeam', 'waterpulse', 'whirlpool'],
		2: ['surf', 'dive', 'scald', 'waterfall', 'aquaring', 'raindance'],
		3: ['hydropump'],
	},
};
export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: ['greysword', 'dragonhammer', 'sacredsword'],
		deletes: ['blizzard'],
	},
};
