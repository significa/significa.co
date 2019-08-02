import React from 'react'

import Layout from '..'

import Navigation from '../../Handbook/Navigation'

import * as S from './styled'

const HandbookLayout: React.FC<{ currentPage?: string }> = ({
  children,
  currentPage,
}) => {
  return (
    <Layout>
      <S.Wrapper>
        <S.NavHolder>
          <Navigation currentPage={currentPage} />
        </S.NavHolder>
        <S.Main>{children}</S.Main>
      </S.Wrapper>
    </Layout>
  )
}

export default HandbookLayout
