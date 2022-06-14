import { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { useNavigate } from "react-router";

const screenWidth = Dimensions.get("window").width;
const ScorePage = ({ playerNames, playerScores }) => {
	const navigate = useNavigate();

	return (
		<View>
			<View style={styles.container}>
				{playerNames.map((name) => (
					<Text style={styles.text}>{name}</Text>
				))}
			</View>
			<View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
				<Button
					color="gray"
					title="Add Round"
					onPress={() => {
						navigate("/new");
					}}
				/>
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
		justifyContent: "space-evenly",
		width: screenWidth,
	},
	text: {
		flexGrow: 1,
		textAlign: "center",
	},
});
export default ScorePage;
