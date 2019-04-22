import r from 'rnss';

export default theme => ({
	menuOptions: r({
		optionsWrapper: `bc ${theme.cardColor}`,
		optionText: `c ${theme.textColor}; m 10`
	}),
	rendererProps: r({
		anchorStyle: `bc ${theme.cardColor}`
	})
});
