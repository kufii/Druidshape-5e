import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../components/screens/home/index';
import DetailsScreen from '../components/screens/details/index';

export default createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Details: {
			screen: DetailsScreen
		}
	},
	{
		initialRouteName: 'Home'
	}
);
