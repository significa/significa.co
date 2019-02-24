import React, { useState, useCallback, useEffect } from 'react'
import { useTrail, useSpring, useTransition } from 'react-spring'

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
  const transition = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  }
  const overlayTransitions = useTransition(visible, null, transition)
  const buttonTransitions = useTransition(isButtonVisible, null, transition)

  const drawerSpring = useSpring({
    transform: visible ? 'translateX(0)' : 'translateX(-100%)',
    config: {
      tension: 500,
      friction: 50,
    },
  })

  const items = createNavigationItems(content)
  const itemsTrail = useTrail(items.length, {
    config: {
      tension: 2500,
      friction: 100,
    },
    delay: 100,
    x: visible ? 0 : -0.5,
    opacity: visible ? 1 : 0,
    from: { x: -0.5, opacity: 0 },
  })

  return (
    <>
      {/* Button */}
      {buttonTransitions.map(
        ({ item, key, props }) =>
          item && (
            <S.AnimatedNavButton
              key={key}
              style={props}
              onClick={toggleNav}
              visible={visible}
            >
              <S.ButtonLine />
              <S.ButtonLine />
              <S.ButtonLine />
            </S.AnimatedNavButton>
          )
      )}

      {/* Drawer */}
      <S.AnimatedDrawer style={drawerSpring}>
        {itemsTrail.map(
          ({ x, opacity }: { [key: string]: any }, index: number) => (
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
          )
        )}
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
