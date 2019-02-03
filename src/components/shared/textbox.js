import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Keyboard, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { textColorSecondary, textColorActive, primaryColorDark, fontSizeLarge } from '../../api/constants.js';

export default class TextBox extends React.Component {
	state = {
		isFocused: false
	};

	static propTypes = {
		icon: PropTypes.string,
		showCancelButton: PropTypes.bool,
		clearButtonMode: PropTypes.string,
		value: PropTypes.string,
		onChangeText: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func
	};

	clear() {
		this.input.clear();
		this.props.onChangeText && this.props.onChangeText('');
	}

	render() {
		const clearButtonMode = this.props.clearButtonMode || 'never';

		return (
			<View style={styles.container}>
				<View style={styles.textContainer}>
					{this.props.icon ? (
						<Icon name={this.props.icon} color={textColorSecondary} size={fontSizeLarge} style={styles.iconLeft} />
					) : null}
					<TextInput
						{...this.props}
						ref={input => this.input = input}
						style={styles.input}
						placeholderTextColor={textColorSecondary}
						onFocus={() => {
							this.props.onFocus && this.props.onFocus();
							this.setState({ isFocused: true });
						}}
						onBlur={() => {
							this.props.onBlur && this.props.onBlur();
							this.setState({ isFocused: false });
						}}
					/>
					{Platform.OS === 'android'
						&& this.props.value
						&& (clearButtonMode === 'always'
							|| (clearButtonMode === 'while-editing' && this.state.isFocused)
							|| (clearButtonMode === 'unless-editing' && !this.state.isFocused))? (
							<TouchableOpacity onPress={() => this.clear()}>
								<Icon name='md-close-circle' color={textColorSecondary} size={fontSizeLarge} style={styles.iconRight} />
							</TouchableOpacity>
						) : null}
				</View>
				{this.props.showCancelButton && (this.props.value || this.state.isFocused) ? (
					<TouchableOpacity
						onPress={() => {
							Keyboard.dismiss();
							this.clear();
						}}
					>
						<Text style={styles.cancelButton}>Cancel</Text>
					</TouchableOpacity>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: primaryColorDark,
		alignItems: 'center',
		padding: 10,
		borderRadius: 10
	},
	iconLeft: {
		marginRight: 10
	},
	iconRight: {
		marginLeft: 10
	},
	input: {
		flex: 1,
		width: '100%',
		fontSize: fontSizeLarge
	},
	cancelButton: {
		fontSize: fontSizeLarge,
		color: textColorActive,
		marginLeft: 10,
		marginRight: 10
	}
});
