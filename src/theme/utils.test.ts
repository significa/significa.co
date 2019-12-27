import { mergeThemeWithColors } from './utils'

import theme, { darkTheme } from './theme'

import { colorArgumentType } from '.'

describe('Merge theme with colors', () => {
  it('returns light theme when receiving "light"', () => {
    expect(mergeThemeWithColors('light')).toEqual(theme)
  })

  it('returns dark theme when receiving "dark"', () => {
    expect(mergeThemeWithColors('dark')).toEqual({
      ...theme,
      colors: darkTheme,
    })
  })

  it('returns complete theme when receiving color theme object', () => {
    expect(
      mergeThemeWithColors({ ...darkTheme, foreground: '#5050FF' })
    ).toEqual({ ...theme, colors: { ...darkTheme, foreground: '#5050FF' } })
  })

  it('returns default theme when receiving unknown argument', () => {
    expect(mergeThemeWithColors('foo' as colorArgumentType)).toEqual(theme)
  })
})
