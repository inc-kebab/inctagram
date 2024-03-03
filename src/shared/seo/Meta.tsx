import { PropsWithChildren } from 'react'

import Head from 'next/head'

export type MetaProps = {
  description?: string
  ogImageSrc?: string
  ogUrl?: string
  title: string
} & PropsWithChildren

export const Meta = ({ children, description, ogImageSrc, ogUrl, title }: MetaProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | Inctagram`}</title>
        <meta charSet="utf-8" />
        <link href="/favicon.ico" rel="icon" />
        <meta content={`${title} | Inctagram`} property="og:title" />
        <meta content="website" property="og:type" />
        {description ? (
          <>
            <meta content={description} name="description" />
            <meta content={description} property="og:description" />
          </>
        ) : (
          <meta content="noindex, nofollow" name="robots" />
        )}

        {ogImageSrc && (
          <>
            <meta content="/images/ogImage.png" property="og:image" />
            <meta content="Inctagram og:image:alt" property="og:image:alt" />
            <meta content="1280" property="og:image:width" />
            <meta content="675" property="og:image:height" />
          </>
        )}
        {ogUrl && <meta content={ogUrl} property="og:url" />}
      </Head>
      {children}
    </>
  )
}
