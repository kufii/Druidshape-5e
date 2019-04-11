export default theme => ({
	menuOptions: {
		optionsWrapper: {
			backgroundColor: theme.cardColor
		},
		optionText: {
			color: theme.textColor,
			margin: 10
		}
	},
	rendererProps: {
		anchorStyle: {
			backgroundColor: theme.cardColor
		}
	}
});
