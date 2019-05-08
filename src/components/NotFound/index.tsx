import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import * as S from './styled'
import sourceSong from '../../assets/404.mp4'

const NotFound = () => {
  const { notFoundYaml } = useStaticQuery(query)
  const [play, setPlay] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [play])

  return (
    <S.Container>
      <S.Content>
        <S.Title>{notFoundYaml.title}</S.Title>
        <S.Display>{notFoundYaml.text}</S.Display>

        <S.Display>
          {notFoundYaml.prePlay}{' '}
          <button onClick={() => setPlay(!play)}>
            {!play ? notFoundYaml.play : notFoundYaml.stop}
          </button>
        </S.Display>

        <S.Link reverse to="/">
          {notFoundYaml.linkText}
        </S.Link>
      </S.Content>

      <S.Video ref={videoRef}>
        <source src={sourceSong} type="video/mp4" />
      </S.Video>
    </S.Container>
  )
}

export default NotFound

const query = graphql`
  {
    notFoundYaml {
      title
      text
      prePlay
      play
      stop
      linkText
    }
  }
`
