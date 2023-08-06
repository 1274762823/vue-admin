const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave:false,
	// publicPath:"./",// 更改BASE_URL
	devServer:{
		open:true,
		host:"127.0.0.1",
		port:80,
		proxy:{
			'/api':{
				target:'http://sph-h5-api.atguigu.cn',
				changeOrigin:true
			},
			'/gateway':{
				target:'https://m.maizuo.com',
				changeOrigin:true
			}
		}
	},
	pages: {
		index: {
			// page 的入口
			entry: 'src/index.js',
			// 设置网站标题
			title:"尚品汇"
		}
	}
})