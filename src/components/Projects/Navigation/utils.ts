import { ContentType } from '../../../templates/project'
import { IItem } from './NavigationItem'

export const createNavigationItems = (content: ContentType): IItem[] => {
  return content.reduce((acc: IItem[], chapter) => {
    if (chapter.title) {
      acc.push({ type: 'chapter', text: chapter.title })
    }

    chapter.content.forEach(block => {
      if (block.title) {
        acc.push({ type: 'block', text: block.title })
      }

      block.sections.forEach(section => {
        if (
          section.type === 'text' &&
          'title' in section.content &&
          typeof section.content.title === 'string'
        ) {
          acc.push({ type: 'section', text: section.content.title })
        }
      })
    })

    return acc
  }, [])
}
