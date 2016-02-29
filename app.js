var express = require('express');
var app = express();

app.get('/hello', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/game.html');
});

app.use('/assets', express.static('assets'));

app.listen(process.env.PORT || 777);