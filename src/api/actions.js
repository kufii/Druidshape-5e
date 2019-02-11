import { getPref, setPref } from './user-prefs';
import beasts from '../data/beasts.json';

export const initialState = {
	isLoading: true,
	level: 0,
	isMoon: false,
	favs: {},
	homebrew: [],
	beasts
};

export const actions = (update, states) => {
	const actions = {
		loadPrefs: () => Promise.all([
			getPref('level', 0),
			getPref('isMoon', false),
			getPref('favs', {}),
			getPref('homebrew', [])
		]).then(
			([level, isMoon, favs, homebrew]) => update({ level, isMoon, favs, homebrew, isLoading: false })
		),
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
			update({ homebrew });
			setPref('homebrew', homebrew);
		},
		deleteHomebrew: name => {
			const homebrew = states().homebrew.filter(h => h.name !== name);
			update({ homebrew });
			setPref('homebrew', homebrew);
		},
		getAllBeasts: () => [...states().beasts, ...states().homebrew],
		getFavorites: () => Object.entries(states().favs)
			.filter(([_, isFav]) => isFav)
			.map(([key]) => actions.getAllBeasts().find(b => b.name === key))
			.filter(b => b)
	};
	return actions;
};
