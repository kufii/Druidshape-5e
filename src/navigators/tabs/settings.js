import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../../components/screens/settings';
import config from '../options';

export default createStackNavigator({
	Favorites: {
		screen: SettingsScreen
	}
}, config);
