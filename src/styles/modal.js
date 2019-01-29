import { StyleSheet } from 'react-native';
import { headerHeight, contentBackgroundColor } from '../api/constants';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.5)',
		marginTop: headerHeight
	},
	content: {
		flex: 1,
		width: '95%',
		backgroundColor: contentBackgroundColor,
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 12
	}
});
