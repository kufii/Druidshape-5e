import React from 'react';
import RootStack from './src/navigators/root';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(RootStack);

export default function App() {
	return <AppContainer />;
}
