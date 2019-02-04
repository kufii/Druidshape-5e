import { StyleSheet } from 'react-native';

import { listItemHeight, fontSizeStandard, fontSizeMedium, contentBackgroundColorDark, textColorSecondary } from '../api/constants';

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
	item: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: 'center',
		height: listItemHeight,
		width: '100%'
	},
	itemText: {
		fontSize: fontSizeMedium
	},
	divider: {
		marginLeft: 10,
		marginRight: 10
	}
});
