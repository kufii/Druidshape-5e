import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AdMobBanner } from 'expo';

const AD_UNIT_ID = 'ca-app-pub-3142513244439092/3434227600';

export default class BannerAd extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<AdMobBanner
					style={styles.bottomBanner}
					bannerSize='fullBanner'
					adUnitId={AD_UNIT_ID}
					testDeviceID='EMULATOR'
					didFailToReceiveAdWithError={e => console.log(e)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333',
		alignItems: 'center'
	},
	bottomBanner: {
		position: 'absolute',
		bottom: 0
	}
});
