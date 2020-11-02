/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { StateContext, ActionContext } from '@/context/whoIsThis';
import { useResize } from '@/hooks/useResize';
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
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [width, height] = useResize('.quiz-image');

  const clickExample = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('clickExample :::::: ', e);
    setRound(round + 1);
  };

  useEffect(() => {
    console.log('quizImageData :: ', quizImageData);

    if (canvasRef.current) {
      console.log('width ::', width);
      console.log('height ::', height);

      console.log('canvasRef.current ::', canvasRef.current);
      const ctx = canvasRef.current.getContext('2d');
      console.log('GameView -> ctx', ctx);
      const canvasImg = new Image(); // 이미지
      canvasImg.src = quizImageData[0].img;
      console.log('GameView -> quizImageData[0].img', quizImageData[0].img);
      canvasImg.onload = () => {
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          canvasImg,
          0,
          0,
          imgRef.current?.width,
          imgRef.current?.height,
        ); // 이미지, 시작점x, 시작점y,넓이,높이

        const { width: w, height: h } = imgRef.current;

        console.log('canvasImg ::', canvasImg);
        console.log('canvasImg.width ::', canvasImg.width);
        console.log('canvasImg.height ::', canvasImg.height);
        console.log('imgRef.current?.width ::', imgRef.current?.width);
        console.log('imgRef.current?.height ::', imgRef.current?.height);

        const pixelArr = ctx.getImageData(0, 0, w, h).data;
        const sampleSize = 4;

        for (let y = 0; y < h; y += sampleSize) {
          console.log('y : ', y);
          for (let x = 0; x < w; x += sampleSize) {
            console.log('x : ', x);
            const p = (x + y * w) * 4;
            ctx.fillStyle = `rgba(${pixelArr[p]},${pixelArr[p + 1]}, ${
              pixelArr[p + 2]
            }, ${pixelArr[p + 3]})`;
            ctx.fillRect(x, y, sampleSize, sampleSize);
          }
        }
      };
    }
  }, [quizImageData]);

  return (
    <GameViewWrap>
      {img && (
        <div>
          <div className="quiz-image">
            {img && <img src={img} alt={description} ref={imgRef} />}
            <canvas
              id="ctx"
              ref={canvasRef}
              width={imgRef.current?.width}
              height={imgRef.current?.height}
            />
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
