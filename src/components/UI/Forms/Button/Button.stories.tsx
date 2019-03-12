import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from './'

storiesOf('Forms/Button', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => <Button>This is a button</Button>)

  .add('Disabled', () => <Button disabled>This is a button</Button>)
