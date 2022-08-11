const pngSignature = 'PNG\r\n\x1a\n';
const pngImageHeaderChunkName = 'IHDR';
const pngFriedChunkName = 'CgBI'; 

export function isPNG (buffer: Buffer): boolean {
	if (pngSignature === buffer.toString('ascii', 1, 8)) {
		let chunkName = buffer.toString('ascii', 12, 16);
		if (chunkName === pngFriedChunkName) {
			chunkName = buffer.toString('ascii', 28, 32);
		}
		if (chunkName !== pngImageHeaderChunkName) {
			throw new TypeError('invalid png');
		}
		return true;
	}
}

export function calculatePNG (buffer: Buffer): { width: number; height: number } {
	if (buffer.toString('ascii', 12, 16) === pngFriedChunkName) {
		return {
			width: buffer.readUInt32BE(32),
			height: buffer.readUInt32BE(36)
		};
	}
	return {
		width: buffer.readUInt32BE(16),
		height: buffer.readUInt32BE(20)
	};
}