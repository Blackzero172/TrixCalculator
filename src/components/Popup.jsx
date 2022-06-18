import { StyleSheet, View, Modal, TouchableHighlight, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const Popup = ({ visible, children, buttons = [], onClose = () => {} }) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.background}>
				<View style={styles.window}>
					<View style={styles.header}>
						<TouchableHighlight onPress={onClose} underlayColor="#3335" style={{ borderRadius: 5 }}>
							<FontAwesome name="times" size={24} color="black" style={{ zIndex: 2 }} />
						</TouchableHighlight>
					</View>
					{children}
					{buttons.length > 0 && (
						<View style={styles.buttonContainer}>
							{buttons.map((button) => {
								return (
									<Button
										title={button.text}
										color={button.color ? button.color : ""}
										onPress={button.onPress}
									/>
								);
							})}
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#3338",
	},

	window: {
		width: "80%",
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		borderRadius: 10,
	},
	header: {
		width: "100%",
		alignItems: "flex-end",
		marginBottom: 20,
	},
	buttonContainer: {
		width: "100%",
		paddingHorizontal: 30,
		flexDirection: "row",
		marginTop: 20,
		justifyContent: "space-evenly",
	},
});
export default Popup;
