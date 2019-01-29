import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../../components/screens/settings';

export default createStackNavigator({
	Favorites: {
		screen: SettingsScreen
	}
});
