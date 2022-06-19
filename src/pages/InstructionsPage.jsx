import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router";

const InstructionsPage = () => {
	const navigate = useNavigate();
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Instructions (4 Players)</Text>
			<Text>The game consists of four rounds each of two parts,one called Trix and the other Complex</Text>
			<Text style={styles.title}>Trix:</Text>
			<Text>
				This part of the game closely resembles Solitare in the fact that you need to play the cards in order
				, e.g
			</Text>
			<View style={{ marginTop: 20, alignItems: "center" }}>
				<Button
					title="Back"
					color="#d00"
					onPress={() => {
						navigate("/");
					}}
				/>
			</View>
		</View>
	);
};
export default InstructionsPage;
const styles = StyleSheet.create({
	heading: {
		fontSize: 28,
		textAlign: "center",
		marginBottom: 30,
	},
	title: {
		fontSize: 20,
		marginVertical: 15,
	},
	container: {
		padding: 15,
	},
});
