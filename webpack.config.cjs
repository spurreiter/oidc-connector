const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new webpack.ProgressPlugin()],
  entry: path.resolve(__dirname, 'test/html/app.js'),
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }]
  },
  devServer: {
    // host: '0.0.0.0',
    port: 8000,
    hot: true,
    contentBase: ['./example', './test/html'],
    before: function (app) {
      app.get('/silent-login-check.html', (req, res) => {
        const html = '<html>\n' +
          '  <body>\n' +
          '    <script>\n' +
          '      parent.postMessage(location.href, location.origin);\n' +
          '    </script>\n' +
          '  </body>\n' +
          '</html>\n'
        res.end(html)
      })
    },
    after: function () {
    }
  }
}
