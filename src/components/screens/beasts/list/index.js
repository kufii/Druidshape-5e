import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text, SectionList } from 'react-native';
import r from 'rnss';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingActionButton from '../../../shared/fab';

import listStyles from '../../../../styles/list';

import { iconSizeMedium } from '../../../../api/constants';
import { withCollapsible, icon, fabOnScroll, flatten } from '../../../../api/util';

import { Header, ExtendedHeader } from './header';
import BeastListItem from './list-item';
import CharacterPicker from './character-picker';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default withCollapsible(
	class BeastListScreen extends React.Component {
		state = { isFabVisible: true, isCharacterPickerVisible: false };

		_listViewHeight = 0;
		_listViewContentHeight = 0;

		static propTypes = {
			screenProps: PropTypes.shape({
				state: PropTypes.object.isRequired,
				actions: PropTypes.object.isRequired
			}).isRequired,
			navigation: PropTypes.object.isRequired,
			collapsible: PropTypes.object.isRequired
		};

		static navigationOptions = Header;

		scrollToTop() {
			this.list &&
				this.list.getNode().scrollToLocation({
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
			this.onScroll = fabOnScroll(
				() => this.state.isFabVisible,
				isFabVisible => this.setState({ isFabVisible }),
				() => this._listViewHeight,
				() => this._listViewContentHeight
			);
		}

		render() {
			const { screenProps, navigation, collapsible } = this.props;
			const { state, actions } = screenProps;
			const { paddingHeight, animatedY } = collapsible;

			const theme = actions.getCurrentTheme();
			const listTheme = listStyles(theme);

			const character = actions.getCurrentCharacter();

			const list = actions.getBeastList();
			this.flattenedList = list.map(({ data }) => data).reduce(flatten, []);

			return (
				<View style={r`f 1; bc ${theme.contentBackgroundColorDark}`}>
					<AnimatedSectionList
						ref={list => (this.list = list)}
						keyboardShouldPersistTaps="always"
						sections={actions.getBeastList()}
						renderSectionHeader={
							state.search
								? null
								: ({ section }) => (
										<Text style={listTheme.sectionHeader}>{section.title}</Text>
								  )
						}
						renderItem={({ item }) => (
							<BeastListItem
								actions={actions}
								state={state}
								item={item.name}
								onPress={() =>
									navigation.navigate('BeastDetails', {
										key: item.key,
										title: item.name,
										list: this.flattenedList
									})
								}
								isFav={character.favs[item.name]}
								isSeen={character.seen[item.name]}
								onFav={() => actions.toggleFav(item.name)}
								onSeen={() => actions.toggleSeen(item.name)}
							/>
						)}
						ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
						contentContainerStyle={{ paddingTop: paddingHeight }}
						scrollIndicatorInsets={{ top: paddingHeight }}
						onScroll={Animated.event(
							[
								{
									nativeEvent: {
										contentOffset: { y: animatedY }
									}
								}
							],
							{
								useNativeDriver: true,
								listener: this.onScroll
							}
						)}
						onLayout={e => (this._listViewHeight = e.nativeEvent.layout.height)}
						onContentSizeChange={(_, height) => (this._listViewContentHeight = height)}
						_mustAddThis={animatedY}
					/>
					<FloatingActionButton
						hidden={!this.state.isFabVisible}
						onPress={() => this.setState({ isCharacterPickerVisible: true })}
						degrees={0}
						buttonColor={theme.fabColor}
						renderIcon={() => (
							<Icon
								name={icon('person')}
								size={iconSizeMedium}
								color={theme.fabIconColor}
							/>
						)}
					/>
					<CharacterPicker
						state={state}
						actions={actions}
						isVisible={this.state.isCharacterPickerVisible}
						onDismiss={() => this.setState({ isCharacterPickerVisible: false })}
					/>
				</View>
			);
		}
	},
	ExtendedHeader
);
