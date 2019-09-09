import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import r from 'rnss';
import { Divider, Badge } from 'react-native-elements';
import SwipePager from '../../../shared/swipe-pager';
import { B, I, BI } from '../../../shared/helper';
import ToggleIconButton from '../../../shared/toggle-icon-button';

import { icon } from '../../../../api/util';

import { fontSizeMedium, fontSizeLarge, fontSizeXLarge } from '../../../../api/constants';

import { getModifier } from '../../../../api/beasts';

const getSpeedString = ({
	speed,
	climb,
	climbDetails,
	swim,
	swimDetails,
	fly,
	flyDetails,
	burrow,
	burrowDetails
}) => {
	let out = `${speed || 0} ft.`;
	if (climb) out += `, climb ${climb} ft.${climbDetails ? ` (${climbDetails})` : ''}`;
	if (swim) out += `, swim ${swim} ft.${swimDetails ? ` (${swimDetails})` : ''}`;
	if (fly) out += `, fly ${fly} ft.${flyDetails ? ` (${flyDetails})` : ''}`;
	if (burrow) out += `, burrow ${burrow} ft.${burrowDetails ? ` (${burrowDetails})` : ''}`;
	return out;
};

const hasNaturalArmor = ({ ac, dex }) => ac !== 10 + getModifier(dex);

export default class BeastDetailsScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const { actions } = screenProps;

		const name = navigation.getParam('title');
		const theme = actions.getCurrentTheme();
		const character = actions.getCurrentCharacter();

		return {
			title: name,
			headerRight: (
				<View style={r`fd row`}>
					<ToggleIconButton
						activeIcon={icon('eye')}
						inactiveIcon={icon('eye-off')}
						active={character.seen[name]}
						onToggle={() => actions.toggleSeen(name)}
						activeColor={theme.headerTextColor}
						inactiveColor={theme.headerColorLight}
					/>
					<ToggleIconButton
						icon={icon('star')}
						active={character.favs[name]}
						onToggle={() => actions.toggleFav(name)}
						activeColor={theme.headerTextColor}
						inactiveColor={theme.headerColorLight}
					/>
				</View>
			)
		};
	};

	static propTypes = {
		navigation: PropTypes.object.isRequired,
		screenProps: PropTypes.shape({
			state: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}).isRequired
	};

	get styles() {
		const { actions } = this.props.screenProps;

		const theme = actions.getCurrentTheme();
		return {
			scrollView: r`as stretch; bc ${theme.contentBackgroundColor}`,
			containerContent: r`p 10`,
			divider: r`m 10 0; bc ${theme.dividerColor}`,
			row: r`fd row`,
			attribute: r`m 2 0; c ${theme.textColor}`,
			header1: r`
				fw bold
				fs ${fontSizeXLarge}
				c ${theme.textColorAccent}
			`,
			header2: r`
				fw bold
				fs ${fontSizeLarge}
				c ${theme.textColorAccent}
			`,
			stat: r`
				f 1
				fd column
				ai center
				m 5 0
			`,
			text: r`c ${theme.textColor}`,
			environments: r`f 1; fd row; flex-wrap wrap`,
			environmentContainer: r`m 5 5 5 0`,
			environment: r`bc ${theme.formButtonColor}; h auto; br 1000`,
			environmentText: r`fs ${fontSizeMedium}; p 5 10`
		};
	}

	render() {
		const { navigation } = this.props;

		const key = navigation.getParam('key');
		const list = navigation.getParam('list');
		const index = list.findIndex(b => b.key === key) || 0;

		const styles = this.styles;
		return (
			<SwipePager
				loadMinimal
				data={list}
				index={index}
				onIndexChanged={index =>
					navigation.setParams({ key: list[index].key, title: list[index].name })
				}
				renderItem={beast => (
					<ScrollView
						style={styles.scrollView}
						contentContainerStyle={styles.containerContent}
					>
						<Text style={styles.header1}>{beast.name}</Text>
						<Text style={styles.text}>
							<I>
								{beast.size} {beast.type || 'beast'}
							</I>
						</Text>
						<Divider style={styles.divider} />
						<Text style={styles.attribute}>
							<B>Armor Class</B>{' '}
							{beast.ac + (hasNaturalArmor(beast) ? ' (Natural Armor)' : '')}
						</Text>
						<Text style={styles.attribute}>
							<B>Hit Points</B> {beast.hp} ({beast.roll})
						</Text>
						<Text style={styles.attribute}>
							<B>Speed</B> {getSpeedString(beast)}
						</Text>
						<Divider style={styles.divider} />
						<View style={styles.row}>
							<View style={styles.stat}>
								<Text style={styles.header2}>STR</Text>
								<Text style={styles.text}>
									{beast.str} ({getModifier(beast.str)})
								</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.header2}>DEX</Text>
								<Text style={styles.text}>
									{beast.dex} ({getModifier(beast.dex)})
								</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.header2}>CON</Text>
								<Text style={styles.text}>
									{beast.con} ({getModifier(beast.con)})
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.stat}>
								<Text style={styles.header2}>INT</Text>
								<Text style={styles.text}>
									{beast.int} ({getModifier(beast.int)})
								</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.header2}>WIS</Text>
								<Text style={styles.text}>
									{beast.wis} ({getModifier(beast.wis)})
								</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.header2}>CHA</Text>
								<Text style={styles.text}>
									{beast.cha} ({getModifier(beast.cha)})
								</Text>
							</View>
						</View>
						<Divider style={styles.divider} />
						<Text style={styles.attribute}>
							<B>Passive Perception</B> {beast.passive}
						</Text>
						{beast.skills && (
							<Text style={styles.attribute}>
								<B>Skills</B> {beast.skills}
							</Text>
						)}
						{beast.vulnerabilities && (
							<Text style={styles.attribute}>
								<B>Damage Vulnerabilities</B> {beast.vulnerabilities}
							</Text>
						)}
						{beast.resistances && (
							<Text style={styles.attribute}>
								<B>Damage Resistances</B> {beast.resistances}
							</Text>
						)}
						{beast.immunities && (
							<Text style={styles.attribute}>
								<B>Damage Immunities</B> {beast.immunities}
							</Text>
						)}
						{beast.conditionImmunities && (
							<Text style={styles.attribute}>
								<B>Condition Immunities</B> {beast.conditionImmunities}
							</Text>
						)}
						{beast.senses && (
							<Text style={styles.attribute}>
								<B>Senses</B> {beast.senses}
							</Text>
						)}
						{beast.languages && (
							<Text style={styles.attribute}>
								<B>Languages</B> {beast.languages}
							</Text>
						)}
						<Text style={styles.attribute}>
							<B>Challenge</B> {beast.cr}
						</Text>
						{beast.traits && (
							<>
								<Divider style={styles.divider} />
								<Text style={styles.header2}>Traits</Text>
								{beast.traits.map(({ name, text }) => (
									<Text key={name} style={styles.attribute}>
										<BI>{name}.</BI> {text}
									</Text>
								))}
							</>
						)}
						{beast.actions && (
							<>
								<Divider style={styles.divider} />
								<Text style={styles.header2}>Actions</Text>
								{beast.actions.map(({ name, text }) => (
									<Text key={name} style={styles.attribute}>
										<BI>{name}.</BI> {text}
									</Text>
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
				)}
			/>
		);
	}
}
