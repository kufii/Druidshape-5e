import { Platform, LayoutAnimation } from 'react-native';
import { withCollapsible as _withCollapsible } from 'react-navigation-collapsible';
import { isString } from './types';

export const titlecase = str => str.replace(/[a-z0-9]+/gi, word => word.slice(0, 1).toUpperCase() + word.slice(1));

export const distinct = (value, index, self) => self.indexOf(value) === index;

export const maxBy = cb => (a, b) => cb(b) > cb(a) ? b : a;

export const minBy = cb => (a, b) => cb(b) < cb(a) ? b : a;

export const sortBy = (...cbs) => (a, b) => {
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
export const desc = cb => ({ desc: true, cb });

export const groupBy = (cbKey, cbValue) => (a, b) => {
	const key = cbKey(b);
	const value = cbValue ? cbValue(b) : b;
	if (!a[key]) a[key] = [];
	a[key].push(value);
	return a;
};

export const toDict = (cbKey, cbValue) => (a, b) => {
	const key = cbKey(b);
	const value = cbValue ? cbValue(b) : b;
	a[key] = value;
	return a;
};

const _flatten = arr => arr.reduce((flat, a) => flat.concat(Array.isArray(a) ? _flatten(a) : a), []);
export const flatten = (flat, arr) => flat.concat(_flatten(arr));

export const nTimes = (cb, n) => {
	for (let i = 0; i < n; i++) {
		cb(i);
	}
};

export const iterate = function*(iter) {
	for (const x of iter) {
		yield x;
	}
};

export const icon = name => (Platform.OS === 'ios' ? 'ios-' : 'md-') + name;

export const withCollapsible = (main, collapse, height=60) => _withCollapsible(main, {
	collapsibleComponent: collapse,
	collapsibleBackgroundStyle: {
		height,
		disableFadeoutInnerComponent: true
	}
});

export const fabOnScroll = (cbGetFabVisible, cbSetFabVisible, cbGetListHeight, cbGetListContentHeight) => {
	let listViewOffset = 0;
	return event => {
		// Simple fade-in / fade-out animation
		const animProp = { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity };
		const CustomLayoutLinear = {
			duration: 100,
			create: animProp,
			update: animProp,
			delete: animProp
		};
		// Check if the user is scrolling up or down by confronting the new scroll position with your own one
		const limit = cbGetListContentHeight() - cbGetListHeight();
		const offset = event.nativeEvent.contentOffset.y;
		const currentOffset = (offset > limit) ? limit : offset;
		const direction = (currentOffset > 0 && currentOffset >= listViewOffset)
			? 'down'
			: 'up';
		// If the user is scrolling down (and the action-button is still visible) hide it
		const isFabVisible = direction === 'up';
		if (isFabVisible !== cbGetFabVisible()) {
			LayoutAnimation.configureNext(CustomLayoutLinear);
			cbSetFabVisible(isFabVisible);
		}
		// Update your scroll position
		listViewOffset = currentOffset;
	};
};
