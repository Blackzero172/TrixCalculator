import { useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";
const screenWidth = Dimensions.get("window").width;
const RoundPage = ({ roundPhase, setPhase, playerNames, playerScores, rounds, setRound, setScores }) => {
	const navigate = useNavigate();
	const [tempRound, setTempRound] = useState({});
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
						color="green"
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
							color="red"
							onPress={() => {
								setTempRound({});
							}}
							disabled={Object.keys(tempRound).length < 1}
						/>
						{!rounds.find((round) => Object.keys(round).length < 2) && (
							<Button
								title="Back"
								onPress={() => {
									setPhase();
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
											{player.placement}
											{player.placement === 1
												? "st"
												: player.placement === 2
												? "nd"
												: player.placement === 3
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
														placement: Object.keys(tempRound).length + 1,
														score: 200 - Object.keys(tempRound).length * 50 + playerScores[name],
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
							setRound([...rounds, { trix: tempRound }]);
							setTempRound({});
							if (!rounds.find((round) => Object.keys(round).length < 2)) setPhase("Complex");
							else setPhase();
							navigate("/score");
						}}
					/>
				</>
			)}
			{roundPhase === "Complex" && <></>}
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
