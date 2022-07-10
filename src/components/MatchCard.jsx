import { StyleSheet, Text, View, Dimensions } from "react-native";
import moment from "moment";
const screenWidth = Dimensions.get("screen").width;
const MatchCard = ({ match }) => {
	return (
		<View style={{ alignItems: "center" }}>
			<Text>{moment(match.timeFinished).format("DD/MM/YYYY HH:MM A")}</Text>
			<View style={styles.container}>
				{match.playerNames.map((name) => (
					<Text style={styles.text}>{name}</Text>
				))}
			</View>
			<View style={styles.container}>
				{match.playerNames.map((name) => (
					<Text style={styles.text}>{match.playerScores[name]}</Text>
				))}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: screenWidth,
		marginTop: 10,
	},
	text: {
		flex: 1,
		textAlign: "center",
	},
});
export default MatchCard;
