module.exports = {
	entry: './js/social-mixer-block.js',
	output: {
		path: __dirname,
		filename: 'js/social-mixer-block.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
