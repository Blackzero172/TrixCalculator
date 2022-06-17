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
const initalState = { takes: 0, king: false, kingDouble: false, diamonds: 0, queens: 0, queenDouble: 0 };

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
	useEffect(() => {
		const resetComplex = () => {
			if (!rounds[Object.keys(currentRound)[0]]?.hasOwnProperty("trix")) setRoundPhase("Trix");
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
							complex: { ...initalState, score: 0 },
						},
					};
			});
			setRounds([...rounds, currentRoundCopy]);
			resetComplex();
			navigate("/score");
		}
	}, [maxCards]);
	return (
		<View style={{ alignItems: "center" }}>
			{selectedPlayer === "" ? (
				<View style={styles.container}>
					{playerNames.map((name, i) => (
						<Button
							title={name}
							color="green"
							onPress={() => {
								selectPlayer(name);
							}}
							key={i}
							disabled={Object.keys(currentRound).includes(name)}
						/>
					))}
				</View>
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
						<TouchableHighlight style={styles.cardBtn}>
							<Image source={require("../../assets/King_of_Hearts.png")} style={styles.card} />
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
												currentCards.takes * 15 +
												currentCards.diamonds * 10 +
												(currentCards.king + currentCards.kingDouble) * 75 +
												currentCards.queens * 25 +
												currentCards.queenDouble * 50,
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
			<View style={{ marginTop: 30 }}>
				{!rounds[Object.keys(currentRound)[0]]?.hasOwnProperty("complex") ||
					(!rounds[Object.keys(currentRound)[0]]?.hasOwnProperty("trix") && (
						<Button
							title="Back"
							onPress={() => {
								setRoundPhase(null);
								setCurrentRound({});
							}}
							color="#d00"
						/>
					))}
			</View>
			<Popup
				visible={popupOpen}
				buttons={[
					{ text: "Normal", onPress: () => {}, color: "green" },
					{ text: "Double", onPress: () => {}, color: "gold" },
				]}
			></Popup>
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
