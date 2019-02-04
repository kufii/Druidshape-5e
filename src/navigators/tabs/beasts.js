import { createStackNavigator } from 'react-navigation';
import BeastsScreen from '../../components/screens/beasts';
import DetailsScreen from '../../components/screens/details';

import config from '../../styles/navigation';

export default createStackNavigator({
	Beasts: {
		screen: BeastsScreen
	},
	Details: {
		screen: DetailsScreen
	}
}, config);
