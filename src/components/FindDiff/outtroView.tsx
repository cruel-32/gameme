import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import delay from 'delay';
import Button from '@material-ui/core/Button';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';

import { ActionContext, StateContext } from '@/context/findDiff';
import Sharebuttons from '@/components/ShareButtons';

const OuttroWrap = styled.div`
  text-align: center;
  .score-board {
    padding-top: 30px;
    .tit {
      font-size: 32px;
      text-align: center;
    }
    strong {
      display: block;
      font-size: 50px;
      text-align: center;
    }
    p {
      font-size: 14px;
      text-align: center;
    }
  }
`;
const DescWrap = styled.div`
  text-align: center;
  margin: 10px 20px;
`;

export const OuttroView = () => {
  const { t } = useTranslation();
  const { round } = useContext(StateContext);
  const { shuffleImages, setQuizRound, setPage } = useContext(ActionContext);
  const [playStart] = useSound('/sounds/findDiff/start.mp3');

  const onStart = async () => {
    playStart();
    await delay(1000);
    setQuizRound(1);
    setPage(1);
  };

  useEffect(() => {
    shuffleImages();
  }, []);

  return (
    <OuttroWrap>
      <div className="score-board">
        <span className="tit">
          {t('findDiff')} <br /> {t('yourScore')}
        </span>
        <strong>{round - 1}</strong>
        <p>정말 어림없는 점수군요</p>
      </div>

      <DescWrap>
        <Button variant="outlined" color="primary" onClick={onStart}>
          {t('findDiff')} {t('letsTry')}!
        </Button>
        <p>{t('findDiffDesc')}</p>
      </DescWrap>

      <Sharebuttons
        kakao={{
          url: 'https://gameme.netlify.app/game/findDiff',
          title: `${t('findDiff')}, ${t('letsTry')}`,
          desc: `${t('desc')}`,
        }}
        line={{
          url: 'https://gameme.netlify.app/game/findDiff',
        }}
        facebook={{
          url: 'https://gameme.netlify.app/game/findDiff',
        }}
      />
    </OuttroWrap>
  );
};
