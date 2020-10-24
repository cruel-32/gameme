import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import delay from 'delay';
import Button from '@material-ui/core/Button';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';

import { ActionContext, StateContext } from '@/context/findDiff';

const IntroViewWrap = styled.div`
  text-align: center;
`;
const DescWrap = styled.div`
  text-align: center;
  margin: 10px 20px;
`;

export const IntroView = () => {
  const { t } = useTranslation();
  const { setPage, setRound } = useContext(ActionContext);
  const [playStart] = useSound('/sounds/findDiff/start.mp3');

  const onStart = async () => {
    playStart();
    await delay(1000);
    setPage(1);
    setRound(1);
  };

  return (
    <IntroViewWrap>
      <img
        style={{
          width: '100%',
        }}
        src="/images/findDiff/thumbnail.jpg"
        alt={t('findDiff')}
      />
      <DescWrap>
        <Button variant="outlined" color="primary" onClick={onStart}>
          {t('findDiff')} START
        </Button>
        <p>{t('findDiffDesc')}</p>
      </DescWrap>
    </IntroViewWrap>
  );
};
