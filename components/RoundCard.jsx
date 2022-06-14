import { Dimensions, View } from "react-native";
import PlayerScoreCard from "./PlayerScoreCard";

const RoundCard = ({ round }) => {
	const screenWidth = Dimensions.get("window").width;
	return (
		<View style={{ flexDirection: "row", width: screenWidth, justifyContent: "space-evenly" }}>
			{Object.keys(round).map((player) => (
				<PlayerScoreCard player={round[player]} />
			))}
		</View>
	);
};
export default RoundCard;
