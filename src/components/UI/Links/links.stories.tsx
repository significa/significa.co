import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { Link, NavLink, ArrowLink } from './'

storiesOf('UI/Links', module)
  .addDecorator(story => <div style={{ padding: '2em' }}>{story()}</div>)

  .add('NavLink', () => <NavLink to="/">Navigation Link</NavLink>)

  .add('Link (internal)', () => (
    <Link to="/some-page">Internal (should use router)</Link>
  ))

  .add('Link (external)', () => (
    <Link to="https://google.com/">External (should use normal anchor)</Link>
  ))

  .add('Link (rest)', () => (
    <Link to="mailto:pedro@significa.co">
      Normal (should use normal anchor)
    </Link>
  ))

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
