declare interface IWhoIsThisState {
  time: number;
  page: number;
  score: number;
  round: number;
  quizImageData: IWhoIsThisImageData[];
  imageData: IWhoIsThisImageData[];
}

declare interface IWhoIsThisAction {
  setPage(page: number);
  setTime(time: number);
  setScore(score: number);
  setRound(number: number);
  setQuizImages();
  shuffleImages();
}

declare interface IWhoIsThisActionPayload {
  type:
    | 'SET_PAGE'
    | 'SET_TIME'
    | 'SET_SCORE'
    | 'SET_ROUND'
    | 'SET_QUIZ_IMAGES'
    | 'SHUFFLE_IMAGES';
  payload?: any;
}

declare interface IWhoIsThisImageData {
  img: string;
  nameKey: string;
  gender: 'M' | 'F';
}
