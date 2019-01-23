import { isString } from './types.js';

const distinct = (value, index, self) => self.indexOf(value) === index;

const maxBy = cb => (a, b) => cb(b) > cb(a) ? b : a;

const minBy = cb => (a, b) => cb(b) < cb(a) ? b : a;

const sortBy = (...cbs) => (a, b) => {
	for (let i = 0; i < cbs.length; i++) {
		const cb = cbs[i].desc ? cbs[i].cb : cbs[i];
		const aa = cb(a);
		const bb = cb(b);
		const diff = cbs[i].desc
			? isString(aa) ? bb.localeCompare(aa) : bb - aa
			: isString(aa) ? aa.localeCompare(bb) : aa - bb;
		if (diff !== 0) return diff;
	}
	return 0;
};
const desc = cb => ({ desc: true, cb });

const groupBy = (cbKey, cbValue) => (a, b) => {
	const key = cbKey(b);
	const value = cbValue ? cbValue(b) : b;
	if (!a[key]) a[key] = [];
	a[key].push(value);
	return a;
};

const toDict = (cbKey, cbValue) => (a, b) => {
	const key = cbKey(b);
	const value = cbValue ? cbValue(b) : b;
	a[key] = value;
	return a;
};

const _flatten = arr => arr.reduce((flat, a) => flat.concat(Array.isArray(a) ? _flatten(a) : a), []);
const flatten = (flat, arr) => flat.concat(_flatten(arr));

const nTimes = (cb, n) => {
	for (let i = 0; i < n; i++) {
		cb(i);
	}
};

export { distinct, maxBy, minBy, sortBy, desc, groupBy, toDict, flatten, nTimes };
