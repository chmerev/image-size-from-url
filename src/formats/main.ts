import { calculateBMP, isBMP } from './bmp';
import { isCUR } from './cur';
import { calculateDDS, isDDS } from './dds';
import { calculateGIF, isGIF } from './gif';
import { calculateICOorCUR, isICO } from './ico';
import { calculateJPG, isJPG } from './jpg';
import { calculatePNG, isPNG } from './png';
import { calculatePSD, isPSD } from './psd';
import { calculateSVG, isSVG } from './svg';
import { calculateWEBP, isWebP } from './webp';

export const imageFormats = {
	bmp: {
		is: isBMP,
		calculate: calculateBMP
	},
	cur: {
		is: isCUR,
		calculate: calculateICOorCUR
	},
	dds: {
		is: isDDS,
		calculate: calculateDDS
	},
	gif: {
		is: isGIF,
		calculate: calculateGIF
	},
	ico: {
		is: isICO,
		calculate: calculateICOorCUR
	},
	jpg: {
		is: isJPG,
		calculate: calculateJPG
	},
	png: {
		is: isPNG,
		calculate: calculatePNG
	},
	psd: {
		is: isPSD,
		calculate: calculatePSD
	},
	svg: {
		is: isSVG,
		calculate: calculateSVG
	},
	webp: {
		is: isWebP,
		calculate: calculateWEBP
	}
}