type TypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' |
	'Ice' | 'Dragon' | 'Dark' | 'Light';

interface deltaLearnsetData {
	addStages?: number[],
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
	},
	Dark: {
		0: ['faketears'],
		1: ['snarl', 'pursuit', 'beatup'],
		2: [
			'foulplay', 'darkpulse', 'shadowball', 'knockoff', 'powertrip',
			'nastyplot', 'taunt',
		],
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
		1: ['nightshade', 'ominouswind', 'curse', 'meanlook', 'willowisp'],
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
		1: [
			'dig', 'mudbomb', 'rocktomb', 'sandtomb', 'sandattack',
			'stealthrock',
		],
		2: ['highhorsepower', 'rockslide', 'stompingtantrum', 'bulldoze'],
		3: ['earthquake', 'stoneedge', 'earthpower', 'sandstorm'],
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
		2: ['radiantterrain'],
	},
	Normal: {
		0: ['sonicboom', 'quickattack'],
		1: ['swift'],
		2: ['facade'],
		3: ['thrash'],
	},
	Poison: {
		0: ['acid', 'smog', 'poisongas'],
		1: ['sludge', 'clearsmog', 'acidspray', 'toxic'],
		2: [
			'sludgebomb', 'poisonjab', 'venoshock', 'corrosivegas', 'gastroacid',
			'toxicspikes',
		],
		3: ['sludgewave'],
	},
	Psychic: {
		0: ['confusion'],
		1: ['psywave', 'psybeam', 'hypnosis'],
		2: [
			'psychic', 'psyshock', 'storedpower', 'calmmind', 'lightscreen',
			'magiccoat', 'psychicterrain', 'reflect',
		],
		3: ['expandingforce', 'futuresight'],
	},
	Rock: {
		0: ['rockthrow', 'accelerock'],
		1: ['rocktomb', 'smackdown', 'rockblast', 'rockpolish', 'stealthrock'],
		2: ['powergem', 'rockslide', 'sandstorm'],
		3: ['earthquake', 'stoneedge'],
	},
	Steel: {
		1: ['mirrorshot', 'magnetbomb', 'autotomize', 'irondefense', 'metalsound'],
		2: ['flashcannon'],
	},
	Water: {
		0: ['aquajet', 'bubble', 'watergun', 'watersport'],
		1: ['bubblebeam', 'waterpulse', 'whirlpool'],
		2: ['surf', 'scald', 'raindance', 'icebeam'],
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
	if (type.startsWith('!') && !species.types.includes(type.slice(1))) {
		this.push(...moves);
	} else if (species.types.includes(type)) {
		this.push(...moves);
	}
	return this;
};
Array.prototype.addMoveByEggGroup = function (species: Species, eggGroup: string, ...moves: string[]) {
	if (eggGroup.startsWith('!') && !species.eggGroups.includes(eggGroup.slice(1))) {
		this.push(...moves);
	} else if (species.eggGroups.includes(eggGroup)) {
		this.push(...moves);
	}
	return this;
};
Array.prototype.addMoveByAny = function (species: Species, filter: string, ...moves: string[]) {
	let reverse = false;
	let found = false;
	if (filter.startsWith('!')) {
		reverse = true;
		filter = filter.slice(1);
	}
	if (species.types.findIndex(value => value.includes(filter)) !== -1) found = true;
	if (species.eggGroups.findIndex(value => value.includes(filter)) !== -1) found = true;
	if (found !== reverse) this.push(...moves);
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
		3: (s) => ['doubleedge', 'earthquake', 'rockslide']
			.addMoveByType(s, 'Dragon', 'dragonrush')
			.addMoveByType(s, 'Electric', 'wildcharge')
			.addMoveByType(s, 'Fire', 'flareblitz')
			.addMoveByType(s, 'Ice', 'avalanche')
			.addMoveByEggGroup(s, 'Flying Bird', 'bravebird'),
	},
	"Body Foot": {
		2: (s) => [].addMoveByType(s, 'Fire', 'blazekick'),
		3: (s) => ['lowkick', 'megakick'],
	},
	"Body Hand": {
		0: (s) => ['helpinghand'],
		1: (s) => ['brickbreak', 'helpinghand'],
		2: (s) => ['encore'],
	},
	"Body Head": {
		1: (s) => ['headbutt'],
		2: (s) => ['ironhead']
			.addMoveByType(s, 'Psychic', 'zenheadbutt')
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
		2: (s) => []
			.addMoveByAny(s, 'Dragon', 'dragonclaw')
			.addMoveByType(s, 'Ghost', 'shadowclaw')
			.addMoveByType(s, 'Normal', 'shadowclaw'),
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
		2: (s) => []
			.addMoveByType(s, 'Electric', 'discharge')
			.addMoveByType(s, 'Fire', 'lavaplume'),
		3: (s) => []
			.addMoveByType(s, 'Electric', 'zapcannon')
			.addMoveByType(s, 'Fire', 'inferno')
			.addMoveByType(s, 'Flying', 'skyattack')
			.addMoveByType(s, 'Poison', 'gunkshot'),
	},
	"Fang": {
		1: (s) => ['bite']
			.addMoveByType(s, 'Electric', 'thunderfang')
			.addMoveByType(s, 'Fire', 'firefang')
			.addMoveByType(s, 'Ice', 'icefang')
			.addMoveByType(s, 'Poison', 'poisonfang'),
		2: (s) => ['crunch']
			.addMoveByAny(s, 'Dragon', 'firefang', 'icefang', 'thunderfang')
			.addMoveByAny(s, 'Normal', 'firefang', 'icefang', 'thunderfang')
			.addMoveByType(s, 'Psychic', 'psychicfangs')
			.addMoveByType(s, 'Steel', 'thunderfang')
			.addMoveByType(s, 'Water', 'icefang'),
	},
	"Flying Bird": {
		1: (s) => ['featherdance', 'roost'],
	},
	"Gear": {
		0: (s) => ['gearup'],
		1: (s) => ['gearup', 'shiftgear'],
		2: (s) => ['geargrind'],
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
		3: (s) => ['grassknot', 'powerwhip'],
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
	"Horn": {
		1: (s) => ['smartstrike', 'hornattack'],
		3: (s) => ['megahorn'],
	},
	"Human-Like": {
		1: (s) => ['facade', 'knockoff', 'pursuit'],
	},
	"Legendary": {
		1: (s) => ['ancientpower', 'swift'],
		2: (s) => ['punishment', 'aurasphere', 'extrasensory', 'calmmind'],
		3: (s) => ['imprison'],
	},
	"Machine": {
		0: (s) => ['thundershock', 'thunderwave'],
		1: (s) => ['shockwave', 'chargebeam', 'charge', 'thunderwave'],
		2: (s) => ['thunderbolt', 'voltswitch'],
	},
	"Magic": {
		0: (s) => ['confusion', 'ember', 'thundershock', 'thunderwave'],
		1: (s) => ['mysticalfire', 'thunderwave'],
		2: (s) => [
			'psychic', 'shadowball', 'calmmind', 'hypnosis', 'lightscreen',
			'magiccoat', 'reflect',
		].addMoveByType(s, '!Dark', 'dazzlinggleam')
		.addMoveByType(s, '!Light', 'darkpulse'),
		3: (s) => ['futuresight'],
	},
	"Monster": {
		2: (s) => []
			.addMoveByType(s, '!Ice', 'flamethrower')
			.addMoveByType(s, '!Dragon', 'icebeam')
			.addMoveByType(s, '!Ground', 'thunderbolt')
			.addMoveByEggGroup(s, 'Body Body', 'earthquake', 'surf'),
		3: (s) => []
			.addMoveByType(s, '!Dragon', 'blizzard')
			.addMoveByType(s, '!Ice', 'fireblast')
			.addMoveByType(s, '!Ground', 'thunder'),
	},
	"Peck": {
		0: (s) => ['peck'],
		1: (s) => ['pluck'],
		2: (s) => ['drillpeck'],
	},
	"Punch": {
		0: (s) => []
			.addMoveByType(s, 'Fighting', 'machpunch')
			.addMoveByType(s, 'Steel', 'bulletpunch'),
		1: (s) => []
			.addMoveByType(s, 'Electric', 'thunderpunch')
			.addMoveByType(s, 'Fighting', 'machpunch', 'poweruppunch')
			.addMoveByType(s, 'Fire', 'firepunch')
			.addMoveByType(s, 'Ghost', 'shadowpunch')
			.addMoveByType(s, 'Ice', 'icepunch')
			.addMoveByType(s, 'Light', 'heavensknuckle')
			.addMoveByType(s, 'Steel', 'bulletpunch'),
		2: (s) => ['megapunch']
			.addMoveByType(s, 'Dragon', 'firepunch', 'thunderpunch')
			.addMoveByType(s, 'Fighting', 'drainpunch', 'firepunch', 'icepunch', 'thunderpunch')
			.addMoveByType(s, 'Normal', 'firepunch', 'icepunch', 'thunderpunch')
			.addMoveByType(s, 'Steel', 'thunderpunch')
			.addMoveByType(s, 'Water', 'icepunch'),
		3: (s) => ['focuspunch']
			.addMoveByType(s, 'Fighting', 'dynamicpunch')
			.addMoveByType(s, 'Steel', 'meteormash'),
	},
	"Roars": {
		0: (s) => ['growl'],
		1: (s) => ['snarl', 'howl', 'nobleroar', 'roar', 'screech'],
		2: (s) => ['uproar'].addMoveByEggGroup(s, "Human-Like", 'partingshot'),
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
	"Sings": {
		0: (s) => ['echoedvoice', 'supersonic', 'sing'],
		1: (s) => ['round', 'echoedvoice', 'screech', 'sing'],
		2: (s) => ['hypervoice', 'perishsong'],
	},
	"Snake": {
		1: (s) => ['coil', 'glare'],
	},
	"Spiky": {
		0: (s) => ['twineedle'],
		1: (s) => ['spikecannon', 'twineedle', 'spikes', 'spikyshield'].addMoveByEggGroup(s, 'Body Arms', 'needlearm'),
	},
	"Swift": {
		1: (s) => ['agility'].addMoveByEggGroup(s, 'Body Hand', 'fakeout'),
		2: (s) => ['uturn'].addMoveByType(s, 'Dark', 'suckerpunch'),
		3: (s) => [].addMoveByEggGroup(s, 'Body Hand', 'grassknot'),
	},
	"Sword": {
		0: (s) => ['cut', 'furycutter'],
		1: (s) => ['nightslash', 'slash', 'aerialace', 'swordsdance']
			.addMoveByType(s, 'Psychic', 'psychocut')
			.addMoveByEggGroup(s, 'Legendary', 'psychocut'),
		2: (s) => ['sacredsword'],
	},
	"Tail": {
		0: (s) => ['tailwhip'],
		1: (s) => []
			.addMoveByAny(s, 'Dragon', 'dragontail')
			.addMoveByType(s, 'Poison', 'poisontail'),
		2: (s) => ['irontail']
			.addMoveByType(s, 'Water', 'aquatail')
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
		1: (s) => ['fly', 'wingattack'],
		2: (s) => ['steelwing', 'dualwingbeat'],
	},
};
/**
 * manually apply moves: 
 * counter-like moves
 * priority moves
 * extremespeed
 * healbell
 * quiverdance
 * rapidspin
 * recover
 * spikes
 * stealthrock
 * strengthsap
 * tailglow
 * uturn
 */
export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: ['greysword', 'garurucannon', 'dragonhammer'],
	},
	metalgreymon: {
		deletes: ['dualwingbeat'],
	},
	metalgreymonblue: {
		deletes: ['dualwingbeat'],
	},
	skullgreymon: {
		deletes: ['thunderbolt'],
	},
	wargreymon: {
		adds: [
			'Ground', 'braveshield', 'gaiaforce', 'bravetornado', 'dramonkiller',
			'uturn', 'steelwing',
		],
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
	heraklekabuterimon: {
		adds: ['Fighting'],
		deletes: ['hurricane'],
	},
	plesiomon: {
		adds: ['Ice'],
	},
	seraphimon: {
		adds: ['sevenheavens', 'testament'],
	},
	goddramon: {
		adds: ['Flying', 'godflame', 'extremespeed', 'recover'],
	},
	angewomon: {
		adds: ['healbell'],
	},
	holydramon: {
		adds: ['Flying', 'holyflame', 'extremespeed'],
	},
	ofanimon: {
		adds: [
			'edensjavelin', 'sefirotcrystal', 'storedpower', 'healbell', 'lunardance',
			'recover',
		],
		deletes: ['earthquake'],
	},
	crossmon: {
		adds: ['dazzlinggleam'],
	},
	grankuwagamon: {
		adds: ['Dark'],
	},
	candmon: {
		adds: ['Ghost'],
		deletes: ['thundershock'],
	},
	boltmon: {
		adds: ['Fighting', 'spikes', 'stealthrock'],
	},
	hagurumon: {
		adds: ['rapidspin'],
	},
	guardromon: {
		adds: ['stealthrock'],
	},
	mechanorimon: {
		adds: ['metalburst'],
	},
	andromon: {
		adds: ['rapidspin', 'spikes', 'stealthrock'],
	},
	hiandromon: {
		adds: ['rapidspin'],
	},
	tyumon: {
		deletes: ['metalclaw'],
	},
	scumon: {
		deletes: ['brickbreak'],
	},
	etemon: {
		adds: ['spikes'],
	},
	metaletemon: {
		adds: ['Dark', 'spikes', 'stealthrock'],
	},
	piemon: {
		adds: ['partingshot'],
	},
	unimon: {
		adds: ['roost'],
	},
	centalmon: {
		adds: ['stealthrock'],
	},
	leomon: {
		adds: ['stealthrock'],
	},
	grappuleomon: {
		adds: ['stealthrock'],
	},
	saberleomon: {
		adds: ['Ground'],
	},
	orgemon: {
		adds: ['stealthrock'],
	},
	digitamamon: {
		adds: ['rapidspin'],
		deletes: ['clamp'],
	},
	devitamamon: {
		adds: ['scaryface'], // todo: make this a more universal move
		deletes: ['clamp'],
	},
	drimogemon: {
		adds: ['rapidspin'],
	},
	whamon: {
		adds: ['waterspout'],
	},
	piccolomon: {
		adds: ['nastyplot', 'spikes'],
	},
	raremon: {
		adds: ['spikes'],
	},
	cockatrimon: {
		adds: ['disable'],
		deletes: ['coil'],
	},
	mastertyranomon: {
		adds: ['Fighting', 'firepunch', 'hammerarm', 'machpunch', 'poweruppunch'],
	},
	vademon: {
		adds: ['futuresight'],
	},
	mammon: {
		adds: ['ancientpower'],
	},
	jyureimon: {
		deletes: ['mysticalfire'],
	},
	pinochimon: {
		deletes: ['megahorn', 'powerwhip', 'solarbeam'],
	},
	megadramon: {
		adds: ['stealthrock'],
	},
	gigadramon: {
		adds: ['stealthrock'],
	},
	deathmon: {
		adds: ['dazzlinggleam'],
	},
	apocalymon: {
		adds: ['darkvoid'],
	},
	chrysalimon: {
		adds: ['Bug', 'Electric'],
		deletes: ['bugbite'],
	},
	infermon: {
		adds: ['Bug', 'Dark', 'rapidspin'],
	},
	diablomon: {
		adds: ['Dark', 'extremespeed', 'rapidspin'],
	},

	susanoomon: {
		adds: [
			'Flying', 'Ice', 'Electric', 'Ground', 'Grass',
			'Water', 'Steel', 'Dark',
		],
	},

	lucemon: {
		addStages: [1, 2, 3],
		adds: [
			'Bug', 'Dark', 'Dragon', 'Electric', 'Fighting',
			'Fire', 'Flying', 'Ghost', 'Grass', 'Ground',
			'Ice', 'Normal', 'Poison', 'Psychic', 'Rock',
			'Steel', 'Water',
		],
	},
	lucemonfalldown: {
		addStages: [3],
		adds: [
			'Bug', 'Dragon', 'Fighting', 'Ghost', 'Normal',
			'Poison', 'Psychic', 'Rock',
		],
	},
};
