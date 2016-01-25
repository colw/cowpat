var path = require('path');
var webpack = require('webpack');

var constants = new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
    FEEDSRC: JSON.stringify(process.env.NODE_ENV === 'production' ? 'https://ruminator.herokuapp.com/' : 'http://localhost:9000/')
});

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './js/Main.js',
    html: './index.html'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
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
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']
  },
  plugins: [constants]
};
