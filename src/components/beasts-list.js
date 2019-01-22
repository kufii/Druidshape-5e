import React from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import { Constants } from 'expo';
import beasts from '../../data/beasts.json';
import { groupBy, sortBy } from '../util.js';

const crToNum = cr => cr.includes('/') ? 1 / parseInt(cr.split('/')[1]) : parseInt(cr);

export default class BeastsList extends React.Component {
	render() {
		const beastsByCr = beasts.reduce(groupBy(b => b.cr), {});
		return (
			<View style={styles.container}>
				<SectionList
					sections={
						Object.entries(beastsByCr)
							.sort(sortBy(
								([cr]) => crToNum(cr)
							))
							.map(([cr, list]) => ({
								title: cr,
								data: list.map(({ name }) => name).sort()
							}))
					}
					renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
					renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
					keyExtractor={(item, index) => index}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: 'bold',
		backgroundColor: 'rgba(247,247,247,1.0)'
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44
	}
});
