import React from 'react';
import { View, Text } from 'react-native';
import Picker from '../../components/shared/picker';

export default function Select(locals) {
	if (locals.hidden) return null;

	const { stylesheet, onCollapseChange, onChange, value, options, isCollapsed, isDisabled, mode, prompt, itemStyle } = locals;

	let formGroupStyle = stylesheet.formGroup.normal;
	let controlLabelStyle = stylesheet.controlLabel.normal;
	let selectStyle = stylesheet.select.normal;
	let pickerContainer = stylesheet.pickerContainer.normal;
	const pickerContainerOpen = stylesheet.pickerContainer.open;
	let helpBlockStyle = stylesheet.helpBlock.normal;
	const errorBlockStyle = stylesheet.errorBlock;

	if (locals.hasError) {
		formGroupStyle = stylesheet.formGroup.error;
		controlLabelStyle = stylesheet.controlLabel.error;
		selectStyle = stylesheet.select.error;
		pickerContainer = stylesheet.pickerContainer.error;
		helpBlockStyle = stylesheet.helpBlock.error;
	}

	const label = locals.label ? (
		<Text style={controlLabelStyle}>{locals.label}</Text>
	) : null;
	const help = locals.help ? (
		<Text style={helpBlockStyle}>{locals.help}</Text>
	) : null;
	const error = locals.hasError && locals.error ? (
		<Text accessibilityLiveRegion='polite' style={errorBlockStyle}>
			{locals.error}
		</Text>
	) : null;

	return (
		<View style={formGroupStyle}>
			{label}
			<Picker
				onCollapseChange={onCollapseChange}
				onChange={onChange}
				value={value}
				options={options}
				isCollapsed={isCollapsed}
				isDisabled={isDisabled}
				mode={mode}
				prompt={prompt}
				style={selectStyle}
				itemStyle={itemStyle}
				containerStyle={pickerContainer}
				containerStyleOpen={pickerContainerOpen}
			/>
			{help}
			{error}
		</View>
	);
}
