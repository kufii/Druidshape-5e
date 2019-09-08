import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import r from 'rnss';
import { ListItem, Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
import { iconSizeLarge, modalMargin } from '../../../../api/constants';
import listStyles from '../../../../styles/list';

export default function BeastPicker({ actions, isVisible, onDismiss, onSelect }) {
	const beasts = actions
		.getAllBeasts()
		.map(({ name }) => name)
		.sort();
	const theme = actions.getCurrentTheme();
	const listTheme = listStyles(theme);

	const dismiss = () => onDismiss && onDismiss();

	return (
		<Modal
			style={r`m ${modalMargin}`}
			isVisible={isVisible}
			onBackdropPress={dismiss}
			onBackButtonPress={dismiss}
		>
			<FlatList
				data={beasts}
				renderItem={({ item }) => (
					<ListItem
						onPress={() => {
							onSelect && onSelect(item);
							dismiss();
						}}
						chevron={{ size: iconSizeLarge }}
						title={item}
						titleStyle={listTheme.itemText}
						containerStyle={listTheme.item}
					/>
				)}
				keyExtractor={item => item}
				ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
			/>
		</Modal>
	);
}
BeastPicker.propTypes = {
	actions: PropTypes.object.isRequired,
	isVisible: PropTypes.bool,
	onDismiss: PropTypes.func,
	onSelect: PropTypes.func
};
