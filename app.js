var express = require('express');
var app = express();

app.get('/hello', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/flip', function(request, response) {
    response.sendFile(__dirname + '/game.html');
});

app.get('/maze', function(request, response) {
    response.sendFile(__dirname + '/maze.html');
});

app.use('/assets', express.static('assets'));

app.listen(process.env.PORT || 777);