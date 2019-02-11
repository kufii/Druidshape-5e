import { AsyncStorage } from 'react-native';

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
