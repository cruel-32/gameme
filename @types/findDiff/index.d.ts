declare interface IFindDiffState {
    time : number;
    page : number;
    round : number;
    quizImageData: IFindDiffImageData[];
    imageData: IFindDiffImageData[];
}

declare interface IFindDiffAction {
    setPage(page:number);
    setTime(time:number);
    setQuizRound(number:number);
    shuffleImages();
}

declare interface IFindDiffActionPayload {
    type: 'SET_PAGE' | 'SET_TIME' | 'SET_QUIZ_ROUND' | 'SHUFFLE_IMAGES';
    payload?:any;
}

declare interface IFindDiffImageData {
    img : string;
    diffImg : string;
    description : string;
    author : string;
    url : string;
    tags : string[];
    coords : string[];
}