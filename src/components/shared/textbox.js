import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { textColorSecondary, primaryColorDark, fontSizeLarge } from '../../api/constants.js';

export default function TextBox(props) {
	return (
		<View style={styles.container}>
			{props.icon ? (
				<Icon name={props.icon} color={textColorSecondary} size={fontSizeLarge} />
			) : null}
			<TextInput
				style={styles.input}
				placeholder='Filter Beasts'
				placeholderTextColor={textColorSecondary}
				onChangeText={text => props.onChange(text)}
				value={props.text}
			/>
			{props.text ? (
				<TouchableOpacity onPress={() => props.onChange('')}>
					<Icon name='ios-close-circle' color={textColorSecondary} size={fontSizeLarge} />
				</TouchableOpacity>
			) : null}
		</View>
	);
}
TextBox.propTypes = {
	text: PropTypes.string,
	icon: PropTypes.string,
	onChange: PropTypes.func
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
	input: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		fontSize: fontSizeLarge
	}
});
