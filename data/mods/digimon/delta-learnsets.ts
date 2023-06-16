type TypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' |
	'Ice' | 'Dragon' | 'Dark' | 'Light';

interface deltaLearnsetData {
	adds?: string[],
	deletes?: string[],
}

export const universalLearnset: {[n: number]: string[]} = {
	0: ['tackle', 'protect', 'rest', 'sleeptalk', 'substitute'],
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
		1: ['bite', 'snarl', 'pursuit', 'beatup'],
		2: ['foulplay', 'crunch', 'darkpulse', 'nightslash', 'suckerpunch', 'knockoff', 'powertrip', 'nastyplot', 'taunt'],
	},
	Dragon: {
		0: ['dragonrage'],
		1: ['dragonbreath', 'dragontail'],
		2: ['dragonpulse', 'dragonclaw'],
		3: ['dragonrush'],
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
export const eggGroupLearnsetTable: {[eggGroup: string]: {[n: number]: string[]}} = {
	"Cannon": {
		1: ['lockon'],
		2: ['flashcannon'],
	},
	"Claw": {
		0: ['metalclaw', 'scratch'],
		1: ['honeclaws'],
	},
	"Dragon Dinosaur": {
		0: ['dragon rage'],
		1: ['bite'],
		2: ['outrage', 'earthquake', 'crunch'],
	},
	"Dragon Eastern": {
		0: ['dragon rage', 'ember', 'twister'],
		1: ['firefang', 'icefang', 'thunderfang', 'dragondance'],
		2: ['fireblast', 'earthquake', 'flamethrower'],
	},
	"Dragon Western": {
		0: ['dragon rage', 'ember'],
		1: ['firefang', 'icefang', 'thunderfang'],
		2: ['fireblast', 'flamethrower'],
		3: ['dracometeor'],
	},
	"Fang": {
		1: ['bite', 'firefang', 'icefang', 'thunderfang'],
		2: ['crunch'],
	},
	"Gear": {
		1: ['gearup', 'shiftgear'],
	},
	"Grass Flower": {},
	"Grass Grass": {},
	"Grass Mushroom": {
		1: ['spore'],
	},
	"Grass Wood": {},
	"Human-Like": {
		1: ['facade', 'knockoff', 'pursuit'],
	},
	"Legendary": {
		2: ['punishment', 'extrasensory'],
	},
	"Monster": {
		2: ['earthquake', 'flamethrower', 'icebeam', 'thunderbolt'],
	},
	"Punch": {
		1: ['firepunch', 'icepunch', 'thunderpunch'],
		3: ['focuspunch'],
	},
	"Sword": {
		0: ['cut'],
		1: ['nightslash', 'slash', 'aerialace', 'swordsdance'],
		2: ['sacredsword'],
	},
	"Tail": {
		0: ['tailwhip'],
		2: ['irontail'],
	},
	"Wing": {
		1: ['featherdance', 'roost'],
	},
};
export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: ['greysword', 'garurucannon', 'dragonhammer'],
		deletes: ['blizzard'],
	},
};
