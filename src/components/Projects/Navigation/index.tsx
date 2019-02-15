import React, { useState, useCallback, useEffect } from 'react'
import { useTrail } from 'react-spring'
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
        return t * t * t
      },
    },
    x: visible ? 0 : -0.5,
    opacity: visible ? 1 : 0,
    from: { x: -0.5, opacity: 0 },
  })

  return (
    <S.ProjectNavigation>
      <ul>
        {trail.map(({ x, opacity }: any, index: number) => (
          <NavigationItem
            key={index}
            style={{
              opacity,
              transform: x.interpolate(
                (value: number) => `translateX(${value}em)`
              ),
            }}
            item={items[index]}
          />
        ))}
      </ul>
      <S.NavigationButton onClick={toggleNav} visible={visible}>
        <S.ButtonLine />
        <S.ButtonLine />
        <S.ButtonLine />
      </S.NavigationButton>
    </S.ProjectNavigation>
  )
}

export default Navigation
