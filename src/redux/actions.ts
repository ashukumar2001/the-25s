import createAction from "../utils/actionCreator";

export const START_GAME = `HOME/START_GAME`;
export const ADD_SINGLE_ROUND = `DASHBOARD/ADD_SINGLE_ROUND`;
export const EDIT_SINGLE_ROUND = `DASHBOARD/EDIT_SINGLE_ROUND`;
export const SET_GAME_WON = `DASHBOARD/SET_GAME_WON`;
export const SET_GAME_HISTORY = "DASHBOARD/SET_GAME_HISTORY";
export const QUIT_GAME = "DASHBOARD/QUIT_GAME";

export const startGame = createAction(START_GAME);
export const addSingleRound = createAction(ADD_SINGLE_ROUND);
export const editSingleRound = createAction(EDIT_SINGLE_ROUND);
export const setGameWon = createAction(SET_GAME_WON);
export const setGameHistory = createAction(SET_GAME_HISTORY);
export const quitGame = createAction(QUIT_GAME);
