var path = require('path');
var webpack = require('webpack');

var constants = new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
    FEEDSRC: JSON.stringify(process.env.NODE_ENV === 'production' ? 'https://ruminator.herokuapp.com' : 'http://localhost:9000')
});

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    javascript: './js/Main.js',
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src/js'),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        cacheDirectory: true
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'src/scss')
      },
      {
        test: /\.css$/,
        // include: path.join(__dirname, 'src/scss'),
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url'
      },
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']
  },
  // devtool: 'source-map',
  plugins: [constants,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    })
  ]
};
