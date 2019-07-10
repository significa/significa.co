import React from 'react'
import { Theme } from '@theme'
import Img from 'gatsby-image'

import * as S from './styled'
import { getProjectTheme } from '../../../utils/getProjectTheme'
import { IProject } from '../../../pages/showcase'
import * as T from '../../UI/Typography'

interface IHighlight {
  project: IProject
}

const Highlight: React.FC<IHighlight> = ({ project }) => {
  const {
    services,
    title,
    tagline,
    seo,
    fields,
    highlightTextColumnOn = 'left',
  } = project.node

  return (
    <Theme theme={getProjectTheme(project.node.heroTheme, project.node.themes)}>
      <S.Container>
        <S.Content
          to={fields.slug}
          textOnRight={highlightTextColumnOn !== 'left'}
        >
          <S.InnerContent>
            <S.SectionTag>Featured</S.SectionTag>
            <S.Title>{`${title} — ${tagline}`}</S.Title>
            <S.Description>{seo.description}</S.Description>
            <S.Text>Services</S.Text>
            <T.Label>{services.join(', ')}</T.Label>
          </S.InnerContent>
        </S.Content>

        <S.Image
          to={fields.slug}
          imageOnRight={highlightTextColumnOn === 'left'}
        >
          <Img fluid={project.node.hero.childImageSharp.fluid} />
        </S.Image>
      </S.Container>
    </Theme>
  )
}

export default Highlight
