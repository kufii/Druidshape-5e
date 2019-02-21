import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../../components/screens/settings';
import TipJarScreen from '../../components/screens/settings/tipjar';
import config from '../options';

export default createStackNavigator({
	Favorites: {
		screen: SettingsScreen
	},
	TipJar: {
		screen: TipJarScreen
	}
}, config);
