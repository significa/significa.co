import { AnimatePresence, AnimatePresenceProps } from 'framer-motion'
import React from 'react'

interface NewAnimatePresenceProps
  extends Omit<AnimatePresenceProps, 'children'> {
  children?: React.ReactNode
}

export const Animated: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence

  return <NewAnimatePresence>{children}</NewAnimatePresence>
}
