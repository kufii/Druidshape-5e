import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import r from 'rnss';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSizeLarge, lightTheme } from '../../api/constants';
import { icon } from '../../api/util';
import buttonStyles from '../buttons';

const renderRowWithoutButtons = item => <View key={item.key}>{item.input}</View>;

const renderAddButton = ({ click }) => (
	<Button
		key='add'
		type='outline'
		buttonStyle={[styles.marginBottom, styles.addButton]}
		onPress={click}
		title='Add'
		titleStyle={styles.button}
	/>
);
renderAddButton.propTypes = {
	click: PropTypes.func
};

const renderRowButton = ({ type, click }) => (
	<Button
		key={type}
		type='clear'
		buttonStyle={buttonStyles.icon.buttonStyle}
		containerStyle={buttonStyles.icon.containerStyle}
		onPress={click}
		icon={
			<Icon
				name={icon({
					remove: 'trash',
					'move-up': 'arrow-up',
					'move-down': 'arrow-down'
				}[type])}
				size={iconSizeLarge}
				color={lightTheme.formButtonColor}
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

const renderRow = (item, stylesheet) => (
	<Card
		key={item.key}
		title={renderButtonGroup(item.buttons)}
		containerStyle={[styles.card, {
			backgroundColor: stylesheet.formGroup.normal.cardColor
		}]}
	>
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
		: renderRow(item, stylesheet));

	const addButton = locals.add ? renderAddButton(locals.add) : null;

	return (
		<View style={fieldsetStyle}>
			{label}
			{error}
			{rows}
			{addButton}
		</View>
	);
}

const styles = r({
	flex: 'f 1',
	row: 'fd row',
	marginBottom: 'mb 10',
	card: `
		mb 10
		border-color transparent
		elevation 4
	`,
	addButton: `border-color ${lightTheme.formButtonColor}`,
	button: `c ${lightTheme.formButtonColor}`
});
