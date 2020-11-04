/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { StateContext, ActionContext } from '@/context/whoIsThis';
import Button from '@material-ui/core/Button';
import { useInterval } from '@/hooks/useInterval';

const GameViewWrap = styled.div`
  text-align: center;
  position: relative;
  .quiz-image {
    position: relative;
    margin: 0 auto;
    width: 96%;
    > img {
      &:first-child {
        position: relative;
        z-index: 15;
      }
      position: absolute;
      z-index: 14;
      top: 0;
      left: 0;
      max-width: 100%;
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
  const { score, quizImageData } = useContext(StateContext);
  const { round } = useContext(StateContext);
  const { setScore, setRound } = useContext(ActionContext);
  const [playGood, { stop: stopGood }] = useSound('/sounds/whoIsThis/good.mp3');
  const [playBad, { stop: stopBad }] = useSound('/sounds/whoIsThis/bad.mp3');
  const { img, description, answer, name, examples } = quizImageData?.[0] || {};
  const [wrongCount, setWrongCount] = useState(0);
  const [entries, setEntries] = useState([4, 3, 2, 1, 0]);

  const clickExample = (clickedAnswer: number) => {
    if (answer === clickedAnswer) {
      playGood();
      setScore(score + 1);
      setRound(round + 1);
      setEntries([4, 3, 2, 1, 0]);
      setWrongCount(0);
    } else if (wrongCount >= 1) {
      playBad();
      setScore(score - 1);
      setEntries([4, 3, 2, 1, 0]);
      setRound(round + 1);
      setWrongCount(0);
    } else {
      playBad();
      setWrongCount(wrongCount + 1);
    }
    // setRound(round + 1);
  };

  useEffect(() => {
    console.log('이미지 변경');
  }, [quizImageData]);

  useInterval(
    () => {
      setEntries(entries.slice(1));
    },
    entries.length > 1 ? 2000 : null,
  );

  return (
    <GameViewWrap>
      {img && (
        <div>
          <div className="quiz-image">
            {entries.map((item) => (
              <img
                key={`${img + item}`}
                src={`${img}_${item}.jpg`}
                alt={description}
              />
            ))}
          </div>
          <div className="button-wrap">
            <p>이 사람은 누구일까요?</p>
            {examples.map((example, i) => (
              <Button
                onClick={() => clickExample(i)}
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
