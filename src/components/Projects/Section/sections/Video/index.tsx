import React from 'react'

import { IVideo } from '../../../../../templates/types'

const Video = (props: IVideo) => {
  return (
    <video
      width="100%"
      autoPlay={props.autoplay || false}
      loop={props.loop || false}
      controls={props.controls || true}
      muted={props.muted || true}
    >
      <source src={props.video.publicURL} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default Video
