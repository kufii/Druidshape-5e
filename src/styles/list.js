import { StyleSheet } from 'react-native';

import { listItemHeight, listItemHeightCompact, fontSizeStandard, fontSizeMedium, contentBackgroundColorDark, textColorSecondary } from '../api/constants';

export default StyleSheet.create({
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: fontSizeStandard,
		fontWeight: 'bold',
		backgroundColor: contentBackgroundColorDark,
		color: textColorSecondary
	},
	itemCompact: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: 'center',
		height: listItemHeightCompact,
		width: '100%'
	},
	item: {
		paddingTop: 0,
		paddingBottom: 0,
		height: listItemHeight
	},
	itemText: {
		fontSize: fontSizeMedium
	},
	divider: {
		marginLeft: 10,
		marginRight: 10
	}
});
