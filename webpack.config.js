const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // mode: 'development',
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'client'),
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
