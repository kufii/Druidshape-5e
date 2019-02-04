import { createStackNavigator } from 'react-navigation';
import HomebrewScreen from '../../components/screens/homebrew';
import config from '../../styles/navigation';

export default createStackNavigator({
	Homebrew: {
		screen: HomebrewScreen
	}
}, config);
