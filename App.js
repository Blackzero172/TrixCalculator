import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, Pressable } from "react-native";

export default function App() {
	const [playerNames, setNames] = useState(["", "", "", ""]);
	return (
		<SafeAreaView style={styles.container}>
			{playerNames.map((name, i) => (
				<View style={styles.inputContainer}>
					<Text>Player {i + 1}</Text>
					<TextInput
						style={styles.input}
						placeholder={`Enter Name...`}
						onChangeText={(text) => {
							setNames([...playerNames.slice(0, i), text, ...playerNames.slice(i + 1)]);
						}}
						value={name}
					/>
				</View>
			))}
			<Pressable style={styles.button}>
				<Text>Continue</Text>
			</Pressable>
			<StatusBar style="auto" />
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
	input: {
		borderWidth: 2,
		padding: 10,
		paddingRight: 60,
		textAlign: "left",
	},
	inputContainer: {
		margin: 20,
	},
	button: {
		borderWidth: 1,
		backgroundColor: "red",
		padding: 10,
	},
});
