import React from 'react';
import styled from 'styled-components';

type StatusProps = {
  round: number;
};

const ColoredBoard = styled.div`
  text-align: center;
  font-size: 32px;
  background: transparent;
`;

export default ({ round }: Pick<StatusProps, 'round'>) => (
  <ColoredBoard>{round} round</ColoredBoard>
);
