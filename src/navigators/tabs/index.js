/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Beasts from './beasts';
import Homebrew from './homebrew';
import Settings from './settings';

export default createBottomTabNavigator({
	Beasts: {
		screen: Beasts,
		tabBarIcon: ({ tintColor }) => <Icon name='ios-star' size={17} color={tintColor} />
	},
	Homebrew: {
		screen: Homebrew,
		tabBarIcon: ({ tintColor }) => <Icon name='ios-star' size={17} color={tintColor} />
	},
	Settings: {
		screen: Settings,
		tabBarIcon: ({ tintColor }) => <Icon name='ios-star' size={17} color={tintColor} />
	}
}, {
	tabBarOptions: {
		showIcon: true
	}
});
