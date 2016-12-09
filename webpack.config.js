const path = require('path');

module.exports = {
  entry: {
    PopupApp: './src/index.jsx',
  },
  output: {
    path: './',
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
  },
  resolve: {
    alias: { '~': path.resolve(__dirname, './src') },
    extensions: ['', '.js', '.jsx']
  }
};
