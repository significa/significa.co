import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import Input from './'

storiesOf('Forms/Input', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => (
    <Input label="Your name" placeholder="Please type your name" />
  ))

  .add('Error', () => (
    <Input
      hasError
      label="Your name"
      placeholder="Please type your name"
      value="Pedro"
    />
  ))

  .add('Configurable', () => (
    <Input
      hasError={boolean('Has errors?', false)}
      label={text('Label', 'The label')}
      placeholder={text('Label', 'The placeholder')}
      value={text('Value', 'The value')}
    />
  ))
