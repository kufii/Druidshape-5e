import React, { useState } from 'react';
import { View, FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import r from 'rnss';
import { ListItem, Divider } from 'react-native-elements';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Swipeout from 'react-native-swipeout';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import ModalTextbox from '../../../shared/modal-textbox';
import IconButton from '../../../shared/icon-button';

import listStyles from '../../../../styles/list';
import menuStyles from '../../../../styles/menu';
import { icon } from '../../../../api/util';

export default function CharacterPicker({ isVisible, state, actions, onDismiss }) {
	const [characterEditing, setCharacterEditing] = useState();
	const [textboxVisible, setTextboxVisible] = useState(false);
	const [textboxText, setTextboxText] = useState('');
	const [contextMenuOpen, setContextMenuOpen] = useState();

	const triggerAdd = () => {
		setTextboxText('');
		setCharacterEditing(null);
		setTextboxVisible(true);
	};

	const triggerRename = key => {
		const character = state.characters.find(c => c.key === key);
		setTextboxText(character.name);
		setCharacterEditing(key);
		setTextboxVisible(true);
	};

	const dismiss = () => {
		setContextMenuOpen(null);
		onDismiss && onDismiss();
	};

	const styles = {
		backdrop: r`f 0.5`,
		container: r`f 0.5; bc $contentBackgroundColorDark`,
		modal: r`m 0; jc flex-end`,
		header: r`
			fd row
			jc space-between
			ai center
			bc $contentBackgroundColor
			pr 5; pl 10
		`,
		headerText: r`
			c $textColor
			fw bold
			fs $fontSizeLarge
		`
	};
	const listTheme = listStyles();
	const menuTheme = menuStyles();

	return (
		<Modal
			onBackdropPress={dismiss}
			onBackButtonPress={dismiss}
			isVisible={isVisible}
			style={styles.modal}
		>
			<MenuProvider skipInstanceCheck>
				<TouchableWithoutFeedback onPress={dismiss}>
					<View style={styles.backdrop} />
				</TouchableWithoutFeedback>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.headerText}>Characters</Text>
						<IconButton
							icon={icon('add')}
							color={r.vars().formButtonColor}
							size={r.vars().iconSizeLarge}
							onPress={() => triggerAdd()}
						/>
					</View>
					<Divider style={listTheme.divider} />
					<FlatList
						data={state.characters}
						renderItem={({ item }) => (
							<Swipeout
								autoClose
								backgroundColor={r.vars().contentBackgroundColorDark}
								buttonWidth={100}
								right={[
									{
										text: 'Rename',
										type: 'primary',
										onPress: () => triggerRename(item.key)
									},
									...(state.characters.length > 1
										? [
												{
													text: 'Delete',
													type: 'delete',
													onPress: () => actions.removeCharacter(item.key)
												}
										  ]
										: [])
								]}
							>
								<Menu
									opened={contextMenuOpen === item.key}
									onBackdropPress={() => setContextMenuOpen(null)}
									onSelect={cmd => {
										cmd === 'rename'
											? triggerRename(item.key)
											: actions.removeCharacter(item.key);
										setContextMenuOpen(null);
									}}
								>
									<MenuTrigger disabled>
										<ListItem
											onPress={() => {
												actions.selectCharacter(item.key);
												dismiss();
											}}
											onLongPress={() => setContextMenuOpen(item.key)}
											title={item.name}
											titleStyle={listTheme.itemText}
											containerStyle={listTheme.item}
											rightIcon={
												<Icon
													size={r.vars().iconSizeLarge}
													color={
														item.key === state.selectedCharacter
															? r.vars().formButtonColor
															: r.vars().textColorDisabled
													}
													name={icon(
														item.key === state.selectedCharacter
															? 'radio-button-on'
															: 'radio-button-off'
													)}
												/>
											}
										/>
									</MenuTrigger>
									<MenuOptions customStyles={menuTheme.menuOptions}>
										<MenuOption text="Rename" value="rename" />
										{state.characters.length > 1 && (
											<MenuOption text="Delete" value="delete" />
										)}
									</MenuOptions>
								</Menu>
							</Swipeout>
						)}
						keyExtractor={c => c.key.toString()}
						ItemSeparatorComponent={() => <Divider style={listTheme.divider} />}
					/>
				</View>
			</MenuProvider>
			<ModalTextbox
				isRequired
				isVisible={textboxVisible}
				text={textboxText}
				onChangeText={text => setTextboxText(text)}
				onDismiss={() => setTextboxVisible(false)}
				onSubmit={name =>
					characterEditing
						? actions.renameCharacter(characterEditing, name)
						: actions.addCharacter(name)
				}
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
