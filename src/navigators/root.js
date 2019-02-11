import { createStackNavigator } from 'react-navigation';
import Tabs from './tabs';
import HomebrewDetails from './outer/homebrew-details';

export default createStackNavigator({ Tabs, HomebrewDetails }, {
	mode: 'modal',
	headerMode: 'none',
	gesturesEnabled: false
});
