import { IFullTheme } from '@theme'

interface IindexTheme extends IFullTheme {
  [key: string]: any
}

export const get = (
  theme: IindexTheme,
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

interface Iprops {
  theme: IFullTheme
}

export const themeGet = (path: string, fallback: string | number) => (
  props: Iprops
): string | number => get(props.theme, path) || fallback
