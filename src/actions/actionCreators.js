export const setNames = (playerNames) => ({
	type: "NAME_PLAYERS",
	payload: playerNames,
});
export const setScores = (playerScores) => ({
	type: "SCORE_PLAYERS",
	payload: playerScores,
});
export const selectPlayer = (selectedPlayer) => ({
	type: "SELECT_PLAYER",
	payload: selectedPlayer,
});
export const setEdit = (isEdit) => ({
	type: "EDIT_ROUND",
	payload: isEdit,
});
export const setIndex = (roundIndex) => ({
	type: "SET_INDEX",
	payload: roundIndex,
});
export const setRounds = (rounds) => ({
	type: "ADD_ROUND",
	payload: rounds,
});
export const setCurrentRound = (currentRound) => ({
	type: "ADD_CURRENT_ROUND",
	payload: currentRound,
});
export const setRoundPhase = (roundPhase) => ({
	type: "CHANGE_PHASE",
	payload: roundPhase,
});
export const setMaxCards = (maxCards) => ({
	type: "ADD_MAX_CARDS",
	payload: maxCards,
});
export const setCurrentCards = (currentCards) => ({
	type: "ADD_CURRENT_CARDS",
	payload: currentCards,
});
