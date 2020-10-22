import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';
import { tileData } from '@/data/tileData';
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

// const Home: React.FC<PageProps> = () => (
//   <main>
//     <Title />
//     <p>A TypeScript starter for Gatsby. Great for advanced users.</p>
//     <p>
//       Follow me on Twitter (
//       <a href="https://twitter.com/jpedroschmitz">@jpedroschmitz</a>)
//     </p>
//     <a href="/sub">서브페이지</a>
//   </main>
// );

// export default Home;

export default () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
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
          style={{
            fontSize: '18px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {t('welcome')}
        </h1>
        <CssBaseline />
        <a href="/sub">메인페이지</a>

        <React.Suspense fallback={<em>{t('loading')}...</em>}>
          <GridList className={classes.gridList} cols={1} cellHeight="auto">
            <GridListTile key="Subheader">
              <ListSubheader component="div">{t('gameList')}</ListSubheader>
            </GridListTile>
            {tileData.map((tile) => (
              <GridListTile key={tile.img} className={classes.tile}>
                <a href="/game/findDiff">
                  <img src={tile.img} alt={t(tile.title)} />
                  <GridListTileBar
                    title={t(tile.title)}
                    subtitle={<span>{t(tile.description)}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${t(tile.title)}`}
                        className={classes.icon}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </a>
              </GridListTile>
            ))}
          </GridList>
        </React.Suspense>
      </div>
    </ThemeProvider>
  );
};
