const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/javascripts/main.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'javascripts/[name]-[contenthash].js',
    publicPath: '/',
  },
  performance: {
    maxAssetSize: 3000000,
  },
  devServer: {
    static: "./public",
  },
  resolve: {
    extensions: [".js", ".glsl", "vs", "fs"],
  },
  module: {
    rules: [
      // typescript
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      // javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }],
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      // shader
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: "asset/source",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
      // css|sass|scss
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [ 'autoprefixer', { grid: true } ],
                  [ 'cssnano', { preset: 'default' } ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // png|jpg|jpeg|svg
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[contenthash][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      // pug
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/[name]-[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/templates/access.pug',
    //   filename: 'access.html',
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/templates/members/taro.pug',
    //   filename: 'members/taro.html',
    // }),
    new CleanWebpackPlugin(),
  ],
};