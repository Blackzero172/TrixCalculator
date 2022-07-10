import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import MatchCard from "../components/MatchCard";
const HistoryPage = () => {
	const [matches, setMatches] = useState([]);

	useEffect(() => {
		const getMatches = async () => {
			const history = JSON.parse(await AsyncStorage.getItem("history"));
			if (!history) await AsyncStorage.setItem("history", JSON.stringify([]));
			setMatches(history);
		};
		getMatches();
	}, []);
	return (
		<View>
			{matches.length > 0 ? (
				<>
					{matches.map((match) => (
						<MatchCard match={match} />
					))}
				</>
			) : (
				<Text>No matches available</Text>
			)}
		</View>
	);
};
export default HistoryPage;
