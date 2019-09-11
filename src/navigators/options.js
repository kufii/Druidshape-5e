import { Platform } from 'react-native';
import { fromRight } from 'react-navigation-transitions';
import { isIphoneX } from 'react-native-iphone-x-helper';
import r from 'rnss';

export default {
	transitionConfig: Platform.OS === 'android' ? () => fromRight() : null,
	defaultNavigationOptions: () => {
		return {
			headerStyle: {
				backgroundColor: r.vars().headerColor,
				elevation: 0,
				borderBottomWidth: 0,
				...(isIphoneX() ? { height: 44 } : {})
			},
			headerTintColor: r.vars().headerTextColor,
			gesturesEnabled: true
		};
	}
};
