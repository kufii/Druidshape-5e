import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import r from 'rnss';
import { ListItem, Divider } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import FloatingActionButton from '../../../shared/fab';
import AlertDelete from '../details/alert-delete';
import { fabOnScroll } from '../../../../api/util';
import listStyles from '../../../../styles/list';
import { iconSizeLarge } from '../../../../api/constants';

export default class HomebrewListScreen extends React.Component {
	state = { isFabVisible: true };

	_listViewHeight = 0;
	_listViewContentHeight = 0;

	static propTypes = {
		screenProps: PropTypes.shape({
			state: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}).isRequired,
		navigation: PropTypes.object.isRequired
	};

	static navigationOptions = {
		title: 'Homebrew'
	};

	scrollToTop() {
		this.list && this.list.scrollToOffset({ offset: 0 });
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
		const { screenProps, navigation } = this.props;
		const { state, actions } = screenProps;

		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);

		return (
			<View style={r`f 1; bc ${theme.contentBackgroundColorDark}`}>
				<FlatList
					ref={list => (this.list = list)}
					data={state.homebrew.map(({ name }) => name).sort()}
					renderItem={({ item }) => (
						<Swipeout
							backgroundColor={theme.contentBackgroundColorDark}
							buttonWidth={100}
							right={[
								{
									text: 'Delete',
									type: 'delete',
									onPress: () => AlertDelete(item, actions)
								}
							]}
						>
							<ListItem
								onPress={() =>
									navigation.navigate('HomebrewDetails', { edit: item })
								}
								title={item}
								titleStyle={listTheme.itemText}
								containerStyle={listTheme.item}
								chevron={{ size: iconSizeLarge }}
							/>
						</Swipeout>
					)}
					keyExtractor={item => item}
					ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
					onScroll={this.onScroll}
					onLayout={e => (this._listViewHeight = e.nativeEvent.layout.height)}
					onContentSizeChange={(_, height) => (this._listViewContentHeight = height)}
				/>
				<FloatingActionButton
					hidden={!this.state.isFabVisible}
					onPress={() => navigation.navigate('HomebrewDetails')}
					degrees={0}
					buttonColor={theme.fabColor}
				/>
			</View>
		);
	}
}
