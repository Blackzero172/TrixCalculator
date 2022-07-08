import { useTranslation } from "react-i18next";
import { Button, Dimensions, View } from "react-native";

const LanguageSelector = () => {
	const { t, i18n } = useTranslation();
	return (
		<View
			style={{
				width: Dimensions.get("screen").width,
				height: Dimensions.get("screen").height,
				position: "absolute",
				justifyContent: "flex-start",
				alignItems: "flex-end",
				paddingTop: 40,
				paddingRight: 10,
			}}
		>
			<Button
				title={t("changelng")}
				color="green"
				onPress={() => {
					if (i18n.language === "en") i18n.changeLanguage("ar");
					else i18n.changeLanguage("en");
				}}
			/>
		</View>
	);
};
export default LanguageSelector;
