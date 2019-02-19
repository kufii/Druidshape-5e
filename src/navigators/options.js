import { Platform } from 'react-native';
import { fromRight } from 'react-navigation-transitions';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default {
	transitionConfig: Platform.OS === 'android' ? () => fromRight() : null,
	defaultNavigationOptions: ({ screenProps }) => {
		const { actions } = screenProps;
		const theme = actions.getCurrentTheme();
		return {
			headerStyle: {
				backgroundColor: theme.headerColor,
				elevation: 0,
				borderBottomWidth: 0,
				...(isIphoneX() ? { height: 44 } : {})
			},
			headerTintColor: theme.headerTextColor,
			gesturesEnabled: true
		};
	}
};
