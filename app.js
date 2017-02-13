/* Server */
var express = require('express');
var app = express();

var react = require('react');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

// app.get('/dist/icons/*', function(req, res) {
// 	console.log('img', req.url)
// 	res.sendFile(__dirname + '/dist/icons/' + req.url.split('/')[2]);
// })

// TODO Fix these hard coded routes.

app.get('/dist/safari-pinned-tab.svg', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/safari-pinned-tab.svg');
})
app.get('/dist/mstile-150x150.png', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/mstile-150x150.png');
})
app.get('/dist/manifest.json', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/manifest.json');
})
app.get('/dist/favicon.ico', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/favicon.ico');
})
app.get('/dist/favicon-32x32.png', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/favicon-32x32.png');
})

app.get('/dist/favicon-16x16.png', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/favicon-16x16.png');
})

app.get('/dist/browserconfig.xml', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/browserconfig.xml');
})

app.get('/dist/apple-touch-icon.png', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/apple-touch-icon.png');
})

app.get('/dist/android-chrome-192x192.png', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/android-chrome-192x192.png');
})

app.get('/dist/bundle.js', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/bundle.js');
})

app.get('/items/:tag', function(req, res) {
	console.log('tag req')
	res.sendFile(__dirname + '/dist/index.html');
})

app.get('/', function(req, res) {
	console.log('index req')
	res.sendFile(__dirname + '/dist/index.html');
})

app.listen(app.get('port'), function() {
  console.log("Serving NXWS Client at localhost:" + app.get('port'));
});
