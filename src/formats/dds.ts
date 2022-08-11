export function isDDS(buffer: Buffer): boolean {
	return buffer.readUInt32LE(0) === 0x20534444;
}

export function calculateDDS(buffer: Buffer): { width: number; height: number } {
	return {
		height: buffer.readUInt32LE(12),
		width: buffer.readUInt32LE(16)
	};
}