import { View, Button, StyleSheet } from "react-native";
import { useNavigate } from "react-router";
import { connect } from "react-redux";

import CustomInput from "../components/CustomInput";
import { setNames } from "../actions/actionCreators";

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
					placeholder="Enter Name..."
					key={i}
				/>
			))}
			<Button
				title="Continue"
				color="green"
				disabled={playerNames.includes("") || new Set(playerNames).size !== playerNames.length}
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
const mapStateToProps = (state) => {
	return {
		playerNames: state.playerNames,
	};
};
export default connect(mapStateToProps, { setNames })(NamePage);
