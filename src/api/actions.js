import { getPref, setPref } from './user-prefs';
import beasts from '../data/beasts.json';
import { toDict } from './util';

export const initialState = {
	isLoading: true,
	darkMode: false,
	level: 0,
	isMoon: false,
	favs: {},
	homebrew: [],
	beasts
};

export const actions = (update, states) => {
	const privateActions = {
		cleanupFavs: favs => Object.entries(favs)
			.filter(([_, value]) => value)
			.reduce(toDict(([key]) => key, () => true), {})
	};
	const actions = {
		loadPrefs: () => Promise.all([
			getPref('level', 0),
			getPref('isMoon', false),
			getPref('favs', {}),
			getPref('homebrew', [])
		]).then(
			([level, isMoon, favs, homebrew]) => update({ level, isMoon, favs, homebrew, isLoading: false })
		),
		setDarkMode: darkMode => update({ darkMode }),
		toggleFav: name => {
			const favs = states().favs;
			favs[name] = !favs[name];
			update({ favs });
			setPref('favs', favs);
		},
		addHomebrew: beast => {
			const homebrew = [...states().homebrew, beast];
			update({ homebrew });
			setPref('homebrew', homebrew);
		},
		editHomebrew: (name, beast) => {
			const homebrew = [...states().homebrew.filter(h => h.name !== name), beast];
			let favs = states().favs;
			if (name !== beast.name) {
				favs[beast.name] = favs[name];
				favs[name] = false;
				favs = privateActions.cleanupFavs(favs);
				setPref('favs', favs);
			}
			update({ homebrew, favs });
			setPref('homebrew', homebrew);
		},
		deleteHomebrew: name => {
			const homebrew = states().homebrew.filter(h => h.name !== name);
			let favs = states().favs;
			favs[name] = false;
			favs = privateActions.cleanupFavs(favs);
			update({ homebrew, favs });
			setPref('homebrew', homebrew);
			setPref('favs', favs);
		},
		getAllBeasts: () => [...states().beasts, ...states().homebrew],
		getFavorites: () => Object.entries(states().favs)
			.filter(([_, isFav]) => isFav)
			.map(([key]) => actions.getAllBeasts().find(b => b.name === key))
			.filter(b => b)
	};
	return actions;
};
