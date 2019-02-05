import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { B, I, BI } from '../../shared/helper';

import { fontSizeLarge, fontSizeXLarge, textColorAccent } from '../../../api/constants';

import { getModifier, getBeast } from '../../../api/beasts';

const getSpeedString = beast => {
	let out = `${beast.speed} ft.`;
	if (beast.climb) out += `, climb ${beast.climb} ft.`;
	if (beast.swim) out += `, swim ${beast.swim} ft.`;
	if (beast.fly) out += `, fly ${beast.fly} ft.`;
	if (beast.burrow) out += `, burrow ${beast.burrow} ft.`;
	return out;
};

const hasNaturalArmor = beast => beast.ac !== 10 + getModifier(beast.dex);

export default class DetailsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('beast')
	});

	static propTypes = {
		navigation: PropTypes.object
	};

	render() {
		const beast = getBeast(this.props.navigation.getParam('beast'));
		return (
			<ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
				<Text style={styles.header1}>{beast.name}</Text>
				<I>{beast.size} beast</I>
				<Divider style={styles.divider} />
				<Text style={styles.attribute}><B>Armor Class</B> {beast.ac + (hasNaturalArmor(beast) ? ' (Natural Armor)' : '')}</Text>
				<Text style={styles.attribute}><B>Hit Points</B> {beast.hp} ({beast.roll})</Text>
				<Text style={styles.attribute}><B>Speed</B> {getSpeedString(beast)}</Text>
				<Divider style={styles.divider} />
				<View style={styles.row}>
					<View style={styles.stat}>
						<Text style={styles.header2}>STR</Text>
						<Text>{beast.str} ({getModifier(beast.str)})</Text>
					</View>
					<View style={styles.stat}>
						<Text style={styles.header2}>DEX</Text>
						<Text>{beast.dex} ({getModifier(beast.dex)})</Text>
					</View>
					<View style={styles.stat}>
						<Text style={styles.header2}>CON</Text>
						<Text>{beast.con} ({getModifier(beast.con)})</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.stat}>
						<Text style={styles.header2}>INT</Text>
						<Text>{beast.int} ({getModifier(beast.int)})</Text>
					</View>
					<View style={styles.stat}>
						<Text style={styles.header2}>WIS</Text>
						<Text>{beast.wis} ({getModifier(beast.wis)})</Text>
					</View>
					<View style={styles.stat}>
						<Text style={styles.header2}>CHA</Text>
						<Text>{beast.cha} ({getModifier(beast.cha)})</Text>
					</View>
				</View>
				<Divider style={styles.divider} />
				<Text style={styles.attribute}><B>Passive Perception</B> {beast.passive}</Text>
				{beast.skills && (
					<Text style={styles.attribute}><B>Skills</B> {beast.skills}</Text>
				)}
				{beast.senses && (
					<Text style={styles.attribute}><B>Senses</B> {beast.senses}</Text>
				)}
				<Text style={styles.attribute}><B>Challenge</B> {beast.cr}</Text>
				{beast.traits && (
					<>
						<Divider style={styles.divider} />
						<Text style={styles.header2}>Traits</Text>
						{beast.traits.map(({ name, text }) => (
							<Text key={name} style={styles.attribute}><BI>{name}.</BI> {text}</Text>
						))}
					</>
				)}
				{beast.actions && (
					<>
						<Divider style={styles.divider} />
						<Text style={styles.header2}>Actions</Text>
						{beast.actions.map(({ name, text }) => (
							<Text key={name} style={styles.attribute}><BI>{name}.</BI> {text}</Text>
						))}
					</>
				)}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	containerContent: {
		padding: 10
	},
	divider: {
		marginTop: 10,
		marginBottom: 10
	},
	row: {
		flex: 1,
		flexDirection: 'row'
	},
	attribute: {
		marginTop: 2,
		marginBottom: 2
	},
	header1: {
		fontWeight: 'bold',
		fontSize: fontSizeXLarge,
		color: textColorAccent
	},
	header2: {
		fontWeight: 'bold',
		fontSize: fontSizeLarge,
		color: textColorAccent
	},
	stat: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 5
	}
});
