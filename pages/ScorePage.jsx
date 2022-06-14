import { StyleSheet, Text, View } from "react-native";

const ScorePage = ({ playerNames, playerScores }) => {
	return (
		<View>
			<View style={styles.container}>
				{playerNames.map((name) => (
					<Text style={styles.text}>{name}</Text>
				))}
			</View>
			<View style={styles.container}>
				{playerScores.map((score) => (
					<Text style={styles.text}>{score}</Text>
				))}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
	},
	text: {
		flexGrow: 1,
		textAlign: "center",
		backgroundColor: "red",
	},
});
export default ScorePage;
