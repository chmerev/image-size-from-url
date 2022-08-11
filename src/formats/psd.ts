export function isPSD (buffer: Buffer): boolean {
	return ('8BPS' === buffer.toString('ascii', 0, 4));
}

export function calculatePSD (buffer: Buffer): { width: number; height: number } {
	return {
		width: buffer.readUInt32BE(18),
		height: buffer.readUInt32BE(14)
	};
}