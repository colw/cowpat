/* Server */
var express = require('express');
var app = express();
var http = require('http').Server(app);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

http.listen(app.get('port'), function() {
  console.log("Serving NXWS Client at localhost:" + app.get('port'));
});
