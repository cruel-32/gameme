import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      primary: string;
      typography: string;
      common: {
        white: string;
        black: string;
      };
    };
    fontWeight: {
      thin: number;
      ultraLight: number;
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
      extraBold: number;
      heavy: number;
    };
    breakPoint: {
      pc: string;
      mobile: string;
    };
  }
}
