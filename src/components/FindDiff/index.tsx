import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { StateContext, ActionContext } from '@/context/findDiff';
import { useInterval } from '@/hooks/useInterval';
import StatusBoard from '@/components/StatusBoard';
import Timer from '@/components/Timer';
import { IntroView } from './introView';
import { GameView } from './gameView';
import { OuttroView } from './outtroView';
import { useTranslation } from 'react-i18next';
import Sharebuttons from '@/components/ShareButtons';

const Divider = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
`;

const Preview = styled.div`
  width:1px;
  height:1px;
  position:absolute;
  visibility:hidden;
  > img {
    width:100%;
  }
`;

export const FindDiff = () => {
  const { page, time, round, imageData, quizImageData } = useContext(StateContext);
  const { shuffleImages, setTime, setPage, setQuizImages } = useContext(ActionContext);
  const [playEnd] = useSound('/sounds/findDiff/end.mp3');
  const { t } = useTranslation();

  useInterval(
    () => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        playEnd();
        setTime(30);
        setPage(2);
      }
    },
    page === 1 ? 1000 : null,
  );

  useEffect(() => {
    console.log("FindDiff -> page", page)
    if(page !== 1){
      console.log('shuffle')
      shuffleImages();
    }
  }, [ page ])

  useEffect(() => {
    console.log('setQuizImages')
    setQuizImages();
  }, [ round, imageData ])

  return (
    <div>
      {page !== 2 && (
        <Divider>
          <StatusBoard round={round} />
          <Timer time={time} />
        </Divider>
      )}
      {page === 0 && <IntroView />}
      {page === 1 && <GameView />}
      {page === 2 && <OuttroView />}
      
      {/* <div>
        round : {round}<br/>
        imageData : {imageData.map((img) => img.img).join(' === ')}<br/>
        quizImageData : {quizImageData.map((img) => img.img).join(' === ')}<br/>
      </div> */}

      {
        quizImageData.map((quizImage) => (
          <Preview key={quizImage.img}>
            <img src={quizImage.img} alt={quizImage.description} />
            <img src={quizImage.diffImg} alt={quizImage.description} />
          </Preview>
        ))
      }
      <Sharebuttons
        kakao={{
          url: 'https://gameme.netlify.app/game/findDiff',
          title: `${t('findDiff')}, ${t('letsTry')}`,
          description: `${t('description')}`,
        }}
        line={{
          url: 'https://gameme.netlify.app/game/findDiff',
        }}
        facebook={{
          url: 'https://gameme.netlify.app/game/findDiff',
        }}
      />
    </div>
  );
};
