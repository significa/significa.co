export const textByLine = (text: string): string[] =>
  text.replace(/\n$/g, '').split('\n')
