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

  const toggleBody = () => {
    document.body.style.width = '100vw'
    document.body.style.transition = `margin-left ${theme.transitions.cubic()}`
    document.body.style.marginLeft = visible ? '18em' : `0`
  }

  // Move body
  useEffect(() => {
    toggleBody()

    return () => {
      document.body.style.width = 'auto'
      document.body.style.transition = `none`
      document.body.style.marginLeft = '0'
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
    <>
      <S.ProjectNavigation>
        {trail.map(({ x, opacity }: { [key: string]: any }, index: number) => (
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
      </S.ProjectNavigation>
      <S.NavigationButton onClick={toggleNav} visible={visible}>
        <S.ButtonLine />
        <S.ButtonLine />
        <S.ButtonLine />
      </S.NavigationButton>
    </>
  )
}

export default Navigation
