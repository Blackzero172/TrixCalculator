import { View, Button, Text, StyleSheet } from "react-native";
import { useNavigate } from "react-router";
import CustomInput from "../components/CustomInput";

const NamePage = ({ playerNames, setNames }) => {
	let navigate = useNavigate();
	return (
		<View style={styles.container}>
			{playerNames.map((name, i) => (
				<CustomInput
					label={`Player ${i + 1}`}
					value={name}
					onChange={(text) => {
						setNames([...playerNames.slice(0, i), text, ...playerNames.slice(i + 1)]);
					}}
					key={i}
				/>
			))}
			<Button
				title="Continue"
				color="gray"
				disabled={playerNames.includes("")}
				onPress={() => {
					navigate("/score");
				}}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
});
export default NamePage;
