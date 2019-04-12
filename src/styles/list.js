import { StyleSheet } from 'react-native';

import { listItemHeight, fontSizeStandard, fontSizeMedium } from '../api/constants';

export default theme => StyleSheet.create({
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: fontSizeStandard,
		fontWeight: 'bold',
		backgroundColor: theme.contentBackgroundColorDark,
		color: theme.textColorSecondary
	},
	item: {
		paddingTop: 0,
		paddingBottom: 0,
		height: listItemHeight,
		backgroundColor: theme.contentBackgroundColor
	},
	itemText: {
		fontSize: fontSizeMedium,
		color: theme.textColor
	},
	dividerCompact: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: theme.dividerColor
	},
	divider: {
		backgroundColor: theme.dividerColor
	}
});
