import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetectorPlugin = {
	type: "languageDetector",
	async: true,
	init: () => {},
	detect: async function (callback) {
		try {
			//get stored language from Async storage
			await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
				if (language) {
					//if language was stored before, use this language in the app
					return callback(language);
				} else {
					//if language was not stored yet, use device's locale
					return callback(Localization.locale);
				}
			});
		} catch (error) {
			console.log("Error reading language", error);
		}
	},
	cacheUserLanguage: async function (language) {
		try {
			//save a user's language choice in Async storage
			await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
		} catch (error) {}
	},
};
export default languageDetectorPlugin;
