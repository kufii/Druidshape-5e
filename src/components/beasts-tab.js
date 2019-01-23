import React from 'react';
import { StyleSheet, View, Text, SectionList } from 'react-native';
import { Header, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from './shared/modal-dropdown';

import headerStyles from '../styles/header.js';
import listStyles from '../styles/list.js';

import { tabBarIOSHeight, iconSizeLarge, textColorDisabled } from '../api/constants.js';

import beasts from '../data/beasts.json';
import { groupBy, sortBy } from '../api/util.js';

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
					containerStyle={headerStyles.container}
				/>
				<Divider />
				<SectionList
					sections={
						Object.entries(beastsByCr)
							.sort(sortBy(
								([cr]) => crToNum(cr)
							))
							.map(([cr, list]) => ({
								title: `CR ${cr}`,
								data: list.map(({ name }) => name).sort()
							}))
					}
					renderSectionHeader={({ section }) => <Text style={listStyles.sectionHeader}>{section.title}</Text>}
					renderItem={
						({ item }) => (
							<View style={listStyles.item}>
								<Text style={listStyles.itemText}>{item}</Text>
								<Icon name='ios-star' size={iconSizeLarge} style={styles.star} />
							</View>
						)
					}
					keyExtractor={(item, index) => index}
					ItemSeparatorComponent={() => <Divider style={listStyles.divider} />}
					automaticallyAdjustContentInsets={false}
					contentInset={{ bottom: tabBarIOSHeight }}
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
	star: {
		color: textColorDisabled,
		marginLeft: 'auto',
		marginRight: 10
	}
});
