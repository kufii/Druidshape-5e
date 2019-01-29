import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, SectionList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from '../../shared/modal-dropdown';
import ToggleIconButton from '../../shared/toggle-icon-button';
import { getPref, setPref } from '../../../api/user-prefs';

import listStyles from '../../../styles/list';
import { iconSizeLarge, textColorDisabled } from '../../../api/constants';

import { groupBy, sortBy } from '../../../api/util';
import { getBeasts, crToNum } from '../../../api/beasts';

const options = [
	{ text: 'All', key: '0' },
	...Array.from(new Array(19), (_, i) => ({ text: `Druid Level ${i + 2}`, key: (i + 2).toString() }))
];

export default class BeastsScreen extends React.Component {
	static propTypes = {
		navigation: PropTypes.object
	};

	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<ModalDropdown
				items={options}
				selected={navigation.getParam('level', 0).toString()}
				onSelect={level => {
					level = parseInt(level);
					navigation.setParams({ level });
					setPref('level', level);
				}}
			/>
		),
		headerRight: (
			<View style={styles.margin}>
				<ToggleIconButton
					icon='ios-moon'
					active={navigation.getParam('isMoon', false)}
					onToggle={isMoon => {
						navigation.setParams({ isMoon });
						setPref('isMoon', isMoon);
					}}
				/>
			</View>
		)
	});

	get level() {
		return this.props.navigation.getParam('level', 0);
	}

	get isMoon() {
		return this.props.navigation.getParam('isMoon', false);
	}

	componentDidMount() {
		Promise.all([getPref('level', '0'), getPref('isMoon', false)])
			.then(([level, isMoon]) => this.props.navigation.setParams({ level, isMoon }));
	}

	render() {
		const beastsByCr = () => getBeasts(this.level, this.isMoon).reduce(groupBy(b => b.cr), {});
		return (
			<SectionList
				sections={
					Object.entries(beastsByCr())
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
						<TouchableOpacity onPress={() => this.props.navigation.push('Details', { beast: item })}>
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
}

const styles = StyleSheet.create({
	star: {
		color: textColorDisabled,
		marginLeft: 'auto',
		marginRight: 10
	},
	margin: {
		marginLeft: 10,
		marginRight: 10
	}
});
