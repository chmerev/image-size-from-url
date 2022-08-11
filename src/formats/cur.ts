const TYPE_CURSOR = 2;

export function isCUR (buffer: Buffer): boolean {
	if (buffer.readUInt16LE(0) !== 0) {
		return false;
	}

	const type = buffer.readUInt16LE(2);

	return type === TYPE_CURSOR;
}