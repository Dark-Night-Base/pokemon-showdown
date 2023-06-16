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
		1: ['snarl', 'pursuit', 'beatup'],
		2: ['foulplay', 'darkpulse', 'suckerpunch', 'knockoff', 'powertrip', 'nastyplot', 'taunt'],
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
		0: ['rocksmash'],
		1: ['seismictoss', 'brickbreak', 'circlethrow', 'vacuumwave', 'detect'],
		2: ['hammerarm', 'aurasphere', 'bodypress', 'bulkup'],
		3: ['highjumpkick', 'closecombat', 'focusblast', 'superpower'],
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
		0: ['absorb'],
		1: ['megadrain', 'bulletseed', 'leechseed', 'growth'],
		2: ['energyball', 'seedbomb', 'gigadrain', 'grassyterrain', 'worryseed'],
		3: ['solarbeam'],
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
		1: ['swift'],
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
		2: ['psychic', 'psyshock', 'storedpower', 'calmmind', 'lightscreen', 'magiccoat', 'psychicterrain', 'reflect'],
		3: ['expandingforce', 'futuresight'],
	},
	Rock: {
		0: ['rockthrow', 'accelerock'],
		1: ['ancientpower', 'rocktomb', 'smackdown', 'rockblast', 'rockpolish'],
		2: ['powergem', 'rockslide', 'sandstorm', 'stealthrock'],
		3: ['stoneedge'],
	},
	Steel: {
		0: ['metalclaw'],
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
export const eggGroupLearnsetTable: {[eggGroup: string]: {[n: number]: (species: Species) => string[]}} = {
	"Body Arms": {},
	"Body Body": {},
	"Body Head": {
		1: () => ['headbutt'],
		2: (s) => {
			const ret = ['ironhead'];
			if (s.types.includes('Psychic')) ret.push('zenheadbutt');
			return ret;
		}
	},
	"Body Legs": {},
	"Cannon": {
		1: () => ['lockon'],
		2: () => ['flashcannon'],
	},
	"Claw": {
		0: () => ['metalclaw', 'scratch'],
		1: () => ['honeclaws'],
	},
	"Dragon Dinosaur": {
		0: () => ['dragon rage'],
		2: () => ['outrage', 'earthquake'],
	},
	"Dragon Eastern": {
		0: () => ['dragon rage', 'ember', 'twister'],
		1: () => ['dragondance'],
		2: () => ['fireblast', 'earthquake', 'flamethrower'],
	},
	"Dragon Western": {
		0: () => ['dragon rage', 'ember'],
		2: () => ['fireblast', 'flamethrower'],
		3: () => ['dracometeor'],
	},
	"Fang": {
		1: (s) => {
			const ret = ['bite'];
			if (s.types.findIndex(value => ['Dragon', 'Fire'].includes(value)) !== -1) ret.push('firefang');
			if (s.types.findIndex(value => ['Dragon', 'Ice', 'Water'].includes(value)) !== -1) ret.push('icefang');
			if (s.types.findIndex(value => ['Dragon', 'Electric', 'Steel'].includes(value)) !== -1) ret.push('thunderfang');
			return ret;
		},
		2: (s) => {
			const ret = ['crunch'];
			if (s.types.includes('Psychic')) ret.push('psychicfangs');
			return ret;
		},
	},
	"Gear": {
		0: () => ['gearup'],
		1: () => ['geargrind', 'gearup', 'shiftgear'],
	},
	"Grass Flower": {
		0: () => ['poisonpowder', 'stunspore'],
		1: () => ['ragepowder', 'sleeppowder'],
		2: () => ['petalblizzard'],
		3: () => ['petaldance'],
	},
	"Grass Grass": {
		0: () => ['vinewhip'],
		1: () => ['grasswhistle', 'synthesis'],
		3: () => ['powerwhip'],
	},
	"Grass Mushroom": {
		0: () => ['poisonpowder', 'stunspore'],
		1: () => ['ragepowder', 'sleeppowder'],
		2: () => ['spore'],
	},
	"Grass Wood": {
		0: () => ['vinewhip', 'leafage'],
		1: () => ['magicalleaf', 'razorleaf', 'synthesis'],
		2: () => ['leafblade', 'hornleech', 'ingrain'],
		3: () => ['leafstorm', 'powerwhip', 'woodhammer'],
	},
	"Human-Like": {
		1: () => ['facade', 'knockoff', 'pursuit'],
	},
	"Legendary": {
		2: () => ['punishment', 'extrasensory'],
	},
	"Monster": {
		2: () => ['earthquake', 'flamethrower', 'icebeam', 'thunderbolt'],
	},
	"Punch": {
		0: (s) => {
			const ret = [];
			if (s.types.includes('Fighting')) ret.push('machpunch');
			if (s.types.includes('Steel')) ret.push('bulletpunch');
			return ret;
		},
		1: (s) => {
			const ret = [];
			if (s.types.includes('Fighting')) ret.push('machpunch', 'poweruppunch');
			if (s.types.includes('Steel')) ret.push('bulletpunch');

			if (s.types.findIndex(value => ['Dragon', 'Fighting', 'Fire'].includes(value)) !== -1) ret.push('firepunch');
			if (s.types.findIndex(value => ['Dragon', 'Fighting', 'Ice', 'Water'].includes(value)) !== -1) ret.push('icepunch');
			if (s.types.findIndex(value => ['Dragon', 'Electric', 'Fighting', 'Steel'].includes(value)) !== -1) ret.push('thunderpunch');
			return ret;
		},
		2: (s) => {
			const ret = [];
			if (s.types.includes('Fighting')) ret.push('drainpunch');
			return ret;
		},
		3: (s) => {
			const ret = ['focuspunch'];
			if (s.types.includes('Fighting')) ret.push('dynamicpunch');
			return ret;
		},
	},
	"Sharp": {
		1: () => ['slash'],
	},
	"Sword": {
		0: () => ['cut'],
		1: () => ['nightslash', 'slash', 'aerialace', 'swordsdance'],
		2: () => ['sacredsword'],
	},
	"Tail": {
		0: () => ['tailwhip'],
		2: () => ['irontail'],
	},
	"Wing": {
		1: () => ['featherdance', 'roost'],
	},
};
export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: ['greysword', 'garurucannon', 'dragonhammer'],
		deletes: ['blizzard'],
	},
};
