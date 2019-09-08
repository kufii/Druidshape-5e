import React from 'react';
import PropTypes from 'prop-types';
import r from 'rnss';
import { ListItem } from 'react-native-elements';
import ToggleIconButton from '../../../shared/toggle-icon-button';
import listStyles from '../../../../styles/list';
import { icon } from '../../../../api/util';
import { iconSizeLarge } from '../../../../api/constants';

export default class BeastListItem extends React.Component {
	static propTypes = {
		actions: PropTypes.object.isRequired,
		state: PropTypes.object.isRequired,
		item: PropTypes.string.isRequired,
		isFav: PropTypes.bool,
		isSeen: PropTypes.bool,
		onPress: PropTypes.func,
		onFav: PropTypes.func,
		onSeen: PropTypes.func
	};

	shouldComponentUpdate(nextProps) {
		return (
			nextProps.isFav !== this.props.isFav ||
			nextProps.isSeen !== this.props.isSeen ||
			nextProps.state.darkMode !== this.props.state.darkMode
		);
	}

	render() {
		const { actions, item, isFav, isSeen, onPress, onFav, onSeen } = this.props;
		const theme = actions.getCurrentTheme();
		const listTheme = listStyles(theme);

		return (
			<ListItem
				onPress={onPress}
				title={item}
				containerStyle={[listTheme.item, styles.item]}
				titleStyle={listTheme.itemText}
				leftIcon={
					<ToggleIconButton
						active={isSeen}
						size={iconSizeLarge}
						activeIcon={icon('eye')}
						inactiveIcon={icon('eye-off')}
						activeColor={theme.formButtonColor}
						inactiveColor={theme.textColorDisabled}
						onToggle={onSeen}
					/>
				}
				rightIcon={
					<ToggleIconButton
						active={isFav}
						size={iconSizeLarge}
						icon={icon('star')}
						activeColor={theme.starColor}
						inactiveColor={theme.textColorDisabled}
						onToggle={onFav}
					/>
				}
			/>
		);
	}
}

const styles = r({
	item: 'p 0 5',
	row: 'fd row; ai center',
	margin: 'm 0 10'
});
