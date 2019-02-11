export const getModifier = num => Math.floor((num - 10) / 2);

export const crToNum = cr => cr.toString().includes('/') ? 1 / parseInt(cr.split('/')[1]) : parseInt(cr);

export const filterBeasts = (beasts, level=0, circleOfTheMoon=false, search) => {
	if (level <= 0) return beasts.slice();
	if (level === 1) return [];

	const maxCr = circleOfTheMoon
		? (level < 6 ? 1 : Math.floor(level / 3))
		: (level < 4
			? (1 / 4)
			: (level < 8 ? (1 / 2) : 1));
	const canSwim = level >= 4;
	const canFly = level >= 8;

	let filtered = beasts.slice().filter(({ cr }) => crToNum(cr) <= maxCr);
	if (!canSwim) filtered = filtered.filter(b => !b.swim);
	if (!canFly) filtered = filtered.filter(b => !b.fly);
	if (search) filtered = filtered.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

	return filtered;
};
