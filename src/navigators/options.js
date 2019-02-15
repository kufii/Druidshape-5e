import { Platform } from 'react-native';
import { fromRight } from 'react-navigation-transitions';

export default {
	transitionConfig: Platform.OS === 'android' ? () => fromRight() : null,
	defaultNavigationOptions: ({ screenProps }) => {
		const { actions } = screenProps;
		const theme = actions.getCurrentTheme();
		return {
			headerStyle: {
				backgroundColor: theme.headerColor,
				elevation: 0,
				borderBottomWidth: 0
			},
			headerTintColor: theme.headerTextColor,
			gesturesEnabled: true
		};
	}
};
