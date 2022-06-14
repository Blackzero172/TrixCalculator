import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, Button } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import NamePage from "./pages/NamePage";
import ScorePage from "./pages/ScorePage";
import HomePage from "./pages/HomePage";
import InstructionsPage from "./pages/InstructionsPage";
import RoundPage from "./pages/RoundPage";
export default function App() {
	const [playerNames, setNames] = useState(["Ali", "Ahmad", "Saed", "Ibrahem"]);
	const [playerScores, setScores] = useState([0, 0, 0, 0]);
	const [rounds, setRound] = useState([]);
	const [roundPhase, setPhase] = useState();

	return (
		<SafeAreaView style={styles.container}>
			<NativeRouter>
				<Routes>
					<Route path="/" exact element={<HomePage />} />
					<Route path="/instructions" exact element={<InstructionsPage />} />
					<Route
						path="/new"
						exact
						element={<RoundPage roundPhase={roundPhase} setPhase={setPhase} />}
					/>
					<Route
						path="/name"
						exact
						element={<NamePage playerNames={playerNames} setNames={setNames} />}
					/>
					<Route
						path="/score"
						exact
						element={
							<ScorePage
								playerNames={playerNames}
								playerScores={playerScores}
							/>
						}
					/>
				</Routes>
				<StatusBar style="auto" />
			</NativeRouter>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
