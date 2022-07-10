import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ScrollView, Text, View } from "react-native";
import MatchCard from "../components/MatchCard";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
const HistoryPage = () => {
	const { t } = useTranslation();
	const [matches, setMatches] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const getMatches = async () => {
			const history = JSON.parse(await AsyncStorage.getItem("history"));
			if (!history) await AsyncStorage.setItem("history", JSON.stringify([]));
			setMatches(history);
		};
		getMatches();
	}, []);
	return (
		<>
			<View
				style={{
					padding: 40,
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				<Button
					title={t("back")}
					color="#d00"
					onPress={() => {
						navigate("/");
					}}
				/>
			</View>

			<ScrollView
				style={{
					height: "100%",
					marginBottom: 150,
				}}
			>
				{matches.length > 0 ? (
					<>
						{matches.map((match) => (
							<MatchCard match={match} />
						))}
					</>
				) : (
					<Text>No matches available</Text>
				)}
			</ScrollView>
		</>
	);
};
export default HistoryPage;
