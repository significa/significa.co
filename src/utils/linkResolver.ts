export default (doc: { type: string; uid: string }): string => {
  if (doc.type === 'project') {
    return `/showcase/${doc.uid}`
  }

  if (doc.type === 'position') {
    return `/careers/${doc.uid}`
  }

  if (doc.type === 'handbook_chapter') {
    return `/handbook/${doc.uid}`
  }

  if (doc.type === 'blog_post') {
    return `/blog/${doc.uid}`
  }

  if (doc.type === 'blog_author') {
    return `/blog/author/${doc.uid}`
  }

  return '/'
}
