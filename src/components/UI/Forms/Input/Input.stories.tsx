import React from 'react'
import { text } from '@storybook/addon-knobs'

import Input from './'

export default {
  title: 'Forms/Input',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const Regular = () => (
  <Input label="Your name" placeholder="Please type your name" />
)

export const Error = () => (
  <Input
    error="Some error"
    label="Your name"
    placeholder="Please type your name"
    value="Pedro"
  />
)

export const Configurable = () => (
  <Input
    hasError={text('Error?', '')}
    label={text('Label', 'The label')}
    placeholder={text('Label', 'The placeholder')}
    value={text('Value', 'The value')}
  />
)
