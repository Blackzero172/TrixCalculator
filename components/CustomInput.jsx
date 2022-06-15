import { StyleSheet, View, Text, TextInput } from "react-native";

const CustomInput = ({ label, value, onChange, placeholder, type }) => {
	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				onChangeText={onChange}
				value={value}
				keyboardType={type}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	input: {
		borderWidth: 2,
		borderColor: "#080",
		padding: 10,
		paddingRight: 60,
		textAlign: "left",
		borderRadius: 10,
		backgroundColor: "#0805",
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
