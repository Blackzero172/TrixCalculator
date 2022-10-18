import { Button, Dimensions, StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import CustomInput from "../components/CustomInput";
import Popup from "../components/Popup";
import {
	selectPlayer,
	setCurrentRound,
	setCurrentCards,
	setMaxCards,
	setRoundPhase,
	setRounds,
	setIndex,
	setEdit,
} from "../actions/actionCreators";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const initalState = {
	takes: 0,
	king: false,
	kingDouble: false,
	diamonds: 0,
	qDiamonds: false,
	qHearts: false,
	qSpades: false,
	qClubs: false,
	qDiamondsDouble: false,
	qHeartsDouble: false,
	qSpadesDouble: false,
	qClubsDouble: false,
};

const maxInitalState = {
	takes: 0,
	king: false,
	diamonds: 0,
	qDiamonds: false,
	qHearts: false,
	qSpades: false,
	qClubs: false,
};
const screenWidth = Dimensions.get("window").width;
const ComplexPage = ({
	playerNames,
	selectedPlayer,
	currentRound,
	currentCards,
	setCurrentRound,
	setCurrentCards,
	selectPlayer,
	setMaxCards,
	maxCards,
	setRoundPhase,
	setRounds,
	rounds,
	isEdit,
	roundIndex,
	setEdit,
}) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [popupOpen, setPopup] = useState(false);
	const [selectedCard, setCard] = useState("");
	const [rewardArray, setReward] = useState({});
	let lastRound = rounds[rounds.length - 1] || {};
	let lastRoundPlayer = lastRound[Object.keys(lastRound)[0]] || {};
	let editRound = rounds[roundIndex] || {};
	const editRoundPlayer = editRound[Object.keys(editRound)[0]] || {};

	let specialCardsCondition =
		maxCards.takes >= 13 &&
		maxCards.king &&
		maxCards.qClubs &&
		maxCards.qDiamonds &&
		maxCards.qHearts &&
		maxCards.qSpades &&
		maxCards.diamonds >= 13;
	const newRoundCondition = !isEdit
		? !lastRoundPlayer.hasOwnProperty("trix") ||
		  (lastRoundPlayer.hasOwnProperty("complex") && lastRoundPlayer.hasOwnProperty("trix"))
		: editRoundPlayer.hasOwnProperty("complex") && editRoundPlayer.hasOwnProperty("trix");
	const resetComplex = () => {
		if (!isEdit)
			if (newRoundCondition) setRoundPhase("Trix");
			else setRoundPhase(null);
		setCurrentRound({});
		setMaxCards(maxInitalState);
	};
	const submitRound = () => {
		let currentRoundCopy = { ...currentRound };
		playerNames.forEach((player) => {
			if (!currentRound[player]?.hasOwnProperty("complex"))
				currentRoundCopy = {
					...currentRoundCopy,
					[player]: {
						...currentRoundCopy[player],
						complex: { ...initalState, score: 0 + (rewardArray[player] || 0) },
					},
				};
			else
				currentRoundCopy = {
					...currentRoundCopy,
					[player]: {
						...currentRoundCopy[player],
						complex: {
							...currentRoundCopy[player].complex,
							score: currentRoundCopy[player].complex.score + (rewardArray[player] || 0),
						},
					},
				};
		});
		if (isEdit) {
			playerNames.forEach((player) => {
				editRound[player] = { ...editRound[player], ...currentRoundCopy[player] };
			});
			setRounds([...rounds.slice(0, roundIndex), editRound, ...rounds.slice(roundIndex + 1)]);

			setRoundPhase(
				lastRoundPlayer.hasOwnProperty("complex") && !lastRoundPlayer.hasOwnProperty("trix")
					? "Trix"
					: lastRoundPlayer.hasOwnProperty("trix") && !lastRoundPlayer.hasOwnProperty("complex")
					? "Complex"
					: null
			);
			setEdit(false);
		} else {
			if (newRoundCondition) setRounds([...rounds, currentRoundCopy]);
			else {
				playerNames.forEach((player) => {
					lastRound[player] = { ...lastRound[player], ...currentRoundCopy[player] };
				});
				setRounds([...rounds.slice(0, rounds.length - 1), lastRound]);
			}
		}
		resetComplex();
		navigate("/score");
	};
	useEffect(() => {
		let doneEditing = false;
		if (isEdit) {
			let currentTakes = 0;
			Object.keys(currentRound).forEach((player) => {
				currentTakes += +currentRound[player].complex.takes;
			});
			doneEditing = currentTakes >= 13;
		}
		if ((maxCards.takes >= 13 && !isEdit) || (isEdit && doneEditing)) {
			submitRound();
		}
	}, [maxCards]);
	useEffect(() => {
		if (isEdit) {
			const editCards = { ...maxInitalState };
			playerNames.forEach((player) => {
				Object.keys(editCards).forEach((card) => {
					if (typeof editCards[card] !== "boolean")
						editCards[card] = +editCards[card] + +editRound[player].complex[card];
					else {
						editCards[card] = editRound[player].complex[card]
							? editRound[player].complex[card]
							: editCards[card];
					}
				});
			});
			setMaxCards(editCards);
		}
	}, []);
	return (
		<View style={{ alignItems: "center" }}>
			{selectedPlayer === "" ? (
				<>
					<View style={styles.container}>
						{playerNames.map((name, i) => (
							<Button
								title={name}
								color="green"
								onPress={() => {
									selectPlayer(name);
									if (isEdit) {
										setCurrentCards(editRound[name]?.complex);
										const editCards = { ...maxInitalState };
										Object.keys(editCards).forEach((card) => {
											if (typeof editCards[card] !== "boolean")
												editCards[card] = maxCards[card] - +editRound[name].complex[card];
											else {
												editCards[card] = editRound[name].complex[card]
													? !editRound[name].complex[card]
													: maxCards[card];
											}
										});
										setMaxCards(editCards);
									}
								}}
								key={i}
								disabled={currentRound[name]?.complex.takes !== undefined}
							/>
						))}
					</View>

					<View style={{ marginTop: 20 }}>
						<Button
							title={t("back")}
							color="#d00"
							onPress={() => {
								if (newRoundCondition) setRoundPhase(null);
								else {
									if (isEdit) {
										setRoundPhase(
											lastRoundPlayer.hasOwnProperty("complex")
												? "Trix"
												: lastRoundPlayer.hasOwnProperty("trix")
												? "Complex"
												: null
										);
										setIndex(null);
									}
									navigate("/score");
								}
								setCurrentRound({});
								setMaxCards(maxInitalState);
							}}
						/>
					</View>
				</>
			) : selectedPlayer !== "" && !currentRound[selectedPlayer]?.complex.takes ? (
				<>
					<Text style={{ fontSize: 30 }}>{selectedPlayer}</Text>
					<CustomInput
						label={t("compInputLabel")}
						placeholder={t("compInputPlaceholder")}
						value={currentCards.takes}
						type="number-pad"
						onChange={(text) => {
							setCurrentCards({
								...currentCards,
								takes:
									+text + maxCards.takes > 13 ? (13 - maxCards.takes).toString() : text.replace(/\D+/g, ""),
							});
						}}
					/>
					<Button
						title={t("next")}
						disabled={currentCards.takes === 0 || currentCards.takes === ""}
						onPress={() => {
							if (+currentCards.takes === 0) {
								setCurrentRound({
									...currentRound,
									[selectedPlayer]: {
										...currentRound[selectedPlayer],
										complex: {
											...initalState,

											score: 0,
										},
									},
								});
								selectPlayer("");
								setCurrentCards(initalState);
							} else {
								setCurrentRound({
									...currentRound,
									[selectedPlayer]: {
										...currentRound[selectedPlayer],
										complex: !specialCardsCondition
											? {
													takes: currentCards.takes,
											  }
											: {
													...initalState,
													takes: currentCards.takes,
											  },
									},
								});
								if (specialCardsCondition) selectPlayer("");
							}
						}}
					/>
					<View style={{ marginTop: 10 }}>
						<Button
							title={t("back")}
							onPress={() => {
								setCurrentCards(initalState);
								const editCards = { ...maxInitalState };
								Object.keys(editCards).forEach((card) => {
									if (typeof editCards[card] !== "boolean")
										editCards[card] = +editCards[card] + +editRound[selectedPlayer].complex[card];
									else {
										editCards[card] = editRound[selectedPlayer].complex[card]
											? editRound[selectedPlayer].complex[card]
											: editCards[card];
									}
								});

								selectPlayer("");
							}}
							color="#d00"
						/>
					</View>
				</>
			) : (
				<>
					<CustomInput
						label={t("diamonds")}
						value={currentCards.diamonds}
						onChange={(text) => {
							{
								setCurrentCards({
									...currentCards,
									diamonds: +text + maxCards.diamonds > 13 ? (13 - maxCards.diamonds).toString() : text,
								});
							}
						}}
						type="number-pad"
						hasIcon
					/>
					<View style={styles.cardsContainer}>
						<TouchableHighlight
							style={[
								styles.cardBtn,
								{
									backgroundColor:
										currentCards.king && !currentCards.kingDouble
											? "#0f05"
											: currentCards.kingDouble
											? "#fd7e"
											: "transparent",
								},
							]}
							onPress={() => {
								setCurrentCards({ ...currentCards, king: false, kingDouble: false });
								setCard("king");
								setPopup(true);
							}}
							underlayColor="#0805"
							disabled={isEdit ? maxCards.king && !currentCards.king : maxCards.king}
						>
							<>
								{maxCards.king && (
									<View
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "#0008",
											zIndex: 2,
											position: "absolute",
											top: 0,
											left: 0,
										}}
									></View>
								)}
								<Image source={require("../../assets/King_of_Hearts.png")} style={styles.card} />
							</>
						</TouchableHighlight>
						<TouchableHighlight
							style={[
								styles.cardBtn,
								{
									backgroundColor:
										currentCards.qHearts && !currentCards.qHeartsDouble
											? "#0f05"
											: currentCards.qHeartsDouble
											? "#fd7e"
											: "transparent",
								},
							]}
							onPress={() => {
								setCurrentCards({ ...currentCards, qHearts: false, qHeartsDouble: false });
								setCard("qHearts");
								setPopup(true);
							}}
							underlayColor="#0805"
							disabled={maxCards.qHearts}
						>
							<>
								{maxCards.qHearts && (
									<View
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "#0008",
											zIndex: 2,
											position: "absolute",
											top: 0,
											left: 0,
										}}
									></View>
								)}
								<Image source={require("../../assets/Queen_of_Hearts.png")} style={styles.card} />
							</>
						</TouchableHighlight>
						<TouchableHighlight
							style={[
								styles.cardBtn,
								{
									backgroundColor:
										currentCards.qDiamonds && !currentCards.qDiamondsDouble
											? "#0f05"
											: currentCards.qDiamondsDouble
											? "#fd7e"
											: "transparent",
								},
							]}
							onPress={() => {
								setCurrentCards({ ...currentCards, qDiamonds: false, qDiamondsDouble: false });
								setCard("qDiamonds");
								setPopup(true);
							}}
							underlayColor="#0805"
							disabled={maxCards.qDiamonds}
						>
							<>
								{maxCards.qDiamonds && (
									<View
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "#0008",
											zIndex: 2,
											position: "absolute",
											top: 0,
											left: 0,
										}}
									></View>
								)}
								<Image source={require("../../assets/Queen_of_Diamonds.png")} style={styles.card} />
							</>
						</TouchableHighlight>
						<TouchableHighlight
							style={[
								styles.cardBtn,
								{
									backgroundColor:
										currentCards.qSpades && !currentCards.qSpadesDouble
											? "#0f05"
											: currentCards.qSpadesDouble
											? "#fd7e"
											: "transparent",
								},
							]}
							onPress={() => {
								setCurrentCards({ ...currentCards, qSpades: false, qSpadesDouble: false });
								setCard("qSpades");
								setPopup(true);
							}}
							underlayColor="#0805"
							disabled={maxCards.qSpades}
						>
							<>
								{maxCards.qSpades && (
									<View
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "#0008",
											zIndex: 2,
											position: "absolute",
											top: 0,
											left: 0,
										}}
									></View>
								)}
								<Image source={require("../../assets/Queen_of_Spades.png")} style={styles.card} />
							</>
						</TouchableHighlight>
						<TouchableHighlight
							style={[
								styles.cardBtn,
								{
									backgroundColor:
										currentCards.qClubs && !currentCards.qClubsDouble
											? "#0f05"
											: currentCards.qClubsDouble
											? "#fd7e"
											: "transparent",
								},
							]}
							onPress={() => {
								setCurrentCards({ ...currentCards, qClubs: false, qClubsDouble: false });
								setCard("qClubs");
								setPopup(true);
							}}
							underlayColor="#0805"
							disabled={maxCards.qClubs}
						>
							<>
								{maxCards.qClubs && (
									<View
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "#0008",
											zIndex: 2,
											position: "absolute",
											top: 0,
											left: 0,
										}}
									></View>
								)}
								<Image source={require("../../assets/Queen_of_Clubs.png")} style={styles.card} />
							</>
						</TouchableHighlight>
					</View>

					<View style={{ marginTop: 20 }}>
						<Button
							title={t("submit")}
							onPress={() => {
								setCurrentRound({
									...currentRound,
									[selectedPlayer]: {
										...currentRound[selectedPlayer],
										complex: {
											...currentCards,
											score:
												currentCards.takes * -15 +
												currentCards.diamonds * -10 +
												(currentCards.king + currentCards.kingDouble) * -75 +
												(currentCards.qClubs +
													currentCards.qDiamonds +
													currentCards.qHearts +
													currentCards.qSpades) *
													-25 +
												(currentCards.qClubsDouble +
													currentCards.qDiamondsDouble +
													currentCards.qHeartsDouble +
													currentCards.qSpadesDouble) *
													-25,
										},
									},
								});

								setMaxCards({
									qClubs: maxCards.qClubs ? maxCards.qClubs : currentCards.qClubs,
									qSpades: maxCards.qSpades ? maxCards.qSpades : currentCards.qSpades,
									qHearts: maxCards.qHearts ? maxCards.qHearts : currentCards.qHearts,
									qDiamonds: maxCards.qDiamonds ? maxCards.qDiamonds : currentCards.qDiamonds,
									king: maxCards.king ? maxCards.king : currentCards.king,
									diamonds: +maxCards.diamonds + +currentCards.diamonds,
									takes: +maxCards.takes + +currentCards.takes,
								});
								setCurrentCards(initalState);
								selectPlayer("");
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button
							title={t("back")}
							onPress={() => {
								setCurrentRound({
									...currentRound,
									[selectedPlayer]: {
										...currentRound[selectedPlayer],
										complex: {
											...currentRound[selectedPlayer].complex,
											takes: undefined,
										},
									},
								});
							}}
							color="#d00"
						/>
					</View>
				</>
			)}

			<Popup
				visible={popupOpen}
				buttons={
					!currentCards[selectedCard]
						? [
								{
									text: t("normal"),
									onPress: () => {
										setCurrentCards({ ...currentCards, [selectedCard]: true });
										setPopup(false);
									},
									color: "green",
								},
								{
									text: t("double"),
									onPress: () => {
										setCurrentCards({
											...currentCards,
											[selectedCard]: true,
											[`${selectedCard}Double`]: true,
										});
									},
									color: "#db5",
								},
						  ]
						: []
				}
				onClose={() => {
					setPopup(false);
					setCurrentCards({ ...currentCards, [selectedCard]: false, [`${selectedCard}Double`]: false });
				}}
			>
				{!currentCards[selectedCard] && !currentCards[`${selectedCard}Double`] && (
					<Text style={{ marginBottom: 20 }}>{t("doubleAlert")}</Text>
				)}
				{currentCards[`${selectedCard}Double`] && (
					<>
						<Text>{t("markAlert")}</Text>
						<View style={{ flexDirection: "row", marginTop: 10 }}>
							{[
								...playerNames.slice(0, playerNames.indexOf(selectedPlayer)),
								"Self",
								...playerNames.slice(playerNames.indexOf(selectedPlayer) + 1),
							].map((player) => (
								<View style={{ marginHorizontal: 5 }}>
									<Button
										title={player}
										color="green"
										onPress={() => {
											if (player !== "Self")
												setReward({
													...rewardArray,
													[player]:
														(currentCards.qClubsDouble +
															currentCards.qHeartsDouble +
															currentCards.qDiamondsDouble +
															currentCards.qSpadesDouble) *
															25 +
														currentCards.kingDouble * 75,
												});

											setPopup(false);
										}}
									/>
								</View>
							))}
						</View>
					</>
				)}
			</Popup>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: screenWidth,
	},
	cardsContainer: {
		flexDirection: "row",
		marginVertical: 10,
	},
	card: {
		width: 60,
		height: 90,
	},

	cardBtn: {
		marginHorizontal: 6,
		borderWidth: 3,
		borderRadius: 8,
		overflow: "hidden",
		borderColor: "green",
		position: "relative",
	},
});
const mapStateToProps = (state) => {
	return {
		playerNames: state.playerNames,
		selectedPlayer: state.selectedPlayer,
		currentRound: state.currentRound,
		currentCards: state.currentCards,
		maxCards: state.maxCards,
		rounds: state.rounds,
		isEdit: state.isEdit,
		roundIndex: state.roundIndex,
	};
};
export default connect(mapStateToProps, {
	setRoundPhase,
	setRounds,
	selectPlayer,
	setCurrentRound,
	setCurrentCards,
	setMaxCards,
	setIndex,
	setEdit,
})(ComplexPage);
