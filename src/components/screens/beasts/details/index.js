import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import r from 'rnss';
import { Divider, Badge } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { B, I, BI } from '../../../shared/helper';

import { fontSizeMedium, fontSizeLarge, fontSizeXLarge } from '../../../../api/constants';

import { getModifier } from '../../../../api/beasts';

const getSpeedString = beast => {
	let out = `${beast.speed || 0} ft.`;
	if (beast.climb) out += `, climb ${beast.climb} ft.${beast.climbDetails ? ` (${beast.climbDetails})` : ''}`;
	if (beast.swim) out += `, swim ${beast.swim} ft.${beast.swimDetails ? ` (${beast.swimDetails})` : ''}`;
	if (beast.fly) out += `, fly ${beast.fly} ft.${beast.flyDetails ? ` (${beast.flyDetails})` : ''}`;
	if (beast.burrow) out += `, burrow ${beast.burrow} ft.${beast.burrowDetails ? ` (${beast.burrowDetails})` : ''}`;
	return out;
};

const hasNaturalArmor = beast => beast.ac !== 10 + getModifier(beast.dex);

export default class BeastDetailsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('title')
	});

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		screenProps: PropTypes.shape({
			state: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);
		this.list = props.screenProps.actions.getBeastListFlattened();
	}

	get styles() {
		const { actions } = this.props.screenProps;

		const theme = actions.getCurrentTheme();
		return r({
			container: `
				f 1
				fd column
				bc ${theme.contentBackgroundColor}
				ai center
			`,
			scrollView: 'as stretch',
			containerContent: 'p 10',
			divider: `m 10 0; bc ${theme.dividerColor}`,
			row: 'fd row',
			attribute: `m 2 0; c ${theme.textColor}`,
			header1: `
				fw bold
				fs ${fontSizeXLarge}
				c ${theme.textColorAccent}
			`,
			header2: `
				fw bold
				fs ${fontSizeLarge}
				c ${theme.textColorAccent}
			`,
			stat: `
				f 1
				fd column
				ai center
				m 5 0
			`,
			text: `c ${theme.textColor}`,
			environments: 'f 1; fd row; flex-wrap wrap',
			environmentContainer: 'm 5 5 5 0',
			environment: `bc ${theme.formButtonColor}; h auto; br 1000`,
			environmentText: `fs ${fontSizeMedium}; p 5 10`
		});
	}

	render() {
		const { navigation } = this.props;

		const key = navigation.getParam('key');
		const index = this.list.findIndex(b => b.key === key) || 0;

		const styles = this.styles;
		return (
			<Swiper
				loop={false}
				showsPagination={false}
				loadMinimal
				index={index}
				onIndexChanged={index => navigation.setParams({ key: this.list[index].key, title: this.list[index].name })}
				style={styles.container}
			>
				{this.list.map((beast, i) => Math.abs(index - i) <= 1 && (
					<ScrollView key={beast.key} style={styles.scrollView} contentContainerStyle={styles.containerContent}>
						<Text style={styles.header1}>{beast.name}</Text>
						<Text style={styles.text}><I>{beast.size} {beast.type || 'beast'}</I></Text>
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
						{beast.vulnerabilities && (
							<Text style={styles.attribute}><B>Damage Vulnerabilities</B> {beast.vulnerabilities}</Text>
						)}
						{beast.resistances && (
							<Text style={styles.attribute}><B>Damage Resistances</B> {beast.resistances}</Text>
						)}
						{beast.immunities && (
							<Text style={styles.attribute}><B>Damage Immunities</B> {beast.immunities}</Text>
						)}
						{beast.conditionImmunities && (
							<Text style={styles.attribute}><B>Condition Immunities</B> {beast.conditionImmunities}</Text>
						)}
						{beast.senses && (
							<Text style={styles.attribute}><B>Senses</B> {beast.senses}</Text>
						)}
						{beast.languages && (
							<Text style={styles.attribute}><B>Languages</B> {beast.languages}</Text>
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
						{beast.environments && beast.environments.length > 0 && (
							<>
								<Divider style={styles.divider} />
								<Text style={styles.header2}>Environments</Text>
								<View style={styles.environments}>
									{beast.environments.map(env => (
										<Badge
											key={env}
											containerStyle={styles.environmentContainer}
											badgeStyle={styles.environment}
											value={env}
											textStyle={styles.environmentText}
										/>
									))}
								</View>
							</>
						)}
					</ScrollView>
				))}
			</Swiper>
		);
	}
}
