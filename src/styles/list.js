import { StyleSheet } from 'react-native';

import { listItemHeight, listItemHeightCompact, fontSizeStandard, fontSizeMedium } from '../api/constants';

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
	itemCompact: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: 'center',
		height: listItemHeightCompact,
		width: '100%',
		backgroundColor: theme.contentBackgroundColor
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
