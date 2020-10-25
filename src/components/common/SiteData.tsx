import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';

import '@/lib/i18n';

const defaultTheme: DefaultTheme = {
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

const GlobalStyle = createGlobalStyle`
  body {
    button {
      border:none;
      background-color: transparent;
      padding:0;
      outline:0;
    }
    a {
      text-decoration: none;
      color: #108db8;
      font-weight: bold;
    }
  }
`;

const Nav = styled.div`
  position: sticky;
  top: 0px;
  z-index: 20;
  width: 100%;
  background: #108db8;
  a {
    color: white;
    padding: 1rem;
    display: inline-block;
  }
`;

const ContentWrap = styled.div`
  display: 'flex';
  flex-wrap: 'wrap';
  justify-content: 'space-around';
  overflow: 'hidden';
  // backgroundColor: theme.palette.background.paper;
  max-width: 1200;
  margin: '0 auto';
  font-size: '18px';
  width: '100%';
  text-align: 'center';
`;

export interface IThemeProps {
  children: ReactElement;
  theme?: DefaultTheme;
  title?: string;
  description?: string;
}

export default (props: IThemeProps) => {
  const { t } = useTranslation();
  const {
    children,
    theme = defaultTheme,
    title = `${t('welcome')}`,
    description = t('welcome'),
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link
          rel="stylesheet"
          href="https://unpkg.com/purecss@1.0.1/build/base-min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script src="https://developers.kakao.com/sdk/js/kakao.js" />
        <script src="/js/kakao.js" />
        <script
          src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js"
          async
          defer
        />
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v8.0"
          nonce="p7szCzSF"
        />
      </Helmet>
      <CssBaseline />
      <GlobalStyle />
      <Nav>
        <a href="/">{t('sitename')}</a>
      </Nav>
      <ContentWrap id="fb-root">{children}</ContentWrap>
    </ThemeProvider>
  );
};
