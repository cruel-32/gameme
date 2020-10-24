import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StoreProvider, StateContext, ActionContext } from '@/context/findDiff';
import SiteData from '@/components/common/SiteData';
import { GameView } from '@/components/FindDiff/gameView';

export default () => {
  const [store, actions] = StoreProvider();
  const { t } = useTranslation();
  useEffect(() => {
    actions.setPage(1);
    actions.setRound(1);
    actions.setQuizImages();
  }, []);

  return (
    <StateContext.Provider value={store}>
      <ActionContext.Provider value={actions}>
        <SiteData
          title={`${t('sitename')}::${t('findDiff')}`}
          description={t('findDiffDesc')}
        >
          <>
            <h1>왜 안보여</h1>
            <GameView />
            {store.quizImageData[0]?.img}
          </>
        </SiteData>
      </ActionContext.Provider>
    </StateContext.Provider>
  );
};
