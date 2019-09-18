import React from 'react';
import PropTypes from 'prop-types';
import r from 'rnss';
import { lightTheme } from '../../api/constants';
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
			icon={(active ? activeIcon : inactiveIcon) || icon}
			size={size || r.vars().iconSizeLarge}
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
