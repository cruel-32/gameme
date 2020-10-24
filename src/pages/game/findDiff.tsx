import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FindDiff } from '@/components/FindDiff';
import { StoreProvider, StateContext, ActionContext } from '@/context/findDiff';
import SiteData from '@/components/common/SiteData';

const FindDiffWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export default () => {
  const [store, actions] = StoreProvider();
  const { t } = useTranslation();

  return (
    <StateContext.Provider value={store}>
      <ActionContext.Provider value={actions}>
        <SiteData title={`${t('sitename')}::${t('findDiff')}`} description={t('findDiffDesc')}>
          <FindDiffWrap>
            <FindDiff />
          </FindDiffWrap>
        </SiteData>
      </ActionContext.Provider>
    </StateContext.Provider>
  );
};
