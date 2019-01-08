import React from 'react'

import { Wrapper, Content, Link } from './styled'

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <Wrapper>
    <Content>
      <Link to="/">{siteTitle}</Link>
    </Content>
  </Wrapper>
)

Header.defaultProps = {
  siteTitle: '',
}

export default Header
