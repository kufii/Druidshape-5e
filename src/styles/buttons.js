import r from 'rnss';

export default {
	icon: r({
		buttonStyle: 'ar 1',
		containerStyle: `
			br 999999
			jc center
			ai center
			o hidden
		`
	}),
	bottom: theme =>
		r({
			container: `
			fd row
			jc space-between
			btc ${theme.formButtonColor}
			btw hw
		`,
			button: 'w 50%; br 0',
			cancelButton: `bc ${theme.formButtonColorSecondary}`,
			cancelButtonTitle: `c ${theme.formButtonColor}`,
			saveButton: `bc ${theme.formButtonColor}`,
			saveButtonTitle: 'c #fff'
		})
};
