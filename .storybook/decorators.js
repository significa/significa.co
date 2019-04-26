import React from 'react'

import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { Provider, ThemeContext, colorTheme } from '@theme'

export default () => {
  addDecorator(withKnobs)

  addDecorator(story => (
    <ThemeContext.Consumer>
      {({ updateTheme }) => {
        const updateToLight = () => updateTheme('light')
        const updateToDark = () => updateTheme('dark')
        const updateToColor = () => updateTheme(colorTheme)

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
            }}
          >
            <div style={{ flexGrow: 1, flexShrink: 0 }}>{story()}</div>
            <div style={{ display: 'flex', flexGrow: 0 }}>
              <button onClick={updateToLight}>Light</button>
              <button onClick={updateToDark}>Dark</button>
              <button onClick={updateToColor}>Color</button>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  ))

  addDecorator(story => <Provider>{story()}</Provider>)
}
