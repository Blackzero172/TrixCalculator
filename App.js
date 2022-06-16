import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import { Provider } from "react-redux";
import { createStore } from "redux";

import NamePage from "./src/pages/NamePage";
import ScorePage from "./src/pages/ScorePage";
import HomePage from "./src/pages/HomePage";
import InstructionsPage from "./src/pages/InstructionsPage";
import RoundPage from "./src/pages/RoundPage";
import reducers from "./src/reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

const store = createStore(reducers, devToolsEnhancer());

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<NativeRouter>
					<Routes>
						<Route path="/" exact element={<HomePage />} />
						<Route path="/instructions" exact element={<InstructionsPage />} />
						<Route path="/new" exact element={<RoundPage />} />
						<Route path="/name" exact element={<NamePage />} />
						<Route path="/score" exact element={<ScorePage />} />
					</Routes>
					<StatusBar style="auto" />
				</NativeRouter>
			</SafeAreaView>
		</Provider>
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
