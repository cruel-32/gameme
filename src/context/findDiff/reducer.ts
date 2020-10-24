/* eslint-disable no-param-reassign */
import produce from 'immer';

import { imageData } from '@/data/findDiff';

export const initialState: IFindDiffState = {
  time: 30,
  page: 0,
  round: 1,
  imageData,
  quizImageData: [],
};

export const reducer = (
  state: IFindDiffState,
  action: IFindDiffActionPayload,
) => {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case 'SET_PAGE':
        draft.page = payload;
        break;
      case 'SET_TIME':
        draft.time = payload;
        break;
      case 'SET_ROUND':
        draft.round = payload;
        break;
      case 'SET_QUIZ_IMAGES':
        console.log("draft.round :: ", draft.round)
        draft.quizImageData = draft.imageData.slice(draft.round - 1, draft.round + 1);
        break;
      case 'SHUFFLE_IMAGES':
        for (let i = draft.imageData.length - 1; i > 0; i -= 1) {
          // Generate random number
          const j = Math.floor(Math.random() * (i + 1));
          const temp = draft.imageData[i];
          draft.imageData[i] = draft.imageData[j];
          draft.imageData[j] = temp;
        }
        break;
      default:


    }
  });
};
