import { createStackNavigator } from 'react-navigation';
import HomebrewScreen from '../../components/screens/homebrew';

export default createStackNavigator({
	Homebrew: {
		screen: HomebrewScreen
	}
});
