import { Alert, Button, Dimensions, StyleSheet, Text, View } from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
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
const initalState = { takes: 0, king: false, kingDouble: false };

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
	rounds,
}) => {
	const navigate = useNavigate();
	useEffect(() => {
		const resetComplex = () => {
			if (!rounds[Object.keys(currentRound)[0]]?.hasOwnProperty("complex")) setRoundPhase("Complex");
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
							complex: {
								takes: 0,
								king: false,
								kingDouble: false,
							},
						},
					};
			});
			console.log("====================================");
			console.log(currentRoundCopy);
			console.log("====================================");
			setRounds({ ...rounds, currentRoundCopy });
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
									+text + currentCards.takes > 13
										? (13 - maxCards.takes).toString()
										: text.replace(/\D+/g, ""),
							});
						}}
					/>
					<Button
						title="Next"
						disabled={currentCards.takes === 0}
						onPress={() => {
							if (currentCards.takes > 8)
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
									diamonds: +text + currentCards.diamonds > 13 ? "13" : text,
								});
							}
						}}
						type="number-pad"
					/>
					<View style={{ flexDirection: "row" }}>
						<CustomCheckbox
							label="King"
							color="green"
							checked={currentCards.king}
							onChange={() => {
								setCurrentCards({ ...currentCards, king: !currentCards.king });
							}}
						/>
						<CustomCheckbox
							label="Double Points"
							color="#fd7"
							checked={currentCards.kingDouble}
							onChange={() => {
								setCurrentCards({ ...currentCards, kingDouble: !currentCards.kingDouble });
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button
							title="Confirm"
							onPress={() => {
								setCurrentRound({
									...currentRound,
									[selectedPlayer]: {
										...currentRound[selectedPlayer],
										complex: currentCards,
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
		selectedPlayer: state.selectedPlayer,
		currentRound: state.currentRound,
		currentCards: state.currentCards,
		maxCards: state.maxCards,
		rounds: state.rounds,
	};
};
export default connect(mapStateToProps, {
	selectPlayer,
	setCurrentRound,
	setCurrentCards,
	setMaxCards,
	setRoundPhase,
	setRounds,
})(ComplexPage);
