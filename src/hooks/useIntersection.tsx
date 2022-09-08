import React, { useEffect, useRef, useState } from 'react'

interface IOpts {
  root?: Element
  rootMargin?: string
  threshold?: number
}

interface IReturn {
  observerEntry?: IntersectionObserverEntry
  elRef: React.MutableRefObject<any>
}

export default (options: IOpts): IReturn => {
  const [observerEntry, setEntry] = useState<IntersectionObserverEntry>()
  const elRef = useRef<any>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, _index) => setEntry(entries[0]),
      options
    )

    if (elRef && elRef.current) {
      observer.observe(elRef.current)
    }

    return () => observer.disconnect()
  }, [elRef, options])

  return { observerEntry, elRef }
}
