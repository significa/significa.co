import React from 'react'
import { Theme } from '@theme'
import { Link } from 'gatsby'

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
  const contentOnLeft = highlightTextColumnOn === 'left'

  const imageElement = (
    <S.Image fluid={project.node.thumbnail.childImageSharp.fluid} />
  )
  const contentElement = (
    <S.Content>
      <div>
        <S.Big>{`${title} — ${tagline}`}</S.Big>
        <S.Description>{seo.description}</S.Description>
        <S.Text>Services</S.Text>
        <T.Label>{services.join(', ')}</T.Label>
      </div>
    </S.Content>
  )

  const renderContent = () =>
    contentOnLeft
      ? [contentElement, imageElement]
      : [imageElement, contentElement]

  return (
    <Theme theme={getProjectTheme(project.node.heroTheme, project.node.themes)}>
      <Link to={fields.slug}>
        <S.Container>{renderContent()}</S.Container>
      </Link>
    </Theme>
  )
}

export default Highlight
