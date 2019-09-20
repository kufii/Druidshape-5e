import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import r from 'rnss';
import Modal from 'react-native-modal';
import { Input, Button } from 'react-native-elements';
import buttonStyles from '../../styles/buttons';

export default function ModalTextbox({
	isVisible,
	isRequired,
	text = '',
	onDismiss,
	onSubmit,
	onChangeText
}) {
	const buttonTheme = buttonStyles().bottom;
	const styles = {
		modal: r`h auto`,
		container: r`bc $contentBackgroundColor`,
		textbox: r`c $textColor`,
		textboxContainer: r`mb 5`
	};

	return (
		<Modal isVisible={isVisible} style={styles.modal}>
			<View style={styles.container}>
				<Input
					autoFocus
					selectTextOnFocus={Platform.OS === 'android'}
					value={text}
					onChangeText={onChangeText}
					inputStyle={styles.textbox}
					containerStyle={styles.textboxContainer}
				/>
				<View style={buttonTheme.container}>
					<Button
						title="Cancel"
						type="clear"
						containerStyle={[buttonTheme.button, buttonTheme.cancelButton]}
						titleStyle={buttonTheme.cancelButtonTitle}
						onPress={() => onDismiss?.()}
					/>
					<Button
						title="OK"
						type="clear"
						containerStyle={[buttonTheme.button, buttonTheme.saveButton]}
						titleStyle={buttonTheme.saveButtonTitle}
						onPress={() => {
							if (!text.trim() && isRequired) return;
							onSubmit?.(text);
							onDismiss?.();
						}}
					/>
				</View>
			</View>
		</Modal>
	);
}
ModalTextbox.propTypes = {
	isVisible: PropTypes.bool,
	isRequired: PropTypes.bool,
	text: PropTypes.string,
	onDismiss: PropTypes.func,
	onSubmit: PropTypes.func,
	onChangeText: PropTypes.func
};
