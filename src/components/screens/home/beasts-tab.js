import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, SectionList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import listStyles from '../../../styles/list.js';

import { iconSizeLarge, textColorDisabled } from '../../../api/constants.js';

import beasts from '../../../data/beasts.json';
import { groupBy, sortBy } from '../../../api/util.js';

const crToNum = cr => cr.includes('/') ? 1 / parseInt(cr.split('/')[1]) : parseInt(cr);
const beastsByCr = beasts.reduce(groupBy(b => b.cr), {});

export default function BeastsTab(props) {
	return (
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
					<TouchableOpacity onPress={() => props.navigation.push('Details', { beast: item })}>
						<View style={listStyles.item}>
							<Text style={listStyles.itemText}>{item}</Text>
							<Icon name='ios-star' size={iconSizeLarge} style={styles.star} />
						</View>
					</TouchableOpacity>
				)
			}
			keyExtractor={(item, index) => index}
			ItemSeparatorComponent={() => <Divider style={listStyles.divider} />}
		/>
	);
}

BeastsTab.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	star: {
		color: textColorDisabled,
		marginLeft: 'auto',
		marginRight: 10
	}
});
