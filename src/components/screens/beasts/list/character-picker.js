import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Divider, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import listStyles from '../../../../styles/list';
import { iconSizeLarge } from '../../../../api/constants';
import { icon } from '../../../../api/util';

export default function CharacterPicker({ isVisible, state, actions, onDismiss }) {
	const theme = actions.getCurrentTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 0.5,
			backgroundColor: theme.contentBackgroundColorDark
		},
		modal: {
			margin: 0,
			justifyContent: 'flex-end'
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			backgroundColor: theme.contentBackgroundColor,
			paddingRight: 10
		}
	});
	const listTheme = listStyles(theme);

	return (
		<Modal
			onBackdropPress={() => onDismiss && onDismiss()}
			onBackButtonPress={() => onDismiss && onDismiss()}
			isVisible={isVisible}
			style={styles.modal}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Button
						type='clear'
						icon={<Icon size={iconSizeLarge} color={theme.formButtonColor} name={icon('add')} />}
					/>
				</View>
				<FlatList
					data={state.characters}
					renderItem={({ item }) => (
						<ListItem
							onPress={() => onDismiss && onDismiss()}
							title={item.name}
							titleStyle={listTheme.itemText}
							containerStyle={listTheme.item}
							rightIcon={(
								<Icon
									size={iconSizeLarge}
									color={item.key === state.selectedCharacter ? theme.formButtonColor : theme.textColorDisabled}
									name={icon(item.key === state.selectedCharacter ? 'radio-button-on' : 'radio-button-off')}
								/>
							)}
						/>
					)}
					keyExtractor={c => c.key.toString()}
					ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
					ListHeaderComponent={() => <Divider style={listTheme.divider} />}
				/>
			</View>
		</Modal>
	);
}
CharacterPicker.propTypes = {
	isVisible: PropTypes.bool,
	state: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	onDismiss: PropTypes.func
};
