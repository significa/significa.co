import React from 'react'
import { boolean, text } from '@storybook/addon-knobs'

import FileInput from './'

export default {
  title: 'Forms/File Input',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const Regular = () => (
  // tslint:disable-next-line: no-console
  <FileInput label="Add attachment" onSelect={console.log} />
)

export const Uploading = () => (
  // tslint:disable-next-line: no-console
  <FileInput label="Add attachment" onSelect={console.log} uploading />
)

export const OnClear = () => (
  <FileInput
    label="Add attachment"
    // tslint:disable-next-line: no-console
    onClear={() => console.log('cleared')}
    uploading
  />
)

OnClear.story = {
  name: 'On clear',
}

export const Error = () => (
  <FileInput label="Add attachment" error="Some error" />
)

export const Configurable = () => (
  <FileInput
    label={text('Label', 'Label text')}
    // tslint:disable-next-line: no-console
    onSelect={console.log}
    // tslint:disable-next-line: no-console
    onClear={() => console.log('cleared')}
    error={text('Error', '')}
    uploading={boolean('Uploading?', false)}
  />
)
