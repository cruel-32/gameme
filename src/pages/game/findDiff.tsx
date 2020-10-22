import React from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';
import { FindDiff } from '@/components/FindDiff';
import { StoreProvider, StateContext, ActionContext } from '@/context/findDiff';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import theme from '@/theme';

import '@/lib/i18n';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    maxWidth: 1200,
    margin: '0 auto',
  },
  gridList: {
    flexDirection: 'column',
  },
  tile: {
    flex: '1 1 0',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const FindDiffWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export default () => {
  const [store, actions] = StoreProvider();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <StateContext.Provider value={store}>
      <ActionContext.Provider value={actions}>
        <ThemeProvider theme={theme}>
          <Helmet defer={false}>
            <title>메인</title>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
          </Helmet>
          <div className={classes.root}>
            <h1
              style={{ fontSize: '18px', width: '100%', textAlign: 'center' }}
            >
              {t('welcome')}
            </h1>
            <CssBaseline />
            <FindDiffWrap>
              <FindDiff />
            </FindDiffWrap>
          </div>
        </ThemeProvider>
      </ActionContext.Provider>
    </StateContext.Provider>
  );
};
