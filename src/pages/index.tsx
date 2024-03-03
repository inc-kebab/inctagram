import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'
import Head from 'next/head'

const Public: Page = () => {
  return (
    <>
      <Head>
        <title>Inctagram</title>
        <meta content="Inctagram" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>POSTS LIST</main>
    </>
  )
}

Public.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>
}

export default Public
