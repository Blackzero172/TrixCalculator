import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(i18n.language);
	useEffect(() => {
		if (value !== "") i18n.changeLanguage(value);
	}, [value]);
	const items = [
		{
			label: "English",
			value: "en",
		},
		{
			label: "العربية",
			value: "ar",
		},
	];
	return (
		<View
			style={{
				width: Dimensions.get("screen").width,
				height: Dimensions.get("screen").height,
				position: "absolute",
				justifyContent: "flex-start",
				paddingTop: 40,
				paddingRight: 10,
			}}
		>
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setValue={setValue}
				setOpen={setOpen}
				style={{
					width: 110,
				}}
				containerStyle={{ width: 110, marginLeft: Dimensions.get("screen").width - 120 }}
			/>
		</View>
	);
};
export default LanguageSelector;
