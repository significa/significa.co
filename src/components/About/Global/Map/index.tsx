import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import worldMapSource from './world-map.svg'
import * as S from './styled'

const TIME_LETTER = 50
const TIME_RANDOM_CITY = 5000

const template = (city: string) => `OPO>${city}`

const Map = () => {
  const {
    aboutYaml: {
      global: { cities },
    },
  } = useStaticQuery(query)

  const initialState = new Array(7).fill(' ').map((_, index) => {
    if (index === 3) {
      return '>'
    }

    return char[Math.floor(Math.random() * char.length)]
  })
  const [currentCity, setCurrentCity] = React.useState(
    template(cities[Math.floor(Math.random() * cities.length)])
  )
  const [splitFlap, setSplitFlap] = React.useState(initialState)

  // Pass throught all letters
  const flipPanel = (curr: string[]) => {
    const splittedCity = currentCity.split('')
    const newSorted = curr.map((l, index) => {
      if (l === splittedCity[index]) {
        return l
      }

      const indexChart = (char.indexOf(l) + 1) % char.length

      return char[indexChart]
    })

    return setSplitFlap(newSorted)
  }

  // Random city
  const randomCity = () => {
    const city = cities[Math.floor(Math.random() * cities.length)]
    setCurrentCity(template(city))
    setSplitFlap(initialState)
  }

  // Call to update the letters
  React.useEffect(() => {
    const interval = setTimeout(() => flipPanel(splitFlap), TIME_LETTER)

    return () => clearInterval(interval)
  }, [currentCity, splitFlap])

  // Init
  React.useEffect(() => {
    randomCity()
    const interval = setInterval(randomCity, TIME_RANDOM_CITY)

    return () => clearInterval(interval)
  }, [])

  return (
    <S.MapWrapper>
      <S.Map src={worldMapSource} alt="World map" />

      <S.BasePanel>
        {splitFlap.map((l, index) => (
          <S.Panel key={`${l}-${index}`}>
            <span>{l}</span>
          </S.Panel>
        ))}
      </S.BasePanel>
    </S.MapWrapper>
  )
}

export default Map

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
  '>',
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
