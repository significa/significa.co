import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import Button from './'

storiesOf('Forms/Button', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => <Button>This is a button</Button>)

  .add('Disabled', () => <Button disabled>This is a button</Button>)

  .add('Pending', () => <Button pending>This is a button</Button>)

  .add('Configurable', () => (
    <Button
      pending={boolean('Pending', false)}
      disabled={boolean('Disabled', false)}
    >
      This is a button
    </Button>
  ))
