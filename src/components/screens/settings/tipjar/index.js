import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import Toast from 'react-native-root-toast';
import * as RNIap from 'react-native-iap';
import { ListItem, Divider } from 'react-native-elements';
import listStyles from '../../../../styles/list';

export default class SettingsScreen extends React.Component {
	static propTypes = {
		screenProps: PropTypes.shape({
			state: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}).isRequired
	};

	static navigationOptions = {
		title: 'Tip Jar'
	};

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
		const listTheme = listStyles(theme);
		const styles = this.styles;

		return (
			<View style={styles.container}>
				<FlatList
					data={state.iaps.filter(p => p.productId.match(/^com\.adpyke\.druidshape\.tip\./))}
					renderItem={({ productId, title, localizedPrice }) => (
						<ListItem
							title={title}
							badge={{ value: localizedPrice }}
							titleStyle={listTheme.itemText}
							containerStyle={listTheme.item}
							onPress={() => RNIap.buyProduct(productId).then(() => Toast.show('Thank for you supporting Druidshape!'))}
						/>
					)}
					keyExtractor={item => item.productId}
					ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
				/>
			</View>
		);
	}
}
