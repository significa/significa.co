import slugify from 'slugify'

export default (str: string) =>
  slugify(str, {
    replacement: '-',
    lower: true,
  })
