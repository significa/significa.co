import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/SEO'
import { ThemeConsumer, colorTheme } from '../theme'

const SecondPage = () => (
  <ThemeConsumer>
    {({ updateTheme }) => {
      const setDarkTheme = () => updateTheme('dark')
      const setLightTheme = () => updateTheme('light')
      const setColorTheme = () => updateTheme(colorTheme)
      const setColorTheme2 = () =>
        updateTheme({ ...colorTheme, background: '#FF5050' })

      return (
        <>
          <SEO title="Page two" />
          <h1>Hi from the second page</h1>
          <p>Welcome to page 2</p>
          <Link to="/">Go back to the homepage</Link>
          <br />
          <button onClick={setLightTheme}>Set light theme</button>
          <button onClick={setDarkTheme}>Set dark theme</button>
          <button onClick={setColorTheme}>Set color theme</button>
          <button onClick={setColorTheme2}>Set color theme 2</button>
        </>
      )
    }}
  </ThemeConsumer>
)

export default SecondPage
