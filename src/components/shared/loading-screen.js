import React from 'react';
import { View } from 'react-native';
import r from 'rnss';
import { Button } from 'react-native-elements';

export default function LoadingScreen() {
	return (
		<View style={r`f 1; ai center; jc center`}>
			<Button loading type='clear' loadingProps={{ size: 'large' }} />
		</View>
	);
}
