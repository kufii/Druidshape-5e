import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { B, I } from '../../shared/helper.js';

import { fontSizeLarge, fontSizeXLarge, textColorAccent } from '../../../api/constants.js';

import { getModifier, getBeast } from '../../../api/beasts.js';

const getSpeedString = beast => {
	let out = `${beast.speed} ft.`;
	if (beast.climb) out += `, climb ${beast.climb} ft.`;
	if (beast.swim) out += `, swim ${beast.swim} ft.`;
	if (beast.fly) out += `, fly ${beast.fly} ft.`;
	if (beast.burrow) out += `, burrow ${beast.burrow} ft.`;
	return out;
};

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
				<Text>
					<B>Armor Class </B>
					{beast.ac + (beast.ac !== (10 + getModifier(beast.dex)) ? ' (Natural Armor)' : '')}
				</Text>
				<Text>
					<B>Hit Points </B>
					{beast.hp} ({beast.roll})
				</Text>
				<Text>
					<B>Speed </B>
					{getSpeedString(beast)}
				</Text>
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
				<Divider style={styles.divider} />
				<Text>
					<B>Passive Perception </B>
					{beast.passive}
				</Text>
				{beast.skills && (
					<Text>
						<B>Skills </B>
						{beast.skills}
					</Text>
				)}
				{beast.senses && (
					<Text>
						<B>Senses </B>
						{beast.senses}
					</Text>
				)}
				<Text>
					<B>Challenge </B>
					<Text>{beast.cr}</Text>
				</Text>
				{beast.traits && (
					<>
						<Divider style={styles.divider} />
						<Text style={styles.header2}>Traits</Text>
						{beast.traits.map(trait => (
							<Text key={trait.name}>
								<B>{trait.name} </B>
								{trait.text}
							</Text>
						))}
					</>
				)}
				{beast.actions && (
					<>
						<Divider style={styles.divider} />
						<Text style={styles.header2}>Actions</Text>
						{beast.actions.map(action => (
							<Text key={action.name}>
								<B>{action.name} </B>
								{action.text}
							</Text>
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
		alignItems: 'center'
	}
});
