const getThumbBgColor = (
  heroTheme: string,
  themes: Array<{ name: string; background: string }>
): string | undefined => {
  const theme = themes.find(t => t.name === heroTheme)

  if (theme) {
    return theme.background
  }

  return
}

export default getThumbBgColor
