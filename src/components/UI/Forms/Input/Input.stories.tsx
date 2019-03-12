import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import Input from './'

storiesOf('Forms/Input', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => (
    <Input label="Your name" placeholder="Please type your name" />
  ))

  .add('Error', () => (
    <Input
      error="Some error"
      label="Your name"
      placeholder="Please type your name"
      value="Pedro"
    />
  ))

  .add('Configurable', () => (
    <Input
      hasError={text('Error?', '')}
      label={text('Label', 'The label')}
      placeholder={text('Label', 'The placeholder')}
      value={text('Value', 'The value')}
    />
  ))
