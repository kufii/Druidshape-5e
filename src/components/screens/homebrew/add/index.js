import React from 'react';
import { StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import listTemplate from '../../../../styles/tcomb/list';

import { KeyboardAvoidingScrollView } from '../../../shared/helper';

const Form = t.form.Form;

const Size = t.enums.of(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'], 'Size');
const ChallengeRating = t.enums.of(['0', '1/8', '1/4', '1/2', '1', '2', '3', '4', '5', '6'], 'ChallengeRating');

const Attribute = t.struct({
	name: t.String,
	text: t.String
}, 'Attribute');

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
		roll: { label: 'Hit Dice' },
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
			placeholder: 'e.g. blindsight 60 ft.'
		},
		cr: { label: 'Challenge Rating' },
		traits: {
			template: listTemplate,
			item: {
				fields: {
					text: { multiline: true }
				}
			}
		},
		actions: {
			template: listTemplate,
			item: {
				fields: {
					text: { multiline: true }
				}
			}
		}
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

	static navigationOptions = {
		title: 'Add New Beast',
		headerLeft: null
	};

	render() {
		return (
			<KeyboardAvoidingScrollView contentContainerStyle={styles.container}>
				<Form
					ref={form => this.form = form}
					type={Beast}
					options={options}
					value={this.state.model}
					onChange={model => this.setState({ model })}
				/>
			</KeyboardAvoidingScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	}
});
