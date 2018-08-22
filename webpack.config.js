const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production';
const prod =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const cssDev = ['style-loader', 'css-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        localIdentName: '[name]__[local]___[hash:base64:6]'
      }
    }
  ]
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: prod,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        use: cssConfig
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OfflinePlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true
  }
};
