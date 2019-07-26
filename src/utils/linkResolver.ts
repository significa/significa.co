export default (doc: { type: string; uid: string }): string => {
  if (doc.type === 'project') {
    return `/showcase/${doc.uid}`
  }

  return '/'
}
