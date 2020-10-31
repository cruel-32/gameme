import { useState, useLayoutEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useResize = (selector: string) => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      const $selector = document.querySelector(selector);
      if ($selector && selector) {
        console.log(
          'updateSize -> $selector.clientWidth',
          $selector.clientWidth,
        );
        setSize([$selector.clientWidth, $selector.clientHeight]);
      } else {
        setSize([window.innerWidth, window.innerHeight]);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
