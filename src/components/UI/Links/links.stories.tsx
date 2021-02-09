import React from 'react'
import { text, boolean } from '@storybook/addon-knobs'

import { Link, NavLink, ArrowLink } from './'

export default {
  title: 'UI/Links',
  decorators: [(story: any) => <div style={{ padding: '2em' }}>{story()}</div>],
}

export const NavLinkStory = () => <NavLink to="/">Navigation Link</NavLink>

NavLinkStory.story = {
  name: 'NavLink',
}

export const LinkInternal = () => (
  <Link to="/some-page">Internal (should use router)</Link>
)

LinkInternal.story = {
  name: 'Link (internal)',
}

export const LinkExternal = () => (
  <Link to="https://google.com/">External (should use normal anchor)</Link>
)

LinkExternal.story = {
  name: 'Link (external)',
}

export const LinkRest = () => (
  <Link to="mailto:pedro@significa.co">Normal (should use normal anchor)</Link>
)

LinkRest.story = {
  name: 'Link (rest)',
}

export const ArrowLinkStory = () => <ArrowLink to="/">Arrow Link</ArrowLink>

ArrowLinkStory.story = {
  name: 'ArrowLink',
}

export const ArrowLinkHighlight = () => (
  <ArrowLink to="/" highlight>
    Arrow Link
  </ArrowLink>
)

ArrowLinkHighlight.story = {
  name: 'ArrowLink (highlight)',
}

export const ArrowLinkReverse = () => (
  <ArrowLink to="/" reverse>
    Arrow Link
  </ArrowLink>
)

ArrowLinkReverse.story = {
  name: 'ArrowLink (reverse)',
}

export const ArrowLinkConfigurable = () => (
  <ArrowLink
    to={text('To', '/')}
    reverse={boolean('Reverse', false)}
    highlight={boolean('Highlight', false)}
  >
    Arrow Link
  </ArrowLink>
)

ArrowLinkConfigurable.story = {
  name: 'ArrowLink (configurable)',
}
