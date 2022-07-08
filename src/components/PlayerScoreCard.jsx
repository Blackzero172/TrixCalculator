import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

const PlayerScoreCard = ({ player }) => {
	const { t } = useTranslation();
	const total = (player.trix?.score || 0) + (player.complex?.score || 0);
	return (
		<View style={{ alignItems: "center", flex: 1 }}>
			<View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
				<Text style={{ fontSize: 13, borderRightWidth: 1, paddingHorizontal: 3, color: "green" }}>
					{t("trix")}
				</Text>
				<Text style={{ fontSize: 13, paddingHorizontal: 3, color: "#d00" }}>{t("comp")}</Text>
			</View>
			<View style={styles.textContainer}>
				{player.hasOwnProperty("trix") ? (
					<Text style={styles.trixText}>+{player.trix.score}</Text>
				) : (
					<Text style={styles.trixText}>---</Text>
				)}
				{player.hasOwnProperty("complex") ? (
					<Text
						style={{
							padding: 3,
							color: player.complex.score > 0 ? "green" : player.complex.score < 0 ? "#d00" : "black",
						}}
					>
						{player.complex.score > 0 ? "+" : ""}
						{player.complex.score}
					</Text>
				) : (
					<Text>---</Text>
				)}
			</View>
			<Text style={{ color: total > 0 ? "green" : total < 0 ? "#d00" : "black" }}>
				{total > 0 ? "+" : ""}
				{total}
			</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	trixText: {
		borderRightWidth: 1,
		padding: 3,
		color: "green",
	},
	textContainer: {
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
});
export default PlayerScoreCard;
