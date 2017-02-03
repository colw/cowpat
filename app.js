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
