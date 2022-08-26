/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: true,
    register: false,
    runtimeCaching,
  },
  images: {
    domains: ['localhost', 'assets.tina.io', 'bengeendokter.be', 'dev.bengeendokter.be'],
  },
  i18n: {
    locales: ["nl", "en"],
    defaultLocale: "nl",
  },
  experimental: {
    images: {
        allowFutureImage: true,
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
