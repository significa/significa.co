import React from 'react'

import { VideoType } from '../../types'

import * as S from './styled'

const Video = ({ primary: video }: VideoType) => {
  return (
    <React.Fragment>
      <video
        width="100%"
        playsInline
        {...(video.autoplay === 'true' ? { autoPlay: true } : {})}
        {...(video.loop === 'true' ? { loop: true } : {})}
        {...(video.controls === 'false' ? {} : { controls: true })}
        {...(video.mute === 'false' ? {} : { muted: true })}
      >
        <source src={video.video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {video.caption && <S.Caption>{video.caption}</S.Caption>}
    </React.Fragment>
  )
}

export default Video
