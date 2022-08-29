import React, { ReactNode } from 'react'

import { Renderer } from './styled'

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Renderer>{children}</Renderer>
}

export default Content
