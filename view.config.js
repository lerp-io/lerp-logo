var webpack = require("webpack");
var path = require("path");
var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(less)$/, exclude: /^(https?:)?\/\//,use: ['style-loader','css-loader','less-loader'] },
			{ test: /\.(css)$/, exclude: /^(https?:)?\/\//, use: ['style-loader','css-loader'] },
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" }
		]
	},
	entry: {
		view: "./view.coffee",
	},
	output: {
		path: __dirname,
		publicPath: '/',
		filename: "[name].js",
	},
	devServer: {
		port: 3334
	}
}
module.exports = cfg;