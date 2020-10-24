import React, { useContext, useEffect, useState } from 'react';
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
      line-height: 1.2;
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
  const [grade, setGrade] = useState(1);

  const onStart = async () => {
    playStart();
    await delay(1000);
    setQuizRound(1);
    setPage(1);
  };

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    if (round > 55) {
      setGrade(7);
    } else if (round > 40 && round <= 55) {
      setGrade(6);
    } else if (round > 27 && round <= 40) {
      setGrade(5);
    } else if (round > 17 && round <= 27) {
      setGrade(4);
    } else if (round > 10 && round <= 17) {
      setGrade(3);
    } else if (round > 5 && round <= 10) {
      setGrade(2);
    } else if (round <= 5) {
      setGrade(1);
    }
  }, [round]);

  return (
    <OuttroWrap>
      <div className="score-board">
        <span className="tit">
          {t('findDiff')} <br /> {t('yourScore')}
        </span>
        <strong>{round - 1}</strong>
        <p>{`${t(`grade${grade}`)}.`}</p>
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
          description: `${t('description')}`,
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
