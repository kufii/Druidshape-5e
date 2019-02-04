import { createStackNavigator } from 'react-navigation';
import BeastsScreen from '../../components/screens/beasts';
import DetailsScreen from '../../components/screens/details';

import { defaultNavigationOptions } from '../../styles/navigation';

export default createStackNavigator({
	Beasts: {
		screen: BeastsScreen
	},
	Details: {
		screen: DetailsScreen
	}
}, { defaultNavigationOptions });
