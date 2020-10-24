/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { ReactNode, useEffect } from 'react';

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

export default (props: LineShareButtonProps) => {
  const { url = 'https://gameme.netlify.app' } = props;

  useEffect(() => {
    const customWin: any = typeof window !== 'undefined' ? window : null;

    if (customWin.LineIt) {
      customWin.LineIt.loadButton();
    }
  }, []);

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
