import React from 'react';
import { UIManager, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { createAppContainer } from 'react-navigation';
import flyd from 'flyd';
import Root from './src/navigators/root';
import LoadingScreen from './src/components/shared/loading-screen';

import { initialState, actions as actionsBuilder } from './src/api/actions';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

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
		if (Platform.OS === 'android') {
			const theme = actions.getCurrentTheme();
			StatusBar.setBackgroundColor(theme.headerColorDark);
		}
		return (
			<MenuProvider>
				<View style={styles.container}>
					{state.isLoading ? <LoadingScreen /> : <AppContainer screenProps={{ state, actions }} />}
				</View>
			</MenuProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
