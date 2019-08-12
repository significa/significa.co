import React from 'react'

import Layout from '..'

import { Navigation } from '../../Handbook/'

import * as S from './styled'

const HandbookLayout: React.FC<{ currentPage?: string }> = ({
  children,
  currentPage,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Layout>
      <S.Wrapper>
        <S.NavOverlay isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>
        <S.NavHolder isOpen={isOpen}>
          <Navigation currentPage={currentPage} />
        </S.NavHolder>
        <S.Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <S.ButtonLine />
          <S.ButtonLine />
          <S.ButtonLine />
        </S.Hamburger>
        <S.Main>{children}</S.Main>
      </S.Wrapper>
    </Layout>
  )
}

export default HandbookLayout
