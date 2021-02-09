import React from 'react'
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

export default {
  title: 'UI/Logo',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const LogoStory = () => (
  <Logo color={select(label, options, defaultValue) as any} />
)

LogoStory.story = {
  name: 'Logo',
}

export const LocoCustomColor = () => (
  <Logo color={color('Color', '#123456') as any} />
)

LocoCustomColor.story = {
  name: 'Logo (Custom color)',
}

export const SeggStory = () => (
  <Segg color={select(label, options, defaultValue) as any} />
)

SeggStory.story = {
  name: 'Segg',
}

export const SeggCustomColor = () => (
  <Segg color={color('Color', '#123456') as any} />
)

SeggCustomColor.story = {
  name: 'Segg (Custom color)',
}
