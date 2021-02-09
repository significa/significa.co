import React from 'react'
import { text } from '@storybook/addon-knobs'

import Textarea from './'

export default {
  title: 'Forms/Textarea',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const Regular = () => (
  <Textarea label="Your name" placeholder="Please type your name" />
)

export const Error = () => (
  <Textarea
    error="Some error"
    label="Your name"
    placeholder="Please type your name"
    value="Pedro"
  />
)

export const Long = () => (
  <Textarea
    label="Your name"
    placeholder="Please type your name"
    value={'This is a long multiline text.\nWhat about that?\nVery cool.'}
  />
)

export const Configurable = () => (
  <Textarea
    error={text('Error', '')}
    label={text('Label', 'The label')}
    placeholder={text('Label', 'The placeholder')}
    value={text('Value', 'The value')}
  />
)
