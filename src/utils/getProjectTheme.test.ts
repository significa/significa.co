import { lightTheme as defaultTheme, darkTheme } from '@theme'
import { getProjectTheme } from './getProjectTheme'

const themeLight = {
  brand: '#0154FF',
  background: '#FFFFFF',
  foreground: '#111314',
  highlight: '#FF9500',
  secondary: '#8A9399',
  medium: '#111314',
  subtle: 'rgba(255,255,255,0.2)',
  error: '#FF5050',
}

const themeDark = {
  brand: '#0154FF',
  background: '#111314',
  foreground: '#FFFFFF',
  highlight: '#FFFFFF',
  secondary: '#EDF0F2',
  medium: '#FFFFFF',
  subtle: 'rgba(255,255,255,0.2)',
  error: '#FF5050',
}

const themes = [
  {
    name: 'project-light',
    ...themeLight,
  },
  {
    name: 'project-dark',
    ...themeDark,
  },
]

describe('Get theme by name from project themes', () => {
  it('returns theme if found', () => {
    expect(getProjectTheme('project-light', themes)).toEqual(themeLight)
  })

  it('returns theme if found 2', () => {
    expect(getProjectTheme('project-dark', themes)).toEqual(themeDark)
  })

  it('returns default light theme if not found', () => {
    expect(getProjectTheme('something-else', themes)).toEqual(defaultTheme)
  })

  it('returns default light theme if no themes', () => {
    expect(getProjectTheme('project-light')).toEqual(defaultTheme)
  })

  it('returns default dark theme if requested and no themes', () => {
    expect(getProjectTheme('dark')).toEqual(darkTheme)
  })

  it('returns light theme', () => {
    expect(getProjectTheme('light', themes)).toEqual(defaultTheme)
  })

  it('returns dark theme', () => {
    expect(getProjectTheme('dark', themes)).toEqual(darkTheme)
  })
})
