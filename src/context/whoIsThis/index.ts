import { createContext, useReducer } from 'react';

import { initialState, reducer } from './reducer';

export const ActionContext = createContext<IWhoIsThisAction>(null);
ActionContext.displayName = 'WhoIsThis ActionContext';

export const StateContext = createContext<IWhoIsThisState>(null);
StateContext.displayName = 'WhoIsThis StateContext';

export const StoreProvider = (): [IWhoIsThisState, IWhoIsThisAction] => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const actions: IWhoIsThisAction = {
    setPage(payload: number) {
      dispatch({
        type: 'SET_PAGE',
        payload,
      });
    },
    setTime(payload: number) {
      dispatch({
        type: 'SET_TIME',
        payload,
      });
    },
    setRound(payload: number) {
      dispatch({
        type: 'SET_ROUND',
        payload,
      });
    },
    setQuizImages() {
      dispatch({
        type: 'SET_QUIZ_IMAGES',
      });
    },
    shuffleImages() {
      dispatch({
        type: 'SHUFFLE_IMAGES',
      });
    },
  };
  return [store, actions];
};
