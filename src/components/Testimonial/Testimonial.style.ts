import Image from 'gatsby-image'
import styled from 'styled-components'

import { media } from '@theme'
import { ArrowLink, Title as BaseTitle } from 'components/UI'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};

  position: relative;

  overflow: hidden;
`

export const Img = styled(Image)`
  position: absolute !important;
  width: calc(50% - 5rem);

  bottom: 0;

  min-width: 620px;

  right: calc(50% + 5rem);

  ${media.large} {
    width: 40%;
    min-width: 0;
    right: 3rem;
  }

  ${media.medium} {
    position: relative !important;

    right: auto;

    width: calc(65%);
  }

  ${media.small} {
    width: calc(100% - 2.5rem);
  }
`

export const Content = styled.div`
  box-sizing: border-box;
  width: 50%;
  padding: 5rem;
  padding-left: 0;
  margin-left: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.large} {
    width: 100%;
    margin-left: 0;
    padding-left: 5rem;
  }

  ${media.medium} {
    padding: 3rem;
  }

  ${media.small} {
    padding: 2rem;
  }
`

export const ContentFooter = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${media.large} {
    flex-direction: column;

    align-items: flex-start;
  }

  ${media.medium} {
    margin-top: 3rem;
  }

  ${media.small} {
    margin-top: 2rem;
  }
`

export const Link = styled(ArrowLink)`
  line-height: 1.5;

  ${media.large} {
    margin-top: 2rem;
  }
`

export const Title = styled(BaseTitle)`
  ${media.small} {
    font-size: 1.5em;
    line-height: 1.3;
  }
`
