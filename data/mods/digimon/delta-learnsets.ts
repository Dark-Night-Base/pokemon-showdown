interface deltaLearnsetData {
	adds?: string[],
	deletes?: string[],
}

export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: ['greysword', 'dragonhammer', 'sacredsword'],
		deletes: ['blizzard'],
	},
};
