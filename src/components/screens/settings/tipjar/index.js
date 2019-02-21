import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Toast from 'react-native-root-toast';
import * as RNIap from 'react-native-iap';
import { ListItem, Divider } from 'react-native-elements';
import { fontSizeMedium } from '../../../../api/constants';
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
				backgroundColor: theme.contentBackgroundColor
			},
			disclaimer: {
				color: theme.textColor,
				fontSize: fontSizeMedium,
				padding: 10,
				flexWrap: 'wrap'
			},
			badge: {
				backgroundColor: theme.formButtonColor,
				borderColor: 'transparent'
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
				<Text style={styles.disclaimer}>
					{"If you've been enjoying Druidshape, and would like to show your support, please consider leaving a tip. This is obviously not mandatory and just the fact that you're using my app is extremely appreciated. Thanks! :)"}
				</Text>
				<FlatList
					data={state.iaps.filter(p => p.productId.match(/^com\.adpyke\.druidshape\.tip\./))}
					renderItem={({ item: { productId, title, localizedPrice } }) => (
						<ListItem
							title={title}
							badge={{ value: localizedPrice, badgeStyle: styles.badge }}
							titleStyle={listTheme.itemText}
							containerStyle={listTheme.item}
							onPress={() => RNIap.buyProduct(productId).then(() => Toast.show('Thank for you supporting Druidshape!'))}
						/>
					)}
					keyExtractor={item => item.productId}
					ListHeaderComponent={() => <Divider style={listTheme.divider} />}
					ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
					ListFooterComponent={() => <Divider style={listTheme.divider} />}
				/>
			</View>
		);
	}
}
