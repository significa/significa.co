import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import FileInput from './'

storiesOf('Forms/File Input', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('Regular', () => (
    // tslint:disable-next-line: no-console
    <FileInput label="Add attachment" onSelect={console.log} />
  ))

  .add('Uploading', () => (
    // tslint:disable-next-line: no-console
    <FileInput label="Add attachment" onSelect={console.log} uploading />
  ))

  .add('On clear', () => (
    <FileInput
      label="Add attachment"
      // tslint:disable-next-line: no-console
      onClear={() => console.log('cleared')}
      uploading
    />
  ))

  .add('Error', () => <FileInput label="Add attachment" error="Some error" />)

  .add('Configurable', () => (
    <FileInput
      label={text('Label', 'Label text')}
      // tslint:disable-next-line: no-console
      onSelect={console.log}
      // tslint:disable-next-line: no-console
      onClear={() => console.log('cleared')}
      error={text('Error', '')}
      uploading={boolean('Uploading?', false)}
    />
  ))
