import React from 'react'

interface IOpts {
  root?: Element
  rootMargin?: string
  threshold?: number
}

interface IReturn {
  observerEntry: IntersectionObserverEntry
  elRef: React.MutableRefObject<any>
}

export default (options: IOpts): IReturn => {
  const [observerEntry, setEntry] = React.useState()
  const elRef = React.useRef<any>()

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => setEntry(entries[0]),
      options
    )

    if (elRef && elRef.current) {
      observer.observe(elRef.current)
    }

    return () => observer.disconnect()
  }, [elRef, options])

  return { observerEntry, elRef }
}
