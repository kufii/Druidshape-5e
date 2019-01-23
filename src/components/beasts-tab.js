import React from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import { Header, Divider } from 'react-native-elements';

import ModalDropdown from './shared/modal-dropdown';

import beasts from '../../data/beasts.json';
import { groupBy, sortBy } from '../util.js';

const options = [
	{ text: 'All', value: 'all' },
	...Array.from(new Array(20), (_, i) => ({ text: `Druid Level ${i + 1}`, value: (i + 1).toString() }))
];
const crToNum = cr => cr.includes('/') ? 1 / parseInt(cr.split('/')[1]) : parseInt(cr);
const beastsByCr = beasts.reduce(groupBy(b => b.cr), {});

export default class BeastsTab extends React.Component {
	state = { option: 'all' };

	render() {
		return (
			<View style={styles.container}>
				<Header
					centerComponent={
						<ModalDropdown
							items={options}
							selected={this.state.option}
							onSelect={option => this.setState({ option })}
						/>
					}
					containerStyle={styles.header}
				/>
				<Divider />
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
					keyExtractor={(item, index) => index}
					ItemSeparatorComponent={() => <Divider style={styles.divider} />}
					automaticallyAdjustContentInsets={false}
					contentInset={{ bottom: 54 }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	header: {
		backgroundColor: 'rgba(247,247,247,1.0)',
		borderBottomWidth: 0,
		borderBottomColor: '#919191'
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: 'bold',
		backgroundColor: 'rgba(247,247,247,1.0)',
		color: '#919191'
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44
	},
	divider: {
		marginLeft: 10,
		marginRight: 10
	}
});
