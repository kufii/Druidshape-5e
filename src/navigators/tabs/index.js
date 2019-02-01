import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSizeTabs } from '../../api/constants';
import { icon } from '../../api/util';
import Beasts from './beasts';
import Homebrew from './homebrew';
import Settings from './settings';

const TabIcon = ({ icon: i, tintColor }) => <Icon name={icon(i)} size={iconSizeTabs} color={tintColor} />;
TabIcon.propTypes = {
	icon: PropTypes.string,
	tintColor: PropTypes.string
};

export default createBottomTabNavigator({
	Beasts: {
		screen: Beasts,
		navigationOptions: {
			tabBarIcon: function BeastsIcon(props) {
				return <TabIcon {...props} icon='paw' />;
			}
		}
	},
	Homebrew: {
		screen: Homebrew,
		navigationOptions: {
			tabBarIcon: function HomebrewIcon(props) {
				return <TabIcon {...props} icon='construct' />;
			}
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabBarIcon: function SettingsIcon(props) {
				return <TabIcon {...props} icon='settings' />;
			}
		}
	}
}, {
	tabBarOptions: {
		showIcon: true
	}
});
