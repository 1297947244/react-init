var webpack = require('webpack');
var path = require('path');
let autoprefixer = require('autoprefixer');
var package = require('./package.json');

// variables
var isProduction = process.env.NODE_ENV !== 'development';
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname);
const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules');
let include_css = [
  path.resolve(NODE_MODULES_PATH + '/antd/'),
];

module.exports = {
  context: sourcePath,
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './index.tsx'
  },
  output: {
    path: outPath,
    filename: isProduction ? 'js/[contenthash].js' : '[hash].js',
    chunkFilename: isProduction ? 'js/[name].[contenthash].js' : '[name].[hash].js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/')
    }
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.ts(x?)$/,
        enforce: 'pre',
        use: 'tslint-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules)/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                'react-hot-loader/babel',
              ],
            }
          },
          'ts-loader'
        ].filter(Boolean)
      },
      // 处理 antd css
      {
        test: /\.less$/,
        include: include_css,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader" // translates CSS into CommonJS 
          },
          {
            loader: "less-loader", // compiles Less to CSS  
            options: {
              sourceMap: true,
              modifyVars: { // antd 主题颜色
                'primary-color': '#FF704F',
                'link-color': '#FF704F', // 'border-radius-base': '2px',  
              },
              javascriptEnabled: true,
            }
          }
        ]
      },
      // css, scss
      {
        test: /\.s?css$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              importLoaders: 1,
              modules: {
                localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
              }
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer({
                browsers: ['Chrome >= 35',
                  'Firefox >= 38',
                  'Edge >= 12',
                  'Explorer >= 9',
                  'iOS >= 8',
                  'Safari >= 8',
                  'Android 2.3',
                  'Android >= 4',
                  'Opera >= 12'
                ]
              })]
            }
          },
          'sass-loader',
        ],
      },
      // static assets
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
            emitFile: true,
            limit: 8 * 1024,
            name: 'img/[name].[ext]',
            publicPath: '../../',
          },
        }, ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|mp3|mp4)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name]__[hash:5].[ext]',
            publicPath: '/',
          },
        }, ],
      },
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendor',
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      },
      append: {
        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
      },
      meta: {
        title: package.name,
        description: package.description,
        keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: './css/[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [{
        from: path.join(__dirname, '/static'),
        to: path.join(__dirname, '/dist'),
      }]
    }),
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: 'static', // sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
};
