import { useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";
import ComplexPage from "./ComplexPage";
const screenWidth = Dimensions.get("window").width;
const RoundPage = ({ roundPhase, setPhase, playerNames, playerScores, rounds, setRound }) => {
	const navigate = useNavigate();
	const [tempRound, setTempRound] = useState({});
	const [selectedPlayer, setPlayer] = useState("");
	const round = rounds[rounds.length - 1] ?? {};
	return (
		<View style={{ alignItems: "center" }}>
			{!roundPhase && (
				<View style={styles.container}>
					<Button
						title="Trix"
						color="green"
						onPress={() => {
							setPhase("Trix");
						}}
					/>
					<Button
						title="Complex"
						color="#d00"
						onPress={() => {
							setPhase("Complex");
						}}
					/>
				</View>
			)}
			{roundPhase === "Trix" && (
				<>
					<View style={styles.container}>
						<Button
							title="Reset"
							color="#d00"
							onPress={() => {
								setTempRound({});
							}}
							disabled={Object.keys(tempRound).length < 1}
						/>
						{!rounds[Object.keys(round)[0]]?.hasOwnProperty("complex") && (
							<Button
								title="Back"
								onPress={() => {
									setPhase();
									setTempRound({});
								}}
							/>
						)}
					</View>
					<View style={[styles.container, { marginVertical: 50 }]}>
						{playerNames.map((name, i) => {
							const player = tempRound[name];
							const hasPlacement = Object.keys(tempRound).includes(name);
							return (
								<View key={i} style={{ alignItems: "center" }}>
									{hasPlacement && (
										<Text>
											{player.trix.placement}
											{player.trix.placement === 1
												? "st"
												: player.trix.placement === 2
												? "nd"
												: player.trix.placement === 3
												? "rd"
												: "th"}
										</Text>
									)}
									<Button
										title={name}
										color="green"
										onPress={() => {
											if (!hasPlacement)
												setTempRound({
													...tempRound,
													[name]: {
														trix: {
															placement: Object.keys(tempRound).length + 1,
															score: 200 - Object.keys(tempRound).length * 50 + playerScores[name],
														},
													},
												});
										}}
										disabled={hasPlacement}
									/>
								</View>
							);
						})}
					</View>
					<Button
						title="Submit"
						disabled={Object.keys(tempRound).length < 4}
						onPress={() => {
							setRound([...rounds, tempRound]);
							setTempRound({});

							if (!rounds[Object.keys(round)[0]]?.hasOwnProperty("complex")) setPhase("Complex");
							else setPhase();
							navigate("/score");
						}}
					/>
				</>
			)}
			{roundPhase === "Complex" && (
				<ComplexPage
					playerNames={playerNames}
					selectedPlayer={selectedPlayer}
					setPlayer={setPlayer}
					setTempRound={setTempRound}
					tempRound={tempRound}
				/>
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
export default RoundPage;
