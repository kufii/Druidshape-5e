import r from 'rnss';

export default () => ({
	menuOptions: {
		optionsWrapper: r`bc $cardColor`,
		optionText: r`c $textColor; m 10`
	},
	rendererProps: {
		anchorStyle: r`bc $cardColor`
	}
});
