import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button, TouchableHighlight } from "react-native";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import RoundCard from "../components/RoundCard";
import { setScores, setIndex, setEdit } from "../actions/actionCreators";
const screenWidth = Dimensions.get("window").width;
const ScorePage = ({ playerNames, playerScores, rounds, setScores, isEdit, setIndex, setEdit }) => {
	const navigate = useNavigate();
	const lastRound = rounds[rounds.length - 1] || {};
	const gameOver =
		rounds.length >= 4 &&
		(!lastRound[Object.keys(lastRound)[0]]?.hasOwnProperty("complex") ||
			!lastRound[Object.keys(lastRound)[0]]?.hasOwnProperty("trix"));

	useEffect(() => {
		const obj = {};
		playerNames.forEach((player) => {
			obj[player] = 0;
		});
		setScores(obj);
	}, []);
	useEffect(() => {
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
	}, [rounds]);
	return (
		<View>
			{rounds.length > 0 && (
				<View style={{ marginBottom: 50, alignItems: "center" }}>
					<Button
						title={isEdit ? "Back" : "Edit"}
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
					{isEdit && <Text>Press on a round to edit it</Text>}
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
								backgroundColor: "#0806",
								position: "absolute",
								height: "100%",
								zIndex: 2,
							}}
							underlayColor="#080a"
						>
							<View
								style={{
									width: "100%",
									height: "100%",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Text style={{ backgroundColor: "#0806", fontSize: 20 }}>Edit</Text>
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
						title="Add Round"
						onPress={() => {
							navigate("/new");
						}}
						disabled={isEdit}
					/>
				) : (
					<Text>
						{playerNames[Object.values(playerScores).indexOf(Math.max(...Object.values(playerScores)))]} Wins
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
		isEdit: state.isEdit,
	};
};
export default connect(mapStateToProps, { setScores, setIndex, setEdit })(ScorePage);
