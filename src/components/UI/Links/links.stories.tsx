import React from 'react'
import { storiesOf } from '@storybook/react'

import { Link, NavLink } from '.'

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
    <Link to="mailto:pedro@significa.pt">
      Normal (should use normal anchor)
    </Link>
  ))
