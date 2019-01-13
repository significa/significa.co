import React from 'react'

import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { ThemeProvider } from '@theme'

export default () => {
  addDecorator(withKnobs)

  addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>)
}
