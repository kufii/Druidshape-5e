import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { icon } from '../../../api/util';
import listStyles from '../../../styles/list';
import { iconSizeMedium, iconSizeLarge, textColorHeader, contentBackgroundColorDark, listIconColor } from '../../../api/constants';

export default class HomebrewScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.object,
		navigation: PropTypes.object
	};

	static navigationOptions = {
		title: 'Homebrew'
	};

	scrollToTop() {
		this.list && this.list.scrollToIndex({ index: 0 });
	}

	componentDidMount() {
		this.props.navigation.setParams({
			scrollToTop: this.scrollToTop.bind(this)
		});
	}

	render() {
		const { state, actions } = this.props.screenProps;

		return (
			<View style={styles.container}>
				<FlatList
					ref={list => this.list = list}
					data={state.homebrew.map(({ name }) => name).sort()}
					renderItem={({ item }) => (
						<ListItem
							onPress={() => this.props.navigation.navigate('HomebrewAdd', { state, actions, edit: item })}
							title={item}
							titleStyle={listStyles.itemText}
							chevron={{ size: iconSizeLarge }}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={() => <Divider />}
				/>
				<ActionButton onPress={() => this.props.navigation.navigate('HomebrewAdd', { state, actions })} degrees={0}>
					<Icon name={icon('add')} size={iconSizeMedium} color={textColorHeader} />
				</ActionButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: contentBackgroundColorDark
	}
});
