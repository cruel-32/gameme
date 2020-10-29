import React, { useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { StateContext, ActionContext } from '@/context/whoIsThis';
import { useInterval } from '@/hooks/useInterval';
import StatusBoard from '@/components/StatusBoard';
import Timer from '@/components/Timer';
import { useTranslation } from 'react-i18next';
import Sharebuttons from '@/components/ShareButtons';
import { IntroView } from './introView';
import { GameView } from './gameView';

const Divider = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
`;

export const WhoIsThis = () => {
  const { page, time, round, imageData } = useContext(StateContext);
  const { shuffleImages, setTime, setPage, setQuizImages } = useContext(
    ActionContext,
  );
  const [playEnd] = useSound('/sounds/whoIsThis/end.mp3');
  const { t } = useTranslation();

  const description = useMemo(() => {
    let desc = '';

    if (page === 2) {
      desc += `${t('yourFriend1') + (round - 1)} ${t('yourFriend2')} ${t(
        'whoIsThisDesc',
      )}`;
    } else {
      desc += t('whoIsThisDesc');
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
      {/* {page === 1 && <GameView />} */}
      <GameView />
      <Sharebuttons
        kakao={{
          url: 'https://gameme.netlify.app/game/whoIsThis',
          title: `${t('whoIsThis')}, ${t('letsTry')}`,
          description,
        }}
        line={{
          url: 'https://gameme.netlify.app/game/whoIsThis',
        }}
        facebook={{
          url: 'https://gameme.netlify.app/game/whoIsThis',
        }}
      />
    </div>
  );
};
