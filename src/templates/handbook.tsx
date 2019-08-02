import React from 'react'

import HandbookLayout from '../components/Layout/HandbookLayout/'

interface HandbookChapterPageProps {
  pageContext: {
    uid: string
  }
}

const HandbookChapterPage: React.FC<HandbookChapterPageProps> = ({
  pageContext: { uid },
}) => {
  return <HandbookLayout currentPage={uid}>Page content</HandbookLayout>
}

export default HandbookChapterPage
