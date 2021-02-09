import React from 'react'
import { select } from '@storybook/addon-knobs'

import List from '.'

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
  title: 'UI/List',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const ListStory = () => (
  <List
    color={select(label, options, defaultValue) as any}
    items={['item 1', 'item 2', 'item 3', 'item 4']}
  />
)

ListStory.story = {
  name: 'List',
}

export const LinkListStory = () => (
  <List
    color={select(label, options, defaultValue) as any}
    items={[
      { link: 'https://google.com', linkText: 'Google' },
      { link: '/showcase', linkText: 'Showcase' },
      'item 3',
      'item 4',
    ]}
  />
)

LinkListStory.story = {
  name: 'List with links',
}
