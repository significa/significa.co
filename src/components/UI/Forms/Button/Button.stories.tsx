import React from 'react'
import { boolean } from '@storybook/addon-knobs'

import Button from './'

export default {
  title: 'Forms/Button',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const Regular = () => <Button>This is a button</Button>
export const Disabled = () => <Button disabled>This is a button</Button>
export const Pending = () => <Button pending>This is a button</Button>

export const Configurable = () => (
  <Button
    pending={boolean('Pending', false)}
    disabled={boolean('Disabled', false)}
  >
    This is a button
  </Button>
)
