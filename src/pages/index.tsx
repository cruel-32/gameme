import React, { useEffect } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';
import { tileData } from '@/data/tileData';
import SiteData from '@/components/common/SiteData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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

export default () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    i18n.changeLanguage(
      globalThis?.window?.localStorage?.getItem('test-world-lang') || 'ko',
    );
  }, []);

  return (
    <SiteData>
      <div>
        <h1
          style={{
            fontSize: '18px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {t('welcome')}
        </h1>
        <GridList className={classes.gridList} cols={1} cellHeight="auto">
          <GridListTile key="Subheader">
            <ListSubheader component="div">{t('gameList')}</ListSubheader>
          </GridListTile>
          {tileData.map((tile) => (
            <GridListTile key={tile.img} className={classes.tile}>
              <a href={tile.url}>
                <img
                  src={tile.img}
                  alt={t(tile.title)}
                  style={{ maxWidth: '100%', width: '100%' }}
                />
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
      </div>
    </SiteData>
  );
};
