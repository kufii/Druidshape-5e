import r from 'rnss';

export default theme => ({
	menuOptions: {
		optionsWrapper: r`bc ${theme.cardColor}`,
		optionText: r`c ${theme.textColor}; m 10`
	},
	rendererProps: {
		anchorStyle: r`bc ${theme.cardColor}`
	}
});
