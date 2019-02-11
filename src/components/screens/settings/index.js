import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import listStyles from '../../../styles/list';
import { contentBackgroundColorDark } from '../../../api/constants';

export default class SettingsScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.object
	};

	static navigationOptions = {
		title: 'Settings'
	};

	render() {
		const { state, actions } = this.props.screenProps;

		return (
			<ScrollView ref={list => this.list = list} contentContainerStyle={styles.container}>
				<ListItem
					title='Dark Mode'
					containerStyle={listStyles.item}
					titleStyle={listStyles.itemText}
					switch={{
						value: state.darkMode,
						onValueChange: value => actions.setDarkMode(value)
					}}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: contentBackgroundColorDark
	}
});
