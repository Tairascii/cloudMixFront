import { NextRouter } from 'next/router'
import { CanonicalData, MetaTag, PreloadItem } from 'Core/utils/types'

export interface HeadSeo {
  metaTags?: MetaTag[]
  preload?: PreloadItem[]
  seoLink?: CanonicalData | null
  seoTitle: string
}

export interface HeadProps extends HeadSeo {
  city: string
  isNeedHyperComments?: boolean
  router: NextRouter
}

export interface HeadContent {
  link: CanonicalData | null
  metaTags: MetaTag[]
  title: string
}

export interface PageProps extends HeadSeo {
  children: JSX.Element
  className?: string
  headContent?: HeadContent
  is404Page?: boolean
  isBottomMenuShown?: boolean
  isMobile?: boolean
  isShowFooter?: boolean
  shouldHeaderBeSticky?: boolean
}
