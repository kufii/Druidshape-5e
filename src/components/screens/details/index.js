import React from 'react';
import { Text } from 'react-native';

export default class DetailsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('beast')
	});

	render() {
		return (
			<Text>test</Text>
		);
	}
}
