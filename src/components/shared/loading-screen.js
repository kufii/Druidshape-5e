import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function LoadingScreen() {
	return (
		<View style={styles.container}>
			<Button loading type='clear' loadingProps={{ size: 'large' }} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
