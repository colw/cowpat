/* Server */
var express = require('express');
var app = express();

var react = require('react');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));
app.listen(app.get('port'), function() {
  console.log("Serving NXWS Client at localhost:" + app.get('port'));
});
