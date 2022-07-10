import { StyleSheet, Text, View, Dimensions, Touchable, TouchableOpacity } from "react-native";
import moment from "moment";
import { useState } from "react";
import RoundCard from "./RoundCard";
const screenWidth = Dimensions.get("screen").width;
const MatchCard = ({ match }) => {
	console.log(match);
	const [isExpanded, expand] = useState(false);
	return (
		<TouchableOpacity
			style={{
				alignItems: "center",
				marginVertical: 10,
				borderTopWidth: 2,
				borderBottomWidth: 2,
				borderColor: "#080",
			}}
			onPress={() => {
				expand(!isExpanded);
			}}
		>
			<Text>{moment(match.timeFinished).format("DD/MM/YYYY HH:MM A")}</Text>
			<View style={styles.container}>
				{match.playerNames.map((name) => (
					<Text style={styles.text}>{name}</Text>
				))}
			</View>
			{isExpanded && (
				<>
					{match.rounds.map((round) => (
						<RoundCard round={round} playerNames={match.playerNames} />
					))}
				</>
			)}
			<View style={styles.container}>
				{match.playerNames.map((name) => (
					<Text
						style={[
							styles.text,
							{
								color:
									match.playerScores[name] > 0 ? "green" : match.playerScores[name] < 0 ? "#d00" : "black",
							},
						]}
					>
						{match.playerScores[name] > 0 ? "+" : match.playerScores[name] < 0 ? "-" : ""}
						{match.playerScores[name]}
					</Text>
				))}
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: screenWidth,
		marginTop: 10,
	},
	text: {
		flex: 1,
		textAlign: "center",
	},
});
export default MatchCard;
