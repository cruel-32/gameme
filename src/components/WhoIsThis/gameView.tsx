/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { StateContext, ActionContext } from '@/context/whoIsThis';
import Button from '@material-ui/core/Button';

const GameViewWrap = styled.div`
  text-align: center;
  position: relative;
  .quiz-image {
    position: relative;
    margin: 0 auto;
    width: 96%;
    overflow: hidden;
    img {
      max-width: 100%;
      visibility: hidden;
    }
    canvas {
      position: absolute;
      z-index: 16;
      top: 0;
      left: 0;
    }
  }
  .button-wrap {
    margin-top: 20px;
    button {
      margin: 0 2px;
    }
  }
`;

export const GameView = () => {
  const { quizImageData } = useContext(StateContext);
  const { round } = useContext(StateContext);
  const { setRound } = useContext(ActionContext);
  const [playGood, { stop: stopGood }] = useSound('/sounds/whoIsThis/good.mp3');
  const [playBad, { stop: stopBad }] = useSound('/sounds/whoIsThis/bad.mp3');
  const { img, description, answer, name, examples } = quizImageData?.[0] || {};

  const clickExample = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('clickExample :::::: ', e);
    setRound(round + 1);
  };

  useEffect(() => {
    console.log('이미지 변경');
  }, [quizImageData]);

  return (
    <GameViewWrap>
      {img && (
        <div>
          <div className="quiz-image">
            {img && <img src={img} alt={description} />}
          </div>
          <div className="button-wrap">
            <p>이 사람은 누구일까요?</p>
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
