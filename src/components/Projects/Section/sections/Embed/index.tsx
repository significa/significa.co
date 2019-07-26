import React from 'react'

import { EmbedType } from '../../types'
import { Wrapper } from './styled'

const Embed = (props: EmbedType) => {
  return <Wrapper dangerouslySetInnerHTML={{ __html: props.embed.code.html }} />
}

export default Embed
