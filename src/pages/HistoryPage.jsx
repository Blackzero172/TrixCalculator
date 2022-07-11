import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ScrollView, Text, View } from "react-native";
import MatchCard from "../components/MatchCard";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import moment from "moment";
const HistoryPage = () => {
	const { t } = useTranslation();
	const [matches, setMatches] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const getMatches = async () => {
			const history = JSON.parse(await AsyncStorage.getItem("history"));
			if (!history) await AsyncStorage.setItem("history", JSON.stringify([]));
			else {
				history.filter((match) => moment(match.timeFinished).diff(moment(), "days") >= 30);
				setMatches(history);
				await AsyncStorage.setItem("history", JSON.stringify(history));
			}
		};
		getMatches();
	}, []);
	return (
		<>
			<View
				style={{
					paddingTop: 50,
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
				<Text>{t("expandMessage")}</Text>
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
					<Text>{t("noMatches")}</Text>
				)}
			</ScrollView>
		</>
	);
};
export default HistoryPage;
