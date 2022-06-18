import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import ComplexPage from "./ComplexPage";
import {
	setRoundPhase,
	setRounds,
	selectPlayer,
	setCurrentCards,
	setCurrentRound,
} from "../actions/actionCreators";
const screenWidth = Dimensions.get("window").width;
const RoundPage = ({
	roundPhase,
	setRoundPhase,
	playerNames,
	rounds,
	setRounds,
	currentRound,
	setCurrentRound,
}) => {
	const navigate = useNavigate();
	let lastRound = rounds[rounds.length - 1] || {};
	let lastRoundPlayer = lastRound[Object.keys(lastRound)[0]] || {};
	const newRoundCondition =
		!lastRoundPlayer.hasOwnProperty("complex") ||
		(lastRoundPlayer.hasOwnProperty("complex") && lastRoundPlayer.hasOwnProperty("trix"));
	return (
		<View style={{ alignItems: "center" }}>
			{!roundPhase && (
				<>
					<View style={styles.container}>
						<Button
							title="Trix"
							color="green"
							onPress={() => {
								setRoundPhase("Trix");
							}}
						/>
						<Button
							title="Complex"
							color="green"
							onPress={() => {
								setRoundPhase("Complex");
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button
							title="Back"
							color="#d00"
							onPress={() => {
								navigate("/score");
							}}
						/>
					</View>
				</>
			)}
			{roundPhase === "Trix" && (
				<>
					<View style={styles.container}>
						<Button
							title="Reset"
							color="#d00"
							onPress={() => {
								setCurrentRound({});
							}}
							disabled={Object.keys(currentRound).length < 1}
						/>
						{newRoundCondition && (
							<Button
								title="Back"
								onPress={() => {
									setRoundPhase(null);
									setCurrentRound({});
								}}
								color="#d00"
							/>
						)}
					</View>
					<View style={[styles.container, { marginVertical: 50 }]}>
						{playerNames.map((name, i) => {
							const player = currentRound[name];
							const hasPlacement = Object.keys(currentRound).includes(name);
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
												setCurrentRound({
													...currentRound,
													[name]: {
														trix: {
															placement: Object.keys(currentRound).length + 1,
															score: 200 - Object.keys(currentRound).length * 50,
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
						disabled={Object.keys(currentRound).length < 4}
						onPress={() => {
							if (newRoundCondition) setRounds([...rounds, currentRound]);
							else {
								playerNames.forEach((player) => {
									lastRound[player] = { ...currentRound[player], ...lastRound[player] };
								});
								setRounds([...rounds.slice(0, rounds.length - 1), lastRound]);
							}
							setCurrentRound({});

							if (newRoundCondition) setRoundPhase("Complex");
							else setRoundPhase(null);
							navigate("/score");
						}}
					/>
				</>
			)}
			{roundPhase === "Complex" && <ComplexPage />}
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
const mapStateToProps = (state) => {
	return {
		playerNames: state.playerNames,
		roundPhase: state.roundPhase,
		rounds: state.rounds,
		currentRound: state.currentRound,
	};
};
export default connect(mapStateToProps, {
	setRoundPhase,
	setRounds,
	selectPlayer,
	setCurrentCards,
	setCurrentRound,
})(RoundPage);
