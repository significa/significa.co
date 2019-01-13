import React from 'react'

import { ThemeContextConsumer, colorTheme } from '@theme'

import { Wrapper, Content, Link, Secondary, Medium, Subtle } from './styled'

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <Wrapper>
    <Content>
      <div>
        <Link to="/">{siteTitle}</Link>
      </div>
      <div>
        <Secondary>This is Secondary</Secondary>
        <Medium>This is Medium</Medium>
        <Subtle>This is Subtle</Subtle>
      </div>
      <div>
        <ThemeContextConsumer>
          {({ updateTheme }) => {
            const setDarkTheme = () => updateTheme('dark')
            const setLightTheme = () => updateTheme('light')
            const setColorTheme = () => updateTheme(colorTheme)
            const setColorTheme2 = () =>
              updateTheme({ ...colorTheme, background: '#FF5050' })

            return (
              <>
                <button onClick={setLightTheme}>Set light theme</button>
                <button onClick={setDarkTheme}>Set dark theme</button>
                <button onClick={setColorTheme}>Set color theme</button>
                <button onClick={setColorTheme2}>Set color theme 2</button>
              </>
            )
          }}
        </ThemeContextConsumer>
      </div>
    </Content>
  </Wrapper>
)

Header.defaultProps = {
  siteTitle: '',
}

export default Header
