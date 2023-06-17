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
		1: ['shockwave', 'chargebeam', 'charge', 'thunderwave'],
		2: ['thunderbolt', 'voltswitch', 'electricterrain'],
		3: ['thunder', 'risingvoltage'],
	},
	Fighting: {
		0: ['rocksmash'],
		1: ['seismictoss', 'vacuumwave', 'detect'],
		2: ['aurasphere', 'bulkup'],
		3: ['focusblast', 'superpower'],
	},
	Fire: {
		0: ['ember', 'willowisp'],
		1: ['firespin', 'willowisp'],
		2: ['heatwave', 'flamethrower', 'sunnyday'],
		3: ['overheat', 'fireblast'],
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
		2: ['hypervoice', 'facade'],
		3: ['thrash'],
	},
	Poison: {
		0: ['acid', 'smog', 'poisongas'],
		1: ['sludge', 'clearsmog', 'acidspray', 'toxic'],
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
function addMoveByType(ret: string[], species: Species, type: string, ...moves: string[]) {
	if (species.types.includes(type)) ret.push(...moves);
}
function addMoveByEggGroup(ret: string[], species: Species, eggGroup: string, ...moves: string[]) {
	if (species.eggGroups.includes(eggGroup)) ret.push(...moves);
}
export const eggGroupLearnsetTable: {[eggGroup: string]: {[n: number]: (species: Species) => string[]}} = {
	"Template": {
		0: () => [],
		1: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, '', '');
			return ret;
		},
	},
	"Body Arms": {
		1: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Fighting', 'brickbreak', 'circlethrow');
			return ret;
		},
		2: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Fighting', 'hammerarm');
			return ret;
		},
		3: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Fighting', 'closecombat');
			return ret;
		},
	},
	"Body Body": {
		1: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Fire', 'flamecharge');
			return ret;
		},
		2: () => ['bodyslam', 'bodypress'],
		3: (s) => {
			const ret: string[] = ['doubleedge'];
			addMoveByType(ret, s, 'Electric', 'wildcharge');
			addMoveByType(ret, s, 'Fire', 'flareblitz');
			return ret;
		},
	},
	"Body Foot": {
		2: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Fire', 'blazekick');
			return ret;
		},
		3: () => ['megakick'],
	},
	"Body Head": {
		1: () => ['headbutt'],
		2: (s) => {
			const ret: string[] = ['ironhead'];
			addMoveByType(ret, s, 'Psychic', 'zenheadbutt');
			return ret;
		}
	},
	"Body Knee": {
		3: (s) => ['highjumpkick'],
	},
	"Cannon": {
		1: () => ['lockon'],
		2: () => ['flashcannon'],
	},
	"Claw": {
		0: () => ['metalclaw', 'scratch'],
		1: () => ['honeclaws'],
	},
	"Dragon Dinosaur": {
		0: () => ['dragonrage'],
		2: () => ['outrage', 'earthquake'],
	},
	"Dragon Eastern": {
		0: () => ['dragonrage', 'ember', 'twister'],
		1: () => ['dragondance'],
		2: () => ['fireblast', 'earthquake', 'flamethrower'],
	},
	"Dragon Western": {
		0: () => ['dragonrage', 'ember'],
		2: () => ['fireblast', 'flamethrower'],
		3: () => ['dracometeor'],
	},
	"Extreme": {
		2: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Electric', 'discharge');
			addMoveByType(ret, s, 'Fire', 'lavaplume');
			return ret;
		},
		3: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Electric', 'zapcannon');
			addMoveByType(ret, s, 'Fire', 'inferno');
			return ret;
		},
	},
	"Fang": {
		1: (s) => {
			const ret: string[] = ['bite'];
			addMoveByType(ret, s, 'Electric', 'thunderfang');
			addMoveByType(ret, s, 'Fire', 'firefang');
			addMoveByType(ret, s, 'Ice', 'icefang');
			addMoveByType(ret, s, 'Poison', 'poisonfang');
			return ret;
		},
		2: (s) => {
			const ret: string[] = ['crunch'];
			addMoveByType(ret, s, 'Dragon', 'firefang', 'icefang', 'thunderfang');
			addMoveByType(ret, s, 'Psychic', 'psychicfangs');
			addMoveByType(ret, s, 'Steel', 'thunderfang');
			addMoveByType(ret, s, 'Water', 'icefang');
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
			const ret: string[] = [];
			addMoveByType(ret, s, 'Fighting', 'machpunch');
			addMoveByType(ret, s, 'Steel', 'bulletpunch');
			return ret;
		},
		1: (s) => {
			const ret: string[] = [];
			addMoveByType(ret, s, 'Electric', 'thunderpunch');
			addMoveByType(ret, s, 'Fighting', 'machpunch', 'poweruppunch');
			addMoveByType(ret, s, 'Fire', 'firepunch');
			addMoveByType(ret, s, 'Ice', 'icepunch');
			addMoveByType(ret, s, 'Steel', 'bulletpunch');
			return ret;
		},
		2: (s) => {
			const ret: string[] = ['megapunch'];
			addMoveByType(ret, s, 'Dragon', 'firepunch', 'icepunch', 'thunderpunch');
			addMoveByType(ret, s, 'Fighting', 'drainpunch', 'firepunch', 'icepunch', 'thunderpunch');
			addMoveByType(ret, s, 'Steel', 'thunderpunch');
			addMoveByType(ret, s, 'Water', 'icepunch');
			return ret;
		},
		3: (s) => {
			const ret: string[] = ['focuspunch'];
			addMoveByType(ret, s, 'Fighting', 'dynamicpunch');
			return ret;
		},
	},
	"Sharp": {
		0: () => ['cut', 'furycutter'],
		1: () => ['nightslash', 'slash'],
	},
	"Sword": {
		0: () => ['cut', 'furycutter'],
		1: (s) => {
			const ret: string[] = ['nightslash', 'slash', 'aerialace', 'swordsdance'];
			addMoveByType(ret, s, 'Psychic', 'psychocut');

			addMoveByEggGroup(ret, s, 'Legendary', 'psychocut');
			return ret;
		},
		2: () => ['sacredsword'],
	},
	"Tail": {
		0: () => ['tailwhip'],
		2: (s) => {
			const ret: string[] = ['irontail'];
			addMoveByType(ret, s, 'Dragon', 'aquatail', 'dragontail');
			addMoveByType(ret, s, 'Poison', 'poisontail');
			addMoveByType(ret, s, 'Water', 'aquatail');
			return ret;
		},
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
