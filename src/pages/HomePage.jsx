import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<View style={styles.buttonContainer}>
			<Text style={styles.heading}>Trix Calculator</Text>
			<Button
				title="Start"
				color="green"
				onPress={() => {
					navigate("/name");
				}}
			/>
			<Button
				title="Instructions"
				color="green"
				onPress={() => {
					navigate("/instructions");
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "space-between",
		height: 300,
		alignItems: "center",
	},
	heading: {
		fontSize: 40,
		textAlign: "center",
		marginBottom: 30,
	},
});
export default HomePage;
