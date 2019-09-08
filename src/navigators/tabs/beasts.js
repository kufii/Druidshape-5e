import { createStackNavigator } from 'react-navigation';
import BeastListScreen from '../../components/screens/beasts/list';
import BeastDetailsScreen from '../../components/screens/beasts/details';
import config from '../options';

export default createStackNavigator(
	{
		BeastsList: {
			screen: BeastListScreen
		},
		BeastDetails: {
			screen: BeastDetailsScreen
		}
	},
	config
);
