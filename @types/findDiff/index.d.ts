declare interface IFindDiffState {
  time: number;
  page: number;
  round: number;
  quizImageData: IFindDiffImageData[];
  imageData: IFindDiffImageData[];
}

declare interface IFindDiffAction {
  setPage(page: number);
  setTime(time: number);
  setRound(number: number);
  setQuizImages();
  shuffleImages();
}

declare interface IFindDiffActionPayload {
  type: 'SET_PAGE' | 'SET_TIME' | 'SET_ROUND' | 'SET_QUIZ_IMAGES' | 'SHUFFLE_IMAGES';
  payload?: any;
}

declare interface IFindDiffImageData {
  img: string;
  diffImg: string;
  description: string;
  author: string;
  url: string;
  tags: string[];
  diffPoints: {
    top: string;
    left: string;
    width: string;
    height: string;
  }[];
}
