const config = {
  proxy: {
    molgenis: {
      target: 'http://localhost',
      keepOrigin: true
    }
  }
}

module.exports = {
  devServer: {
    proxy: process.env.NODE_ENV === 'production' ? undefined : {
      '^/app-ui-context': config.proxy.molgenis,
      '^/api': config.proxy.molgenis,
      '^/login': config.proxy.molgenis,
      '^/menu': config.proxy.molgenis,
      '^/plugin': config.proxy.molgenis,
      '^/css': config.proxy.molgenis,
      '^/js': config.proxy.molgenis,
      '^/@molgenis-ui': config.proxy.molgenis,
    }
  },
  runtimeCompiler: true,

}
