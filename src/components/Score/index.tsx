import React from 'react';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

type ScoreProps = {
  score: number;
};

const ColoredScore = styled.div`
  text-align: center;
  font-size: 32px;
  color: ${(props: ScoreProps) => {
    const { score } = props;
    if (score > 3) {
      return 'yellow';
    }
    if (score > 6) {
      return 'green';
    }
    return 'black';
  }};
`;

export default ({ score }: Pick<ScoreProps, 'score'>) => {
  const { t } = useTranslation();

  return (
    <ColoredScore score={score}>
      {score} {t('score')}
    </ColoredScore>
  );
};
