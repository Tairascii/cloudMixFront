const path = require('path')

const localeSubpaths = {}

const {
  NODE_ENV,
} = process.env

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const basePath = ''

module.exports = withBundleAnalyzer({
  productionBrowserSourceMaps: false,
  cssLoaderOptions: {
    url: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
      @import "vars.scss";
      @import "mixins.scss";
    `,
  },
  'i18n': JSON.parse('{"defaultLocale":"almaty","locales":["almaty","almaty_kk","almaty_en","astana","astana_kk"],"localeDetection":true}'),
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  webpack: (config, options) => {
    const newConfig = { ...config }

    newConfig.resolve.alias = {
      ...newConfig.resolve.alias,
      // TODO Create oryn alias
      // Checkout: path.resolve(__dirname, 'modules/Checkout/'), 
      // Core: path.resolve(__dirname, 'modules/Core/'),
      // Marketing: path.resolve(__dirname, 'modules/Marketing/'),
      // Product: path.resolve(__dirname, 'modules/Product/'),
      // User: path.resolve(__dirname, 'modules/User/'),
    }
  
    // if (NODE_ENV === 'production') {
    //   newConfig.plugins.push(
    //     new SentryWebpackPlugin({
    //       include: '.next',
    //       ignore: ['node_modules'],
    //       stripPrefix: ['webpack://_N_E/'],
    //       urlPrefix: `~${basePath}/_next`,
    //     }),
    //   )
    // }
    // TODO разобраться в чем трабла и понять для чего 
    // newConfig.module.rules[3].oneOf.forEach((one) => {
    //   if (!`${one.issuer?.and}`.includes('_app')) return
    //   // eslint-disable-next-line no-param-reassign
    //   one.issuer.and = [path.resolve(__dirname)]
    // })

    return newConfig
  },
})
