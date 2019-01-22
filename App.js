import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from './src/components/container';

export default function App() {
	return (
		<View style={styles.container}>
			<Container />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
