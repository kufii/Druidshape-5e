import { createStackNavigator } from 'react-navigation';
import HomebrewDetailsScreen from '../../components/screens/homebrew/details';
import config from '../../styles/navigation';

export default createStackNavigator({
	HomebrewDetails: {
		screen: HomebrewDetailsScreen
	}
}, config);
