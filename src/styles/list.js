import { StyleSheet } from 'react-native';

import { listItemHeight, fontSizeStandard, fontSizeLarge, primaryColor, textColorSecondary } from '../api/constants.js';

export default StyleSheet.create({
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: fontSizeStandard,
		fontWeight: 'bold',
		backgroundColor: primaryColor,
		color: textColorSecondary
	},
	item: {
		padding: 10,
		fontSize: fontSizeLarge,
		height: listItemHeight
	},
	divider: {
		marginLeft: 10,
		marginRight: 10
	}
});
