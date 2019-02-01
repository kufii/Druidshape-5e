import React from 'react';
import Tabs from './src/navigators/tabs';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(Tabs);

export default function Tab() {
	return <AppContainer />;
}
