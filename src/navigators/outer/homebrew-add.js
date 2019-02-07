import { createStackNavigator } from 'react-navigation';
import HomebrewAddScreen from '../../components/screens/homebrew/add';
import config from '../../styles/navigation';

export default createStackNavigator({
	HomebrewAdd: {
		screen: HomebrewAddScreen
	}
}, config);
