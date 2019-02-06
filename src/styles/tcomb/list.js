import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSizeLarge, formButtonColor } from '../../api/constants';
import { icon } from '../../api/util';

const renderRowWithoutButtons = item => <View key={item.key}>{item.input}</View>;

const renderRowButton = ({ type, click }) => type === 'add' ? (
	<Button key={type} buttonStyle={styles.button} onPress={click} title='Add' />
) : (
	<Button
		key={type}
		type='clear'
		buttonStyle={styles.iconButton}
		onPress={click}
		icon={
			<Icon
				name={icon({
					remove: 'trash',
					'move-up': 'arrow-up',
					'move-down': 'arrow-down'
				}[type])}
				size={iconSizeLarge}
				color={formButtonColor}
			/>
		}
	/>
);
renderRowButton.propTypes = {
	type: PropTypes.string,
	click: PropTypes.func
};

const renderButtonGroup = buttons => (
	<View style={styles.row}>
		{buttons.map(button => renderRowButton(button))}
	</View>
);

const renderRow = item => (
	<Card key={item.key} title={renderButtonGroup(item.buttons)} containerStyle={styles.card}>
		<View style={styles.flex}>{item.input}</View>
	</Card>
);

export default function ListTemplate(locals) {
	if (locals.hidden) return null;

	const stylesheet = locals.stylesheet;
	const fieldsetStyle = stylesheet.fieldset;
	let controlLabelStyle = stylesheet.controlLabel.normal;

	if (locals.hasError) {
		controlLabelStyle = stylesheet.controlLabel.error;
	}

	const label = locals.label ? (
		<Text style={controlLabelStyle}>{locals.label}</Text>
	) : null;
	const error = locals.hasError && locals.error ? (
		<Text accessibilityLiveRegion='polite' style={stylesheet.errorBlock}>
			{locals.error}
		</Text>
	) : null;

	const rows = locals.items.map(item => item.buttons.length === 0
		? renderRowWithoutButtons(item)
		: renderRow(item));

	const addButton = locals.add ? renderRowButton(locals.add) : null;

	return (
		<View style={fieldsetStyle}>
			{label}
			{error}
			{rows}
			{addButton}
		</View>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
	row: { flexDirection: 'row' },
	button: {
		backgroundColor: formButtonColor
	},
	iconButton: {
		marginLeft: 2,
		marginRight: 2,
		borderRadius: 100
	},
	card: {
		marginBottom: 10
	}
});
