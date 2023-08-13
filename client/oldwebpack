const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isEnvProduction = argv.mode === 'production' ? true : false;

  return {
    entry: ['./src/index.js'],
    output: {
      filename: 'bundle.[fullhash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        favicon: './public/favicon.ico',
      }),
      ...(isEnvProduction
        ? [
            new webpack.DefinePlugin({
              'process.env': {
                STRIPE_KEY: JSON.stringify(process.env.STRIPE_KEY),
              },
            }),
          ]
        : [
            new Dotenv({
              path: '../.env',
            }),
          ]),
    ],
    resolve: {
      modules: [__dirname, 'src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          router: () => 'http://localhost:5000',
          logLevel: 'debug' /*optional*/,
        },
      },
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.png|jpg|gif$/,

          use: ['file-loader'],
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
  };
};
