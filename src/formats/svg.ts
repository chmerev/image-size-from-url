const svgReg = /<svg[^>]+[^>]*>/;
export function isSVG (buffer: Buffer): boolean {
	return svgReg.test(buffer.toString('utf8'));
}

const extractorRegExps = {
	'root': /<svg\s[^>]+>/,
	'width': /\bwidth=(['"])([^%]+?)\1/,
	'height': /\bheight=(['"])([^%]+?)\1/,
	'viewbox': /\bviewBox=(['"])(.+?)\1/
};

function parseViewbox (viewbox: string): { width: number; height: number } {
	const bounds = viewbox.split(' ');
	return {
		width: parseInt(bounds[2], 10),
		height: parseInt(bounds[3], 10)
	};
}

function parseAttributes (root: string): { width: number; height: number; viewbox: { width: number; height: number;} } {
	const width = root.match(extractorRegExps.width);
	const height = root.match(extractorRegExps.height);
	const viewbox = root.match(extractorRegExps.viewbox);
	return {
		width: width && parseInt(width[2], 10),
		height: height && parseInt(height[2], 10),
		viewbox: viewbox && parseViewbox(viewbox[2])
	};
}

function calculateByDimensions (attrs: {width: number; height: number;}): { width: number; height: number }{
	return {
		width: attrs.width,
		height: attrs.height
	};
}

function calculateByViewbox (attrs: { width: number; height: number; viewbox: { width: number; height: number;} }): { width: number; height: number } {
	const ratio = attrs.viewbox.width / attrs.viewbox.height;
	if (attrs.width) {
		return {
			width: attrs.width,
			height: Math.floor(attrs.width / ratio)
		};
	}
	if (attrs.height) {
		return {
			width: Math.floor(attrs.height * ratio),
			height: attrs.height
		};
	}
	return {
		width: attrs.viewbox.width,
		height: attrs.viewbox.height
	};
}

export function calculateSVG (buffer: Buffer): { width: number; height: number } {
	const root = buffer.toString('utf8').match(extractorRegExps.root);
	if (root) {
		const attrs = parseAttributes(root[0]);
		if (attrs.width && attrs.height) {
			return calculateByDimensions(attrs);
		}
		if (attrs.viewbox) {
			return calculateByViewbox(attrs);
		}
	}
	throw new TypeError('invalid svg');
}