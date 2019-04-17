import React from 'react'

export default () => {
  const myline = React.useRef()
  const circle = React.useRef()
  const [lineStyle, setLineStyle] = React.useState(0)
  const [lineLength, setLineLength] = React.useState(0)

  const handleLineStyle = () => {
    if (!myline || !myline.current || !circle || !circle.current) {
      return null
    }

    const mylineRef = myline.current!
    const circleRef = circle.current!

    const scrollpercent =
      document.documentElement.scrollTop /
      (mylineRef.getBoundingClientRect().top + window.pageYOffset ||
        document.documentElement.scrollTop +
          window.innerHeight +
          window.innerHeight * 0.35)

    const length = mylineRef.getTotalLength()
    const scrollpercentWithMax = scrollpercent >= 1 ? 1 : scrollpercent
    const draw = length * scrollpercentWithMax

    setLineLength(length)
    setLineStyle(length - draw)

    const endPoint = mylineRef.getPointAtLength(draw)
    circleRef.setAttribute('cx', endPoint.x)
    circleRef.setAttribute('cy', endPoint.y)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleLineStyle)

    return () => window.removeEventListener('scroll', handleLineStyle)
  }, [])

  return (
    <svg width="834px" height="814px" viewBox="0 0 834 814">
      <g fill="none" fillRule="evenodd">
        <circle
          ref={circle}
          cx="10"
          cy="10"
          r="10"
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
