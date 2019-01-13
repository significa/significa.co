import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from './'

storiesOf(`UI/Button`, module).add(`default`, () => (
  <Button>This is a button</Button>
))
