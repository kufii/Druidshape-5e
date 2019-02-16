import React from 'react';
import { AdMobBanner } from 'react-native-admob';

const BANNER_ID = 'ca-app-pub-1425926517331745/4139536433';

export default function BannerAd() {
	return (
		<AdMobBanner
			bannerSize='fullBanner'
			adUnitID={BANNER_ID}
			didFailToReceiveAdWithError={e => console.log(e)}
		/>
	);
}
