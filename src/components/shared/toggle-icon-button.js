import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { textColorSecondary, textColorActive } from '../../api/constants.js';

export default function ToggleIconButton(props) {
	return (
		<TouchableOpacity onPress={() => props.onToggle && props.onToggle(!props.active)}>
			<Icon name={props.icon} size={30} style={props.active ? styles.active : styles.inactive} />
		</TouchableOpacity>
	);
}
ToggleIconButton.propTypes = {
	onToggle: PropTypes.func,
	active: PropTypes.bool,
	icon: PropTypes.string
};

const styles = StyleSheet.create({
	inactive: {
		color: textColorSecondary
	},
	active: {
		color: textColorActive
	}
});
