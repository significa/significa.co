import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import AllServicesBoxes from 'components/ServicesBox/AllServicesBoxes'
import { Container, Spacer, TitleAndText } from 'components/UI'

type Data = {
  aboutYaml: {
    services: {
      title: string
      text: string
      cta: string
    }
  }
}

const AboutServices = () => {
  const {
    aboutYaml: { services },
  } = useStaticQuery<Data>(graphql`
    query AboutServices {
      aboutYaml {
        services {
          title
          text
          cta
        }
      }
    }
  `)

  return (
    <Spacer variant="large">
      <Container>
        <TitleAndText
          title={services.title}
          text={services.text}
          cta={{ text: services.cta, link: '/services' }}
        />
        <Spacer variant="small" spacing={{ bottom: [0, 0, 0] }}>
          <AllServicesBoxes />
        </Spacer>
      </Container>
    </Spacer>
  )
}

export default AboutServices
