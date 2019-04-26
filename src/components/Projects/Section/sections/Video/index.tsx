import React from 'react'

import { IVideo } from '../../types'

const Video = (props: IVideo) => {
  return (
    <video
      width="100%"
      {...(props.autoplay ? { autoPlay: true } : {})}
      {...(props.loop ? { loop: true } : {})}
      {...(props.controls === false ? {} : { controls: true })}
      {...(props.muted === false ? {} : { muted: true })}
    >
      <source src={props.video.publicURL} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default Video
