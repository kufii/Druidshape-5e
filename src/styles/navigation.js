import { Platform } from 'react-native';
import { headerColor, headerTextColor } from '../api/constants';
import slideFromRightTransition from 'react-navigation-slide-from-right-transition';

export default {
	transitionConfig: Platform.OS === 'android' ? slideFromRightTransition : null,
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: headerColor,
			elevation: 0,
			borderBottomWidth: 0
		},
		headerTintColor: headerTextColor,
		gesturesEnabled: true
	}
};
