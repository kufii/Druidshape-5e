import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSizeLarge } from '../../api/constants';
import { icon } from '../../api/util';
import Beasts from './beasts';
import Homebrew from './homebrew';
import Settings from './settings';

const createTabIcon = name => {
	const TabIcon = ({ tintColor }) => <Icon name={icon(name)} size={iconSizeLarge} color={tintColor} />;
	TabIcon.propTypes = { tintColor: PropTypes.string };
	return TabIcon;
};

const tabBarOnPress = ({ navigation, defaultHandler }) => {
	const { isFocused, state } = navigation;
	const { index, routes } = state;

	if (isFocused() && index === 0) {
		const stackNavigation = routes[0];
		if (stackNavigation && stackNavigation.params && stackNavigation.params.scrollToTop) {
			stackNavigation.params.scrollToTop();
		}
	} else {
		defaultHandler(navigation);
	}
};

const TabBarComponent = props => {
	const { actions } = props.screenProps;
	const theme = actions.getCurrentTheme();
	return <BottomTabBar
		activeTintColor={theme.tabBarActiveTintColor}
		inactiveTintColor={theme.tabBarInactiveTintColor}
		style={{
			backgroundColor: theme.tabBarColor,
			borderTopColor: theme.dividerColor
		}}
		{...props}
	       />;
};
TabBarComponent.propTypes = { screenProps: PropTypes.object };

export default createBottomTabNavigator({
	Beasts: {
		screen: Beasts,
		navigationOptions: {
			tabBarIcon: createTabIcon('paw'),
			tabBarOnPress
		}
	},
	Homebrew: {
		screen: Homebrew,
		navigationOptions: {
			tabBarIcon: createTabIcon('construct'),
			tabBarOnPress
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabBarIcon: createTabIcon('settings'),
			tabBarOnPress
		}
	}
}, {
	tabBarComponent: TabBarComponent
});
