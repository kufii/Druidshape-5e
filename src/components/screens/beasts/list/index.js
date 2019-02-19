import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View, Text, SectionList } from 'react-native';
import { Divider } from 'react-native-elements';

import listStyles from '../../../../styles/list';

import { withCollapsible, groupBy, sortBy } from '../../../../api/util';
import { filterBeasts, crToNum } from '../../../../api/beasts';

import { Header, ExtendedHeader } from './header';
import BeastListItem from './list-item';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default withCollapsible(class BeastListScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.shape({
			state: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}).isRequired,
		navigation: PropTypes.object.isRequired,
		collapsible: PropTypes.object.isRequired
	};

	static navigationOptions = Header;

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
		const { screenProps, navigation, collapsible } = this.props;
		const { state, actions } = screenProps;
		const { paddingHeight, animatedY, onScroll } = collapsible;

		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);
		const styles = this.styles;

		const allBeasts = actions.getAllBeasts();
		const beasts = filterBeasts(allBeasts, state.level, state.isMoon, this.filter);
		const beastsByCr = beasts.reduce(groupBy(b => b.cr.toString().trim()), {});
		const favorites = actions.getFavorites();

		const getData = (beasts, prefix='item') => beasts.map(b => ({ ...b, key: `${prefix}-${b.name}` })).sort(sortBy(b => b.name));
		const sections = this.filter ? [{
			data: getData(beasts)
		}] : [
			...(favorites.length ? [{
				key: 'favs',
				title: 'FAVORITES',
				data: getData(favorites, 'fav')
			}] : []),
			...Object.entries(beastsByCr)
				.sort(sortBy(
					([cr]) => crToNum(cr)
				))
				.map(([cr, list]) => ({
					key: cr.toString(),
					title: `CR ${cr}`,
					data: getData(list)
				}))
		];

		return (
			<View style={styles.container}>
				<AnimatedSectionList
					ref={list => this.list = list}
					keyboardShouldPersistTaps='always'
					sections={sections}
					renderSectionHeader={
						this.filter ? null : ({ section }) => <Text style={listTheme.sectionHeader}>{section.title}</Text>
					}
					renderItem={
						({ item }) => (
							<BeastListItem
								actions={actions}
								state={state}
								item={item.name}
								showTooltip={!beasts.find(b => b.name === item.name)}
								isFav={state.favs[item.name]}
								onPress={() => navigation.navigate('BeastDetails', { beast: item.name, state, actions })}
								onFav={() => actions.toggleFav(item.name)}
							/>
						)
					}
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
