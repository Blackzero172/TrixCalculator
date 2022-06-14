import { useState } from "react";
import { Button, Dimensions, Text, View } from "react-native";
import { useNavigate } from "react-router";
const RoundPage = ({ roundPhase, setPhase }) => {
	const screenWidth = Dimensions.get("window").width;
	const navigate = useNavigate();

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-evenly",
				width: screenWidth,
			}}
		>
			{!roundPhase && (
				<>
					<Button
						title="Trix"
						color="gray"
						onPress={() => {
							setPhase("Trix");
							navigate("/score");
						}}
					/>
					<Button
						title="Complex"
						color="gray"
						onPress={() => {
							setPhase("Complex");
						}}
					/>
				</>
			)}
			{roundPhase === "Trix" && <></>}
			{roundPhase === "Complex" && <></>}
		</View>
	);
};
export default RoundPage;
