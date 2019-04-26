import React from 'react';
import { View, Text } from 'react-native';
import { Card, CheckBox } from 'react-native-elements';
import r from 'rnss';
import t from 'tcomb-form-native';
import { toDict } from '../../api/util';

export default class MultiSelect extends t.form.Select {
	getTransformer() {
		return MultiSelect.transformer();
	}

	getTemplate() {
		return locals => {
			const stylesheet = locals.stylesheet;
			let formGroupStyle = stylesheet.formGroup.normal;
			let controlLabelStyle = stylesheet.controlLabel.normal;
			let helpBlockStyle = stylesheet.helpBlock.normal;
			let checkboxStyle = stylesheet.checkbox.normal;
			const errorBlockStyle = stylesheet.errorBlock;

			if (locals.hasError) {
				formGroupStyle = stylesheet.formGroup.error;
				controlLabelStyle = stylesheet.controlLabel.error;
				helpBlockStyle = stylesheet.helpBlock.error;
				checkboxStyle = stylesheet.checkbox.error;
			}

			const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
			const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
			const error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;

			const viewArr = locals.options.filter(({ value }) => value).map(item => (
				<CheckBox
					key={item.value}
					title={item.text}
					checked={locals.value.includes(item.value)}
					checkedColor={checkboxStyle.checkedColor}
					uncheckedColor={checkboxStyle.uncheckedColor}
					containerStyle={r`bc ${checkboxStyle.backgroundColor}; border-color ${checkboxStyle.borderColor}`}
					textStyle={r`c ${checkboxStyle.textColor}`}
					onPress={() => {
						const dict = locals.value.reduce(toDict(str => str, () => true), {});
						dict[item.value] = !dict[item.value];
						locals.onChange(Object.entries(dict).filter(([_, value]) => value).map(([key]) => key));
					}}
				/>
			));

			return (
				<View style={formGroupStyle}>
					{label}
					<Card
						containerStyle={r`
							mb 10
							border-color transparent
							elevation 4
							bc ${formGroupStyle.cardColor}
						`}
					>
						<View style={r`f 1`}>{viewArr}</View>
					</Card>
					{help}
					{error}
				</View>
			);
		};
	}
}

MultiSelect.transformer = () => ({
	format: value => Array.isArray(value) ? value : [],
	parse: value => value ? value : []
});
