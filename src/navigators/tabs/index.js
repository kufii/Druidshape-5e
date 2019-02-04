import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSizeLarge, headerColor } from '../../api/constants';
import { icon } from '../../api/util';
import Beasts from './beasts';
import Homebrew from './homebrew';
import Settings from './settings';

const createTabIcon = name => {
	const TabIcon = ({ tintColor }) => <Icon name={icon(name)} size={iconSizeLarge} color={tintColor} />;
	TabIcon.propTypes = { tintColor: PropTypes.string };
	return TabIcon;
};

export default createBottomTabNavigator({
	Beasts: {
		screen: Beasts,
		navigationOptions: {
			tabBarIcon: createTabIcon('paw')
		}
	},
	Homebrew: {
		screen: Homebrew,
		navigationOptions: {
			tabBarIcon: createTabIcon('construct')
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabBarIcon: createTabIcon('settings')
		}
	}
}, {
	tabBarOptions: {
		showIcon: true,
		activeTintColor: headerColor
	}
});
