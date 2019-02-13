import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { B, I, BI } from '../../shared/helper';
import BannerAd from '../../shared/ads';

import { fontSizeLarge, fontSizeXLarge } from '../../../api/constants';

import { getModifier } from '../../../api/beasts';

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

	get beastName() {
		return this.props.navigation.getParam('beast');
	}

	get styles() {
		const actions = this.props.navigation.getParam('actions');
		const theme = actions.getCurrentTheme();
		return StyleSheet.create({
			container: {
				flex: 1,
				flexDirection: 'column',
				backgroundColor: theme.contentBackgroundColor,
				alignItems: 'center'
			},
			scrollView: {
				alignSelf: 'stretch'
			},
			containerContent: {
				padding: 10
			},
			divider: {
				marginTop: 10,
				marginBottom: 10,
				backgroundColor: theme.dividerColor
			},
			row: {
				flexDirection: 'row'
			},
			attribute: {
				marginTop: 2,
				marginBottom: 2,
				color: theme.textColor
			},
			header1: {
				fontWeight: 'bold',
				fontSize: fontSizeXLarge,
				color: theme.textColorAccent
			},
			header2: {
				fontWeight: 'bold',
				fontSize: fontSizeLarge,
				color: theme.textColorAccent
			},
			stat: {
				flex: 1,
				flexDirection: 'column',
				alignItems: 'center',
				marginTop: 5,
				marginBottom: 5
			},
			text: {
				color: theme.textColor
			}
		});
	}

	render() {
		const actions = this.props.navigation.getParam('actions');
		const state = this.props.navigation.getParam('state');
		const beast = actions.getBeast(this.beastName);
		const styles = this.styles;
		return beast ? (
			<View style={styles.container}>
				<ScrollView style={styles.scrollView} contentContainerStyle={styles.containerContent}>
					<Text style={styles.header1}>{beast.name}</Text>
					<Text style={styles.text}><I>{beast.size} beast</I></Text>
					<Divider style={styles.divider} />
					<Text style={styles.attribute}><B>Armor Class</B> {beast.ac + (hasNaturalArmor(beast) ? ' (Natural Armor)' : '')}</Text>
					<Text style={styles.attribute}><B>Hit Points</B> {beast.hp} ({beast.roll})</Text>
					<Text style={styles.attribute}><B>Speed</B> {getSpeedString(beast)}</Text>
					<Divider style={styles.divider} />
					<View style={styles.row}>
						<View style={styles.stat}>
							<Text style={styles.header2}>STR</Text>
							<Text style={styles.text}>{beast.str} ({getModifier(beast.str)})</Text>
						</View>
						<View style={styles.stat}>
							<Text style={styles.header2}>DEX</Text>
							<Text style={styles.text}>{beast.dex} ({getModifier(beast.dex)})</Text>
						</View>
						<View style={styles.stat}>
							<Text style={styles.header2}>CON</Text>
							<Text style={styles.text}>{beast.con} ({getModifier(beast.con)})</Text>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.stat}>
							<Text style={styles.header2}>INT</Text>
							<Text style={styles.text}>{beast.int} ({getModifier(beast.int)})</Text>
						</View>
						<View style={styles.stat}>
							<Text style={styles.header2}>WIS</Text>
							<Text style={styles.text}>{beast.wis} ({getModifier(beast.wis)})</Text>
						</View>
						<View style={styles.stat}>
							<Text style={styles.header2}>CHA</Text>
							<Text style={styles.text}>{beast.cha} ({getModifier(beast.cha)})</Text>
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
				{state.showAds && <BannerAd />}
			</View>
		) : <View style={styles.container} />;
	}
}
