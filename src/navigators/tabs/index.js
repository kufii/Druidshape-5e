/* eslint-disable react/prop-types, react/display-name */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSizeTabs } from '../../api/constants';
import Beasts from './beasts';
import Homebrew from './homebrew';
import Settings from './settings';

export default createBottomTabNavigator({
	Beasts: {
		screen: Beasts,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <Icon name='ios-paw' size={iconSizeTabs} color={tintColor} />
		}
	},
	Homebrew: {
		screen: Homebrew,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <Icon name='ios-construct' size={iconSizeTabs} color={tintColor} />
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => <Icon name='ios-settings' size={iconSizeTabs} color={tintColor} />
		}
	}
}, {
	tabBarOptions: {
		showIcon: true
	}
});
