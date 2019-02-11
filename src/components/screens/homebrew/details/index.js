import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import t from 'tcomb-form-native';
import listTemplate from '../../../../styles/tcomb/list';

import { KeyboardAvoidingScrollView } from '../../../shared/helper';
import AlertDelete from './alert-delete';
import { icon } from '../../../../api/util';
import { formButtonColor, headerTextColor, iconSizeLarge } from '../../../../api/constants';

const Form = t.form.Form;
Form.templates.list = listTemplate;

const attributeListConfig = {
	item: {
		auto: 'none',
		fields: {
			name: {
				auto: 'labels'
			},
			text: {
				auto: 'labels',
				multiline: true
			}
		}
	}
};
const options = {
	fields: {
		ac: { label: 'Armor Class' },
		hp: { label: 'HP' },
		roll: {
			label: 'Hit Dice',
			placeholder: 'e.g. 2d8 + 2',
			autoCapitalize: 'none'
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
			placeholder: 'e.g. +5 Perception'
		},
		senses: {
			placeholder: 'e.g. blindsight 60 ft.',
			autoCapitalize: 'none'
		},
		cr: {
			label: 'Challenge Rating',
			disableOrder: true
		},
		traits: attributeListConfig,
		actions: attributeListConfig
	}
};

export default class AddHomebrew extends React.Component {
	static propTypes = {
		navigation: PropTypes.object
	};

	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('edit') ? 'Edit Beast' : 'Add New Beast',
		headerRight: navigation.getParam('edit') ? (
			<Button
				type='clear'
				buttonStyle={styles.deleteButton}
				icon={<Icon name={icon('trash')} color={headerTextColor} size={iconSizeLarge} />}
				onPress={() => AlertDelete(
					navigation.getParam('edit'),
					navigation.getParam('actions'),
					() => navigation.dismiss()
				)}
			/>
		) : null,
		headerLeft: null,
		gesturesEnabled: false
	});

	constructor(props) {
		super(props);

		const actions = props.navigation.getParam('actions');
		const state = props.navigation.getParam('state');
		const beasts = actions.getAllBeasts().filter(b => b.name !== this.edit);

		const Size = t.enums.of(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'], 'Size');
		const ChallengeRating = t.enums.of(['0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6'], 'ChallengeRating');

		const Attribute = t.struct({
			name: t.String,
			text: t.String
		}, 'Attribute');

		const Name = t.refinement(t.String, n => !beasts.find(b => b.name === n));
		Name.getValidationErrorMessage = value => value && 'A beast with that name already exists';

		const struct = t.struct({
			name: Name,
			size: Size,
			ac: t.Number,
			hp: t.Number,
			roll: t.String,
			speed: t.Number,
			climb: t.Number,
			swim: t.Number,
			fly: t.Number,
			str: t.Number,
			dex: t.Number,
			con: t.Number,
			int: t.Number,
			wis: t.Number,
			cha: t.Number,
			passive: t.Number,
			skills: t.maybe(t.String),
			senses: t.maybe(t.String),
			cr: ChallengeRating,
			traits: t.maybe(t.list(Attribute)),
			actions: t.maybe(t.list(Attribute))
		});

		const model = this.edit && state.homebrew.find(h => h.name === this.edit);

		this.state = {
			struct,
			model: model || {
				speed: 0,
				climb: 0,
				swim: 0,
				fly: 0
			}
		};
	}

	get edit() {
		return this.props.navigation.getParam('edit');
	}

	submit() {
		const beast = this.form.getValue();
		if (beast) {
			const actions = this.props.navigation.getParam('actions');
			if (this.edit) {
				actions.editHomebrew(this.edit, beast);
			} else {
				actions.addHomebrew(beast);
			}
			this.props.navigation.dismiss();
		}
	}

	validate(key) {
		const component = this.form.getComponent(key);
		if (component) {
			component.validate();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingScrollView contentContainerStyle={styles.form}>
					<Form
						ref={form => this.form = form}
						type={this.state.struct}
						options={options}
						value={this.state.model}
						onChange={(model, key) => {
							this.validate(key);
							this.setState({ model });
						}}
					/>
				</KeyboardAvoidingScrollView>
				<View style={styles.buttons}>
					<Button
						title='Cancel'
						type='clear'
						containerStyle={[styles.button, styles.cancelButton]}
						titleStyle={styles.cancelButtonTitle}
						onPress={() => this.props.navigation.dismiss()}
					/>
					<Button
						title='Save'
						type='clear'
						containerStyle={[styles.button, styles.saveButton]}
						titleStyle={styles.saveButtonTitle}
						onPress={() => this.submit()}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	form: {
		padding: 10
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopColor: formButtonColor,
		borderTopWidth: StyleSheet.hairlineWidth
	},
	button: {
		width: '50%',
		borderRadius: 0
	},
	cancelButton: {
		backgroundColor: '#fff'
	},
	cancelButtonTitle: {
		color: formButtonColor
	},
	saveButton: {
		backgroundColor: formButtonColor
	},
	saveButtonTitle: {
		color: '#fff'
	},
	deleteButton: {
		marginRight: 10,
		borderRadius: 100
	}
});
