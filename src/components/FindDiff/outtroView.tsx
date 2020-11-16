import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import delay from 'delay';
import Button from '@material-ui/core/Button';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';

import { ActionContext, StateContext } from '@/context/findDiff';

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
  const { setRound, setPage, shuffleImages } = useContext(ActionContext);
  const [playStart] = useSound('/sounds/findDiff/start.mp3');
  const [grade, setGrade] = useState(1);

  const onStart = async () => {
    shuffleImages();
    playStart();
    await delay(1000);
    setRound(1);
    setPage(1);
  };

  useEffect(() => {
    if (round > 40) {
      setGrade(1);
    } else if (round > 30 && round <= 40) {
      setGrade(2);
    } else if (round > 20 && round <= 30) {
      setGrade(3);
    } else if (round > 10 && round <= 20) {
      setGrade(4);
    } else if (round > 6 && round <= 10) {
      setGrade(5);
    } else if (round > 3 && round <= 6) {
      setGrade(6);
    } else if (round <= 3) {
      setGrade(7);
    }
  }, [round]);

  return (
    <OuttroWrap>
      <div className="score-board">
        <span className="tit">
          {t('findDiff')} <br /> {t('yourScore')}
        </span>
        <strong>{round - 1}</strong>
        <p>{`${t(`grade${grade}`)}. ${t(`findDiffGrade${grade}`)}.`}</p>
      </div>

      <DescWrap>
        <Button variant="outlined" color="primary" onClick={onStart}>
          {t('findDiff')} {t('letsTry')}!
        </Button>
        <p>{t('findDiffDesc')}</p>
      </DescWrap>
    </OuttroWrap>
  );
};
