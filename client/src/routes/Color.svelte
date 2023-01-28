<script>
	/**
	 * @type {string}
	 */
	export let color;

	let bgColor = getHexBgColor(color) ?? '';
	let textColor = getContrastYIQ(bgColor);

	/**
	 *
	 * @param {string} color
	 */
	function getHexBgColor(color) {
		switch (color) {
			case 'BLACK':
				return '#474544';
			case 'TEAL':
				return '#336B68';
			case 'ORANGE':
				return '#EC6932';
			case 'MINT':
				return '#62BFA7';
			case 'EMERALD':
				return '#46A44D';
			case 'MAGENTA':
				return '#E8108C';
			case 'MUSTARD':
				return '#DBAF4A';
			case 'PURPLE':
				return '#503190';
			case 'BROWN':
				return '#896541';
			case 'WHITE':
				return '#FCFEFF';
			case 'CORAL':
				return '#F1A281';
			case 'COBALT':
				return '#386091';
			default:
				return '#898989';
		}
	}

	/**
	 * @param {string} hexcolor
	 */
	function getContrastYIQ(hexcolor) {
		const r = parseInt(hexcolor.substr(1, 2), 16);
		const g = parseInt(hexcolor.substr(3, 2), 16);
		const b = parseInt(hexcolor.substr(5, 2), 16);
		const yiq = (r * 299 + g * 587 + b * 114) / 1000;
		return yiq >= 128 ? 'black' : 'white';
	}
</script>

<div style="color: {textColor}; background-color: {bgColor}">
	{color}
</div>

<style>
	div {
		position: relative;
		width: 8vmin;
		min-width: 50px;
		height: 8vmin;
		min-height: 50px;
		display: flex;
		place-self: center;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		font-size: max(8px, 1.5vmin);
	}
</style>
