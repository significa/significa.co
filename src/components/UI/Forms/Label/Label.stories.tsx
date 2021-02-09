import React from 'react'

import Label from './'

export default {
  title: 'Forms/Label',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const Regular = () => <Label>This is a label</Label>
export const Error = () => <Label hasError>Error label</Label>
