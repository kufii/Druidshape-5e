import React from 'react';
import RootStack from './src/navigators/tabs';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(RootStack);

export default function Tab() {
	return <AppContainer />;
}
