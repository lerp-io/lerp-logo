var webpack = require("webpack");
var path = require("path");
var cfg = {
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.coffee$/, use: "coffee-loader"},
			{ test: /\.(xml|html|txt|md|glsl|svg)$/, loader: "raw-loader" }
		]
	},
	entry: {
		index: "./lerp-logo.coffee",
	},
	externals: ["preact","shader-box"],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: "lerp-logo.js",
		libraryTarget: 'commonjs2'
	}
}
module.exports = cfg;