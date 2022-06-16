import { StyleSheet, Text, View } from "react-native";

const PlayerScoreCard = ({ player }) => {
	const total = player.trix.score ?? 0 - player.complex.score ?? 0;
	return (
		<View style={{ alignItems: "center", flex: 1 }}>
			<View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
				<Text style={{ fontSize: 13, borderRightWidth: 1, paddingHorizontal: 3, color: "green" }}>Trix</Text>
				<Text style={{ fontSize: 13, paddingHorizontal: 3, color: "#d00" }}>Comp</Text>
			</View>
			<View style={styles.textContainer}>
				{player.hasOwnProperty("trix") ? (
					<Text style={styles.trixText}>{player.trix.score}</Text>
				) : (
					<Text>---</Text>
				)}
				<Text style={{ padding: 3, color: "#d00" }}>---</Text>
			</View>
			<Text style={{ color: total > 0 ? "green" : total < 0 ? "#d00" : "black" }}>
				{total > 0 ? "+" : total < 0 ? "-" : ""}
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