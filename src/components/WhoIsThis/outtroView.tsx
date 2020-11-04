import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import delay from 'delay';
import Button from '@material-ui/core/Button';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';

import { ActionContext, StateContext } from '@/context/whoIsThis';

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
  const { score } = useContext(StateContext);
  const { setRound, setPage, shuffleImages } = useContext(ActionContext);
  const [playStart] = useSound('/sounds/whoIsThis/start.mp3');
  const [grade, setGrade] = useState(1);

  const onStart = async () => {
    shuffleImages();
    playStart();
    await delay(1000);
    setRound(1);
    setPage(1);
  };

  useEffect(() => {
    if (score > 55) {
      setGrade(1);
    } else if (score > 40 && score <= 55) {
      setGrade(2);
    } else if (score > 27 && score <= 40) {
      setGrade(3);
    } else if (score > 17 && score <= 27) {
      setGrade(4);
    } else if (score > 10 && score <= 17) {
      setGrade(5);
    } else if (score > 5 && score <= 10) {
      setGrade(6);
    } else if (score <= 5) {
      setGrade(7);
    }
  }, [score]);

  return (
    <OuttroWrap>
      <div className="score-board">
        <span className="tit">
          {t('whoIsThis')} <br /> {t('yourScore')}
        </span>
        <strong>{score}</strong>
        <p>{`${t(`grade${grade}`)}. ${t(`whoIsThisGrade${grade}`)}.`}</p>
      </div>

      <DescWrap>
        <Button variant="outlined" color="primary" onClick={onStart}>
          {t('whoIsThis')} {t('letsTry')}!
        </Button>
        <p>{t('whoIsThisDesc')}</p>
      </DescWrap>
    </OuttroWrap>
  );
};
