import React from 'react'

import { ThemeContext } from '@theme'

export default () => {
  const myline = React.useRef<SVGPathElement>(null)
  const circle = React.useRef<SVGCircleElement>(null)
  const [lineStyle, setLineStyle] = React.useState(0)
  const [lineLength, setLineLength] = React.useState(0)
  const [shouldAnimate, setShouldAnimate] = React.useState(true)
  const { updateTheme } = React.useContext(ThemeContext)

  const handleLineStyle = () => {
    if (!shouldAnimate) {
      return null
    }

    const mylineRef = myline.current!
    const circleRef = circle.current!

    const scrollpercent =
      document.documentElement.scrollTop /
      (mylineRef.getBoundingClientRect().top +
        (window.pageYOffset || document.documentElement.scrollTop) * 1.12)

    const length = mylineRef.getTotalLength()
    const scrollpercentWithMax = Math.min(scrollpercent, 1)
    const draw = length * scrollpercentWithMax
    const endPoint = mylineRef.getPointAtLength(draw)

    setLineLength(length)
    setLineStyle(length - draw)

    circleRef.setAttribute('cx', String(endPoint.x))
    circleRef.setAttribute('cy', String(endPoint.y))

    if (scrollpercentWithMax === 1) {
      updateTheme('light')
      return setShouldAnimate(false)
    }

    return null
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleLineStyle)

    return () => window.removeEventListener('scroll', handleLineStyle)
  }, [shouldAnimate])

  return (
    <svg width="834px" height="900px" viewBox="0 0 834 900">
      <g fill="none" fillRule="evenodd">
        <circle
          ref={circle}
          cx="13"
          cy="12"
          r="13"
          stroke="none"
          fill="currentColor"
          x="0"
          y="0"
        />

        <mask id="dash-mask">
          <path
            id="dash-mask"
            d="M-10 0c455.034 32.831 814 412.485 814 876"
            stroke="white"
            strokeDasharray="2,8"
            strokeWidth="1"
          />
        </mask>

        <path
          ref={myline}
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeDasharray={lineLength}
          strokeDashoffset={lineStyle}
          d="M-10 0c455.034 32.831 814 412.485 814 876"
          stroke="currentColor"
          mask="url(#dash-mask)"
        />
      </g>
    </svg>
  )
}
