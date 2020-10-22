import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import delay from 'delay';
import Button from '@material-ui/core/Button';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';

import { ActionContext, StateContext } from '@/context/findDiff';
import {
  KakaoShareButton,
  LineShareButton,
  FacebookShareButton,
} from '@/components/ShareButtons';

const IntroViewWrap = styled.div`
  text-align: center;
`;
const DescWrap = styled.div`
  text-align: center;
  margin: 10px 20px;
`;

export const IntroView = () => {
  const { t } = useTranslation();
  const { imageData } = useContext(StateContext);
  const { setPage, shuffleImages, setQuizRound } = useContext(ActionContext);
  const [playStart] = useSound('/sounds/findDiff/start.mp3');

  const onStart = async () => {
    playStart();
    await delay(1000);
    setPage(1);
  };

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    setQuizRound(1);
  }, [imageData]);

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
      <div>
        <p>
          <strong>{t('SNS')}</strong>
        </p>
        <KakaoShareButton
          url="https://gameme.netlify.app/game/findDiff"
          title={`${t('findDiff')}, ${t('letsTry')}`}
          description={`${t('description')}`}
        />
        <LineShareButton url="https://gameme.netlify.app/game/findDiff" />
        <FacebookShareButton url="https://gameme.netlify.app/game/findDiff" />
      </div>
    </IntroViewWrap>
  );
};
