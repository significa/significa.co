import React from 'react'
import { storiesOf } from '@storybook/react'

import CallToAction from './'

storiesOf('UI/Call to action', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('CallToAction', () => (
    <CallToAction
      title="Title"
      text="This is some text"
      linkText="Go somewhere"
      link="/"
    />
  ))
