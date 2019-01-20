import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { ArrowLink } from '.'

storiesOf('UI/Links', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('ArrowLink', () => <ArrowLink to="/">Arrow Link</ArrowLink>)
  .add('ArrowLink (highlight)', () => (
    <ArrowLink to="/" highlight>
      Arrow Link
    </ArrowLink>
  ))
  .add('ArrowLink (reverse)', () => (
    <ArrowLink to="/" reverse>
      Arrow Link
    </ArrowLink>
  ))
  .add('ArrowLink (configurable)', () => (
    <ArrowLink
      to={text('To', '/')}
      reverse={boolean('Reverse', false)}
      highlight={boolean('Highlight', false)}
    >
      Arrow Link
    </ArrowLink>
  ))
