const isBetween = (
  value: number,
  lowerBound: number,
  upperBound: number
): boolean =>
  value > Math.min(lowerBound, upperBound) &&
  value < Math.max(lowerBound, upperBound)

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export const getDistanceToTop = (element: HTMLElement) =>
  element.getBoundingClientRect().top + window.pageYOffset

export default (
  to: number | HTMLElement,
  duration = 300,
  callback?: () => void
) => {
  const start = window.pageYOffset
  const startTime =
    'now' in window.performance ? performance.now() : new Date().getTime()

  const documentHeight = Math.max(
    document.body ? document.body.scrollHeight : 0,
    document.body ? document.body.offsetHeight : 0,
    document.documentElement ? document.documentElement.clientHeight : 0,
    document.documentElement ? document.documentElement.scrollHeight : 0,
    document.documentElement ? document.documentElement.offsetHeight : 0
  )
  const windowHeight =
    window.innerHeight ||
    (document.documentElement && document.documentElement.clientHeight) ||
    document.getElementsByTagName('body')[0].clientHeight
  const destinationOffset = typeof to === 'number' ? to : getDistanceToTop(to)
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset
  )

  if ('requestAnimationFrame' in window === false) {
    return window.scroll(0, destinationOffsetToScroll)
  }

  const scroll = () => {
    const now =
      'now' in window.performance ? performance.now() : new Date().getTime()
    const time = Math.min(1, (now - startTime) / duration)
    const timeFunction = ease(time)

    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
    )

    // Just a little threshold to deal with window zooming causing pageYOffset to be in half pixels
    if (
      isBetween(
        window.pageYOffset,
        destinationOffsetToScroll - 2,
        destinationOffsetToScroll + 2
      )
    ) {
      return typeof callback === 'function' ? callback() : null
    }

    requestAnimationFrame(scroll)
  }

  scroll()
}
