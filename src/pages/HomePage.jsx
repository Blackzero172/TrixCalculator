import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { setNames, setScores, setRounds, setRoundPhase } from "../actions/actionCreators";
import { connect } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePage = ({ setNames, setScores, setRounds, setRoundPhase, rounds }) => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		const setupGame = async () => {
			const savedMatch = JSON.parse(await AsyncStorage.getItem("currentMatch"));
			if (savedMatch) {
				setNames(savedMatch.playerNames);
				setScores(savedMatch.playerScores);
				setRounds(savedMatch.rounds);
				setRoundPhase(savedMatch.roundPhase);
			}
		};
		setupGame();
	}, []);

	return (
		<View style={styles.buttonContainer}>
			<Text style={styles.heading}>{t("title")}</Text>
			<Button
				title={rounds.length < 1 ? t("start") : t("continue")}
				color="green"
				onPress={() => {
					navigate(rounds.length < 1 ? "/name" : "/score");
				}}
			/>
			<Button
				title={t("instructions")}
				color="green"
				onPress={() => {
					navigate("/instructions");
				}}
			/>
			<Button
				title={t("history")}
				color="green"
				onPress={() => {
					navigate("/history");
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "space-between",
		height: 300,
		alignItems: "center",
	},
	heading: {
		fontSize: 40,
		textAlign: "center",
		marginBottom: 30,
	},
});
const mapStateToProps = (state) => {
	return {
		rounds: state.rounds,
	};
};
export default connect(mapStateToProps, { setNames, setScores, setRounds, setRoundPhase })(HomePage);
