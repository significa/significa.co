import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'

import CallToAction from '../../CallToAction/CallToAction'

const Services = () => {
  const { aboutYaml } = useStaticQuery(query)

  return (
    <CallToAction
      title={aboutYaml.cta.title}
      text={aboutYaml.cta.text}
      link={aboutYaml.cta.link}
      linkText={aboutYaml.cta.linkText}
    />
  )
}

export default Services

export const query = graphql`
  query AboutCtaQuery {
    aboutYaml {
      cta {
        title
        text
        link
        linkText
      }
    }
  }
`
