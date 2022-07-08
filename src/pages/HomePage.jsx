import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const HomePage = () => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	return (
		<View style={styles.buttonContainer}>
			<Text style={styles.heading}>{t("title")}</Text>
			<Button
				title={t("start")}
				color="green"
				onPress={() => {
					navigate("/name");
				}}
			/>
			<Button
				title={t("instructions")}
				color="green"
				onPress={() => {
					navigate("/instructions");
				}}
			/>
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
const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "space-between",
		height: 300,
		alignItems: "center",
	},
	heading: {
		fontSize: 40,
		textAlign: "center",
		marginBottom: 30,
	},
});
export default HomePage;
