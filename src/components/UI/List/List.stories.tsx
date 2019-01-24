import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('UI/List', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('List', () => (
    <List
      color={select(label, options, defaultValue) as any}
      items={['item 1', 'item 2', 'item 3', 'item 4']}
    />
  ))

  .add('List with links', () => (
    <List
      color={select(label, options, defaultValue) as any}
      items={[
        { link: 'https://google.com', linkText: 'Google' },
        { link: '/showcase', linkText: 'Showcase' },
        'item 3',
        'item 4',
      ]}
    />
  ))
