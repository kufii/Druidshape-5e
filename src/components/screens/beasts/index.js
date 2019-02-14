import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Animated, StyleSheet, View, Text, SectionList } from 'react-native';
import { Divider, Tooltip, SearchBar, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import ModalDropdown from '../../shared/modal-dropdown';
import ToggleIconButton from '../../shared/toggle-icon-button';

import listStyles from '../../../styles/list';
import { iconSizeLarge } from '../../../api/constants';

import { withCollapsible, groupBy, sortBy, icon } from '../../../api/util';
import { filterBeasts, crToNum } from '../../../api/beasts';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const options = [
	{ text: 'All', key: '0' },
	...Array.from(new Array(19), (_, i) => ({ text: `Druid Level ${i + 2}`, key: (i + 2).toString() }))
];

const ExtendedHeader = ({ navigation, screenProps }) => {
	const { actions } = screenProps;
	const theme = actions.getCurrentTheme();

	const styles = StyleSheet.create({
		filterContainer: {
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: Platform.OS === 'android' ? 10 : 0,
			paddingRight: Platform.OS === 'android' ? 10 : 0,
			backgroundColor: theme.headerColor
		},
		filter: {
			backgroundColor: theme.headerColorLight,
			borderRadius: 20
		},
		filterText: {
			color: theme.headerTextColor
		}
	});

	return (
		<SearchBar
			platform={Platform.OS}
			containerStyle={styles.filterContainer}
			inputContainerStyle={styles.filter}
			placeholderTextColor={theme.headerTextColorFaded}
			color={theme.headerTextColor}
			clearIcon={styles.filterText}
			searchIcon={styles.filterText}
			cancelIcon={styles.filterText}
			inputStyle={styles.filterText}
			placeholder='Filter Beasts'
			cancelButtonTitle='Cancel'
			cancelButtonProps={{
				buttonStyle: 'clear',
				color: theme.headerTextColor
			}}
			onChangeText={filter => navigation.setParams({ filter })}
			value={navigation.getParam('filter', '')}
		/>
	);
};
ExtendedHeader.propTypes = {
	navigation: PropTypes.object,
	screenProps: PropTypes.object
};

export default withCollapsible(class BeastsScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.object,
		navigation: PropTypes.object,
		collapsible: PropTypes.object
	};

	static navigationOptions = ({ screenProps }) => {
		const { state, actions } = screenProps;
		const theme = actions.getCurrentTheme();
		return {
			headerTitle: (
				<ModalDropdown
					state={state}
					actions={actions}
					style={globalStyles.marginLarge}
					items={options}
					selected={state.level.toString()}
					onSelect={actions.setLevel}
				/>
			),
			headerRight: (
				<View style={globalStyles.margin}>
					<ToggleIconButton
						icon={icon('moon')}
						active={state.isMoon}
						onToggle={isMoon => {
							actions.toggleMoon();
							Toast.show(`Circle of the Moon ${isMoon ? 'enabled' : 'disabled'}`);
						}}
						activeColor={theme.headerTextColor}
						inactiveColor={theme.headerColorLight}
					/>
				</View>
			)
		};
	};

	get filter() {
		return this.props.navigation.getParam('filter', '');
	}

	get styles() {
		const { actions } = this.props.screenProps;
		const theme = actions.getCurrentTheme();

		return StyleSheet.create({
			container: {
				flex: 1,
				backgroundColor: theme.contentBackgroundColorDark
			},
			row: {
				flexDirection: 'row',
				alignItems: 'center'
			},
			tooltip: {
				color: '#fff'
			},
			item: {
				paddingRight: 10
			}
		});
	}

	scrollToTop() {
		this.list && this.list.getNode().scrollToLocation({
			itemIndex: 0,
			sectionIndex: 0,
			viewPosition: 100,
			animated: true
		});
	}

	componentDidMount() {
		this.props.navigation.setParams({
			scrollToTop: this.scrollToTop.bind(this)
		});
	}

	render() {
		const { state, actions } = this.props.screenProps;
		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);
		const styles = this.styles;

		const allBeasts = actions.getAllBeasts();
		const beasts = filterBeasts(allBeasts, state.level, state.isMoon, this.filter);
		const beastsByCr = beasts.reduce(groupBy(b => b.cr.toString().trim()), {});
		const favorites = actions.getFavorites();

		const { paddingHeight, animatedY, onScroll } = this.props.collapsible;

		return (
			<View style={styles.container}>
				<AnimatedSectionList
					ref={list => this.list = list}
					keyboardShouldPersistTaps='always'
					sections={this.filter ? [{
						data: beasts.map(({ name }) => name).sort()
					}] : [
						...(favorites.length ? [{
							title: 'FAVORITES',
							data: favorites.map(({ name }) => name).sort()
						}] : []),
						...Object.entries(beastsByCr)
							.sort(sortBy(
								([cr]) => crToNum(cr)
							))
							.map(([cr, list]) => ({
								title: `CR ${cr}`,
								data: list.map(({ name }) => name).sort()
							}))
					]}
					renderSectionHeader={
						this.filter ? null : ({ section }) => <Text style={listTheme.sectionHeader}>{section.title}</Text>
					}
					renderItem={
						({ item }) => (
							<ListItem
								onPress={() => this.props.navigation.navigate('Details', { beast: item, state, actions })}
								title={(
									<View style={styles.row}>
										<Text style={listTheme.itemText}>{item}</Text>
										{!beasts.find(b => b.name === item) && (
											<Tooltip width={200} popover={<Text style={styles.tooltip}>Your Druid level is too low</Text>}>
												<Icon
													name={icon('alert')}
													size={iconSizeLarge}
													style={globalStyles.margin}
													color={theme.alertColor}
												/>
											</Tooltip>
										)}
									</View>
								)}
								containerStyle={[listTheme.item, styles.item]}
								titleStyle={listTheme.itemText}
								rightIcon={(
									<ToggleIconButton
										active={state.favs[item]}
										icon={icon('star')}
										size={iconSizeLarge}
										activeColor={theme.starColor}
										inactiveColor={theme.textColorDisabled}
										onToggle={() => actions.toggleFav(item)}
									/>
								)}
							/>
						)
					}
					keyExtractor={(_, index) => index}
					ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
					contentContainerStyle={{ paddingTop: paddingHeight }}
					scrollIndicatorInsets={{ top: paddingHeight }}
					onScroll={onScroll}
					_mustAddThis={animatedY}
				/>
			</View>
		);
	}
}, ExtendedHeader);

const globalStyles = StyleSheet.create({
	margin: {
		marginLeft: 10,
		marginRight: 10
	},
	marginLarge: {
		marginLeft: 20,
		marginRight: 20
	}
});
