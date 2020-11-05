/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export type FacebookShareButtonProps = {
  url?: string;
  imageUrl?: string;
  btnImageUrl?: string;
  title?: string;
  description?: string;
  btnTitle?: string;
  className?: string;
  children?: ReactNode | Text;
};

const FacebookBtnWrap = styled.div`
  display: inline-block;
`;

export default (props: FacebookShareButtonProps) => {
  const { url = 'https://tegame.netlify.app' } = props;

  return (
    <FacebookBtnWrap
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
        <img
          src="/images/common/ico-facebook.png"
          style={{ maxWidth: '45px' }}
          alt="share to facebook"
        />
      </a>
    </FacebookBtnWrap>
  );
};
