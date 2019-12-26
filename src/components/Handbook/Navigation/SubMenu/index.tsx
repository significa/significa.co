import React from 'react'
import { motion } from 'framer-motion'

import scrollToId from '../../../../utils/scrollToId'
import { titleToID } from '../../../../utils/titleToID'
import { ContentType } from '../'

import * as S from './styled'

interface SubMenuProps {
  path: string
  headings: ContentType[]
  isActive: boolean
}

const variants = {
  open: (ulRef: { current: HTMLUListElement }) => {
    return {
      maxHeight: `${ulRef.current.getBoundingClientRect().height}px`,
    }
  },
  closed: {
    maxHeight: 0,
  },
}

const SubMenu = ({ path, headings, isActive }: SubMenuProps) => {
  const [active, setActive] = React.useState<string>(
    titleToID(headings[0].text)
  )
  const domList = React.useRef<HTMLHeadingElement[]>([])

  // Fetch IDs from DOM when mounting
  React.useEffect(() => {
    headings.forEach(heading => {
      if (heading.text) {
        const target = document.querySelector(`#${titleToID(heading.text)}`)
        if (target && target instanceof HTMLHeadingElement) {
          domList.current.push(target)
        }
      }
    })
  }, [headings])

  // Add event listener to scroll to change currently active heading
  const onScroll = () => {
    const domNodes = domList.current.slice().reverse()

    for (const element of domNodes) {
      if (element.getBoundingClientRect().top < 100) {
        const id = element.getAttribute('id')
        if (id) {
          setActive(id)
          break
        }
      }
    }
  }

  React.useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)

    return function cleanup() {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Ul Ref to animate
  const ulRef = React.useRef<HTMLUListElement>(null)

  return (
    <motion.div
      style={{ overflow: 'hidden', maxHeight: 0 }}
      variants={variants}
      custom={ulRef}
      animate={isActive ? 'open' : 'closed'}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 40,
      }}
    >
      <ul ref={ulRef}>
        {headings.map((heading, i) => {
          const id = titleToID(heading.text)
          return (
            <li key={i}>
              <S.Link
                isActive={active === id}
                extraMargin={heading.type === 'heading3'}
                href={`${path}#${id}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  scrollToId(e, id)
                }}
              >
                {heading.text}
              </S.Link>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}

export default SubMenu
