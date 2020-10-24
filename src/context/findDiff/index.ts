import { createContext, useReducer } from 'react';

import { initialState, reducer } from './reducer';

export const ActionContext = createContext<IFindDiffAction>(null);
ActionContext.displayName = 'FindDiff ActionContext';

export const StateContext = createContext<IFindDiffState>(null);
StateContext.displayName = 'FindDiff StateContext';

export const StoreProvider = (): [IFindDiffState, IFindDiffAction] => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const actions: IFindDiffAction = {
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
