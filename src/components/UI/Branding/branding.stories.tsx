import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, color } from '@storybook/addon-knobs'

import { Logo, Segg } from '.'

const label = 'Colors'
const options = [
  'highlight',
  'background',
  'foreground',
  'secondary',
  'medium',
  'subtle',
  'error',
]
const defaultValue = 'foreground'

storiesOf('UI/Logo', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Logo', () => (
    <Logo color={select(label, options, defaultValue) as any} />
  ))

  .add('Logo (Custom color)', () => (
    <Logo color={color('Color', '#123456') as any} />
  ))

  .add('Segg', () => (
    <Segg color={select(label, options, defaultValue) as any} />
  ))

  .add('Segg (Custom color)', () => (
    <Segg color={color('Color', '#123456') as any} />
  ))
