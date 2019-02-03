import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View, Text, SectionList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Divider, Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import ModalDropdown from '../../shared/modal-dropdown';
import ToggleIconButton from '../../shared/toggle-icon-button';
import TextBox from '../../shared/textbox';
import { getPref, setPref } from '../../../api/user-prefs';

import listStyles from '../../../styles/list';
import { iconSizeLarge, fontSizeLarge, textColorDisabled, textColorActive, textColorAccent } from '../../../api/constants';

import { groupBy, sortBy, icon } from '../../../api/util';
import { getBeasts, crToNum, getBeast } from '../../../api/beasts';

const options = [
	{ text: 'All', key: '0' },
	...Array.from(new Array(19), (_, i) => ({ text: `Druid Level ${i + 2}`, key: (i + 2).toString() }))
];

export default class BeastsScreen extends React.Component {
	state = {
		favs: {},
		filter: ''
	};

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
					icon={icon('moon')}
					active={navigation.getParam('isMoon', false)}
					onToggle={isMoon => {
						navigation.setParams({ isMoon });
						setPref('isMoon', isMoon);
						Toast.show(`Circle of the Moon ${isMoon ? 'enabled' : 'disabled'}`);
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
		Promise.all([
			getPref('level', 0),
			getPref('isMoon', false),
			getPref('favs', {})
		]).then(([level, isMoon, favs]) => {
			this.props.navigation.setParams({ level, isMoon });
			this.setState({ favs });
		});
	}

	render() {
		const beasts = getBeasts(this.level, this.isMoon);
		const beastsByCr = beasts.reduce(groupBy(b => b.cr), {});
		const favorites = Object.entries(this.state.favs)
			.filter(([_, isFav]) => isFav)
			.map(([key]) => getBeast(key));

		return (
			<SectionList
				keyboardShouldPersistTaps='always'
				sections={this.state.filter ? [{
					data: beasts.map(({ name }) => name)
						.filter(name => name.toLowerCase().includes(this.state.filter.toLowerCase()))
						.sort()
				}] : [
					...favorites.length ? [{
						title: 'FAVORITES',
						data: favorites.map(({ name }) => name).sort()
					}] : [],
					...Object.entries(beastsByCr)
						.sort(sortBy(
							([cr]) => crToNum(cr)
						))
						.map(([cr, list]) => ({
							title: `CR ${cr}`,
							data: list.map(({ name }) => name).sort()
						}))
				]}
				ListHeaderComponent={(
					<View style={styles.filterContainer}>
						<TextBox
							icon={icon('search')}
							placeholder='Filter Beasts'
							onChangeText={filter => this.setState({ filter })}
							value={this.state.filter}
							clearButtonMode='always'
							returnKeyType='search'
							showCancelButton
						/>
					</View>
				)}
				renderSectionHeader={
					this.state.filter ? null : ({ section }) => <Text style={listStyles.sectionHeader}>{section.title}</Text>
				}
				renderItem={
					({ item }) => (
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Details', { beast: item })}>
							<View style={listStyles.item}>
								<Text style={listStyles.itemText}>{item}</Text>
								{!beasts.find(b => b.name === item) && (
									<Tooltip width={200} popover={<Text style={styles.tooltip}>Your Druid level is too low</Text>}>
										<Icon
											name={icon('alert')}
											size={iconSizeLarge}
											style={styles.margin}
											color={textColorAccent}
										/>
									</Tooltip>
								)}
								<TouchableWithoutFeedback
									onPress={() => this.setState(prev => {
										const favs = Object.assign(prev.favs, { [item]: !prev.favs[item] });
										setPref('favs', favs);
										return { favs };
									})}
								>
									<Icon
										name={icon('star')}
										size={iconSizeLarge}
										style={styles.star}
										color={this.state.favs[item] ? textColorActive : textColorDisabled}
									/>
								</TouchableWithoutFeedback>
							</View>
						</TouchableOpacity>
					)
				}
				keyExtractor={(_, index) => index}
				ItemSeparatorComponent={() => <Divider style={listStyles.divider} />}
			/>
		);
	}
}

const styles = StyleSheet.create({
	star: {
		marginLeft: 'auto',
		marginRight: 10
	},
	margin: {
		marginLeft: 10,
		marginRight: 10
	},
	tooltip: {
		color: '#fff'
	},
	filterContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	}
});
