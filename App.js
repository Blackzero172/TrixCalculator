import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { StyleSheet, SafeAreaView, Text, Dimensions, View, Button } from "react-native";
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
import BannerAd from "./src/components/BannerAd";
import "./i18n";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./src/components/LanguageSelector";
import HistoryPage from "./src/pages/HistoryPage";
const store = createStore(reducers, devToolsEnhancer());
export default function App() {
	return (
		<Provider store={store}>
			<Suspense fallback={<Text>Loading...</Text>}>
				<SafeAreaView style={styles.container}>
					<NativeRouter>
						<Routes>
							<Route path="/" exact element={<HomePage />} />
							<Route path="/instructions" exact element={<InstructionsPage />} />
							<Route path="/new" exact element={<RoundPage />} />
							<Route path="/name" exact element={<NamePage />} />
							<Route path="/score" exact element={<ScorePage />} />
							<Route path="/history" exact element={<HistoryPage />} />
						</Routes>
						<StatusBar style="auto" />
						<BannerAd />
						<LanguageSelector />
					</NativeRouter>
				</SafeAreaView>
			</Suspense>
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
