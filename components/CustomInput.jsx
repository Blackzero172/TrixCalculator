import { StyleSheet, View, Text, TextInput } from "react-native";

const CustomInput = ({ label, value, onChange }) => {
	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput style={styles.input} placeholder={`Enter Name...`} onChangeText={onChange} value={value} />
		</View>
	);
};
const styles = StyleSheet.create({
	input: {
		borderWidth: 2,
		padding: 10,
		paddingRight: 60,
		textAlign: "left",
		borderRadius: 10,
		backgroundColor: "#ccc5",
	},
	inputContainer: {
		margin: 20,
		alignItems: "center",
	},
	label: {
		marginBottom: 10,
	},
});
export default CustomInput;
