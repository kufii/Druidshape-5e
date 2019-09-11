import r from 'rnss';

let buttonStyles;
export const rebuild = () =>
	(buttonStyles = {
		icon: {
			buttonStyle: r`ar 1`,
			containerStyle: r`
				br 999999
				jc center
				ai center
				o hidden
			`
		},
		bottom: {
			container: r`
				fd row
				jc space-between
				btc $formButtonColor
				btw hw
			`,
			button: r`w 50%; br 0`,
			cancelButton: r`bc $formButtonColorSecondary`,
			cancelButtonTitle: r`c $formButtonColor`,
			saveButton: r`bc $formButtonColor`,
			saveButtonTitle: r`c #fff`
		}
	});
export default () => buttonStyles;
