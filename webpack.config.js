module.exports = {
  entry: {
    PopupApp: './test/test.jsx',
  },
  output: {
    path: './test',
    filename: 'bundle.js',
  },
  devtool: '#inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
