import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button, TouchableHighlight, Alert } from "react-native";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import RoundCard from "../components/RoundCard";
import { setScores, setIndex, setEdit, setRounds, setRoundPhase } from "../actions/actionCreators";
import { AdMobInterstitial } from "expo-ads-admob";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const ScorePage = ({
	playerNames,
	playerScores,
	rounds,
	roundPhase,
	setScores,
	isEdit,
	setIndex,
	setEdit,
	setRounds,
	setRoundPhase,
}) => {
	const { t } = useTranslation();
	const setupInterstatialAd = async () => {
		AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
		AdMobInterstitial.addEventListener("interstitialDidClose", () => {
			AdMobInterstitial.dismissAdAsync();
		});
		try {
			await AdMobInterstitial.requestAdAsync();
		} catch (e) {}
	};
	const showInterstatialAd = async () => {
		try {
			await AdMobInterstitial.showAdAsync();
		} catch (e) {}
	};
	const navigate = useNavigate();
	const lastRound = rounds[rounds.length - 1] || {};
	const gameOver =
		rounds.length >= 4 &&
		lastRound[Object.keys(lastRound)[0]]?.hasOwnProperty("complex") &&
		lastRound[Object.keys(lastRound)[0]]?.hasOwnProperty("trix");

	useEffect(() => {
		const obj = {};
		playerNames.forEach((player) => {
			obj[player] = 0;
		});
		setScores(obj);
		setupInterstatialAd();
	}, []);
	useEffect(() => {
		const saveToStorage = async () => {
			await AsyncStorage.setItem(
				"currentMatch",
				JSON.stringify({ rounds, playerNames, playerScores, roundPhase })
			);
		};
		const obj = {};
		playerNames.forEach((player) => {
			obj[player] = 0;
		});
		rounds.forEach((round) => {
			if (round[Object.keys(round)[0]].hasOwnProperty("trix")) {
				for (let player in round) {
					obj[player] += round[player].trix.score;
				}
			}
			if (round[Object.keys(round)[0]].hasOwnProperty("complex")) {
				for (let player in round) {
					obj[player] += round[player].complex.score;
				}
			}
			setScores(obj);
		});
		if (
			rounds.length >= 0 &&
			lastRound[Object.keys(lastRound)[0]]?.hasOwnProperty("complex") &&
			lastRound[Object.keys(lastRound)[0]]?.hasOwnProperty("trix")
		) {
			showInterstatialAd();
		}
		saveToStorage();
	}, [rounds]);
	const resetGame = async () => {
		navigate("/name");
		setRounds([]);
		const obj = {};
		playerNames.forEach((player) => {
			obj[player] = 0;
		});
		setScores(obj);
		setRoundPhase(null);
		setIndex(null);
		if (gameOver) {
			const match = JSON.parse(await AsyncStorage.getItem("currentMatch"));
			match.timeFinished = new Date();
			const matchHistory = JSON.parse((await AsyncStorage.getItem("history")) || "[]");
			matchHistory.unshift(match);
			await AsyncStorage.setItem("history", JSON.stringify(matchHistory));
		}
		await AsyncStorage.removeItem("currentMatch");
	};
	return (
		<>
			<View style={{ position: "absolute", top: 50 }}>
				<Button
					title={t("newGame")}
					color="#d00"
					onPress={() => {
						if (!gameOver)
							Alert.alert(t("newGameAlert"), "", [
								{
									text: t("yes"),
									onPress: resetGame,
								},
								{ text: t("no") },
							]);
						else {
							resetGame();
						}
					}}
				/>
			</View>
			<View>
				{rounds.length > 0 && (
					<View style={{ marginBottom: 50, alignItems: "center" }}>
						<Button
							title={isEdit ? t("back") : t("edit")}
							onPress={
								isEdit
									? () => {
											setEdit(false);
									  }
									: () => {
											setEdit(true);
									  }
							}
							color={isEdit ? "#d00" : "green"}
						/>
						{isEdit && <Text>{t("editText")}</Text>}
					</View>
				)}
				<View style={styles.container}>
					{playerNames.map((name, i) => (
						<Text style={styles.text} key={i}>
							{name}
						</Text>
					))}
				</View>
				{rounds.map((round) => (
					<View style={{ flexDirection: "row", marginVertical: 10 }}>
						{isEdit && (
							<TouchableHighlight
								onPress={() => {
									setIndex(rounds.indexOf(round));
									navigate("/new");
								}}
								style={{
									width: "100%",
									backgroundColor: "#3338",
									position: "absolute",
									height: "100%",
									zIndex: 2,
								}}
								underlayColor="#333a"
							>
								<View
									style={{
										width: "100%",
										height: "100%",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Text
										style={{
											backgroundColor: "#080",
											fontSize: 20,
											paddingVertical: 5,
											paddingHorizontal: 10,
											color: "#fff",
											zIndex: 10,
										}}
									>
										{t("edit")}
									</Text>
								</View>
							</TouchableHighlight>
						)}
						<RoundCard round={round} playerNames={playerNames} />
					</View>
				))}
				<View
					style={
						!gameOver
							? { paddingHorizontal: 30, justifyContent: "center", marginTop: 20, marginBottom: 30 }
							: { alignItems: "center", marginBottom: 10 }
					}
				>
					{!gameOver ? (
						<Button
							color="green"
							title={t("addRound")}
							onPress={() => {
								navigate("/new");
							}}
							disabled={isEdit}
						/>
					) : (
						<Text>
							{playerNames[Object.values(playerScores).indexOf(Math.max(...Object.values(playerScores)))]}{" "}
							{t("wins")}
						</Text>
					)}
				</View>
				<View
					style={[
						styles.container,
						{
							borderTopWidth: 2,
							paddingTop: 10,
						},
					]}
				>
					{playerNames.map((name, i) => (
						<Text
							style={[
								styles.text,
								{ color: playerScores[name] > 0 ? "green" : playerScores[name] < 0 ? "#d00" : "black" },
							]}
							key={i * 2}
						>
							{playerScores[name] > 0 ? "+" : playerNames[name] < 0 ? "-" : ""}
							{playerScores[name]}
						</Text>
					))}
				</View>
			</View>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: screenWidth,
	},
	text: {
		flex: 1,
		textAlign: "center",
	},
});
const mapStateToProps = (state) => {
	return {
		playerNames: state.playerNames,
		playerScores: state.playerScores,
		rounds: state.rounds,
		roundPhase: state.roundPhase,
		isEdit: state.isEdit,
	};
};
export default connect(mapStateToProps, { setScores, setIndex, setEdit, setRounds, setRoundPhase })(
	ScorePage
);
