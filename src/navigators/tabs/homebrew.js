import { createStackNavigator } from 'react-navigation';
import HomebrewScreen from '../../components/screens/homebrew';
import AddHomebrewScreen from '../../components/screens/homebrew/add';
import config from '../../styles/navigation';

export default createStackNavigator({
	Homebrew: {
		screen: HomebrewScreen
	},
	AddHomebrew: {
		screen: AddHomebrewScreen
	}
}, { ...config, transitionConfig: null });
