import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import r from 'rnss';
import { ListItem, Divider } from 'react-native-elements';
import { titlecase, sortBy } from '../../../../api/util';
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
		return r({
			container: `f 1; bc ${theme.contentBackgroundColor}`,
			disclaimer: `
				c ${theme.textColor}
				fs ${fontSizeMedium}
				p 10
				flex-wrap wrap
			`,
			badge: `bc ${theme.formButtonColor}; border-color transparent`
		});
	}

	componentDidMount() {
		this.props.screenProps.actions.loadProducts();
	}

	render() {
		const { state, actions } = this.props.screenProps;
		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);
		const styles = this.styles;
		const getTitle = productId => {
			const [_, type] = productId.match(/^com\.adpyke\.druidshape\.tip\.(.+)/);
			return `${titlecase(type)} Tip`;
		};
		const extractNumber = price => {
			const [_, num] = price.match(/([\d.]+)/);
			return parseFloat(num);
		};

		return (
			<View style={styles.container}>
				<Text style={styles.disclaimer}>
					{
						"If you've been enjoying Druidshape, and would like to show your support, please consider leaving a tip. This is obviously not mandatory and just the fact that you're using my app is extremely appreciated. Thanks! :)"
					}
				</Text>
				<FlatList
					data={state.iaps
						.filter(p => p.productId.match(/^com\.adpyke\.druidshape\.tip\./))
						.sort(sortBy(({ localizedPrice }) => extractNumber(localizedPrice)))}
					renderItem={({ item: { productId, localizedPrice } }) => (
						<ListItem
							title={getTitle(productId)}
							badge={{ value: localizedPrice, badgeStyle: styles.badge }}
							titleStyle={listTheme.itemText}
							containerStyle={listTheme.item}
							onPress={() => actions.buyProduct(productId)}
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
