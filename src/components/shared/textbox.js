import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { textColorSecondary, primaryColorDark, fontSizeLarge } from '../../api/constants.js';

export default function TextBox(props) {
	return (
		<View style={styles.container}>
			{props.icon ? (
				<Icon name={props.icon} color={textColorSecondary} size={fontSizeLarge} style={styles.icon} />
			) : null}
			<TextInput
				{...props}
				style={styles.input}
				placeholderTextColor={textColorSecondary}
			/>
		</View>
	);
}
TextBox.propTypes = {
	icon: PropTypes.string
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
	icon: {
		marginRight: 10
	},
	input: {
		flex: 1,
		fontSize: fontSizeLarge
	}
});
