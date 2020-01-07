import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import prettier from 'prettier/standalone'
import prettierTS from 'prettier/parser-typescript'

import { Theme } from '@theme'

import toolboxImg from './toolbox.png'
import pickerImg from './picker.png'

import { textByLine } from '../../../utils/textByLine'

import * as S from './styled'
import StrategyMarkdown from './StrategyMarkdown'
import { Container } from '../../UI'
import syntaxHighlight from '../../../utils/syntaxHighlight'

interface IServicesSectionsContent {
  servicesYaml: {
    strategy: {
      title: string
      text: string
    }
    design: {
      title: string
      text: string
    }
    development: {
      title: string
      text: string
    }
    network: {
      title: string
      text: string
      companies: {
        name: string
        title: string
        text: string
      }
    }
  }
}

const Sections = () => {
  const { servicesYaml: data }: IServicesSectionsContent = useStaticQuery(query)
  const gridColumns = new Array(12).fill('')

  return (
    <>
      {/* Strategy */}
      <S.Section>
        <Container>
          <S.Content>
            <S.LeftGraphics>
              <StrategyMarkdown
                title={data.strategy.title}
                text={data.strategy.text}
              />
            </S.LeftGraphics>
            <S.RightText>
              <S.Title>{data.strategy.title}</S.Title>
              {textByLine(data.strategy.text).map((line, i) => {
                return <S.Text key={i}>{line}</S.Text>
              })}
            </S.RightText>
          </S.Content>
        </Container>
      </S.Section>

      {/* Design */}
      <S.Section>
        <Container>
          <S.Content>
            <S.DesignColumnContent>
              <S.Title>{data.design.title}</S.Title>
              <S.RelativeWrapper>
                {textByLine(data.design.text).map((line, i) => {
                  return <S.Text key={i}>{line}</S.Text>
                })}
                <ElementSelected />
              </S.RelativeWrapper>
            </S.DesignColumnContent>
            <S.DesignGraphics>
              <S.Image src={toolboxImg} alt="Design toolbox" />
              <S.PickerImage src={pickerImg} alt="Color picker" />
            </S.DesignGraphics>
            <S.Grid>
              {gridColumns.map((_, i) => (
                <S.GridColumn key={i} />
              ))}
            </S.Grid>
          </S.Content>
        </Container>
      </S.Section>

      {/* Development */}
      <Theme theme="dark">
        <S.Section>
          <Container>
            <S.Content>
              <S.DevelopmentBox>
                {syntaxHighlight('preformatted', {
                  label: 'jsx',
                  text: prettier.format(
                    `
                    import React from 'react'

                    const Development = () => {
                      return (
                        <>
                          <Title>
                            ${data.development.title}
                          </Title>
                          <Text>
                            ${data.development.text.replace(/\n$/g, '')}
                          </Text>
                        </>
                      )
                    }

                    export default Development`,
                    {
                      semi: false,
                      tabWidth: 2,
                      printWidth: 80,
                      parser: 'typescript',
                      plugins: [prettierTS],
                    }
                  ),
                })}
              </S.DevelopmentBox>
              <S.RightText>
                <S.Title>{data.development.title}</S.Title>
                {textByLine(data.development.text).map((line, i) => {
                  return <S.Text key={i}>{line}</S.Text>
                })}
              </S.RightText>
            </S.Content>
          </Container>
        </S.Section>
      </Theme>
    </>
  )
}

const ElementSelected = () => {
  return (
    <S.Border>
      {new Array(6).fill('').map((_, i) => (
        <S.Handle key={i} />
      ))}
    </S.Border>
  )
}

const query = graphql`
  query ServicesSections {
    servicesYaml {
      strategy {
        title
        text
      }
      design {
        title
        text
      }
      development {
        title
        text
      }
      network {
        title
        text
        companies {
          name
          title
          text
        }
      }
    }
  }
`

export default Sections
