import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs'

import { Huge, Display, Title, Big, Text, Label, Small } from './'

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

storiesOf('UI/Typography', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Huge', () => (
    <Huge color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Huge>
  ))

  .add('Display', () => (
    <Display color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Display>
  ))

  .add('Title', () => (
    <Title color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Title>
  ))

  .add('Big', () => (
    <Big color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Big>
  ))

  .add('Text', () => (
    <Text color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Text>
  ))

  .add('Label', () => (
    <Label color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Label>
  ))

  .add('Small', () => (
    <Small color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Small>
  ))

  .add('Small as another element', () => (
    <Small as="p" color={select(label, options, defaultValue) as any}>
      {text('Text', 'The big brown fox jumps over the lazy dog')}
    </Small>
  ))
