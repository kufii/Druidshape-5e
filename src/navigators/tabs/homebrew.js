import { createStackNavigator } from 'react-navigation';
import HomebrewListScreen from '../../components/screens/homebrew/list';
import config from '../options';

export default createStackNavigator({
	HomebrewList: {
		screen: HomebrewListScreen
	}
}, config);
