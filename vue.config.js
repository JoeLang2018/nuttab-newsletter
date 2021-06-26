module.exports = {
  devServer: {
    // disableHostCheck: true,
    host: 'localhost',
    port: 9000,
    // sockPort: 8080,
    // proxy: 'http://localhost:8080'
    // proxy: {
    // '/sockjs-node':{
    //   target: 'http://localhost',
    // },
    // '/api': {
    //   // target: 'http://mall-pre.springboot.cn',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '/api': ''
    //   }
    // }
    // }
  },
  publicPath: '/',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map'
  }
}
