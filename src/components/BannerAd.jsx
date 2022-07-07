import { AdMobBanner } from "expo-ads-admob";
import { Dimensions, View } from "react-native";
const BannerAd = () => {
	const screenHeight = Dimensions.get("screen").height;
	const unitID = "ca-app-pub-3940256099942544/6300978111";

	return (
		<View
			style={{ height: screenHeight, justifyContent: "flex-end", alignItems: "center", position: "absolute" }}
		>
			<AdMobBanner
				adUnitID={unitID}
				bannerSize="smartBanner"
				servePersonalizedAds={true}
				style={{
					padding: 30,
				}}
			/>
		</View>
	);
};
export default BannerAd;
