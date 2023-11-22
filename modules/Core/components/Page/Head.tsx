import { FC } from 'react'
import NextHead from 'next/head'
import { locales } from 'settings/i18n'
import { withRouter } from 'next/router'
import { isEmptyObj } from 'Core/utils/isEmptyObj'
import { HeadProps } from './types'
import { getCityPrefix } from '../../utils/getCityPrefix'
import { getClientDomain } from '../../utils/getFullUrl'

const Head: FC<HeadProps> = ({
  city,
  metaTags = [],
  preload = [],
  router,
  seoTitle,
  seoLink,
}) => (
  <NextHead>
    <title>{seoTitle}</title>
    <link href='images/icons/icon.svg' rel='icon' />
    {metaTags.map(({ name, content }, idx) => (
      <meta key={`MetaTag-${idx}`} content={content} name={name} />
    ))}
    {!isEmptyObj(seoLink) && <link {...seoLink} />}
    {locales.map((locale) => (
      <link
        key={locale}
        href={`${getClientDomain()}${getCityPrefix(city, locale)}${
          router.asPath
        }`}
        hrefLang={locale}
        rel='alternate'
      />
    ))}
    {preload.map((item) => (
      <link key={item.href} as={item.as} href={item.href} rel='preload' />
    ))}
  </NextHead>
)

export default withRouter(Head)
