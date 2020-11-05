/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import delay from 'delay';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import { StateContext, ActionContext } from '@/context/findDiff';
import { QuizMarker, QuizMarkerProps } from '@/components/FindDiff/quizMarker';

interface IGameImageProps {
  quizImage: IFindDiffImageData;
  clickRight(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  clickWrong(e: React.MouseEvent<HTMLImageElement, MouseEvent>): void;
}

const findParentByClassName = (
  className: string,
  tag: HTMLElement,
): HTMLElement | null => {
  const { parentElement } = tag;
  if (!parentElement) {
    return null;
  }
  return tag.classList.contains(className)
    ? tag
    : findParentByClassName(className, parentElement);
};

const GameViewWrap = styled.div`
  text-align: center;
  position: relative;
  blockquote {
    .title {
      font-size: 20px;
      line-height: 1.2;
    }
    .para {
      font-size: 16px;
      line-height: 1.2;
    }
    .cite {
      display: block;
      text-decoration: none;
      font-size: 18px;
      .name {
        font-size: 20px;
      }
      .text {
        font-size: 16px;
        color: #333;
      }
    }
    em {
      display: block;
      margin-top: 15px;
      font-size: 14px;
      font-style: normal;
    }
  }
`;

const ImageViewWrap = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  > div {
    position: relative;
    z-index: 15;
    &.left-panel {
      margin-right: 2px;
    }
    &.right-panel {
      margin-left: 2px;
    }
    > img {
      max-width: 100%;
      cursor: pointer;
    }
    .diff-point {
      z-index: 16;
      position: absolute;
      outline: none;
      background: transparent;
      border: none;
    }
  }
`;

export const GameImage = (props: IGameImageProps) => {
  const { quizImage, clickRight, clickWrong } = props;
  const { img, diffImg, diffPoints, description } = quizImage;

  return (
    <ImageViewWrap>
      <div className="left-panel">
        {diffPoints.map((diffPoint, i) => (
          <button
            key={i}
            type="button"
            onClick={clickRight}
            className="diff-point"
            style={diffPoint}
          />
        ))}
        <img src={img} alt={description} onClick={clickWrong} />
      </div>

      <div className="right-panel">
        {diffPoints.map((diffPoint, i) => (
          <button
            key={i}
            type="button"
            onClick={clickRight}
            className="diff-point"
            style={diffPoint}
          />
        ))}
        <img src={diffImg} alt={description} onClick={clickWrong} />
      </div>
    </ImageViewWrap>
  );
};

export const GameBlockquote = ({
  quizImage,
}: Pick<IGameImageProps, 'quizImage'>) => {
  const { t } = useTranslation();

  const { introduce, description, url, author, tags } = quizImage;

  return (
    <blockquote>
      <h1 className="title">{t(introduce)}</h1>
      <p className="para">{t(description)}</p>
      <cite className="cite">
        <Button variant="outlined" color="primary" href={url} target="_blank">
          <strong className="name">{author}</strong>
          <span className="text">{t('visitToInsta')}</span>
        </Button>
      </cite>
      <em>
        {tags.map((tag) => (
          <a
            href={`https://www.google.com/search?q=${tag}`}
            target="_blank"
            rel="noreferrer"
            key={tag}
            style={{
              marginRight: '3px',
            }}
          >
            #{t(tag)}
          </a>
        ))}
      </em>
    </blockquote>
  );
};

export const GameView = () => {
  const { quizImageData } = useContext(StateContext);
  const { round } = useContext(StateContext);
  const { setRound } = useContext(ActionContext);
  const [playGood, { stop: stopGood }] = useSound('/sounds/findDiff/good.mp3');
  const [playBad, { stop: stopBad }] = useSound('/sounds/findDiff/bad.mp3');

  const [markerOpt, setMarkerOpt] = useState<QuizMarkerProps>({
    pos: [0, 0],
    show: false,
    marker: 'wrong',
  });

  const clickRight = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!markerOpt.show) {
      const { target, clientX, clientY } = e;
      const parentWrap = findParentByClassName(
        'image-wrap',
        target as HTMLElement,
      );
      const rect = parentWrap.getBoundingClientRect();
      const x = clientX - rect.left; // x position within the element.
      const y = clientY - rect.top; // y position within the element.

      e.preventDefault();
      const newMarkerOpt: QuizMarkerProps = {
        pos: [x, y],
        show: true,
        marker: 'alright',
      };
      setMarkerOpt(newMarkerOpt);
      stopGood();
      playGood();
      await delay(1000);
      setMarkerOpt({
        ...newMarkerOpt,
        show: false,
      });
      setRound(round + 1);
    }
  };

  const clickWrong = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    if (!markerOpt.show) {
      const { target, clientX, clientY } = e;
      const parentWrap = findParentByClassName(
        'image-wrap',
        target as HTMLElement,
      );
      const rect = parentWrap.getBoundingClientRect();
      const x = clientX - rect.left; // x position within the element.
      const y = clientY - rect.top; // y position within the element.

      e.preventDefault();
      const newMarkerOpt: QuizMarkerProps = {
        pos: [x, y],
        show: true,
        marker: 'wrong',
      };
      setMarkerOpt(newMarkerOpt);
      stopBad();
      playBad();
      await delay(500);
      setMarkerOpt({
        ...newMarkerOpt,
        show: false,
      });
    }
  };

  return (
    <GameViewWrap>
      <QuizMarker {...markerOpt} />
      <div className="image-wrap">
        {quizImageData?.[0] && (
          <>
            <GameImage
              quizImage={quizImageData[0]}
              clickRight={clickRight}
              clickWrong={clickWrong}
            />
            <GameBlockquote quizImage={quizImageData[0]} />
          </>
        )}
      </div>
    </GameViewWrap>
  );
};
