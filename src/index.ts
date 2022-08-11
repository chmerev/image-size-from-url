import axios from 'axios';
import {Buffer} from 'buffer';
import { imageFormats } from './formats/main';

const getImageSize = async (url: string): Promise<{width: number, height: number}> => {
	try {
		const {data} = await axios.get(url, { responseType: 'arraybuffer' });
		const buffer = Buffer.from(data);
		const format = determineImageFormat(buffer);
		const calculate = imageFormats[format].calculate(buffer);
		return calculate;
	} catch (e) {
		throw new Error(e)
	}
}

function determineImageFormat(buffer: Buffer): string {
	for (const type in imageFormats) {
		const result = imageFormats[type].is(buffer);
		if (result) {
			return type;
		}
	}

	throw new Error('Unsupported image format');
}

export default getImageSize;