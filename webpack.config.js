const path = require('path')

module.exports = (_, argv) => ({

	mode: argv.mode === 'production' ? 'production' : 'development',

	devtool: argv.mode === 'production' ? false : 'inline-source-map',

	entry: {
		index: './src/index.ts', // The entry point for your plugin code
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		rules: [
			{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
		],
	},

	resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
})