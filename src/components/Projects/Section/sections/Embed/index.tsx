import React from 'react'

import { IEmbed } from '../../types'
import { Wrapper } from './styled'

const Embed = (props: IEmbed) => {
  return <Wrapper dangerouslySetInnerHTML={{ __html: props.code }} />
}

export default Embed
