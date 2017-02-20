"use strict";

let path = require('path');
const jsDir = path.resolve(__dirname, './src/scripts');

module.exports = {
	entry: {
		main: './src/scripts/main.js'
	},
	resolve: {
		root: [jsDir],
		modulesDirectories: [path.join(__dirname, 'node_modules')],
		extensions: ['', '.js', '.jsx', '.json']
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	output: {
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.js$|\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['babel-preset-es2015', 'babel-preset-react'].map(require.resolve)
			}
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}]
	}
};
