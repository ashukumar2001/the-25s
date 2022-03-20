import { Action, combineReducers } from "redux";
import { ADD_SINGLE_ROUND, EDIT_SINGLE_ROUND, START_GAME } from "./actions";

export interface Player {
  playerName: string;
  playerId: string | undefined;
}

export interface Point {
  playerId: string;
  point: number;
  isSumOfFour: Boolean;
}

export interface SingleRound {
  points: Array<Point>;
  id: string;
}

export interface Game {
  players: Array<Player>;
  rounds: Array<SingleRound>;
  time: Date;
  isCompleted: boolean;
}

interface GameState {
  currentGame?: Game;
  history: Array<Game>;
}

const initialState: GameState = {
  // currentGame: { players: [], rounds: [], time: new Date(), isCompleted: false },
  history: [],
};

interface ReduxAction extends Action {
  type: string;
  payload?: any;
}

const GameReducer = (state = initialState, { type, payload }: ReduxAction) => {
  switch (type) {
    case START_GAME:
      return { ...state, currentGame: payload };
    case ADD_SINGLE_ROUND:
      return {
        ...state,
        currentGame: {
          ...state?.currentGame,
          rounds: [
            ...(state?.currentGame?.rounds || []),
            { points: payload, id: `singleRound-${Date.now()}` },
          ],
        },
      };
    case EDIT_SINGLE_ROUND:
      let _rounds = state?.currentGame?.rounds || [];
      let foundIndex = _rounds.findIndex(
        (element) => element.id === payload.id
      );
      _rounds[foundIndex] = payload;
      return {
        ...state,
        currentGame: {
          ...state?.currentGame,
          rounds: [..._rounds],
        },
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({ Game: GameReducer });
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
