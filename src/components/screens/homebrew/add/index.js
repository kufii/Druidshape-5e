import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Input } from 'react-native-elements';

export default class AddHomebrew extends React.Component {
	state = {
		name: ''
	};

	static navigationOptions = {
		title: 'Add New Beast',
		headerLeft: null
	};

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.field}>
					<Text style={styles.label}>Name</Text>
					<Input
						containerStyle={styles.input}
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
						clearButtonMode='while-editing'
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	field: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	label: {
		marginRight: 10,
		fontWeight: 'bold'
	},
	input: {
		flex: 1
	}
});
