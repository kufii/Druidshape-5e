import { StyleSheet } from 'react-native';

export default {
	icon: StyleSheet.create({
		buttonStyle: {
			aspectRatio: 1
		},
		containerStyle: {
			borderRadius: 999999,
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden'
		}
	}),
	bottom: theme => ({
		container: {
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
		saveButton: {
			backgroundColor: theme.formButtonColor
		},
		saveButtonTitle: {
			color: '#fff'
		}
	})
};
