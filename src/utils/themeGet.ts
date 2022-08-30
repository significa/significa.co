import { IFullTheme } from '@theme'

interface IIndexTheme extends IFullTheme {
  [key: string]: any
}

export const get = (
  theme: IIndexTheme,
  path: string
): string | number | null => {
  const result = path.split('.').reduce((acc, key) => {
    if (acc && key in acc) {
      return acc[key]
    } else {
      return null
    }
  }, theme)

  return typeof result === 'string' || typeof result === 'number'
    ? result
    : null
}

interface IProps {
  theme: IFullTheme
}

export const themeGet = (path: string, fallback: string | number) => (
  props: IProps
): string | number => get(props.theme, path) || fallback
