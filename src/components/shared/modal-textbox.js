import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Input, Button } from 'react-native-elements';

export default function ModalTextbox({ actions, isVisible, text, onDismiss, onSubmit, onChangeText }) {
	const theme = actions.getCurrentTheme();
	const styles = StyleSheet.create({
		modal: {
			height: 'auto'
		},
		container: {
			backgroundColor: theme.contentBackgroundColor
		},
		buttons: {
			marginTop: 5,
			flexDirection: 'row',
			justifyContent: 'space-between',
			borderTopColor: theme.formButtonColor,
			borderTopWidth: StyleSheet.hairlineWidth
		},
		button: {
			width: '50%',
			borderRadius: 0
		},
		cancelButton: {
			backgroundColor: theme.formButtonColorSecondary
		},
		cancelButtonTitle: {
			color: theme.formButtonColor
		},
		okButton: {
			backgroundColor: theme.formButtonColor
		},
		okButtonTitle: {
			color: '#fff'
		}
	});

	return (
		<Modal isVisible={isVisible} style={styles.modal}>
			<View style={styles.container}>
				<Input
					autoFocus
					selectTextOnFocus
					value={text}
					onChangeText={onChangeText}
				/>
				<View style={styles.buttons}>
					<Button
						title='Cancel'
						type='clear'
						containerStyle={[styles.button, styles.cancelButton]}
						buttonStyle={styles.btn}
						titleStyle={styles.cancelButtonTitle}
						onPress={() => onDismiss && onDismiss()}
					/>
					<Button
						title='OK'
						type='clear'
						containerStyle={[styles.button, styles.okButton]}
						buttonStyle={styles.btn}
						titleStyle={styles.okButtonTitle}
						onPress={() => {
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
	text: PropTypes.string,
	onDismiss: PropTypes.func,
	onSubmit: PropTypes.func,
	onChangeText: PropTypes.func
};
