/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { KakaoShareButtonProps } from './KakaoShareButton';
import { LineShareButtonProps } from './LineShareButton';
import { FacebookShareButtonProps } from './FacebookShareButton';

export interface ShareButtonsProps {
  kakao?: KakaoShareButtonProps;
  line?: LineShareButtonProps;
  facebook?: FacebookShareButtonProps;
  className?: string;
}

const KakaoShareButton = React.lazy(() => import('./KakaoShareButton'));
const LineShareButton = React.lazy(() => import('./LineShareButton'));
const FacebookShareButton = React.lazy(() => import('./FacebookShareButton'));

export default (props: ShareButtonsProps) => {
  const { kakao, line, facebook, className } = props;
  const isCSR = typeof window !== 'undefined';

  const { t } = useTranslation();

  return (
    <div className={className} style={{ textAlign: 'center' }}>
      {isCSR && (
        <Suspense fallback={<div>Loading...</div>}>
          <p>
            <strong>{t('SNS')}</strong>
          </p>
          <KakaoShareButton {...kakao} />
          <LineShareButton {...line} />
          <div>
            <FacebookShareButton {...facebook} />
          </div>
        </Suspense>
      )}
    </div>
  );
};
