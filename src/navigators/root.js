import { createStackNavigator } from 'react-navigation';
import Tabs from './tabs';
import HomebrewAdd from './outer/homebrew-add';

export default createStackNavigator({ Tabs, HomebrewAdd }, {
	mode: 'modal',
	headerMode: 'none',
	gesturesEnabled: false
});
