export function isBMP (buffer: Buffer): boolean {
	return ('BM' === buffer.toString('ascii', 0, 2));
}

export function calculateBMP (buffer: Buffer): { width: number; height: number } {
	return {
		width: buffer.readUInt32LE(18),
		height: Math.abs(buffer.readInt32LE(22))
	};
}