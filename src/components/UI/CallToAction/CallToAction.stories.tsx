import React from 'react'

import CallToAction from './'

export default {
  title: 'UI/Call to action',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const CallToActionStory = () => (
  <CallToAction
    title="Title"
    text="This is some text"
    linkText="Go somewhere"
    link="/"
  />
)

CallToActionStory.story = {
  name: 'CallToAction',
}
