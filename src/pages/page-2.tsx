import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/SEO'
import { ThemeConsumer, theme } from '../theme'

const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#141618',
    foreground: '#FFFFFF',
  },
}

const SecondPage = () => (
  <ThemeConsumer>
    {({ updateTheme }) => {
      const setDarkTheme = () => updateTheme(darkTheme)
      const setLightTheme = () => updateTheme(theme)

      return (
        <>
          <SEO title="Page two" />
          <h1>Hi from the second page</h1>
          <p>Welcome to page 2</p>
          <Link to="/">Go back to the homepage</Link>
          <br />
          <button onClick={setDarkTheme}>Set dark theme</button>
          <button onClick={setLightTheme}>Set light theme</button>
        </>
      )
    }}
  </ThemeConsumer>
)

export default SecondPage
