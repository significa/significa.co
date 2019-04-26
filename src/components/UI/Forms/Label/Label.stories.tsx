import React from 'react'
import { storiesOf } from '@storybook/react'

import Label from './'

storiesOf('Forms/Label', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => <Label>This is a label</Label>)

  .add('Error', () => <Label hasError>Error label</Label>)
