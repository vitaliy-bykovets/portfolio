const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'production';
const isProd = mode === 'production';

module.exports = {
  mode,
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    quiet: true
  },

  module: {
    rules: [
      // Babel
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },

      // CSS + SASS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isProd
            },
          },
          {
            loader: 'css-loader',
            options: {importLoaders: 1}
          },
          {
            loader: 'sass-loader'
          }
        ]
      },

      // Image loader
      {
        test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
        use: [
          {
            loader: 'img-loader',
            options: {
              outputPath: 'images/',
              plugins: [
                require('imagemin-mozjpeg')({
                  progressive: true
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 5
                }),
                require('imagemin-webp'),
                require('imagemin-svgo')
              ]
            }
          }
        ]
      },

      // Font loader
      {
        test: /\.(woff2|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      fallback: 'style-loader',
      use: [{loader: 'css-loader', options: {minimize: isProd}}],
    }),
  ],

};