import { StyleSheet } from 'react-native';

import { primaryColorDark } from '../api/constants';

export default StyleSheet.create({
	text: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: primaryColorDark,
		alignItems: 'center',
		padding: 10,
		borderRadius: 10
	}
});
