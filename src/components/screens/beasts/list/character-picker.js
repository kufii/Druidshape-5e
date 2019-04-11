import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import listStyles from '../../../../styles/list';
import { iconSizeLarge } from '../../../../api/constants';
import { icon } from '../../../../api/util';

export default function CharacterPicker(props) {
	const { isVisible, state, actions, onDismiss } = props;
	const theme = actions.getCurrentTheme();

	const styles = StyleSheet.create({
		container: {
			flex: 0.5,
			backgroundColor: theme.contentBackgroundColorDark
		},
		modal: {
			margin: 0,
			justifyContent: 'flex-end'
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
