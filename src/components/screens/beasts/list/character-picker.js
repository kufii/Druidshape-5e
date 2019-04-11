import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ListItem, Divider, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';

import ModalTextbox from '../../../shared/modal-textbox';

import listStyles from '../../../../styles/list';
import { iconSizeLarge, fontSizeLarge } from '../../../../api/constants';
import { icon } from '../../../../api/util';

export default function CharacterPicker({ isVisible, state, actions, onDismiss }) {
	const [characterEditing, setCharacterEditing] = useState();
	const [textboxVisible, setTextboxVisible] = useState(false);
	const [textboxText, setTextboxText] = useState('');

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
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: theme.contentBackgroundColor,
			paddingRight: 10,
			paddingLeft: 10
		},
		headerText: {
			color: theme.textColor,
			fontWeight: 'bold',
			fontSize: fontSizeLarge
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
					<Text style={styles.headerText}>Characters</Text>
					<Button
						onPress={() => {
							setTextboxText('');
							setCharacterEditing(null);
							setTextboxVisible(true);
						}}
						type='clear'
						icon={<Icon size={iconSizeLarge} color={theme.formButtonColor} name={icon('add')} />}
					/>
				</View>
				<Divider style={listTheme.divider} />
				<FlatList
					data={state.characters}
					renderItem={({ item }) => (
						<Swipeout
							autoClose
							backgroundColor={theme.contentBackgroundColorDark}
							buttonWidth={100}
							right={[
								{
									text: 'Rename',
									type: 'primary',
									onPress: () => {
										setTextboxText(item.name);
										setCharacterEditing(item.key);
										setTextboxVisible(true);
									}
								},
								...(state.characters.length > 1 ? [{
									text: 'Delete',
									type: 'delete',
									onPress: () => actions.removeCharacter(item.key)
								}] : [])
							]}
						>
							<ListItem
								onPress={() => {
									actions.selectCharacter(item.key);
									onDismiss && onDismiss();
								}}
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
						</Swipeout>
					)}
					keyExtractor={c => c.key.toString()}
					ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
				/>
			</View>
			<ModalTextbox
				actions={actions}
				isVisible={textboxVisible}
				text={textboxText}
				onChangeText={text => setTextboxText(text)}
				onDismiss={() => setTextboxVisible(false)}
				onSubmit={name => characterEditing ? actions.renameCharacter(characterEditing, name) : actions.addCharacter(name)}
			/>
		</Modal>
	);
}
CharacterPicker.propTypes = {
	isVisible: PropTypes.bool,
	state: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	onDismiss: PropTypes.func
};
