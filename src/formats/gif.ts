const gifRegexp = /^GIF8[79]a/;

export function isGIF (buffer: Buffer): boolean {
	const signature = buffer.toString('ascii', 0, 6);
	return (gifRegexp.test(signature));
}

export function calculateGIF(buffer: Buffer): { width: number; height: number } {
	return {
		width: buffer.readUInt16LE(6),
		height: buffer.readUInt16LE(8)
	};
}