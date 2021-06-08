import React from 'react'
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

export default {
  title: 'UI/Typography',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const HugeStory = () => (
  <Huge color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Huge>
)

HugeStory.story = {
  name: 'Huge',
}

export const DisplayStory = () => (
  <Title color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Title>
)

DisplayStory.story = {
  name: 'Display',
}

export const TitleStory = () => (
  <Display color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Display>
)

TitleStory.story = {
  name: 'Title',
}

export const BigStory = () => (
  <Big color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Big>
)

BigStory.story = {
  name: 'Big',
}

export const TextStory = () => (
  <Text color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Text>
)

TextStory.story = {
  name: 'Text',
}

export const LabelStory = () => (
  <Label color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Label>
)

LabelStory.story = {
  name: 'Label',
}

export const SmallStory = () => (
  <Small color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Small>
)

LabelStory.story = {
  name: 'Small',
}

export const SmallOtherElement = () => (
  <Small as="p" color={select(label, options, defaultValue) as any}>
    {text('Text', 'The big brown fox jumps over the lazy dog')}
  </Small>
)

SmallOtherElement.story = {
  name: 'Small as another element',
}
