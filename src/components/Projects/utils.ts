import React from 'react'
import scrollTo from '../../utils/scrollTo'

export const navigateToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  target: string
) => {
  e.preventDefault()

  const el = document.querySelector(`#${target}`)

  if (el instanceof HTMLElement) {
    scrollTo(el, 300, () => (window.location.hash = `#${target}`))
  }
}
