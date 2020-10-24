import React, { useContext } from 'react';
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
  const { page, time, round, quizImageData } = useContext(StateContext);
  const { shuffleImages, setTime, setPage } = useContext(ActionContext);
  const [playEnd] = useSound('/sounds/findDiff/end.mp3');
  const { t } = useTranslation();

  useInterval(
    () => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        playEnd();
        shuffleImages();
        setTime(60);
        setPage(2);
      }
    },
    page === 1 ? 1000 : null,
  );

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
        <Preview>
          {
            quizImageData.map((quizImage) =>  <img key={quizImage.img} src={quizImage.img} alt={quizImage.description} />)
          }
        </Preview>
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
