import React from 'react'

import { IVideo } from '../../types'

import * as S from './styled'

const Video = (props: IVideo) => {
  return (
    <React.Fragment>
      <video
        width="100%"
        playsInline
        {...(props.autoplay ? { autoPlay: true } : {})}
        {...(props.loop ? { loop: true } : {})}
        {...(props.controls === false ? {} : { controls: true })}
        {...(props.muted === false ? {} : { muted: true })}
      >
        <source src={props.video.publicURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {props.caption && <S.Caption>{props.caption}</S.Caption>}
    </React.Fragment>
  )
}

export default Video
