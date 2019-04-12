import { StyleSheet } from 'react-native';

export default theme => ({
	menuOptions: StyleSheet.create({
		optionsWrapper: {
			backgroundColor: theme.cardColor
		},
		optionText: {
			color: theme.textColor,
			margin: 10
		}
	}),
	rendererProps: StyleSheet.create({
		anchorStyle: {
			backgroundColor: theme.cardColor
		}
	})
});
