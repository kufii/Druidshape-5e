import t from 'tcomb-form-native';
import _ from 'lodash';
import { range } from '../../../../api/util';
import listTemplate from '../../../../styles/tcomb/list';
import selectTemplate from '../../../../styles/tcomb/select';
import multiselectTempate from '../../../../styles/tcomb/multiselect';
import { environments } from '../../../../api/beasts';

export const Form = t.form.Form;
Form.templates.list = listTemplate;
Form.templates.select = selectTemplate;

export const getStruct = beasts => {
	const Size = t.enums.of(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'], 'Size');
	const ChallengeRating = t.enums.of(['0 ', '1/8', '1/4', '1/2', ...range(1, 30).map(n => `${n} `)], 'ChallengeRating');

	const Attribute = t.struct({
		name: t.String,
		text: t.String
	}, 'Attribute');

	const Name = t.refinement(t.String, n => beasts ? !beasts.find(b => b.name === n) : true);
	Name.getValidationErrorMessage = value => value && 'A beast with that name already exists';

	return t.struct({
		name: Name,
		size: Size,
		ac: t.Number,
		hp: t.Number,
		roll: t.String,
		speed: t.Number,
		climb: t.maybe(t.Number),
		swim: t.maybe(t.Number),
		fly: t.maybe(t.Number),
		str: t.Number,
		dex: t.Number,
		con: t.Number,
		int: t.Number,
		wis: t.Number,
		cha: t.Number,
		passive: t.Number,
		skills: t.maybe(t.String),
		vulnerabilities: t.maybe(t.String),
		resistances: t.maybe(t.String),
		immunities: t.maybe(t.String),
		conditionImmunities: t.maybe(t.String),
		senses: t.maybe(t.String),
		languages: t.maybe(t.String),
		cr: ChallengeRating,
		traits: t.maybe(t.list(Attribute)),
		actions: t.maybe(t.list(Attribute)),
		environments: t.maybe(t.list(t.String))
	});
};

export const getOptions = theme => {
	const stylesheet = _.cloneDeep(Form.stylesheet);
	stylesheet.textbox.normal.color = stylesheet.textbox.error.color = theme.textColor;
	stylesheet.textbox.normal.backgroundColor = theme.contentBackgroundColor;
	stylesheet.textbox.normal.borderColor = theme.textColorSecondary;
	stylesheet.controlLabel.normal.color = theme.textColor;
	stylesheet.select.normal.color = theme.textColor;
	stylesheet.select.normal.borderColor = theme.textColorSecondary;
	stylesheet.pickerContainer.normal.color = theme.textColor;
	stylesheet.pickerContainer.normal.borderColor = theme.textColorSecondary;
	stylesheet.pickerValue.normal.color = stylesheet.pickerValue.error.color = theme.textColor;
	stylesheet.formGroup.normal.cardColor = stylesheet.formGroup.error.cardColor = theme.cardColor;
	stylesheet.checkbox.normal.checkedColor = stylesheet.checkbox.error.checkedColor = theme.formButtonColor;
	stylesheet.checkbox.normal.uncheckedColor = stylesheet.checkbox.error.uncheckedColor = theme.textColorDisabled;
	stylesheet.checkbox.normal.backgroundColor = stylesheet.checkbox.error.backgroundColor = theme.contentBackgroundColorDark;
	stylesheet.checkbox.normal.borderColor = stylesheet.checkbox.error.borderColor = theme.textColorSecondary;
	stylesheet.checkbox.normal.textColor = stylesheet.checkbox.error.textColor = theme.textColor;

	const multilineStylesheet = _.cloneDeep(stylesheet);
	multilineStylesheet.textbox.normal.height = multilineStylesheet.textbox.error.height = 100;
	multilineStylesheet.textbox.normal.textAlignVertical = multilineStylesheet.textbox.error.textAlignVertical = 'top';

	const placeholderTextColor = theme.textColorSecondary;

	const attributeListConfig = {
		item: {
			auto: 'none',
			fields: {
				name: {
					auto: 'labels'
				},
				text: {
					auto: 'labels',
					multiline: true,
					stylesheet: multilineStylesheet
				}
			}
		}
	};

	const dropdownConfig = {
		style: { color: theme.textColor },
		textStyle: { color: theme.textColor },
		itemTextStyle: { color: theme.textColor },
		itemStyle: { color: theme.textColor },
		placeholderTextColor: theme.textColor
	};

	const envs = environments.map(str => ({
		value: str,
		text: str
	}));

	return {
		stylesheet,
		fields: {
			size: dropdownConfig,
			ac: { label: 'Armor Class' },
			hp: { label: 'HP' },
			roll: {
				label: 'Hit Dice',
				placeholder: 'e.g. 2d8 + 2',
				autoCapitalize: 'none',
				placeholderTextColor
			},
			speed: { label: 'Speed (ft.)' },
			climb: { label: 'Climb Speed (ft.)' },
			swim: { label: 'Swim Speed (ft.)' },
			fly: { label: 'Fly Speed (ft.)' },
			str: { label: 'STR' },
			dex: { label: 'DEX' },
			con: { label: 'CON' },
			int: { label: 'INT' },
			wis: { label: 'WIS' },
			cha: { label: 'CHA' },
			passive: { label: 'Passive Perception' },
			skills: {
				placeholder: 'e.g. +5 Perception',
				placeholderTextColor
			},
			vulnerabilities: {
				label: 'Damage Vulnerabilities',
				placeholder: 'e.g. Acid; Lightning',
				placeholderTextColor
			},
			resistances: {
				label: 'Damage Resistances',
				placeholder: 'e.g. Acid; Lightning',
				placeholderTextColor
			},
			immunities: {
				label: 'Damage Immunities',
				placeholder: 'e.g. Fire, Poison',
				placeholderTextColor
			},
			conditionImmunities: {
				label: 'Condition Immunities',
				placeholder: 'e.g. Exhaustion, Grappled',
				placeholderTextColor
			},
			senses: {
				placeholder: 'e.g. Blindsight 60 ft.',
				placeholderTextColor
			},
			languages: {
				placeholder: 'e.g. Infernal, Sylvan',
				placeholderTextColor
			},
			cr: {
				label: 'Challenge Rating',
				...dropdownConfig
			},
			traits: attributeListConfig,
			actions: attributeListConfig,
			environments: {
				factory: multiselectTempate,
				options: envs
			}
		}
	};
};
