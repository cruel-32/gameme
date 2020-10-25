import React, { useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { StateContext, ActionContext } from '@/context/findDiff';
import { useInterval } from '@/hooks/useInterval';
import StatusBoard from '@/components/StatusBoard';
import Timer from '@/components/Timer';
import { useTranslation } from 'react-i18next';
import Sharebuttons from '@/components/ShareButtons';
import { IntroView } from './introView';
import { GameView } from './gameView';
import { OuttroView } from './outtroView';

const Divider = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
`;

const Preview = styled.div`
  width: 1px;
  height: 1px;
  position: absolute;
  visibility: hidden;
  > img {
    width: 100%;
  }
`;

export const FindDiff = () => {
  const { page, time, round, imageData, quizImageData } = useContext(
    StateContext,
  );
  const { shuffleImages, setTime, setPage, setQuizImages } = useContext(
    ActionContext,
  );
  const [playEnd] = useSound('/sounds/findDiff/end.mp3');
  const { t } = useTranslation();

  const description = useMemo(() => {
    let desc = '';

    if (page === 2) {
      desc += `${t('yourFriend1') + (round - 1)} ${t('yourFriend2')} ${t(
        'findDiffDesc',
      )}`;
    } else {
      desc += t('findDiffDesc');
    }
    return desc;
  }, [page, round]);

  useInterval(
    () => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        playEnd();
        setTime(60);
        setPage(2);
      }
    },
    page === 1 ? 1000 : null,
  );

  useEffect(() => {
    if (page !== 1) {
      shuffleImages();
    }
  }, [page]);

  useEffect(() => {
    setQuizImages();
  }, [round, imageData]);

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
      {quizImageData.map((quizImage) => (
        <Preview key={quizImage.img}>
          <img src={quizImage.img} alt={quizImage.description} />
          <img src={quizImage.diffImg} alt={quizImage.description} />
        </Preview>
      ))}
      <Sharebuttons
        kakao={{
          url: 'https://gameme.netlify.app/game/findDiff',
          title: `${t('findDiff')}, ${t('letsTry')}`,
          description,
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
