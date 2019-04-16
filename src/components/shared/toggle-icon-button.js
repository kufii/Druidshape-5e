import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { lightTheme, iconSizeLarge } from '../../api/constants';
import buttonStyles from '../../styles/buttons';

export default function ToggleIconButton({ icon, activeIcon, inactiveIcon, size, activeColor, inactiveColor, onToggle, active }) {
	return (
		<Button
			buttonStyle={buttonStyles.icon.buttonStyle}
			containerStyle={buttonStyles.icon.containerStyle}
			type='clear'
			icon={
				<Icon
					name={active ? (activeIcon || icon) : (inactiveIcon || icon)}
					size={size || iconSizeLarge}
					color={
						active
							? (activeColor || lightTheme.textColor)
							: (inactiveColor || lightTheme.textColorSecondary)}
				/>
			}
			onPress={() => onToggle && onToggle(!active)}
		/>
	);
}
ToggleIconButton.propTypes = {
	icon: PropTypes.string,
	activeIcon: PropTypes.string,
	inactiveIcon: PropTypes.string,
	onToggle: PropTypes.func,
	active: PropTypes.bool,
	size: PropTypes.number,
	activeColor: PropTypes.string,
	inactiveColor: PropTypes.string
};
