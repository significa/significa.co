import styled, { media } from '@theme'
import { ArrowLink, titleStyle, textStyle, labelStyle } from '../../UI'

export const Wrapper = styled.div`
  margin-top: 5rem;
  padding: 3rem;
  border-radius: 2px;
  background-color: ${(p: { backgroundColor: string }) => p.backgroundColor};

  color: white;

  display: flex;
`

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`

export const Quote = styled.blockquote`
  ${titleStyle}
  color: white;
  line-height: 1.25;

  margin-left: 4rem;

  flex: 3;
`

export const PhotoHolder = styled.div`
  position: relative;

  margin-right: 1rem;
`

export const Photo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  overflow: hidden;
`

export const Logo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  position: absolute;
  left: 2rem;
  bottom: 0;
`

export const Info = styled.div`
  display: flex;

  align-items: center;
`

export const Name = styled.p`
  ${textStyle};
  margin-bottom: 0.15rem;

  white-space: nowrap;

  color: white;
`

export const Position = styled.p`
  ${labelStyle};
  white-space: nowrap;

  color: white;
`

export const Link = styled(ArrowLink)`
  color: white;
  white-space: nowrap;
  margin-top: 1rem;

  ${media.hover} {
    &:hover {
      color: white;
    }
  }
`
