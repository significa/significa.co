import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'

import FileInput from './'

storiesOf('Forms/File Input', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => (
    // eslint-disable-next-line no-console
    <FileInput label="Add attachment" onSelect={console.log} />
  ))

  .add('Uploading', () => (
    // eslint-disable-next-line no-console
    <FileInput label="Add attachment" onSelect={console.log} uploading />
  ))

  .add('On clear', () => (
    <FileInput
      label="Add attachment"
      // eslint-disable-next-line no-console
      onClear={() => console.log('cleared')}
      uploading
    />
  ))

  .add('Error', () => <FileInput label="Add attachment" error="Some error" />)

  .add('Configurable', () => (
    <FileInput
      label={text('Label', 'Label text')}
      // eslint-disable-next-line no-console
      onSelect={console.log}
      // eslint-disable-next-line no-console
      onClear={() => console.log('cleared')}
      error={text('Error', '')}
      uploading={boolean('Uploading?', false)}
    />
  ))
