import { AsyncStorage } from 'react-native';

const CURRENT_VERSION = 2;

export const initialPrefs = {
	darkMode: false,
	characters: [{ key: 0, name: 'Default', level: 0, isMoon: false, favs: {} }],
	selectedCharacter: 0,
	homebrew: []
};

export const getPref = async(key, def) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value == null || value === '') return def;
		return JSON.parse(value);
	} catch (error) {
		console.log(error.message);
	}
	return def;
};

export const setPref = async(key, value) => {
	try {
		if (value == null) value = '';
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.log(error.message);
	}
};

export const removePref = async key => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.log(error.message);
	}
};

const getLegacyPrefs = () => Promise.all([
	getPref('darkMode', false),
	getPref('level', 0),
	getPref('isMoon', false),
	getPref('favs', {}),
	getPref('homebrew', [])
]).then(
	([darkMode, level, isMoon, favs, homebrew]) => ({
		darkMode,
		level,
		isMoon,
		favs,
		homebrew
	})
);

export const loadPrefs = async() => {
	let [version, prefs] = await Promise.all([getPref('version', 1), getPref('prefs', initialPrefs)]);
	for (let v = version; v < CURRENT_VERSION; v++) {
		if (v === 1) {
			const { level, isMoon, favs, ...otherPrefs } = await getLegacyPrefs();
			prefs = {
				...prefs,
				characters: [{ key: 0, name: 'Default', level, isMoon, favs }],
				...otherPrefs
			};
            ['darkMode', 'level', 'isMoon', 'favs', 'homebrew'].forEach(pref => removePref(pref))
		}
	}
	if (version !== CURRENT_VERSION) {
        setPref('version', CURRENT_VERSION);
        setPref('prefs', prefs)
    }
	return prefs;
};
