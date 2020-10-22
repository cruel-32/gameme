import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  palette: {
    primary: '#2ac1bc',
    typography: '#333333',
    common: {
      white: 'white',
      black: 'black',
    },
  },
  fontWeight: {
    thin: 100,
    ultraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    heavy: 900,
  },
  breakPoint: {
    pc: '@media screen and (min-width: 768px)',
    mobile: '@media screen and (max-width: 767px)',
  },
};

export default theme;
