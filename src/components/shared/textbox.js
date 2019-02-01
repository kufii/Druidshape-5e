import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { textColorSecondary, primaryColorDark, fontSizeLarge } from '../../api/constants.js';

export default function TextBox(props) {
	return (
		<View style={styles.container}>
			{props.icon ? (
				<Icon name={props.icon} color={textColorSecondary} size={fontSizeLarge} style={styles.iconLeft} />
			) : null}
			<TextInput
				{...props}
				style={styles.input}
				placeholderTextColor={textColorSecondary}
			/>
			{Platform.OS === 'android' && props.value && (props.clearButtonMode || 'never') !== 'never' ? (
				<TouchableOpacity onPress={props.onChangeText && (() => props.onChangeText(''))}>
					<Icon name='md-close-circle' color={textColorSecondary} size={fontSizeLarge} style={styles.iconRight} />
				</TouchableOpacity>
			) : null}
		</View>
	);
}
TextBox.propTypes = {
	icon: PropTypes.string,
	clearButtonMode: PropTypes.string,
	value: PropTypes.string,
	onChangeText: PropTypes.func
};

const styles = StyleSheet.create({
	container: {
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
	}
});
