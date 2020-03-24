module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'assets': '@/assets',
        'api': '@/api',
        'views': '@/views',
        'store': '@/store'
      }
    }
  }
}
