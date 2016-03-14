var express = require('express');
var app = express();

app.get('/hello', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/hello/:name', function(request, response) {
	var name = request.name;

	response.send(name);
});

app.get('/flip', function(request, response) {
    response.sendFile(__dirname + '/game.html');
});

app.get('/maze', function(request, response) {
    response.sendFile(__dirname + '/maze.html');
});

app.get('/pacman', function(request, response) {
    response.sendFile(__dirname + '/pac-man.html');
});

app.use('/assets', express.static('assets'));

app.listen(process.env.PORT || 777);