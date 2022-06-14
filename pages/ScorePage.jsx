import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { useNavigate } from "react-router";

const screenWidth = Dimensions.get("window").width;
const ScorePage = ({ playerNames, playerScores }) => {
	const navigate = useNavigate();
	return (
		<View>
			<View style={styles.container}>
				{playerNames.map((name, i) => (
					<Text style={styles.text} key={i}>
						{name}
					</Text>
				))}
			</View>
			<View style={{ paddingHorizontal: 30, marginVertical: 30 }}>
				<Button
					color="green"
					title="Add Round"
					onPress={() => {
						navigate("/new");
					}}
				/>
			</View>
			<View
				style={[
					styles.container,
					{
						borderTopWidth: 2,
						paddingTop: 10,
					},
				]}
			>
				{playerNames.map((name, i) => (
					<Text style={styles.text} key={i * 2}>
						{playerScores[name]}
					</Text>
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
		// borderWidth: 1,
		flex: 1,
		textAlign: "center",
	},
});
export default ScorePage;
