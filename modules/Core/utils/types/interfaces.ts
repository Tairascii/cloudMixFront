export interface MetaTag {
  content: string | undefined
  name: string
}

export interface PreloadItem {
  as: 'image' | 'font'
  href: string
}

export interface CanonicalData {
  href?: string
  rel?: string
}
