import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../../components/screens/settings';

import { defaultNavigationOptions } from '../../styles/navigation';

export default createStackNavigator({
	Favorites: {
		screen: SettingsScreen
	}
}, { defaultNavigationOptions });
