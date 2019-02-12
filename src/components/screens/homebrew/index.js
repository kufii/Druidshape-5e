import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AlertDelete from './details/alert-delete';
import { icon } from '../../../api/util';
import listStyles from '../../../styles/list';
import { iconSizeMedium, iconSizeLarge } from '../../../api/constants';

export default class HomebrewScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.object,
		navigation: PropTypes.object
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
		const { state, actions } = this.props.screenProps;
		const theme = actions.getCurrentTheme();
		const styles = this.styles;
		return (
			<View style={styles.container}>
				<FlatList
					ref={list => this.list = list}
					data={state.homebrew.map(({ name }) => name).sort()}
					renderItem={({ item }) => (
						<Swipeout
							right={[{
								text: 'Delete',
								backgroundColor: theme.swipeoutDeleteColor,
								onPress: () => AlertDelete(item, actions)
							}]}
						>
							<ListItem
								onPress={() => this.props.navigation.navigate('HomebrewDetails', { state, actions, edit: item })}
								title={item}
								titleStyle={listStyles.itemText}
								chevron={{ size: iconSizeLarge }}
							/>
						</Swipeout>
					)}
					keyExtractor={item => item}
					ItemSeparatorComponent={() => <Divider />}
				/>
				<ActionButton onPress={() => this.props.navigation.navigate('HomebrewDetails', { state, actions })} degrees={0}>
					<Icon name={icon('add')} size={iconSizeMedium} color={theme.textColorHeader} />
				</ActionButton>
			</View>
		);
	}
}
