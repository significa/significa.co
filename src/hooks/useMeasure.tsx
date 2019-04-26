import { useState, useEffect, RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface ISizeState {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
  x: number
  y: number
}

export default function useMeasure(
  ref: RefObject<HTMLElement>,
  query?: string
) {
  const [bounds, set] = useState<ISizeState>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })
  const ro = new ResizeObserver(([entry]) => {
    set(entry.contentRect)
  })

  useEffect(() => {
    if (ref.current) {
      if (query) {
        const target = ref.current.querySelector(query)

        if (target) {
          ro.observe(target)
        }
      } else {
        ro.observe(ref.current)
      }
    }

    return () => {
      ro.disconnect()
    }
  }, [])

  return bounds
}
