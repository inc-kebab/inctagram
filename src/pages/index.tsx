import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'
import Head from 'next/head'
import Link from 'next/link'

const Public: Page = () => {
  return (
    <>
      <Head>
        <title>Inctagram</title>
        <meta content="Inctagram" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <ul>
          <li>
            <Link href="/home">home</Link>
          </li>
          <li>
            <Link href="/auth/sign-in">sign-in</Link>
          </li>
          <li>
            <Link href="/auth/sign-up">sign-up</Link>
          </li>
          <li>
            <Link href="/auth/terms">terms</Link>
          </li>
          <li>
            <Link href="/auth/privacy">privacy</Link>
          </li>
          <li>
            <Link href="/auth/forgot-password">forgot-password</Link>
          </li>
          <li>
            <Link href="/auth/password-recovery">password-recovery</Link>
          </li>
          <li>
            <Link href="/auth/create-new-password">create-new-password</Link>
          </li>
          <li>
            <Link href="/favorites">favorites</Link>
          </li>
          <li>
            <Link href="/messenger">messenger</Link>
          </li>
          <li>
            <Link href="/profile">profile</Link>
          </li>
          <li>
            <Link href="/search">search</Link>
          </li>
          <li>
            <Link href="/statistics">statistics</Link>
          </li>
        </ul>
      </main>
    </>
  )
}

Public.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>
}

export default Public
