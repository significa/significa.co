import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import Textarea from './'

storiesOf('Forms/Textarea', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => (
    <Textarea label="Your name" placeholder="Please type your name" />
  ))

  .add('Error', () => (
    <Textarea
      error="Some error"
      label="Your name"
      placeholder="Please type your name"
      value="Pedro"
    />
  ))

  .add('Long', () => (
    <Textarea
      label="Your name"
      placeholder="Please type your name"
      value={'This is a long multiline text.\nWhat about that?\nVery cool.'}
    />
  ))

  .add('Configurable', () => (
    <Textarea
      error={text('Error', '')}
      label={text('Label', 'The label')}
      placeholder={text('Label', 'The placeholder')}
      value={text('Value', 'The value')}
    />
  ))
