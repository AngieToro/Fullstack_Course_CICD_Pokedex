const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

console.log('Usando Webpack desde:', __dirname)

module.exports = {
  //entry: './src/index.jsx',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 8080,
  },
  plugins: [
    new HtmlWebPackPlugin({
      //template: './public/index.html',
      template: path.resolve(__dirname, 'public/index.html'),
      filename: './index.html',
    }),
  ],
}
