import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleIconButton from '../../../shared/toggle-icon-button';
import listStyles from '../../../../styles/list';
import { icon } from '../../../../api/util';
import { iconSizeLarge } from '../../../../api/constants';

export default function BeastListItem({ actions, state, navigation, item, showTooltip }) {
	const theme = actions.getCurrentTheme();
	const listTheme = listStyles(theme);

	return (
		<ListItem
			onPress={() => navigation.navigate('BeastDetails', { beast: item, state, actions })}
			title={(
				<View style={styles.row}>
					<Text style={listTheme.itemText}>{item}</Text>
					{showTooltip && (
						<Tooltip width={200} popover={<Text style={styles.tooltip}>Your Druid level is too low</Text>}>
							<Icon
								name={icon('alert')}
								size={iconSizeLarge}
								style={styles.margin}
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
	);
}
BeastListItem.propTypes = {
	actions: PropTypes.object,
	state: PropTypes.object,
	navigation: PropTypes.object,
	item: PropTypes.string,
	showTooltip: PropTypes.bool
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	tooltip: {
		color: '#fff'
	},
	item: {
		paddingRight: 10
	},
	margin: {
		marginLeft: 10,
		marginRight: 10
	}
});
