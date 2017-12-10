var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      actions: path.resolve(__dirname, 'src/actions'),
      stores: path.resolve(__dirname, 'src/stores'),
      shared: path.resolve(__dirname, 'src/shared'),
      utils: path.resolve(__dirname, 'src/utils'),
      constants: path.resolve(__dirname, 'src/constants')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules=true&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      }
    ]
  }
}
;


