import { createStackNavigator } from 'react-navigation';
import Tabs from './tabs';

export default createStackNavigator({
	Tabs: {
		screen: Tabs
	}
}, { headerMode: 'none' });
