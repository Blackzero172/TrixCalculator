import { Dimensions, View } from "react-native";
import PlayerScoreCard from "./PlayerScoreCard";

const RoundCard = ({ round, playerNames }) => {
	const screenWidth = Dimensions.get("window").width;
	return (
		<View
			style={{
				flexDirection: "row",
				width: screenWidth,
				justifyContent: "space-evenly",
				borderTopWidth: 2,
			}}
		>
			{playerNames.map((player) => (
				<PlayerScoreCard player={round[player]} />
			))}
		</View>
	);
};
export default RoundCard;
