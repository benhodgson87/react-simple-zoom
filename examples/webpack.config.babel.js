import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

export default () => ({
  entry: {
    index: path.join(__dirname, './index.js'),
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.(css)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({
      sourceMap: false,
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new CleanWebpackPlugin(['./dist/build.js']),
  ]
})
