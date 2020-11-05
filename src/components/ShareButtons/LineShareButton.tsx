/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

export type LineShareButtonProps = {
  url?: string;
  imageUrl?: string;
  btnImageUrl?: string;
  title?: string;
  description?: string;
  btnTitle?: string;
  className?: string;
  children?: ReactNode | Text;
};

const LineBtnWrap = styled.div`
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

export default (props: LineShareButtonProps) => {
  const ref = useRef(null);
  const { url = 'https://tegame.netlify.app' } = props;

  useEffect(() => {
    const customWin: any = typeof window !== 'undefined' ? window : null;

    if (customWin?.LineIt && !ref.current.querySelector('iframe')) {
      customWin?.LineIt?.loadButton();
    }
  });

  return (
    <LineBtnWrap ref={ref}>
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
    </LineBtnWrap>
  );
};
