var express = require('express');
var app = express();

app.get('/hello', function(request, response) {
    response.sendFile('/Development/Nodejs/index.html');
});

app.use('/assets', express.static('assets'));
app.listen(process.env.PORT || 777);