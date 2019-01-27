import { AsyncStorage } from 'react-native';

const getPref = async(key, def) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value == null || value === '') return def;
		return value;
	} catch (error) {
		console.log(error.message);
	}
	return def;
};

const setPref = async(key, value) => {
	try {
		console.log(key, value);
		if (value == null) value = '';
		await AsyncStorage.setItem(key, value.toString());
	} catch (error) {
		console.log(error.message);
	}
};

export { getPref, setPref };
