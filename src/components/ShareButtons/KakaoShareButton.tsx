/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export type KakaoShareButtonProps = {
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
  margin-right: 2px;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

export default (props: KakaoShareButtonProps) => {
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
    if (customWin?.Kakao) {
      if(!customWin?.Kakao?.isInitialized()){
        customWin?.Kakao?.init('6c7e2a687597c898c1cc7b78baf543df');
      }
      customWin?.Kakao?.Link?.sendDefault({
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
