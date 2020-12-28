import React, { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  DefaultTheme,
} from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Select from '@material-ui/core/Select';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';

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
  display: flex;
  justify-content: space-between;
  top: 0px;
  z-index: 20;
  width: 100%;
  display: flex;
  background: #fff;
  padding: 0.75rem;
  a {
    display: flex;
    align-items: center;
    img {
      width: 23%;
    }
    span {
      color: black;
      padding: 0.25rem;
      font-size: 1.25rem;
    }
  }
`;

const ContentWrap = styled.div`
  display: 'flex';
  flex-wrap: 'wrap';
  justify-content: 'space-around';
  overflow: 'hidden';
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

const languages: MenuItemProps[] = [
  {
    value: 'ko',
    key: 'Korean',
  },
  {
    value: 'en',
    key: 'English',
  },
];

export default (props: IThemeProps) => {
  const { t, i18n } = useTranslation();
  const {
    children,
    theme = defaultTheme,
    title = `${t('welcome')}`,
    description = t('welcome'),
  } = props;
  const [lang, setLang] = useState<string>(
    globalThis?.window?.localStorage?.getItem('test-world-lang') || 'ko',
  );

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string;
      value: string;
    }>,
  ) => {
    const { value } = e.target;
    if (value) {
      setLang(value);
      if (globalThis?.window) {
        globalThis?.window.localStorage.setItem('test-world-lang', value);
      }
    }
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <ThemeProvider theme={theme}>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="stylesheet" href="/css/base-min.css" />
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
        <script src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" />
        <script
          crossOrigin="anonymous"
          src="https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v8.0"
          nonce="p7szCzSF"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P23E4M8FT4"
        />
        <script src="/js/ga.js" />
      </Helmet>
      <CssBaseline />
      <GlobalStyle />
      <Nav>
        {/* <a href="/">{t('sitename')}</a> */}
        <div className="left-side">
          <a href="/">
            <img src="/images/common/logo.png" alt="Test World Logo" />
            <span>{t('sitename')}</span>
          </a>
        </div>
        <div className="right-side">
          <Select onChange={handleChange} value={lang}>
            {languages.map(({ value, key }) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Nav>
      <ContentWrap id="fb-root">{children}</ContentWrap>
    </ThemeProvider>
  );
};
