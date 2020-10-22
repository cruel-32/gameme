import React from 'react';
import styled from 'styled-components';
import { CheckCircleOutline, Close } from '@material-ui/icons';

export interface QuizMarkerProps {
  pos: number[];
  show: boolean;
  marker?: 'alright' | 'wrong';
}

const MarkerWrap = styled.div<QuizMarkerProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  left: ${({ pos }) => `${pos[0]}px`};
  top: ${({ pos }) => `${pos[1]}px`};
  z-index: 16;
  transform: translate(-50%, -50%);
`;

export const QuizMarker = (props: QuizMarkerProps) => {
  const { pos, show, marker } = props;

  return (
    <MarkerWrap show={show} pos={pos}>
      {marker === 'alright' ? <CheckCircleOutline /> : <Close />}
    </MarkerWrap>
  );
};
