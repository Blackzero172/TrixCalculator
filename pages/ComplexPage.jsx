import { useEffect, useState } from "react";
import { Alert, Button, Dimensions, StyleSheet, Text, View } from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
const screenWidth = Dimensions.get("window").width;
const initalState = { takes: 0, king: false, kingDouble: false };
const ComplexPage = ({ playerNames, setPlayer, selectedPlayer, setTempRound, tempRound, currentCards }) => {
	const [numOfCards, setCards] = useState(initalState);
	return (
		<View style={{ alignItems: "center" }}>
			{selectedPlayer === "" ? (
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
			) : selectedPlayer !== "" && !tempRound[selectedPlayer]?.complex.takes ? (
				<>
					<Text style={{ fontSize: 30 }}>{selectedPlayer}</Text>
					<CustomInput
						label="# of takes"
						placeholder="Enter # of takes"
						value={numOfCards.takes}
						type="number-pad"
						onChange={(text) => {
							setCards({
								...numOfCards,
								takes: +text + currentCards.takes <= 13 ? text.replace(/\D+/g, "") : "13",
							});
						}}
					/>
					<Button
						title="Next"
						disabled={numOfCards.takes === 0}
						onPress={() => {
							if (numOfCards.takes > 8)
								Alert.alert(
									"That's way too many takes",
									`Are you sure that this player took *${numOfCards.takes}* takes`,
									[
										{
											text: "Yes",
											onPress: () => {
												setTempRound({
													...tempRound,
													[selectedPlayer]: {
														...tempRound[selectedPlayer],
														complex: {
															takes: numOfCards.takes,
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
								setTempRound({
									...tempRound,
									[selectedPlayer]: {
										...tempRound[selectedPlayer],
										complex: {
											takes: numOfCards.takes,
										},
									},
								});
						}}
					/>
					<View style={{ marginTop: 10 }}>
						<Button
							title="Back"
							onPress={() => {
								setCards(initalState);
								setPlayer("");
							}}
							color="#d00"
						/>
					</View>
				</>
			) : (
				<>
					<CustomInput
						label="Diamonds"
						value={numOfCards.diamonds}
						onChange={(text) => {
							{
								setCards((prevState) => ({
									...prevState,
									diamonds: +text + currentCards.diamonds < 13 ? text : "13",
								}));
							}
						}}
						type="number-pad"
					/>
					<View style={{ flexDirection: "row" }}>
						<CustomCheckbox
							label="King"
							color="green"
							checked={numOfCards.king}
							onChange={() => {
								setCards((prevState) => ({ ...prevState, king: !prevState.king }));
							}}
						/>
						<CustomCheckbox
							label="Double Points"
							color="#fd7"
							checked={numOfCards.kingDouble}
							onChange={() => {
								setCards((prevState) => ({ ...prevState, kingDouble: !prevState.kingDouble }));
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button
							title="Confirm"
							onPress={() => {
								setTempRound((prevState) => ({
									...prevState,
									[selectedPlayer]: {
										...prevState[selectedPlayer],
										complex: numOfCards,
									},
								}));
								setPlayer("");
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Button
							title="Back"
							onPress={() => {
								setTempRound((prevState) => ({
									...prevState,
									[selectedPlayer]: {
										...prevState[selectedPlayer],
										complex: {
											...prevState[selectedPlayer].complex,
											takes: undefined,
										},
									},
								}));
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
export default ComplexPage;
