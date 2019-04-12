import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { lightTheme, iconSizeLarge } from '../../api/constants';
import buttonStyles from '../../styles/buttons';

export default function ToggleIconButton(props) {
	return (
		<Button
			buttonStyle={buttonStyles.icon.buttonStyle}
			containerStyle={buttonStyles.icon.containerStyle}
			type='clear'
			icon={
				<Icon
					name={props.icon}
					size={props.size || iconSizeLarge}
					color={
						props.active
							? (props.activeColor || lightTheme.textColor)
							: (props.inactiveColor || lightTheme.textColorSecondary)}
				/>
			}
			onPress={() => props.onToggle && props.onToggle(!props.active)}
		/>
	);
}
ToggleIconButton.propTypes = {
	icon: PropTypes.string.isRequired,
	onToggle: PropTypes.func,
	active: PropTypes.bool,
	size: PropTypes.number,
	activeColor: PropTypes.string,
	inactiveColor: PropTypes.string
};
