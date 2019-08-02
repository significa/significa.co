import React from 'react'

import { Renderer } from './styled'

const Content: React.FC<{}> = ({ children }) => {
  return <Renderer>{children}</Renderer>
}

export default Content
