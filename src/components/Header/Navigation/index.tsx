import React, { useState, useRef, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import * as S from './styled'
import { NavLink } from '../../UI/'

type Data = {
  allMenuYaml: {
    edges: Array<{
      node: {
        id: string
        label: string
        link: string
      }
    }>
  }
}

type Props = {
  forceClose: boolean
}

const Navigation: React.FC<Props> = ({ forceClose }) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false)
  const menuWrapperRef = useRef<HTMLElement>(null)
  const data = useStaticQuery<Data>(navigationQuery)
  const { edges: items } = data.allMenuYaml

  useEffect(() => {
    if (forceClose && mobileMenu) {
      setMobileMenu(false)
    }
  }, [forceClose, mobileMenu, setMobileMenu])

  const getItemsHeight = (): number => {
    if (menuWrapperRef.current) {
      return Array.prototype.slice
        .call(menuWrapperRef.current.childNodes)
        .reduce((acc, child) => acc + child.offsetHeight, 0)
    }

    return 0
  }

  return (
    <S.Wrapper>
      <S.NavWrapper
        show={mobileMenu}
        itemsHeight={getItemsHeight()}
        ref={menuWrapperRef}
      >
        {items.map(({ node: { label, link, id } }) => (
          <NavLink to={link} key={id}>
            {label}
          </NavLink>
        ))}
      </S.NavWrapper>
      <S.Hamburguer
        aria-expanded={mobileMenu}
        show={mobileMenu}
        onClick={() => setMobileMenu(!mobileMenu)}
      />
    </S.Wrapper>
  )
}

const navigationQuery = graphql`
  query NavigationQuery {
    allMenuYaml {
      edges {
        node {
          id
          label
          link
        }
      }
    }
  }
`

export default Navigation
