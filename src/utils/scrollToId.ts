import React from 'react'
import scrollTo from './scrollTo'

export const scrollToId = (
  e: React.MouseEvent<HTMLAnchorElement>,
  target: string
) => {
  e.preventDefault()

  const el = document.querySelector(`#${target}`)

  if (el instanceof HTMLElement) {
    scrollTo(el, 300, () => (window.location.hash = `#${target}`))
  }
}

export default scrollToId
