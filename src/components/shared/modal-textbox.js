import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Input, Button } from 'react-native-elements';
import buttonStyle from '../../styles/buttons';

export default function ModalTextbox({ actions, isVisible, isRequired, text='', onDismiss, onSubmit, onChangeText }) {
	const theme = actions.getCurrentTheme();
	const buttonTheme = buttonStyle.bottom(theme);
	const styles = StyleSheet.create({
		modal: {
			height: 'auto'
		},
		container: {
			backgroundColor: theme.contentBackgroundColor
		},
		textbox: {
			color: theme.textColor
		}
	});

	return (
		<Modal isVisible={isVisible} style={styles.modal}>
			<View style={styles.container}>
				<Input
					autoFocus
					selectTextOnFocus={Platform.OS === 'android'}
					value={text}
					onChangeText={onChangeText}
					inputStyle={styles.textbox}
				/>
				<View style={buttonTheme.container}>
					<Button
						title='Cancel'
						type='clear'
						containerStyle={[buttonTheme.button, buttonTheme.cancelButton]}
						titleStyle={buttonTheme.cancelButtonTitle}
						onPress={() => onDismiss && onDismiss()}
					/>
					<Button
						title='OK'
						type='clear'
						containerStyle={[buttonTheme.button, buttonTheme.saveButton]}
						titleStyle={buttonTheme.saveButtonTitle}
						onPress={() => {
							if (!text.trim() && isRequired) return;
							onSubmit && onSubmit(text);
							onDismiss && onDismiss();
						}}
					/>
				</View>
			</View>
		</Modal>
	);
}
ModalTextbox.propTypes = {
	actions: PropTypes.object.isRequired,
	isVisible: PropTypes.bool,
	isRequired: PropTypes.bool,
	text: PropTypes.string,
	onDismiss: PropTypes.func,
	onSubmit: PropTypes.func,
	onChangeText: PropTypes.func
};
