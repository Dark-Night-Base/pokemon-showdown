interface deltaLearnsets {
	[k: string]: ["9L1"] | 1, // 1 for types
}
interface deltaLearnsetData {
	adds?: deltaLearnsets,
	deletes?: deltaLearnsets,
}

export const deltaLearnsetTable: {[k: string]: deltaLearnsetData} = {
	omegamon: {
		adds: {},
		deletes: {},
	},
};
