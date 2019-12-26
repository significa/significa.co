import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import worldMapSource from './world-map.svg'
import * as S from './styled'

interface IPanel {
  current: string
  old: string
}

const TIME_LETTER = 100
const TIME_RANDOM_CITY = 6000

const template = (city: string) => `OPO>${city}`
const initialState = () =>
  new Array(7).fill(' ').map((_, index) => {
    const randomLetter = char[Math.floor(Math.random() * char.length)]

    if (index === 3) {
      return { current: '>', old: '>' }
    }

    return { current: randomLetter, old: '0' }
  })

const WorldMap = () => {
  const {
    aboutYaml: {
      global: { cities },
    },
  } = useStaticQuery(query)

  const [splitFlap, setSplitFlap] = React.useState(initialState())
  const [currentCity, setCurrentCity] = React.useState(
    template(cities[Math.floor(Math.random() * cities.length)])
  )

  //
  // Pass through all letters
  //
  const flipPanel = React.useCallback(
    (curr: IPanel[]) => {
      const splittedCity = currentCity.split('')
      const newSorted = curr.map(({ current }, index) => {
        if (current === splittedCity[index]) {
          return { current, old: current }
        }

        const indexChart = (char.indexOf(current) + 1) % char.length

        return { current: char[indexChart], old: current }
      })

      return setSplitFlap(newSorted)
    },
    [currentCity]
  )

  //
  // Random city
  //
  const randomCity = React.useCallback(() => {
    const city = cities[Math.floor(Math.random() * cities.length)]
    setCurrentCity(template(city))
    setSplitFlap(initialState())
  }, [cities])

  //
  // Call to update the letters
  //
  React.useEffect(() => {
    const interval = setTimeout(() => flipPanel(splitFlap), TIME_LETTER)

    return () => clearInterval(interval)
  }, [currentCity, flipPanel, splitFlap])

  // Init
  React.useEffect(() => {
    randomCity()
    const interval = setInterval(randomCity, TIME_RANDOM_CITY)

    return () => clearInterval(interval)
  }, [randomCity])

  return (
    <S.MapWrapper>
      <S.MapImg src={worldMapSource} alt="World map" />

      <S.BasePanel>
        {splitFlap.map(({ current }, index) => (
          <S.Panel key={`${current}-${index}`}>
            <S.HalfPanel position="top">
              <div>{current}</div>
            </S.HalfPanel>
          </S.Panel>
        ))}
      </S.BasePanel>
    </S.MapWrapper>
  )
}

export default WorldMap

export const query = graphql`
  query AboutMapQuery {
    aboutYaml {
      global {
        cities
      }
    }
  }
`

const char = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
