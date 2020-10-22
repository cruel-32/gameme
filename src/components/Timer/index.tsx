import React from 'react';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

type TimerProps = {
  time: number;
};

const ColoredTimer = styled.div`
  text-align: center;
  font-size: 32px;
  color: ${(props: TimerProps) => (props.time <= 10 ? 'red' : 'black')};
`;

export default ({ time }: Pick<TimerProps, 'time'>) => {
  const { t } = useTranslation();

  return (
    <ColoredTimer time={time}>
      {time} {t('seconds')}
    </ColoredTimer>
  );
};
