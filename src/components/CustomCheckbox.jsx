import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const CustomCheckbox = ({ checked, onChange, color, label }) => {
	const styles = StyleSheet.create({
		checkbox: {
			borderWidth: 3,
			padding: 10,
			borderColor: color,
			backgroundColor: checked ? color ?? "black" : "transparent",
			borderRadius: 13,
			width: 50,
			height: 50,
		},
	});
	return (
		<View style={{ alignItems: "center", marginHorizontal: 10 }}>
			{label && <Text>{label}</Text>}
			<Pressable style={styles.checkbox} onPress={onChange}>
				<View>
					<FontAwesome name="check" size={24} color={checked ? "white" : "transparent"} />
				</View>
			</Pressable>
		</View>
	);
};
export default CustomCheckbox;
