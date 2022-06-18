import { Action, combineReducers } from "redux";
import {
  ADD_SINGLE_ROUND,
  EDIT_SINGLE_ROUND,
  QUIT_GAME,
  SET_GAME_HISTORY,
  SET_GAME_WON,
  START_GAME,
} from "./actions";

export interface Player {
  playerName: string;
  playerId: string;
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
export interface PlayerWon extends Point, Player {}

export interface Game {
  players: Array<Player>;
  rounds: Array<SingleRound>;
  time: string | number | Date | null;
  isCompleted: boolean;
  playerWon: null | PlayerWon;
}

interface GameState {
  currentGame: Game;
  history: Array<Game>;
}

const initialState: GameState = {
  currentGame: {
    players: [],
    rounds: [],
    time: null,
    isCompleted: false,
    playerWon: null,
  },
  history: [],
};

interface ReduxAction extends Action {
  type: string;
  payload?: any;
}

const GameReducer = (
  state = { ...initialState },
  { type, payload }: ReduxAction
) => {
  switch (type) {
    case START_GAME:
      return { ...state, currentGame: { ...state.currentGame, ...payload } };
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
    case SET_GAME_WON:
      return {
        ...state,
        currentGame: {
          ...state?.currentGame,
          ...payload,
        },
      };
    case SET_GAME_HISTORY:
      return {
        ...state,
        currentGame: {
          ...initialState.currentGame,
        },
        history: [...state.history, state?.currentGame],
      };
    case QUIT_GAME:
      return {
        ...state,
        currentGame: {
          ...initialState.currentGame,
        },
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  Game: GameReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
