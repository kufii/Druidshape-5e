import React from 'react';
import PropTypes from 'prop-types';
import { lightTheme, iconSizeLarge } from '../../api/constants';
import IconButton from './icon-button';

export default function ToggleIconButton({
	icon,
	activeIcon,
	inactiveIcon,
	size,
	activeColor,
	inactiveColor,
	onToggle,
	active
}) {
	return (
		<IconButton
			icon={active ? activeIcon || icon : inactiveIcon || icon}
			size={size || iconSizeLarge}
			color={
				active
					? activeColor || lightTheme.textColor
					: inactiveColor || lightTheme.textColorSecondary
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
