import React from 'react';
import { StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { KeyboardAvoidingScrollView } from '../../../shared/helper';
import { sizes } from '../../../../api/beasts';

const Form = t.form.Form;
const Size = t.enums.of(sizes, 'Size');
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
	cr: t.String
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
		cr: { label: 'Challenge Rating' }
	}
};

export default class AddHomebrew extends React.Component {
	state = {
		model: {
			size: 'Medium',
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
