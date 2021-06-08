import React from 'react'
import { themes } from '@storybook/theming'
import { addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { Provider, ThemeContext, colorTheme } from '@theme'

addParameters({
  options: {
    theme: themes.dark,
  },
})

addDecorator(withKnobs)

addDecorator(story => (
  <Provider>
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
  </Provider>
))


// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  alert(`Navigate to: ${pathname}`)
}