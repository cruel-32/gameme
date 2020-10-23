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

const Divider = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
`;

export const FindDiff = () => {
  const { page, time, round } = useContext(StateContext);
  const { shuffleImages, setTime, setPage } = useContext(ActionContext);
  const [playEnd] = useSound('/sounds/findDiff/end.mp3');

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
    </div>
  );
};
