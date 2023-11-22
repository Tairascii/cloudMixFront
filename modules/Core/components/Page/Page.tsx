import { FC } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { PageProps } from './types'
import Head from './Head'
import styles from './Page.module.scss'

const Header = dynamic(() => import('../Header/Header'), { ssr: false })
const Footer = dynamic(() => import('../Footer/Footer'), { ssr: false })

const Page: FC<PageProps> = ({
  metaTags = [],
  seoTitle,
  seoLink,
  isMobile,
  children,
  preload,
  isShowFooter = false,
  className,
}) => (
  <div className={clsx(styles.block, className)}>
    <Head
      city='almaty'
      metaTags={metaTags}
      preload={preload}
      seoLink={seoLink}
      seoTitle={seoTitle}
    />
    <Header isMobile={isMobile} />
    {children}
    {isShowFooter && <Footer isMobile={isMobile} />}
  </div>
)

export default Page
