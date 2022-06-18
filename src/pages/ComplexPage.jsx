import { Alert, Button, Dimensions, StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import CustomInput from "../components/CustomInput";
import Popup from "../components/Popup";
import {
	selectPlayer,
	setCurrentRound,
	setCurrentCards,
	setMaxCards,
	setRoundPhase,
	setRounds,
} from "../actions/actionCreators";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
const initalState = {
	takes: 0,
	king: false,
	kingDouble: false,
	diamonds: 0,
	qDiamonds: false,
	qHearts: false,
	qSpades: false,
	qClubs: false,
	queenDouble: 0,
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
}) => {
	const navigate = useNavigate();
	const [popupOpen, setPopup] = useState(false);
	const [selectedCard, setCard] = useState("");
	const [rewardArray, setReward] = useState({});
	let lastRound = rounds[rounds.length - 1] || {};
	let lastRoundPlayer = lastRound[Object.keys(lastRound)[0]] || {};
	const newRoundCondition =
		!lastRoundPlayer.hasOwnProperty("trix") ||
		(lastRoundPlayer.hasOwnProperty("complex") && lastRoundPlayer.hasOwnProperty("trix"));
	useEffect(() => {
		const resetComplex = () => {
			if (!lastRoundPlayer.hasOwnProperty("trix")) setRoundPhase("Trix");
			else setRoundPhase(null);
			setCurrentRound({});
			setMaxCards(initalState);
		};
		if (maxCards.takes >= 13) {
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
			if (newRoundCondition) setRounds([...rounds, currentRoundCopy]);
			else {
				playerNames.forEach((player) => {
					lastRound[player] = { ...currentRoundCopy[player], ...lastRound[player] };
				});
				setRounds([...rounds.slice(0, rounds.length - 1), lastRound]);
			}
			resetComplex();
			navigate("/score");
		}
	}, [maxCards]);
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
								}}
								key={i}
								disabled={currentRound[name]?.complex.takes !== undefined}
							/>
						))}
					</View>
					<View style={{ marginTop: 20 }}>
						{newRoundCondition && (
							<Button
								title="Back"
								color="#d00"
								onPress={() => {
									setRoundPhase(null);
								}}
							/>
						)}
					</View>
				</>
			) : selectedPlayer !== "" && !currentRound[selectedPlayer]?.complex.takes ? (
				<>
					<Text style={{ fontSize: 30 }}>{selectedPlayer}</Text>
					<CustomInput
						label="# of takes"
						placeholder="Enter # of takes"
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
						title="Next"
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
								if (currentCards.takes >= 8)
									Alert.alert(
										"That's way too many takes",
										`Are you sure that this player took *${currentCards.takes}* takes`,
										[
											{
												text: "Yes",
												onPress: () => {
													setCurrentRound({
														...currentRound,
														[selectedPlayer]: {
															...currentRound[selectedPlayer],
															complex: {
																takes: currentCards.takes,
															},
														},
													});
												},
											},
											{
												text: "No",
											},
										]
									);
								else
									setCurrentRound({
										...currentRound,
										[selectedPlayer]: {
											...currentRound[selectedPlayer],
											complex: {
												takes: currentCards.takes,
											},
										},
									});
							}
						}}
					/>
					<View style={{ marginTop: 10 }}>
						<Button
							title="Back"
							onPress={() => {
								setCurrentCards(initalState);
								selectPlayer("");
							}}
							color="#d00"
						/>
					</View>
				</>
			) : (
				<>
					<CustomInput
						label="Diamonds"
						value={currentCards.diamonds}
						onChange={(text) => {
							{
								setCurrentCards({
									...currentCards,
									diamonds: +text + maxCards.diamonds > 13 ? "13" : text,
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
											? "#fd7a"
											: "transparent",
								},
							]}
							onPress={() => {
								setCurrentCards({ ...currentCards, king: false, kingDouble: false });
								setCard("king");
								setPopup(true);
							}}
							underlayColor="#0805"
							disabled={maxCards.king}
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
						<TouchableHighlight style={styles.cardBtn}>
							<Image source={require("../../assets/Queen_of_Hearts.png")} style={styles.card} />
						</TouchableHighlight>
						<TouchableHighlight style={styles.cardBtn}>
							<Image source={require("../../assets/Queen_of_Diamonds.png")} style={styles.card} />
						</TouchableHighlight>
						<TouchableHighlight style={styles.cardBtn}>
							<Image source={require("../../assets/Queen_of_Spades.png")} style={styles.card} />
						</TouchableHighlight>
						<TouchableHighlight style={styles.cardBtn}>
							<Image source={require("../../assets/Queen_of_Clubs.png")} style={styles.card} />
						</TouchableHighlight>
					</View>

					<View style={{ marginTop: 20 }}>
						<Button
							title="Confirm"
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
												currentCards.queenDouble * -50,
										},
									},
								});
								setMaxCards({
									takes: +maxCards.takes + +currentCards.takes,
									king: currentCards.king,
									kingDouble: currentCards.kingDouble,
								});
								setCurrentCards(initalState);
								selectPlayer("");
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button
							title="Back"
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
									text: "Normal",
									onPress: () => {
										setCurrentCards({ ...currentCards, [selectedCard]: true });
										setPopup(false);
									},
									color: "green",
								},
								{
									text: "Double",
									onPress: () => {
										if (selectedCard === "king")
											setCurrentCards({
												...currentCards,
												king: true,
												kingDouble: true,
											});
										else
											setCurrentCards({
												...currentCards,
												[selectedCard]: true,
												queenDouble: currentCards.queenDouble + 1,
											});
									},
									color: "gold",
								},
						  ]
						: [
								...playerNames.slice(0, playerNames.indexOf(selectedPlayer)),
								"Self",
								...playerNames.slice(playerNames.indexOf(selectedPlayer) + 1),
						  ].map((player) => ({
								text: player,
								onPress: () => {
									if (player !== "Self")
										setReward({ ...rewardArray, [player]: selectedCard === "king" ? 75 : 25 });

									setPopup(false);
								},
								color: "green",
						  }))
				}
				onClose={() => {
					setPopup(false);
					setCurrentCards({ ...currentCards, king: false, kingDouble: false });
				}}
			>
				{!currentCards.king && !currentCards.kingDouble && (
					<Text style={{ marginBottom: 20 }}>Was this card marked(x2 Points)?</Text>
				)}
				{currentCards.kingDouble && (
					<>
						<Text>Who marked it?</Text>
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
	};
};
export default connect(mapStateToProps, {
	setRoundPhase,
	setRounds,
	selectPlayer,
	setCurrentRound,
	setCurrentCards,
	setMaxCards,
})(ComplexPage);
