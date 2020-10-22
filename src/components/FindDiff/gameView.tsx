import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import delay from 'delay';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';

import { StateContext, ActionContext } from '@/context/findDiff';
import { QuizMarker, QuizMarkerProps } from '@/components/FindDiff/quizMarker';

interface IGameImagesProps {
  quizImage: IFindDiffImageData;
  clickRight(e: React.MouseEvent<HTMLAreaElement, MouseEvent>): void;
  clickWrong(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
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
  .image-wrap > div {
    &:first-child {
      position: relative;
      z-index: 15;
      top: auto;
      left: auto;
      blockquote {
        display: block;
      }
    }
    position: absolute;
    z-index: 14;
    top: 0;
    left: 0;
    blockquote {
      display: none;
    }
    area {
      outline: none;
      cursor: unset;
    }
  }
`;

const ImageViewWrap = styled.div`
  text-align: center;
`;

const GameImages = (props: IGameImagesProps) => {
  const { quizImage, clickRight, clickWrong } = props;
  const { img, diffImg, url, coords, description } = quizImage;

  return (
    <ImageViewWrap>
      <button type="button" onClick={clickWrong}>
        <img src={img} useMap="#points" alt={description} />
      </button>

      <button type="button" onClick={clickWrong}>
        <img src={diffImg} useMap="#points" alt={description} />
      </button>
      <map name="points">
        {coords.map((coord) => (
          <area
            // eslint-disable-next-line react/no-array-index-key
            key={url + coord}
            shape="rect"
            coords={coord}
            onClick={clickRight}
            href={url}
            alt={url}
          />
        ))}
      </map>
    </ImageViewWrap>
  );
};

const GameBlockquote = ({ quizImage }: Pick<IGameImagesProps, 'quizImage'>) => {
  const { t } = useTranslation();

  const { description, url, author, tags } = quizImage;

  return (
    <blockquote>
      <p>
        <strong>{author}</strong>. {t(description)}
      </p>
      <cite
        style={{
          display: 'block',
        }}
      >
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
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
  const { setQuizRound } = useContext(ActionContext);
  const [playGood, { stop: stopGood }] = useSound('/sounds/findDiff/good.mp3');
  const [playBad, { stop: stopBad }] = useSound('/sounds/findDiff/bad.mp3');

  const [markerOpt, setMarkerOpt] = useState<QuizMarkerProps>({
    pos: [0, 0],
    show: false,
    marker: 'wrong',
  });

  const clickRight = async (
    e: React.MouseEvent<HTMLAreaElement, MouseEvent>,
  ) => {
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
    setQuizRound(round + 1);
  };

  const clickWrong = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
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
  };

  return (
    <GameViewWrap>
      <QuizMarker {...markerOpt} />
      <div className="image-wrap">
        {quizImageData.map((quizImage) => (
          <GameImages
            key={quizImage.img}
            quizImage={quizImage}
            clickRight={clickRight}
            clickWrong={clickWrong}
          />
        ))}
        {quizImageData[0] && <GameBlockquote quizImage={quizImageData[0]} />}
      </div>
    </GameViewWrap>
  );
};
