import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { textColorSecondary, textColor, iconSizeLarge } from '../../api/constants';

export default function ToggleIconButton(props) {
	const button = (
		<Icon
			name={props.icon}
			size={props.size || iconSizeLarge}
			color={
				props.active
					? (props.activeColor || textColor)
					: (props.inactiveColor || textColorSecondary)}
		/>
	);
	const handlePress = () => props.onToggle && props.onToggle(!props.active);
	return props.noFeedback ? (
		<TouchableWithoutFeedback onPress={handlePress}>
			{button}
		</TouchableWithoutFeedback>
	) : (
		<TouchableOpacity onPress={handlePress}>
			{button}
		</TouchableOpacity>
	);
}
ToggleIconButton.propTypes = {
	onToggle: PropTypes.func,
	active: PropTypes.bool,
	icon: PropTypes.string,
	size: PropTypes.number,
	activeColor: PropTypes.string,
	inactiveColor: PropTypes.string,
	noFeedback: PropTypes.bool
};
