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
		2: ['foulplay', 'darkpulse', 'knockoff', 'powertrip', 'nastyplot', 'taunt'],
	},
	Dragon: {
		0: ['dragonrage'],
		1: ['dragonbreath'],
		2: ['dragonpulse'],
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
		2: ['bulkup'],
		3: ['focusblast', 'superpower'],
	},
	Fire: {
		0: ['ember', 'willowisp'],
		1: ['firespin', 'willowisp'],
		2: ['heatwave', 'flamethrower', 'sunnyday'],
		3: ['overheat', 'fireblast'],
	},
	Flying: {
		0: ['gust'],
		1: ['fly', 'aerialace', 'aircutter', 'defog', 'whirlwind'],
		2: ['airslash', 'acrobatics', 'tailwind'],
		3: ['hurricane'],
	},
	Ghost: {
		0: ['shadowsneak', 'astonish', 'lick'],
		1: ['nightshade', 'ominouswind', 'curse'],
		2: ['phantomforce', 'shadowball', 'hex', 'destinybond', 'spite'],
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
		1: ['dig', 'mudbomb', 'rocktomb', 'sandtomb', 'sandattack'],
		2: ['highhorsepower', 'rockslide', 'stompingtantrum', 'bulldoze'],
		3: ['earthquake', 'stoneedge', 'earthpower'],
	},
	Ice: {
		0: ['iceshard', 'powdersnow', 'haze'],
		1: ['aurorabeam', 'icywind', 'iciclespear', 'haze'],
		2: ['icebeam', 'iciclecrash', 'freezedry', 'hail'],
		3: ['blizzard'],
	},
	Light: {
		0: ['drainingkiss'],
		1: ['dazzlinggleam'],
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
		3: ['earthquake', 'stoneedge'],
	},
	Steel: {
		1: ['mirrorshot', 'magnetbomb', 'autotomize', 'irondefense', 'metalsound'],
		2: ['flashcannon'],
	},
	Water: {
		0: ['aquajet', 'bubble', 'watergun', 'watersport'],
		1: ['bubblebeam', 'waterpulse', 'whirlpool'],
		2: ['surf', 'scald', 'raindance'],
		3: ['hydropump'],
	},
};
declare global {
	interface Array<T> {
		addMoveByType(species: Species, type: string, ...moves: string[]): Array<T>;
		addMoveByEggGroup(species: Species, eggGroup: string, ...moves: string[]): Array<T>;
		addMoveByAny(species: Species, filter: string, ...moves: string[]): Array<T>;
	}
}
Array.prototype.addMoveByType = function (species: Species, type: string, ...moves: string[]) {
	if (species.types.includes(type)) this.push(...moves);
	return this;
};
Array.prototype.addMoveByEggGroup = function (species: Species, eggGroup: string, ...moves: string[]) {
	if (species.eggGroups.includes(eggGroup)) this.push(...moves);
	return this;
};
Array.prototype.addMoveByAny = function (species: Species, filter: string, ...moves: string[]) {
	if (species.types.findIndex(value => value.includes(filter)) !== -1) this.push(...moves);
	if (species.eggGroups.findIndex(value => value.includes(filter)) !== -1) this.push(...moves);
	return this;
};
export const eggGroupLearnsetTable: {[eggGroup: string]: {[n: number]: (species: Species) => string[]}} = {
	"Armor": {
		1: (s) => ['autotomize', 'irondefense', 'metalsound'],
	},
	"Body Arms": {
		1: (s) => [].addMoveByType(s, 'Fighting', 'circlethrow'),
		2: (s) => [].addMoveByType(s, 'Fighting', 'hammerarm'),
		3: (s) => [].addMoveByType(s, 'Fighting', 'closecombat'),
	},
	"Body Body": {
		1: (s) => [].addMoveByType(s, 'Fire', 'flamecharge'),
		2: (s) => ['bodyslam', 'bodypress', 'bulkup'],
		3: (s) => ['doubleedge', 'earthquake', 'rockslide'].addMoveByType(s, 'Dragon', 'dragonrush')
			.addMoveByType(s, 'Electric', 'wildcharge')
			.addMoveByType(s, 'Fire', 'flareblitz')
			.addMoveByType(s, 'Flyging', 'bravebird')
			.addMoveByType(s, 'Ice', 'avalanche'),
	},
	"Body Foot": {
		2: (s) => [].addMoveByType(s, 'Fire', 'blazekick'),
		3: (s) => ['megakick'],
	},
	"Body Hand": {
		0: (s) => ['helpinghand'],
		1: (s) => ['brickbreak', 'helpinghand'],
	},
	"Body Head": {
		1: (s) => ['headbutt'],
		2: (s) => ['ironhead'].addMoveByType(s, 'Psychic', 'zenheadbutt')
			.addMoveByEggGroup(s, 'Legendary', 'zenheadbutt'),
		3: (s) => [].addMoveByType(s, 'Rock', 'headsmash'),
	},
	"Body Knee": {
		2: (s) => ['jumpkick'],
		3: (s) => ['highjumpkick'],
	},
	"Cannon": {
		1: (s) => ['lockon'],
		2: (s) => ['flashcannon'],
	},
	"Claw": {
		0: (s) => ['metalclaw', 'scratch'],
		1: (s) => ['honeclaws'],
		2: (s) => [].addMoveByAny(s, 'Dragon', 'dragonclaw')
			.addMoveByType(s, 'Ghost', 'shadowclaw'),
	},
	"Dragon Dinosaur": {
		0: (s) => ['dragonrage'],
		1: (s) => ['dragonbreath'],
		2: (s) => ['dragonrush', 'earthquake', 'dragonpulse'],
		3: (s) => ['outrage'],
	},
	"Dragon Eastern": {
		0: (s) => ['dragonrage', 'ember', 'twister'],
		1: (s) => ['dragonbreath', 'dragondance'],
		2: (s) => ['fireblast', 'earthquake', 'flamethrower', 'dragonpulse'],
		3: (s) => ['outrage'],
	},
	"Dragon Western": {
		0: (s) => ['dragonrage', 'ember'],
		1: (s) => ['dragonbreath'],
		2: (s) => ['fireblast', 'flamethrower', 'dragonpulse'],
		3: (s) => ['dracometeor'],
	},
	"Extreme": {
		2: (s) => [].addMoveByType(s, 'Electric', 'discharge')
			.addMoveByType(s, 'Fire', 'lavaplume'),
		3: (s) => [].addMoveByType(s, 'Electric', 'zapcannon')
			.addMoveByType(s, 'Fire', 'inferno')
			.addMoveByType(s, 'Flying', 'skyattack')
			.addMoveByType(s, 'Poison', 'gunkshot'),
	},
	"Fang": {
		1: (s) => ['bite'].addMoveByType(s, 'Electric', 'thunderfang')
			.addMoveByType(s, 'Fire', 'firefang')
			.addMoveByType(s, 'Ice', 'icefang')
			.addMoveByType(s, 'Poison', 'poisonfang'),
		2: (s) => ['crunch'].addMoveByType(s, 'Dragon', 'firefang', 'icefang', 'thunderfang')
			.addMoveByType(s, 'Psychic', 'psychicfangs')
			.addMoveByType(s, 'Steel', 'thunderfang')
			.addMoveByType(s, 'Water', 'icefang'),
	},
	"Gear": {
		0: (s) => ['gearup'],
		1: (s) => ['geargrind', 'gearup', 'shiftgear'],
	},
	"Grass Flower": {
		0: (s) => ['poisonpowder', 'stunspore'],
		1: (s) => ['ragepowder', 'sleeppowder'],
		2: (s) => ['petalblizzard'],
		3: (s) => ['petaldance'],
	},
	"Grass Grass": {
		0: (s) => ['vinewhip'],
		1: (s) => ['grasswhistle', 'synthesis'],
		3: (s) => ['powerwhip'],
	},
	"Grass Mushroom": {
		0: (s) => ['poisonpowder', 'stunspore'],
		1: (s) => ['ragepowder', 'sleeppowder'],
		2: (s) => ['spore'],
	},
	"Grass Wood": {
		0: (s) => ['vinewhip', 'leafage'],
		1: (s) => ['magicalleaf', 'razorleaf', 'synthesis'],
		2: (s) => ['leafblade', 'hornleech', 'ingrain'],
		3: (s) => ['leafstorm', 'powerwhip', 'woodhammer'],
	},
	"Human-Like": {
		1: (s) => ['facade', 'knockoff', 'pursuit'],
	},
	"Legendary": {
		1: (s) => ['swift'],
		2: (s) => ['punishment', 'aurasphere', 'extrasensory', 'calmmind'],
		3: (s) => ['imprison'],
	},
	"Machine": {
		0: (s) => ['thundershock', 'thunderwave'],
		1: (s) => ['shockwave', 'chargebeam', 'charge', 'thunderwave'],
		2: (s) => ['thunderbolt', 'voltswitch'],
	},
	"Magic": {
		0: (s) => ['confusion', 'ember', 'thundershock'],
		1: (s) => ['mysticalfire'],
		2: (s) => ['dazzlinggleam', 'psychic', 'darkpulse', 'shadowball', 'calmmind', 'lightscreen', 'magiccoat', 'reflect'],
		3: (s) => ['futuresight'],
	},
	"Monster": {
		2: (s) => ['earthquake', 'flamethrower', 'icebeam', 'thunderbolt'],
	},
	"Peck": {
		0: (s) => ['peck'],
		1: (s) => ['pluck'],
		2: (s) => ['drillpeck'],
	},
	"Punch": {
		0: (s) => [].addMoveByType(s, 'Fighting', 'machpunch')
			.addMoveByType(s, 'Steel', 'bulletpunch'),
		1: (s) => [].addMoveByType(s, 'Electric', 'thunderpunch')
			.addMoveByType(s, 'Fighting', 'machpunch', 'poweruppunch')
			.addMoveByType(s, 'Fire', 'firepunch')
			.addMoveByType(s, 'Ghost', 'shadowpunch')
			.addMoveByType(s, 'Ice', 'icepunch')
			.addMoveByType(s, 'Light', 'heavensknuckle')
			.addMoveByType(s, 'Steel', 'bulletpunch'),
		2: (s) => ['megapunch'].addMoveByType(s, 'Dragon', 'firepunch', 'icepunch', 'thunderpunch')
			.addMoveByType(s, 'Fighting', 'drainpunch', 'firepunch', 'icepunch', 'thunderpunch')
			.addMoveByType(s, 'Steel', 'thunderpunch')
			.addMoveByType(s, 'Water', 'icepunch'),
		3: (s) => ['focuspunch'].addMoveByType(s, 'Fighting', 'dynamicpunch')
			.addMoveByType(s, 'Steel', 'meteormash'),
	},
	"Sharp": {
		0: (s) => ['cut', 'furycutter'],
		1: (s) => ['nightslash', 'slash'],
		2: (s) => ['swordsdance'], // todo: somehow add uturn here?
	},
	"Shell": {
		0: (s) => ['clamp', 'withdraw'],
		1: (s) => [].addMoveByType(s, 'Water', 'razorshell'),
		2: (s) => ['shellsmash'],
		3: (s) => ['skullbash'],
	},
	"Swift": {
		1: (s) => [].addMoveByEggGroup(s, 'Body Hand', 'fakeout'),
		2: (s) => ['uturn'].addMoveByType(s, 'Dark', 'suckerpunch'),
	},
	"Sword": {
		0: (s) => ['cut', 'furycutter'],
		1: (s) => ['nightslash', 'slash', 'aerialace', 'swordsdance'].addMoveByType(s, 'Psychic', 'psychocut')
			.addMoveByEggGroup(s, 'Legendary', 'psychocut'),
		2: (s) => ['sacredsword'],
	},
	"Tail": {
		0: (s) => ['tailwhip'],
		1: (s) => [].addMoveByAny(s, 'Dragon', 'dragontail')
			.addMoveByType(s, 'Poison', 'poisontail'),
		2: (s) => ['irontail'].addMoveByType(s, 'Water', 'aquatail')
			.addMoveByType(s, 'Dragon', 'aquatail'),
	},
	"Tentacle": {
		0: (s) => ['wrap'].addMoveByType(s, 'Grass', 'vinewhip'),
		1: (s) => ['wrap'].addMoveByType(s, 'Grass', 'vinewhip'),
		3: (s) => [].addMoveByType(s, 'Grass', 'powerwhip'),
	},
	"Water Lake": {
		2: (s) => ['muddywater', 'waterfall'],
	},
	"Water Ocean": {
		1: (s) => ['dive', 'brine'],
		2: (s) => ['aquaring'],
	},
	"Wing": {
		1: (s) => ['wingattack', 'featherdance', 'roost'],
		2: (s) => ['dualwingbeat', 'steelwing'],
	},
};
export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: ['greysword', 'garurucannon', 'dragonhammer'],
	},
	metalgreymon: {
		deletes: ['icebeam', 'featherdance', 'roost', 'dualwingbeat'],
	},
	metalgreymonblue: {
		deletes: ['icebeam', 'featherdance', 'roost', 'dualwingbeat'],
	},
	skullgreymon: {
		deletes: ['icebeam', 'thunderbolt'],
	},
	wargreymon: {
		adds: ['braveshield', 'gaiaforce', 'bravetornado', 'dramonkiller', 'uturn', 'steelwing'],
		deletes: ['icebeam', 'thunderbolt'],
	},
	weregarurumon: {
		deletes: ['hammerarm'],
	},
	metalgarurumon: {
		adds: ['cocytusbreath', 'garurutomahawk', 'gracecrossfreezer', 'steelwing'],
	},
	garudamon: {
		adds: ['uturn'],
	},
	hououmon: {
		adds: ['Fire'],
	},
	tentomon: {
		deletes: ['featherdance'],
	},
	kabuterimon: {
		deletes: ['featherdance'],
	},
	atlurkabuterimon: {
		deletes: ['featherdance'],
	},
	heraklekabuterimon: {
		deletes: ['featherdance', 'bravebird', 'hurricane'],
	},
	holyangemon: {
		deletes: ['darkpulse'],
	},
	seraphimon: {
		adds: ['sevenheavens', 'testament'],
		deletes: ['darkpulse'],
	},
	goddramon: {
		adds: ['Flying', 'godflame'],
	},
	angewomon: {
		deletes: ['darkpulse'],
	},
	holydramon: {
		adds: ['Flying', 'holyflame'],
	},
	ofanimon: {
		adds: ['edensjavelin', 'sefirotcrystal'],
		deletes: ['darkpulse'],
	},
};
