import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import listTemplate from '../../../../styles/tcomb/list';

import { KeyboardAvoidingScrollView } from '../../../shared/helper';
import { formButtonColor } from '../../../../api/constants';

const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const crs = ['0', '1', '2', '3', '4', '5', '6', '1/8', '1/4', '1/2'];

const Form = t.form.Form;
Form.templates.list = listTemplate;

const Size = t.enums.of(sizes, 'Size');
const ChallengeRating = t.enums.of(crs, 'ChallengeRating');

const Attribute = t.struct({
	name: t.String,
	text: t.String
}, 'Attribute');
const attributeListConfig = {
	item: {
		auto: 'none',
		fields: {
			name: {
				auto: 'labels',
				multiline: true
			},
			text: {
				auto: 'labels',
				multiline: true
			}
		}
	}
};

const Beast = t.struct({
	name: t.String,
	size: Size,
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

const options = {
	fields: {
		hp: { label: 'HP' },
		roll: {
			label: 'Hit Dice',
			placeholder: 'e.g. 2d8 + 2'
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
			multiline: true
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
	state = {
		model: {
			speed: 0,
			climb: 0,
			swim: 0,
			fly: 0
		}
	};

	static propTypes = {
		navigation: PropTypes.object
	};

	static navigationOptions = {
		title: 'Add New Beast',
		headerLeft: null,
		gesturesEnabled: false
	};

	submit() {
		const value = this.form.getValue();
		if (value) {
			this.props.navigation.dismiss();
		}
	}

	validate(key) {
		this.form.getComponent(key).validate();
	}

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAvoidingScrollView contentContainerStyle={styles.form}>
					<Form
						ref={form => this.form = form}
						type={Beast}
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
	}
});
