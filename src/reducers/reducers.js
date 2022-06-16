import { combineReducers } from "redux";
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
const maxCardsReducer = (maxCards = { takes: 0, diamonds: 0, king: false, queens: 0 }, action) => {
	if (action.type === "ADD_MAX_CARDS") return action.payload;
	return maxCards;
};
const currentCardsReducer = (currentCards = { takes: 0, king: false, kingDouble: false }, action) => {
	if (action.type === "ADD_CURRENT_CARDS") return action.payload;
	return currentCards;
};

export default combineReducers({
	playerNames: playerNamesReducer,
	playerScores: playerScoresReducer,
	selectedPlayer: selectedPlayerReducer,
	rounds: roundsReducer,
	currentRound: currentRoundReducer,
	roundPhase: roundPhaseReducer,
	maxCards: maxCardsReducer,
	currentCards: currentCardsReducer,
});
