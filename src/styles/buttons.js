import r from 'rnss';

export default {
	icon: {
		buttonStyle: r`ar 1`,
		containerStyle: r`
			br 999999
			jc center
			ai center
			o hidden
		`
	},
	bottom: theme => ({
		container: r`
			fd row
			jc space-between
			btc ${theme.formButtonColor}
			btw hw
		`,
		button: r`w 50%; br 0`,
		cancelButton: r`bc ${theme.formButtonColorSecondary}`,
		cancelButtonTitle: r`c ${theme.formButtonColor}`,
		saveButton: r`bc ${theme.formButtonColor}`,
		saveButtonTitle: r`c #fff`
	})
};
