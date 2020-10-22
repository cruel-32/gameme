/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

type KakaoShareButtonProps = {
  url?: string;
  imageUrl?: string;
  btnImageUrl?: string;
  title?: string;
  description?: string;
  btnTitle?: string;
  className?: string;
  children?: ReactNode | Text;
};

type LineShareButtonProps = {
  url?: string;
  imageUrl?: string;
  btnImageUrl?: string;
  title?: string;
  description?: string;
  btnTitle?: string;
  className?: string;
  children?: ReactNode | Text;
};

type FacebookShareButtonProps = {
  url?: string;
  imageUrl?: string;
  btnImageUrl?: string;
  title?: string;
  description?: string;
  btnTitle?: string;
  className?: string;
  children?: ReactNode | Text;
};

const KakaoBtnWrap = styled.div`
  display: inline-block;
  padding: 0;
  outline: none;
  max-width: 45px;
  margin-left: 3px;
  margin-right: 3px;
  cursor: pointer;
`;

export const KakaoShareButton = (props: KakaoShareButtonProps) => {
  const {
    url = 'https://gameme.netlify.app',
    imageUrl = 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
    title = '게임공유',
    description = '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
    btnTitle = '도전',
    btnImageUrl = 'https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png',
    className,
    children,
  } = props;

  const shareToKakao = () => {
    const customWin: any = typeof window !== 'undefined' ? window : null;
    if (customWin.Kakao) {
      customWin.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: btnTitle,
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    }
  };

  return (
    <KakaoBtnWrap
      id="kakao-link-btn"
      onClick={shareToKakao}
      className={className}
    >
      {children ?? <img src={btnImageUrl} alt="share to kakao" />}
    </KakaoBtnWrap>
  );
};

export const LineShareButton = (props: LineShareButtonProps) => {
  const { url = 'https://gameme.netlify.app' } = props;

  useEffect(() => {
    const customWin: any = typeof window !== 'undefined' ? window : null;

    if (customWin.LineIt) {
      customWin.LineIt.loadButton();
    }
  });

  return (
    <div
      className="line-it-button"
      data-lang="ko"
      data-type="share-b"
      data-ver="3"
      data-url={url}
      data-color="default"
      data-size="large"
      data-count="false"
      style={{
        display: 'none',
      }}
    />
  );
};

const FacebookBtnWrap = styled.div`
  display: inline-block;
  max-width: 45px;
  margin-left: 3px;
  margin-right: 3px;
`;

export const FacebookShareButton = (props: FacebookShareButtonProps) => {
  const { url = 'https://gameme.netlify.app' } = props;

  return (
    <FacebookBtnWrap id="fb-root">
      <div
        className="fb-share-button"
        data-href={url}
        data-layout="button"
        data-size="large"
      >
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          className="fb-xfbml-parse-ignore"
        >
          <img src="/images/common/ico-facebook.png" alt="share to facebook" />
        </a>
      </div>
    </FacebookBtnWrap>
  );
};
