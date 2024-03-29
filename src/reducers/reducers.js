import { combineReducers } from "redux";
export const currentCardsInitialState = {
	takes: 0,
	king: false,
	kingDouble: [false, ""],
	diamonds: 0,
	qDiamonds: false,
	qHearts: false,
	qSpades: false,
	qClubs: false,
	qDiamondsDouble: [false, ""],
	qHeartsDouble: [false, ""],
	qSpadesDouble: [false, ""],
	qClubsDouble: [false, ""],
};
const playerNamesReducer = (playerNames = ["Ali", "Ahmad", "Saed", "Ibrahem"], action) => {
	if (action.type === "NAME_PLAYERS") return action.payload;
	return playerNames;
};
const playerScoresReducer = (playerScores = {}, action) => {
	if (action.type === "SCORE_PLAYERS") return action.payload;
	return playerScores;
};
const selectedPlayerReducer = (selectedPlayer = "", action) => {
	if (action.type === "SELECT_PLAYER") return action.payload;
	return selectedPlayer;
};
const roundsReducer = (rounds = [], action) => {
	if (action.type === "ADD_ROUND") return action.payload;
	return rounds;
};
const currentRoundReducer = (currentRound = {}, action) => {
	if (action.type === "ADD_CURRENT_ROUND") return action.payload;
	return currentRound;
};
const roundPhaseReducer = (roundPhase = null, action) => {
	if (action.type === "CHANGE_PHASE") return action.payload;
	return roundPhase;
};
const maxCardsReducer = (
	maxCards = {
		takes: 0,
		king: false,
		diamonds: 0,
		qDiamonds: false,
		qHearts: false,
		qSpades: false,
		qClubs: false,
	},
	action
) => {
	if (action.type === "ADD_MAX_CARDS") return action.payload;
	return maxCards;
};
const currentCardsReducer = (currentCards = currentCardsInitialState, action) => {
	if (action.type === "ADD_CURRENT_CARDS") return action.payload;
	return currentCards;
};
const isEditReducer = (isEdit = false, action) => {
	if (action.type === "EDIT_ROUND") return action.payload;
	return isEdit;
};
const roundIndexReducer = (roundIndex = null, action) => {
	if (action.type === "SET_INDEX") return action.payload;
	return roundIndex;
};

export default combineReducers({
	playerNames: playerNamesReducer,
	playerScores: playerScoresReducer,
	selectedPlayer: selectedPlayerReducer,
	isEdit: isEditReducer,
	rounds: roundsReducer,
	currentRound: currentRoundReducer,
	roundPhase: roundPhaseReducer,
	roundIndex: roundIndexReducer,
	maxCards: maxCardsReducer,
	currentCards: currentCardsReducer,
});
