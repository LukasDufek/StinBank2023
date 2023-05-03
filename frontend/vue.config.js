//const { defineConfig } = require('@vue/cli-service')
module.exports = {

  devServer:{
    proxy: {
      '/api' :{
        target: 'http://localhost:5000'
      }
    }



  },

  lintOnSave: false,

  chainWebpack: config => {
    config.module
        .rule('raw')
        .test(/\.txt$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
  },
}
