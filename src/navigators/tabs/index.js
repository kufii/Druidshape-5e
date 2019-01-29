import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Beasts from './beasts';
import Favorites from './favorites';
import Settings from './settings';

const BeastsIcon = ({ tintColor }) => <Icon name='ios-star' size={17} color={tintColor} />;
const FavoritesIcon = ({ tintColor }) => <Icon name='ios-star' size={17} color={tintColor} />;
const SettingsIcon = ({ tintColor }) => <Icon name='ios-star' size={17} color={tintColor} />;
BeastsIcon.propTypes = FavoritesIcon.propTypes = SettingsIcon.propTypes = {
	tintColor: PropTypes.string
};

const Tabs = createBottomTabNavigator({
	Beasts: {
		screen: Beasts,
		tabBarIcon: BeastsIcon
	},
	Favorites: {
		screen: Favorites,
		tabBarIcon: FavoritesIcon
	},
	Settings: {
		screen: Settings,
		tabBarIcon: SettingsIcon
	}
}, {
	tabBarOptions: {
		showIcon: true
	}
});
export default createStackNavigator({ Tabs }, { headerMode: 'none' });
