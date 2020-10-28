import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WhoIsThis } from '@/components/WhoIsThis';
import {
  StoreProvider,
  StateContext,
  ActionContext,
} from '@/context/whoIsThis';
import SiteData from '@/components/common/SiteData';

const WhoIsThisWrap = styled.div`
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
        <SiteData
          title={`${t('sitename')}::${t('whoIsThis')}`}
          description={t('whoIsThisDesc')}
        >
          <WhoIsThisWrap>
            <WhoIsThis />
          </WhoIsThisWrap>
        </SiteData>
      </ActionContext.Provider>
    </StateContext.Provider>
  );
};
