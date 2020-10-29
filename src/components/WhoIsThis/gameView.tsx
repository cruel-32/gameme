/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { StateContext, ActionContext } from '@/context/whoIsThis';
import Button from '@material-ui/core/Button';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';

const GameViewWrap = styled.div`
  text-align: center;
  position: relative;
  .quiz-image {
    margin: 0 auto;
    width: 90%;
    img {
      max-width: 100%;
    }
    canvas {
      display: none;
    }
  }
  .button-wrap {
  }
`;

export const GameView = () => {
  const { quizImageData } = useContext(StateContext);
  const { round } = useContext(StateContext);
  const { setRound } = useContext(ActionContext);
  const [playGood, { stop: stopGood }] = useSound('/sounds/whoIsThis/good.mp3');
  const [playBad, { stop: stopBad }] = useSound('/sounds/whoIsThis/bad.mp3');
  const canvasRef = useRef(null);
  const [tempImg] = useState(new Image());
  const [ctx, setCtx] = useState<any>(null);

  const { img, description, answer, name, examples } = quizImageData?.[0] || {};

  const clickExample = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('clickExample :::::: ', e);
    setRound(round + 1);
  };

  useEffect(() => {
    console.log('quizImageData');
  }, [quizImageData]);

  return (
    <GameViewWrap>
      {img && (
        <div>
          <div className="quiz-image">test</div>

          <div className="button-wrap">
            {examples.map((example, i) => (
              <Button
                onClick={clickExample}
                variant="outlined"
                color="primary"
                value={i}
                key={i}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      )}
    </GameViewWrap>
  );
};
