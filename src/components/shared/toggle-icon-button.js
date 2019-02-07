import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { textColorSecondary, textColor, iconSizeLarge } from '../../api/constants';

export default function ToggleIconButton(props) {
	return (
		<Button
			buttonStyle={styles.button}
			type='clear'
			icon={
				<Icon
					name={props.icon}
					size={props.size || iconSizeLarge}
					color={
						props.active
							? (props.activeColor || textColor)
							: (props.inactiveColor || textColorSecondary)}
				/>
			}
			onPress={() => props.onToggle && props.onToggle(!props.active)}
		/>
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

const styles = StyleSheet.create({
	button: { padding: 0 }
});
