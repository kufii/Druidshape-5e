import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'react-native';

export default function PickerAndroid(props) {
	const options = props.options.map(({ value, text }) => (
		<Picker.Item key={value} value={value} label={text} />
	));

	return (
		<Picker
			selectedValue={props.value}
			onValueChange={props.onChange}
			enabled={!props.disabled}
			mode={props.mode}
			prompt={props.prompt}
			itemStyle={props.itemStyle}
			style={props.containerStyle}
		>
			{options}
		</Picker>
	);
}
PickerAndroid.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	disabled: PropTypes.bool,
	mode: PropTypes.string,
	prompt: PropTypes.string,
	itemStyle: PropTypes.object,
	containerStyle: PropTypes.object
};
