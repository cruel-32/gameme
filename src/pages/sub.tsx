import React from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';

import Title from '@/components/Title';

const FindDiffWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Home: React.FC<PageProps> = () => (
  <main>
    <FindDiffWrap>
      <Title />이 페이지는 테스트용 서브 페이지 입니다.
      <a href="/">메인페이지</a>
    </FindDiffWrap>
  </main>
);

export default Home;
