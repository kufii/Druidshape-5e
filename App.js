import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import flyd from 'flyd';
import Root from './src/navigators/root';
import LoadingScreen from './src/components/shared/loading-screen';

import { initialState, actions as actionsBuilder } from './src/api/actions';

const AppContainer = createAppContainer(Root);

const update = flyd.stream();
const states = flyd.scan((model, patch) => Object.assign(model, patch), initialState, update);
const actions = actionsBuilder(update, states);

export default class App extends React.Component {
	state = states();

	componentDidMount() {
		states.map(state => this.setState(state));
		actions.loadPrefs();
	}

	render() {
		const state = this.state;
		StatusBar.setBarStyle('light-content');
		return state.isLoading ? <LoadingScreen /> : <AppContainer screenProps={{ state, actions }} />;
	}
}
