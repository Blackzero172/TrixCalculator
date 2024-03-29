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
	setIndex,
	setEdit,
} from "../actions/actionCreators";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
const screenWidth = Dimensions.get("window").width;
const RoundPage = ({
	roundPhase,
	setRoundPhase,
	playerNames,
	rounds,
	setRounds,
	currentRound,
	setCurrentRound,
	isEdit,
	roundIndex,
	setEdit,
}) => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	let lastRound = (roundIndex ? rounds[roundIndex] : rounds[rounds.length - 1]) || {};
	const lastRoundPlayer = lastRound[Object.keys(lastRound)[0]] || {};
	let editRound = rounds[roundIndex] || {};
	const editRoundPlayer = editRound[Object.keys(editRound)[0]] || {};
	useEffect(() => {
		if (isEdit) {
			if (editRoundPlayer.hasOwnProperty("complex") && !editRoundPlayer.hasOwnProperty("trix"))
				setRoundPhase("Complex");
			else if (editRoundPlayer.hasOwnProperty("trix") && !editRoundPlayer.hasOwnProperty("complex"))
				setRoundPhase("Trix");
			else setRoundPhase(null);
		}
	}, []);

	const newRoundCondition = !isEdit
		? !lastRoundPlayer.hasOwnProperty("complex") ||
		  (lastRoundPlayer.hasOwnProperty("complex") && lastRoundPlayer.hasOwnProperty("trix"))
		: editRoundPlayer.hasOwnProperty("complex") && editRoundPlayer.hasOwnProperty("trix");
	return (
		<View style={{ alignItems: "center" }}>
			{!roundPhase && (
				<>
					<View style={styles.container}>
						<Button
							title={t("trix")}
							color="green"
							onPress={() => {
								setRoundPhase("Trix");
							}}
						/>
						<Button
							title={t("complex")}
							color="green"
							onPress={() => {
								setRoundPhase("Complex");
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button
							title={t("back")}
							color="#d00"
							onPress={() => {
								if (isEdit)
									setRoundPhase(
										lastRoundPlayer.hasOwnProperty("complex") && !lastRoundPlayer.hasOwnProperty("trix")
											? "Trix"
											: lastRoundPlayer.hasOwnProperty("trix") && !lastRoundPlayer.hasOwnProperty("complex")
											? "Complex"
											: null
									);
								setIndex(null);
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
							title={t("reset")}
							color="#d00"
							onPress={() => {
								setCurrentRound({});
							}}
							disabled={Object.keys(currentRound).length < 1}
						/>

						<Button
							title={t("back")}
							onPress={() => {
								if (newRoundCondition) setRoundPhase(null);
								else {
									if (isEdit) {
										setRoundPhase(
											lastRoundPlayer.hasOwnProperty("complex") && !lastRoundPlayer.hasOwnProperty("trix")
												? "Trix"
												: lastRoundPlayer.hasOwnProperty("trix") && !lastRoundPlayer.hasOwnProperty("complex")
												? "Complex"
												: null
										);
										setIndex(null);
									}
									navigate("/score");
								}
								setCurrentRound({});
							}}
							color="#d00"
						/>
					</View>
					<View style={[styles.container, { marginVertical: 50 }]}>
						{playerNames.map((name, i) => {
							const player = currentRound[name];
							const hasPlacement = Object.keys(currentRound).includes(name);
							return (
								<View key={i} style={{ alignItems: "center" }}>
									{hasPlacement && (
										<Text>
											{i18n.language === "en"
												? `${player.trix?.placement}${
														player.trix?.placement === 1
															? "st"
															: player.trix?.placement === 2
															? "nd"
															: player.trix?.placement === 3
															? "rd"
															: "th"
												  }`
												: player.trix?.placement === 1
												? "الأول"
												: player.trix?.placement === 2
												? "الثاني"
												: player.trix?.placement === 3
												? "الثالث"
												: "الرابع"}
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
						title={t("submit")}
						disabled={Object.keys(currentRound).length < 4}
						onPress={async () => {
							if (isEdit) {
								playerNames.forEach((player) => {
									editRound[player] = { ...editRound[player], ...currentRound[player] };
								});
								setRounds([...rounds.slice(0, roundIndex), editRound, ...rounds.slice(roundIndex + 1)]);

								setRoundPhase(
									editRoundPlayer.hasOwnProperty("complex") && !editRoundPlayer.hasOwnProperty("trix")
										? "Trix"
										: editRoundPlayer.hasOwnProperty("trix") && !editRoundPlayer.hasOwnProperty("trix")
										? "Complex"
										: null
								);
								setEdit(false);
							} else {
								if (newRoundCondition) setRounds([...rounds, currentRound]);
								else {
									playerNames.forEach((player) => {
										lastRound[player] = { ...currentRound[player], ...lastRound[player] };
									});
									setRounds([...rounds.slice(0, rounds.length - 1), lastRound]);
								}

								if (newRoundCondition) setRoundPhase("Complex");
								else setRoundPhase(null);
							}
							setCurrentRound({});
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
		roundIndex: state.roundIndex,
		isEdit: state.isEdit,
	};
};
export default connect(mapStateToProps, {
	setRoundPhase,
	setRounds,
	selectPlayer,
	setCurrentCards,
	setCurrentRound,
	setIndex,
	setEdit,
})(RoundPage);
