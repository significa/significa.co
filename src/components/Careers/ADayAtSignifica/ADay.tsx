import React from 'react'

import { ThemeContext } from '@theme'

export default () => {
  const myline = React.useRef<SVGPathElement>(null)
  const circle = React.useRef<SVGCircleElement>(null)

  const [shouldAnimate, setShouldAnimate] = React.useState(true)

  const { updateTheme } = React.useContext(ThemeContext)

  const handleLineStyle = () => {
    const mylineRef = myline.current!
    const circleRef = circle.current!

    const scrollpercent =
      window.pageYOffset /
      (mylineRef.getBoundingClientRect().top + window.pageYOffset * 1.12)

    const length = mylineRef.getTotalLength()
    const limitedPercent = Math.min(scrollpercent, 1)
    const draw = length * limitedPercent
    const endPoint = mylineRef.getPointAtLength(draw)

    mylineRef.style.strokeDasharray = length.toString()
    mylineRef.style.strokeDashoffset = (length - draw).toString()

    circleRef.setAttribute('cx', String(endPoint.x))
    circleRef.setAttribute('cy', String(endPoint.y))

    if (limitedPercent === 1) {
      updateTheme('light')
      return setShouldAnimate(false)
    }

    return null
  }

  React.useEffect(() => {
    if (shouldAnimate) {
      window.addEventListener('scroll', handleLineStyle)
    }

    return () => window.removeEventListener('scroll', handleLineStyle)
  }, [shouldAnimate])

  return (
    <svg
      width={1306}
      height={1013}
      viewBox="0 0 1306 1013"
      preserveAspectRatio="xMinYMin meet"
    >
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
          strokeDasharray={0}
          strokeDashoffset={0}
          d="M-10 0c455.034 32.831 814 412.485 814 876"
          stroke="currentColor"
          mask="url(#dash-mask)"
        />

        <g fill="currentColor">
          <path d="M164.92 975l-8.96-26.4h-41.28l-8.8 26.4H82.2l41.12-110.24h24L188.28 975h-23.36zm-43.68-45.76h28l-14.08-41.44-13.92 41.44zm159.2-68.64h20.96V975h-20.96v-9.28c-5.28 7.36-15.68 10.72-24 10.72-19.2 0-36.64-14.88-36.64-38.88s17.44-38.88 36.64-38.88c8.64 0 18.72 3.2 24 10.72v-48.8zm-20 96.32c10.24 0 19.36-8 19.36-19.36 0-11.52-9.6-19.2-19.36-19.2-10.56 0-19.36 8.16-19.36 19.2 0 10.88 8.8 19.36 19.36 19.36zm114.24-56.48h20.96V975h-20.96v-9.28c-5.28 7.36-15.68 10.72-24 10.72-19.2 0-36.64-14.88-36.64-38.88s17.44-38.88 36.64-38.88c8.64 0 18.72 3.2 24 10.72v-8.96zm-20 56.48c10.24 0 19.36-8 19.36-19.36 0-11.52-9.6-19.2-19.36-19.2-10.56 0-19.36 8.16-19.36 19.2 0 10.88 8.8 19.36 19.36 19.36zm106.24-56.48h22.56l-46.08 111.2H415l17.6-43.68-29.44-67.52h23.04l17.6 43.04 17.12-43.04zm118.4 0h20.96V975h-20.96v-9.28c-5.28 7.36-15.68 10.72-24 10.72-19.2 0-36.64-14.88-36.64-38.88s17.44-38.88 36.64-38.88c8.64 0 18.72 3.2 24 10.72v-8.96zm-20 56.48c10.24 0 19.36-8 19.36-19.36 0-11.52-9.6-19.2-19.36-19.2-10.56 0-19.36 8.16-19.36 19.2 0 10.88 8.8 19.36 19.36 19.36zm102.08-56.48v16.16h-15.84V975H624.6v-58.4H611v-16.16h13.6v-27.36h20.96v27.36h15.84zm80 76c-23.52 0-39.68-14.4-39.68-33.92h22.24c.16 8 7.84 14.56 18.08 14.56 9.92 0 16.48-5.12 16.48-12.96 0-6.08-4.48-10.4-13.92-13.28L731.16 927c-24.16-6.4-28.48-20.96-28.48-30.88 0-19.68 16.96-32.8 38.08-32.8 20.8 0 36.8 12.64 36.8 33.6h-22.24c0-7.84-5.44-13.92-15.04-13.92-8.64 0-15.2 5.28-15.2 12.64 0 2.72.8 8.48 12.32 11.68l12.32 3.52c16.64 4.64 31.2 13.44 31.2 32.16 0 21.92-18.72 33.44-39.52 33.44zm52.16-1.44v-74.56h20.96V975h-20.96zm94.24-74.56h20.96v64.32c0 32.64-16.48 47.84-42.88 47.84-16 0-29.92-8.96-36.32-22.72l17.44-7.52c3.2 6.72 10.88 11.52 18.88 11.52 13.44 0 21.92-7.36 21.92-26.88v-1.12c-5.44 7.2-15.68 10.56-24 10.56-19.2 0-36.64-14.88-36.64-38.88s17.44-38.88 36.64-38.88c8.48 0 18.56 3.36 24 10.56v-8.8zm-20 56.48c10.24 0 19.36-8 19.36-19.36 0-11.52-9.6-19.2-19.36-19.2-10.56 0-19.36 8.16-19.36 19.2 0 10.88 8.8 19.36 19.36 19.36zm101.44-58.4c19.52 0 29.76 13.12 29.6 35.52V975h-20.96v-38.72c0-11.84-7.04-17.12-14.24-17.12-7.52 0-16.8 4-16.8 17.6V975h-20.96v-74.56h20.96v12.48c3.2-10.08 15.04-14.4 22.4-14.4zm56.16-11.36c-7.2 0-13.28-5.6-13.28-12.64 0-7.04 6.08-12.48 13.28-12.48 7.36 0 13.28 5.44 13.28 12.48s-5.92 12.64-13.28 12.64zM1015 975v-74.56h20.96V975H1015zm82.4-94.88c-12 0-15.84 6.56-16 15.52v4.8h16.32v16.16h-16.32V975h-20.96v-58.4h-14.08v-16.16h14.08v-4.64c0-22.4 11.52-35.2 32.8-35.2h8.96v19.52h-4.8zm25.44 7.04c-7.2 0-13.28-5.6-13.28-12.64 0-7.04 6.08-12.48 13.28-12.48 7.36 0 13.28 5.44 13.28 12.48s-5.92 12.64-13.28 12.64zm-10.4 87.84v-74.56h20.96V975h-20.96zm74.4 1.44c-21.76 0-40.96-15.36-40.96-39.04s19.2-38.88 40.96-38.88c13.6 0 24.48 6.4 31.52 16l-15.68 11.04c-3.36-4.64-9.6-7.52-15.68-7.52-11.84 0-19.84 8.48-19.84 19.36 0 11.04 8 19.52 19.84 19.52 6.08 0 12.32-2.88 15.68-7.52l15.68 11.04c-7.04 9.76-17.92 16-31.52 16zm97.28-76h20.96V975h-20.96v-9.28c-5.28 7.36-15.68 10.72-24 10.72-19.2 0-36.64-14.88-36.64-38.88s17.44-38.88 36.64-38.88c8.64 0 18.72 3.2 24 10.72v-8.96zm-20 56.48c10.24 0 19.36-8 19.36-19.36 0-11.52-9.6-19.2-19.36-19.2-10.56 0-19.36 8.16-19.36 19.2 0 10.88 8.8 19.36 19.36 19.36z" />
        </g>
      </g>
    </svg>
  )
}
