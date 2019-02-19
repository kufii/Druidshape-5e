import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AlertDelete from '../details/alert-delete';
import { icon } from '../../../../api/util';
import listStyles from '../../../../styles/list';
import { iconSizeMedium, iconSizeLarge } from '../../../../api/constants';

export default class HomebrewListScreen extends React.Component {
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

	render() {
		const { screenProps, navigation } = this.props;
		const { state, actions } = screenProps;

		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);
		const styles = this.styles;

		return (
			<View style={styles.container}>
				<FlatList
					ref={list => this.list = list}
					data={state.homebrew.map(({ name }) => name).sort()}
					renderItem={({ item }) => (
						<Swipeout
							backgroundColor={theme.contentBackgroundColorDark}
							buttonWidth={100}
							right={[{
								text: 'Delete',
								type: 'delete',
								onPress: () => AlertDelete(item, actions)
							}]}
						>
							<ListItem
								onPress={() => navigation.navigate('HomebrewDetails', { state, actions, edit: item })}
								title={item}
								titleStyle={listTheme.itemText}
								containerStyle={listTheme.item}
								chevron={{ size: iconSizeLarge }}
							/>
						</Swipeout>
					)}
					keyExtractor={item => item}
					ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
				/>
				<ActionButton
					onPress={() => navigation.navigate('HomebrewDetails', { state, actions })}
					degrees={0}
					buttonColor={theme.fabColor}
				>
					<Icon name={icon('add')} size={iconSizeMedium} color={theme.textColorHeader} />
				</ActionButton>
			</View>
		);
	}
}
