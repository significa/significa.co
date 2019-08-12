import React from 'react'

import Layout from '..'

import { Navigation } from '../../Handbook/'

import * as S from './styled'

const NavigationHolder: React.FC<{}> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <S.NavOverlay isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <S.NavHolder isOpen={isOpen}>{children}</S.NavHolder>
      <S.Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <S.ButtonLine />
        <S.ButtonLine />
        <S.ButtonLine />
      </S.Hamburger>
    </>
  )
}

const HandbookLayout: React.FC<{ currentPage?: string }> = ({
  children,
  currentPage,
}) => {
  return (
    <Layout>
      <S.Wrapper>
        <NavigationHolder>
          <Navigation currentPage={currentPage} />
        </NavigationHolder>
        <S.Main>{children}</S.Main>
      </S.Wrapper>
    </Layout>
  )
}

export default HandbookLayout
