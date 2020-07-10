const path = require('path')
const withPlugins = require('next-compose-plugins')

const sass = require('@zeit/next-sass')
const css = require('@zeit/next-css')

const nextConfig = {
  webpack: (config, options) => {
    config.resolve.modules.push(path.resolve('./'))
    return config
  },
}

module.exports = withPlugins([
  [ css ],
  [
    sass, {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:16]"
      }
    }
  ]
], nextConfig)