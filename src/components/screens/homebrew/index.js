import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { icon } from '../../../api/util';
import { iconSizeMedium, textColorHeader } from '../../../api/constants';

export default class HomebrewScreen extends React.Component {
	static propTypes = {
		navigation: PropTypes.object
	};

	static navigationOptions = {
		title: 'Homebrew'
	};

	render() {
		return (
			<View style={styles.container}>
				<ActionButton onPress={() => this.props.navigation.navigate('HomebrewAdd')} degrees={0}>
					<Icon name={icon('add')} size={iconSizeMedium} color={textColorHeader} />
				</ActionButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
