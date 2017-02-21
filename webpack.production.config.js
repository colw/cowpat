var path = require('path');
var webpack = require('webpack');
var Visualizer = require('webpack-visualizer-plugin');

const defineEnvironment = new webpack.DefinePlugin({
  "process.env": { 
     NODE_ENV: JSON.stringify("production") 
   }
});

var defineConstants = new webpack.DefinePlugin({
  API_URL: JSON.stringify('https://ruminator.herokuapp.com')
});

var defineMinify = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false },
  output: { comments: false },
})

var defineDedupe = new webpack.optimize.DedupePlugin();

var visualizerPluging = new Visualizer({
  filename: '../statistics.html'
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
        loader: 'babel-loader',
        cacheDirectory: true
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'src/scss')
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'src/scss'),
          path.join(__dirname, 'src/fontello/css')
        ],
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /src\/favicons/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.(jpg|jpeg|gif|png|ico|xml|json|svg)$/,
        include: path.join(__dirname, 'src/favicons'),
        loader: "file?name=[name].[ext]"
      },      
      {
        test: /\.woff(\?\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?\d+)?$/,
        exclude: /src\/favicons/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee']
  },
  // devtool: 'source-map',
  plugins: [defineEnvironment, defineConstants, defineMinify, defineDedupe, visualizerPluging]
};
