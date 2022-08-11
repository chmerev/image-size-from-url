const TYPE_ICON = 1;
const SIZE_HEADER = 2 + 2 + 2; // 6
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4; // 16

export function isICO (buffer: Buffer): boolean {
	if (buffer.readUInt16LE(0) !== 0) {
		return false;
	}
	const type = buffer.readUInt16LE(2);
	return type === TYPE_ICON;
}

function getSizeFromOffset(buffer: Buffer, offset: number): number {
	const value = buffer.readUInt8(offset);
	return value === 0 ? 256 : value;
}

function getImageSize(buffer: Buffer, imageIndex: number): { width: number; height: number } {
	const offset = SIZE_HEADER + (imageIndex * SIZE_IMAGE_ENTRY);
	return {
		width: getSizeFromOffset(buffer, offset),
		height: getSizeFromOffset(buffer, offset + 1)
	};
}

export function calculateICOorCUR (buffer: Buffer): {images: { width: number; height: number }[]} {
	const nbImages = buffer.readUInt16LE(4)
	const result = {images: [getImageSize(buffer, 0)]}

	if (nbImages === 1) {
		return result
	}
  
	for (let i = 1; i < nbImages; i += 1) {
		result.images.push(getImageSize(buffer, i));
	}
  
	return result;
}