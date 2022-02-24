const path = require('path')

module.exports = {
  entry: {
    app: './index.js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [{
        test: /\.wj$/,
        use: [
          './loader/myLoader2.js',
          './loader/myLoader1.js'
        ]
      },
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: path.resolve(__dirname, './loader/replaceLoader.js'),
          //   options: {
          //     name: 'hello'
          //   }
          // }
          {
            loader: path.resolve(__dirname, './loader/authLoader.js'),
            options: {
              sign: '味精王'
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}