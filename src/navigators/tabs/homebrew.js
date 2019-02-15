import { createStackNavigator } from 'react-navigation';
import HomebrewListScreen from '../../components/screens/homebrew/list';
import config from '../../styles/navigation';

export default createStackNavigator({
	HomebrewList: {
		screen: HomebrewListScreen
	}
}, config);
