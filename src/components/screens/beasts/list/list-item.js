import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Menu, MenuTrigger, MenuOptions, MenuOption, renderers as MenuRenderers } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleIconButton from '../../../shared/toggle-icon-button';
import listStyles from '../../../../styles/list';
import menuStyles from '../../../../styles/menu';
import { icon } from '../../../../api/util';
import { iconSizeLarge } from '../../../../api/constants';

export default class BeastListItem extends React.Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		state: PropTypes.object.isRequired,
		item: PropTypes.string.isRequired,
		showTooltip: PropTypes.bool,
		isFav: PropTypes.bool,
		onPress: PropTypes.func,
		onFav: PropTypes.func
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.isFav !== this.props.isFav
			|| nextProps.showTooltip !== this.props.showTooltip
			|| nextProps.state.darkMode !== this.props.state.darkMode;
	}

	render() {
		const { actions, item, showTooltip, isFav, onPress, onFav } = this.props;
		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);
		const menuTheme = menuStyles(theme);

		return (
			<ListItem
				onPress={onPress}
				title={(
					<View style={styles.row}>
						<Text style={listTheme.itemText}>{item}</Text>
						{showTooltip && (
							<Menu renderer={MenuRenderers.Popover} rendererProps={menuTheme.rendererProps}>
								<MenuTrigger>
									<Icon
										name={icon('alert')}
										size={iconSizeLarge}
										style={styles.margin}
										color={theme.alertColor}
									/>
								</MenuTrigger>
								<MenuOptions customStyles={menuTheme.menuOptions}>
									<MenuOption text='Your Druid level is too low' />
								</MenuOptions>
							</Menu>
						)}
					</View>
				)}
				containerStyle={[listTheme.item, styles.item]}
				titleStyle={listTheme.itemText}
				rightIcon={(
					<ToggleIconButton
						active={isFav}
						icon={icon('star')}
						size={iconSizeLarge}
						activeColor={theme.starColor}
						inactiveColor={theme.textColorDisabled}
						onToggle={onFav}
					/>
				)}
			/>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	item: {
		paddingRight: 10
	},
	margin: {
		marginLeft: 10,
		marginRight: 10
	}
});
