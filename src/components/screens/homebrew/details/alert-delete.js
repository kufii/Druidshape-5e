import { Alert } from 'react-native';

export default (name, actions, onDelete) =>
	Alert.alert('Confirm Delete', 'Are you sure you want to delete this homebrew?', [
		{
			text: 'Cancel',
			style: 'cancel'
		},
		{
			text: 'OK',
			onPress: () => {
				actions.deleteHomebrew(name);
				onDelete?.();
			}
		}
	]);
