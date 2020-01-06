import styled from 'styled-components'
import { media } from '@theme'

import Img from '../../PrismicImage'

import SocialBase from '../../UI/Social'
import { Title as BaseTitle, Text } from '../../UI'
import { Content as ContentFromBlog } from '../../../templates/blog-post.styled'

export const Wrapper = styled.div`
  display: flex;
`

export const Content = styled.div`
  flex: 1;
`

export const Header = styled.div`
  margin-bottom: 1.3em;
  justify-content: space-between;
  display: flex;

  ${media.small} {
    display: block;
  }
`

export const Image = styled(Img)`
  width: 9.7em;
  height: 9.7em;
  border-radius: 9.7em;
  margin-right: 2.2em;

  ${media.small} {
    margin-top: 0.3em;
    margin-right: 1em;
    min-width: 3.6em;
    width: 3.6em;
    height: 3.6em;
  }
`

export const Title = styled(BaseTitle)``

export const Description = styled(Text)``

export const Socials = styled.div`
  display: flex;
  align-items: center;

  ${media.small} {
    margin-top: 1.3em;
    margin-left: calc(-1em - 3.6em);
  }
`

export const SocialLink = styled(SocialBase)`
  width: 20px;
  height: 20px;
  display: inline-block;
  overflow: hidden;
  opacity: 1;

  align-items: center;
  justify-content: center;
  display: inline-flex;

  &:not(:first-child) {
    margin-left: 1.3em;
  }

  &:hover {
    opacity: 0.7;
  }
`

export const FormatContent = styled(ContentFromBlog)`
  margin-left: 0;

  ${media.small} {
    margin-left: calc(-1em - 3.6em);
  }
`
