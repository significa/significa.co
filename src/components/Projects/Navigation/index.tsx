import React, { useState, useCallback, useEffect } from 'react'
import { useTrail, useSpring, useTransition } from 'react-spring'
import { AnimatePresence } from 'framer-motion'

import { SectionsType } from '../Section/types'

import * as S from './styled'
import NavigationItem, { PossibleTypes } from './NavigationItem'
import useBodyLock from '../../../hooks/useBodyLock'

interface INavigation {
  content: SectionsType[]
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
    const totalHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
    const shouldShow =
      window.scrollY > 800 &&
      window.scrollY < totalHeight - window.innerHeight - 800

    if (shouldShow && !isButtonVisible) {
      return setButtonVisible(true)
    }

    if (!shouldShow && isButtonVisible) {
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

  const drawerSpring = useSpring({
    transform: visible ? 'translateX(0)' : 'translateX(-100%)',
    config: {
      tension: 500,
      friction: 50,
    },
  })

  const items = content.filter(section => {
    const wantedTypes = [
      'chapter',
      'section',
      'text',
      'sticky_image',
      'sticky_video',
    ]
    return wantedTypes.indexOf(section.type) >= 0
  })
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
      <AnimatePresence>
        {isButtonVisible && (
          <S.AnimatedNavButton
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
            onClick={toggleNav}
            visible={visible}
          >
            <S.ButtonLine />
            <S.ButtonLine />
            <S.ButtonLine />
          </S.AnimatedNavButton>
        )}
      </AnimatePresence>

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
              item={items[index] as PossibleTypes}
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
