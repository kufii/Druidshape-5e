import { Platform } from 'react-native';
import slideFromRightTransition from 'react-navigation-slide-from-right-transition';

export default {
	transitionConfig: Platform.OS === 'android' ? slideFromRightTransition : null,
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
