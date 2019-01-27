import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Divider } from 'react-native-elements';

import { fontSizeLarge, fontSizeXLarge, textColorAccent } from '../../../api/constants.js';

import { getModifier, getBeast } from '../../../api/beasts.js';

const getSpeedString = beast => {
	let out = `${beast.speed} ft.`;
	if (beast.climb) out += `, ${beast.climb} ft.`;
	if (beast.swim) out += `, ${beast.swim} ft.`;
	if (beast.fly) out += `, ${beast.fly} ft.`;
	if (beast.burrow) out += `, ${beast.burrow} ft.`;
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
				<Text style={styles.size}>{beast.size} beast</Text>
				<Divider style={styles.divider} />
				<View style={styles.row}>
					<Text style={styles.lbl}>Armor Class</Text>
					<Text style={styles.description}>{beast.ac + (beast.ac !== (10 + getModifier(beast.dex)) ? ' (Natural Armor)' : '')}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.lbl}>Hit Points</Text>
					<Text style={styles.description}>{beast.hp} ({beast.roll})</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.lbl}>Speed</Text>
					<Text style={styles.description}>{getSpeedString(beast)}</Text>
				</View>
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
				<View style={styles.row}>
					<Text style={styles.lbl}>Passive Perception</Text>
					<Text style={styles.description}>{beast.passive}</Text>
				</View>
				{beast.skills && (
					<View style={styles.row}>
						<Text style={styles.lbl}>Skills</Text>
						<Text style={styles.description}>{beast.skills}</Text>
					</View>
				)}
				{beast.senses && (
					<View style={styles.row}>
						<Text style={styles.lbl}>Senses</Text>
						<Text style={styles.description}>{beast.senses}</Text>
					</View>
				)}
				<View style={styles.row}>
					<Text style={styles.lbl}>Challenge</Text>
					<Text>{beast.cr}</Text>
				</View>
				{beast.traits && (
					<>
						<Divider style={styles.divider} />
						<Text style={styles.header2}>Traits</Text>
						{beast.traits.map(trait => (
							<View key={trait.name} style={styles.row}>
								<Text style={styles.lbl}>{trait.name}</Text>
								<Text style={styles.description}>{trait.text}</Text>
							</View>
						))}
					</>
				)}
				{beast.actions && (
					<>
						<Divider style={styles.divider} />
						<Text style={styles.header2}>Actions</Text>
						{beast.actions.map(action => (
							<View key={action.name} style={styles.row}>
								<Text style={styles.lbl}>{action.name}</Text>
								<Text style={styles.description}>{action.text}</Text>
							</View>
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
	lbl: {
		fontWeight: 'bold',
		marginRight: 5
	},
	description: {
		flex: 1,
		flexWrap: 'wrap'
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
	size: {
		fontStyle: 'italic'
	},
	stat: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	}
});
