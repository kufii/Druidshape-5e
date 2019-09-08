import { createStackNavigator } from 'react-navigation';
import HomebrewDetailsScreen from '../../components/screens/homebrew/details';
import config from '../options';

export default createStackNavigator(
	{
		HomebrewDetails: {
			screen: HomebrewDetailsScreen
		}
	},
	config
);
