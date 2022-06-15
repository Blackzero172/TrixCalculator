import { useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import CustomInput from "../components/CustomInput";
const screenWidth = Dimensions.get("window").width;
const ComplexPage = ({ playerNames, setPlayer, selectedPlayer, setTempRound, tempRound }) => {
	let currentTakes = 0;
	for (let player in tempRound) {
		currentTakes += tempRound[player].complex.takes;
	}
	const [numOfTakes, setTakes] = useState();
	return (
		<View style={{ alignItems: "center" }}>
			{selectedPlayer === "" && (
				<View style={styles.container}>
					{playerNames.map((name, i) => (
						<Button
							title={name}
							color="green"
							onPress={() => {
								setPlayer(name);
							}}
							key={i}
						/>
					))}
				</View>
			)}
			{selectedPlayer !== "" && (
				<>
					<Text style={{ fontSize: 30 }}>{selectedPlayer}</Text>
					<CustomInput
						label="# of takes"
						placeholder="Enter # of takes"
						value={numOfTakes}
						type="number-pad"
						onChange={(text) => {
							if (+text + currentTakes <= 13) setTakes(text.replace(/\D+/g, ""));
							else setTakes("13");
						}}
					/>
					<Button title="Next" disabled={!numOfTakes} />
					<View style={{ marginTop: 10 }}>
						<Button
							title="Back"
							onPress={() => {
								setPlayer("");
							}}
						/>
					</View>
				</>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: screenWidth,
	},
});
export default ComplexPage;
