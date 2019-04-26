import { useEffect } from 'react'

export default function useBodyLock(condition: boolean) {
  useEffect(() => {
    document.body.style.overflow = condition ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [condition])
}
