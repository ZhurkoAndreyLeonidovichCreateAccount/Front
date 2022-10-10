const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	
	/* devServer:{
		proxy: 'http://www.portal.nalog.gov.by'
	}, */
	transpileDependencies: true,
	publicPath: '/',
	productionSourceMap: true,
	filenameHashing: false
})
