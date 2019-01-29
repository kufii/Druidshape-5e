import { createStackNavigator } from 'react-navigation';
import BeastsScreen from '../../components/screens/beasts';
import DetailsScreen from '../../components/screens/details';

export default createStackNavigator({
	Beasts: {
		screen: BeastsScreen
	},
	Details: {
		screen: DetailsScreen
	}
});
