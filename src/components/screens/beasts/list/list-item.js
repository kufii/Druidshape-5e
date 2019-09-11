import React from 'react';
import PropTypes from 'prop-types';
import r from 'rnss';
import { ListItem } from 'react-native-elements';
import ToggleIconButton from '../../../shared/toggle-icon-button';
import listStyles from '../../../../styles/list';
import { icon } from '../../../../api/util';

export default class BeastListItem extends React.Component {
	static propTypes = {
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
		const { item, isFav, isSeen, onPress, onFav, onSeen } = this.props;

		return (
			<ListItem
				onPress={onPress}
				title={item}
				containerStyle={[listStyles().item, styles.item]}
				titleStyle={listStyles().itemText}
				leftIcon={
					<ToggleIconButton
						active={isSeen}
						size={r.vars().iconSizeLarge}
						activeIcon={icon('eye')}
						inactiveIcon={icon('eye-off')}
						activeColor={r.vars().formButtonColor}
						inactiveColor={r.vars().textColorDisabled}
						onToggle={onSeen}
					/>
				}
				rightIcon={
					<ToggleIconButton
						active={isFav}
						size={r.vars().iconSizeLarge}
						icon={icon('star')}
						activeColor={r.vars().starColor}
						inactiveColor={r.vars().textColorDisabled}
						onToggle={onFav}
					/>
				}
			/>
		);
	}
}

const styles = {
	item: r`p 0 5`,
	row: r`fd row; ai center`,
	margin: r`m 0 10`
};
