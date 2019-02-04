import { createStackNavigator } from 'react-navigation';
import HomebrewScreen from '../../components/screens/homebrew';

import { defaultNavigationOptions } from '../../styles/navigation';

export default createStackNavigator({
	Homebrew: {
		screen: HomebrewScreen
	}
}, { defaultNavigationOptions });
