import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { setExpoStatusBarHeight } from 'react-navigation-collapsible';
import { Constants } from 'expo';
import Tabs from './src/navigators/tabs';

setExpoStatusBarHeight(Constants.statusBarHeight);
const AppContainer = createAppContainer(Tabs);

export default function Tab() {
	StatusBar.setBarStyle('light-content');
	return <AppContainer />;
}
