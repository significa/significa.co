import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useTrail, useSpring, useTransition, useChain } from 'react-spring'

import { ContentType } from '../../../templates/project'

import * as S from './styled'
import { createNavigationItems } from './utils'
import NavigationItem from './NavigationItem'
import useBodyLock from '../../../hooks/useBodyLock'

interface INavigation {
  content: ContentType
}

const Navigation: React.FC<INavigation> = ({ content }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [isButtonVisible, setButtonVisible] = useState<boolean>(false)
  const toggleNav = useCallback(() => setVisible(!visible), [visible])
  useBodyLock(visible)

  // Only show button closer to the bottom
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible, isButtonVisible])

  const handleScroll = () => {
    if (window.scrollY > 500 && !isButtonVisible) {
      return setButtonVisible(true)
    }

    if (window.scrollY <= 500 && isButtonVisible) {
      return setButtonVisible(false)
    }
  }

  // Animations
  const overlayTransitions = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const drawerSpringRef = useRef(null)
  const drawerSpring = useSpring({
    transform: visible ? 'translateX(0)' : 'translateX(-100%)',
    config: {
      tension: 500,
      friction: 50,
    },
    ref: drawerSpringRef,
  })

  const items = createNavigationItems(content)
  const trailRef = useRef(null)
  const trail = useTrail(items.length, {
    config: {
      mass: 1,
      tension: 1500,
      friction: 80,
      easing: t => {
        return t * t * t
      },
    },
    x: visible ? 0 : -0.5,
    opacity: visible ? 1 : 0,
    from: { x: -0.5, opacity: 0 },
    ref: trailRef,
  })

  useChain([trailRef, drawerSpringRef])

  return (
    <>
      {/* Button */}
      <S.NavigationButton
        onClick={toggleNav}
        visible={visible}
        isButtonVisible={isButtonVisible}
      >
        <S.ButtonLine />
        <S.ButtonLine />
        <S.ButtonLine />
      </S.NavigationButton>

      {/* Drawer */}
      <S.AnimatedDrawer style={drawerSpring}>
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
            setVisible={setVisible}
          />
        ))}
      </S.AnimatedDrawer>

      {/* Overlay */}
      {overlayTransitions.map(
        ({ item, key, props }) =>
          item && (
            <S.AnimatedOverlay
              key={key}
              style={props}
              onClick={() => setVisible(false)}
            />
          )
      )}
    </>
  )
}

export default Navigation
