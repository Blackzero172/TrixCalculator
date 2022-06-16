import { StyleSheet, View, Text, TextInput } from "react-native";

const CustomInput = ({ label, value, onChange, placeholder, type, color }) => {
	const styles = StyleSheet.create({
		input: {
			borderWidth: 2,
			borderColor: color ? color : "#080",
			padding: 10,
			paddingRight: 60,
			textAlign: "left",
			borderRadius: 10,
			backgroundColor: color ? `#${color}5` : "#0805",
		},
		inputContainer: {
			margin: 20,
			alignItems: "center",
		},
		label: {
			marginBottom: 10,
		},
	});
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
export default CustomInput;
