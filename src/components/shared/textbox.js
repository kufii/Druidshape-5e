import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Keyboard, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { textboxHeight, textColorSecondary, contentBackgroundColorDark, fontSizeLarge, iconSizeMedium } from '../../api/constants.js';

export default class TextBox extends React.Component {
	state = {
		isFocused: false
	};

	static propTypes = {
		clearButtonMode: PropTypes.string,
		value: PropTypes.string,
		onChangeText: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		icon: PropTypes.string,
		showCancelButton: PropTypes.bool,
		backgroundColor: PropTypes.string,
		textColor: PropTypes.string,
		cancelButtonColor: PropTypes.string,
		placeholderColor: PropTypes.string,
		iconColor: PropTypes.string
	};

	clear() {
		this.input.clear();
		this.props.onChangeText && this.props.onChangeText('');
	}

	render() {
		const { clearButtonMode='never' } = this.props;
		const { icon, showCancelButton, backgroundColor=contentBackgroundColorDark, textColor='#000', cancelButtonColor=textColor, placeholderColor=textColorSecondary, iconColor=textColorSecondary, ...other } = this.props;

		return (
			<View style={styles.container}>
				<View style={[styles.textContainer, { backgroundColor }]}>
					{icon ? (
						<Icon name={icon} color={iconColor} size={iconSizeMedium} style={styles.iconLeft} />
					) : null}
					<TextInput
						{...other}
						ref={input => this.input = input}
						style={[styles.input, { color: textColor }]}
						placeholderTextColor={placeholderColor}
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
							|| (clearButtonMode === 'unless-editing' && !this.state.isFocused)) ? (
							<TouchableOpacity
								onPress={() => {
									this.clear();
									this.input.focus();
								}}
							>
								<Icon name='md-close-circle' color={iconColor} size={iconSizeMedium} style={styles.iconRight} />
							</TouchableOpacity>
						) : null}
				</View>
				{showCancelButton && (this.props.value || this.state.isFocused) ? (
					<TouchableOpacity
						onPress={() => {
							Keyboard.dismiss();
							this.clear();
						}}
					>
						<Text style={[styles.cancelButton, { color: cancelButtonColor }]}>Cancel</Text>
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
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		height: textboxHeight,
		borderRadius: textboxHeight / 2
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
		fontSize: fontSizeLarge,
		textAlignVertical: 'center'
	},
	cancelButton: {
		fontSize: fontSizeLarge,
		marginLeft: 10,
		marginRight: 10
	}
});
