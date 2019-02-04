import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { textColorSecondary, textColorActive, iconSizeLarge } from '../../api/constants';

export default function ToggleIconButton(props) {
	return (
		<TouchableOpacity onPress={() => props.onToggle && props.onToggle(!props.active)}>
			<Icon
				name={props.icon}
				size={props.size || iconSizeLarge}
				color={
					props.active
						? (props.activeColor || textColorActive)
						: (props.inactiveColor || textColorSecondary)}
			/>
		</TouchableOpacity>
	);
}
ToggleIconButton.propTypes = {
	onToggle: PropTypes.func,
	active: PropTypes.bool,
	icon: PropTypes.string,
	size: PropTypes.number,
	activeColor: PropTypes.string,
	inactiveColor: PropTypes.string
};
