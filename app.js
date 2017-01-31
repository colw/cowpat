/* Server */
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

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
