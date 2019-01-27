import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Divider } from 'react-native-elements';

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
			<ScrollView style={styles.container}>
				<Text>{beast.name}</Text>
				<Text>Challenge Rating {beast.cr}</Text>
				<Text>{beast.size} beast</Text>
				<Divider />
				<View>
					<Text>Armor Class</Text>
					<Text>{beast.ac + (beast.ac !== (10 + getModifier(beast.dex)) ? ' (Natural Armor)' : '')}</Text>
				</View>
				<View>
					<Text>Hit Points</Text>
					<Text>{beast.hp} ({beast.roll})</Text>
				</View>
				<View>
					<Text>Speed</Text>
					<Text>{getSpeedString(beast)}</Text>
				</View>
				<Divider />
				<View>
					<View>
						<Text>STR</Text>
						<Text>{beast.str} ({getModifier(beast.str)})</Text>
					</View>
					<View>
						<Text>DEX</Text>
						<Text>{beast.dex} ({getModifier(beast.dex)})</Text>
					</View>
					<View>
						<Text>CON</Text>
						<Text>{beast.con} ({getModifier(beast.con)})</Text>
					</View>
				</View>
				<Divider />
				<View>
					<Text>Passive Perception</Text>
					<Text>{beast.passive}</Text>
				</View>
				{beast.skills && (
					<View>
						<Text>Skills</Text>
						<Text>{beast.skills}</Text>
					</View>
				)}
				{beast.senses && (
					<View>
						<Text>Senses</Text>
						<Text>{beast.senses}</Text>
					</View>
				)}
				{beast.traits && (
					<>
						<Divider />
						{beast.traits.map(trait => (
							<View key={trait.name}>
								<Text>{trait.name}</Text>
								<Text>{trait.text}</Text>
							</View>
						))}
					</>
				)}
				{beast.actions && (
					<>
						<Divider />
						<Text>Actions</Text>
						{beast.actions.map(action => (
							<View key={action.name}>
								<Text>{action.name}</Text>
								<Text>{action.text}</Text>
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
	}
});
