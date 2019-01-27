import allBeasts from '../data/beasts.json';

const getModifier = num => Math.floor((num - 10) / 2);

const crToNum = cr => cr.toString().includes('/') ? 1 / parseInt(cr.split('/')[1]) : parseInt(cr);

const getBeasts = (level=0, circleOfTheMoon=false) => {
	if (level <= 0) return allBeasts.slice();
	if (level === 1) return [];

	const maxCr = circleOfTheMoon
		? (level < 6 ? 1 : Math.floor(level / 3))
		: (level < 4
			? (1 / 4)
			: (level < 8 ? (1 / 2) : 1));
	const canSwim = level >= 4;
	const canFly = level >= 8;

	let beasts = allBeasts.filter(({ cr }) => crToNum(cr) <= maxCr);
	if (!canSwim) beasts = beasts.filter(b => !b.swim);
	if (!canFly) beasts = beasts.filter(b => !b.fly);

	return beasts;
};

const getBeast = name => allBeasts.find(b => b.name === name);

export { getModifier, crToNum, getBeasts, getBeast };
