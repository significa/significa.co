import React from 'react'

import { Wrapper, Content, Link, Secondary, Medium, Subtle } from './styled'

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <Wrapper>
    <Content>
      <Link to="/">{siteTitle}</Link>
      <Secondary>This is Secondary</Secondary>
      <Medium>This is Medium</Medium>
      <Subtle>This is Subtle</Subtle>
    </Content>
  </Wrapper>
)

Header.defaultProps = {
  siteTitle: '',
}

export default Header
