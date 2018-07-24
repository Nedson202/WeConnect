const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  entry: [
    './client/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new Dotenv({
      path: './.env',
      systemvars: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'client'),
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
};
