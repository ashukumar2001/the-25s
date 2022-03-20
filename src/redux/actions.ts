import createAction from "../utils/actionCreator";

export const START_GAME = `HOME/START_GAME`;
export const ADD_SINGLE_ROUND = `DASHBOARD/ADD_SINGLE_ROUND`;
export const EDIT_SINGLE_ROUND = `DASHBOARD/EDIT_SINGLE_ROUND`;

export const startGame = createAction(START_GAME);
export const addSingleRound = createAction(ADD_SINGLE_ROUND);
export const editSingleRound = createAction(EDIT_SINGLE_ROUND);
