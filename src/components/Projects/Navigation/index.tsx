import React, { useState, useCallback, useEffect } from 'react'
import { useTrail, animated } from 'react-spring'
import { theme } from '@theme'

import { ContentType } from '../../../templates/project'

import * as S from './styled'
import { createNavigationItems } from './utils'
import NavigationItem from './NavigationItem'

interface INavigation {
  content: ContentType
}

const Navigation: React.FC<INavigation> = ({ content }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const toggleNav = useCallback(() => setVisible(!visible), [visible])

  useEffect(() => {
    document.body.style.transition = `padding-left ${theme.transitions.cubic()}`
    document.body.style.paddingLeft = visible ? '18em' : `0`

    return () => {
      document.body.style.transition = `none`
      document.body.style.paddingLeft = '0'
    }
  }, [visible])

  const items = createNavigationItems(content)

  const trail = useTrail(items.length, {
    config: {
      mass: 1,
      tension: 3000,
      friction: 100,
      easing: t => {
        return t * t * t * t
      },
    },
    opacity: visible ? 1 : 0,
    x: visible ? 0 : -0.75,
    from: { opacity: 0, x: -0.75 },
  })

  return (
    <S.ProjectNavigation>
      <ul>
        {trail.map(({ x, ...rest }: any, index: number) => (
          <animated.li
            key={index}
            style={{
              ...rest,
              transform: x.interpolate(
                (value: number) => `translateX(${value}em)`
              ),
            }}
          >
            <NavigationItem item={items[index]} />
          </animated.li>
        ))}
      </ul>
      <button onClick={toggleNav}>Toggle nav</button>
    </S.ProjectNavigation>
  )
}

export default Navigation
