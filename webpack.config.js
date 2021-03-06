var webpack = require("webpack");
var path = require("path");
var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(less)$/, exclude: /^(https?:)?\/\//,use: ['style-loader',{loader:'css-loader'},'less-loader'] },
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" }
		]
	},
	entry: {
		'lerp-logo': "./lerp-logo.coffee",
	},
	externals: ["preact","shader-box"],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: "[name].js",
		libraryTarget: 'commonjs2'
	}
}
module.exports = cfg;