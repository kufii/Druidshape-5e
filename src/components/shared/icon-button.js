import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import buttonStyles from '../../styles/buttons';

export default function IconButton({ icon, size, color, ...props }) {
	return (
		<Button
			buttonStyle={buttonStyles.icon.buttonStyle}
			containerStyle={buttonStyles.icon.containerStyle}
			type='clear'
			icon={
				<Icon
					name={icon}
					size={size}
					color={color}
				/>
			}
			{...props}
		/>
	);
}
IconButton.propTypes = {
	icon: PropTypes.string,
	size: PropTypes.number,
	color: PropTypes.string
};
