export function range(endExclusive: number): number[];
export function range(startInclusive: number, endExclusive: number, step: number): number[];
export function range(startOrEnd: number, maybeEnd?: number, step = 1): number[] {
	const start = maybeEnd === undefined ? 0 : startOrEnd;
	const end = maybeEnd ?? startOrEnd;
	return Array((end - start) / step).fill(start).map((s, i) => s + i * step);
}

export function arrayChunk<T>(array: T[], chunkSize: number): T[][] {
	if (chunkSize === 0)
		return [];
	return range(Math.ceil(array.length / chunkSize)).map(i => array.slice(i * chunkSize, (i + 1) * chunkSize));
}
