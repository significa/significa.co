export const titleToID = (title: string): string => {
  return title.toLowerCase().replace(/\W/g, '-')
}
