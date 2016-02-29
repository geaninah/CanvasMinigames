var screen = document.getElementById('screen');
var context = screen.getContext('2d');

// Gets the dimensions of the screen.
var screenRectangle = screen.getBoundingClientRect();
var screenWidth = screenRectangle.width;
var screenHeight = screenRectangle.height;

context.fillStyle = '#ffffff';
context.fillRect(0, 0, screenWidth, screenHeight);

var rows = 3;
var columns = 4;
var padding = 10;

// Calculates the width of a tile.
var width = (screenWidth - (columns + 1) * padding) / columns;

// Calculates the height of a tile.
var height = (screenHeight - (rows + 1) * padding) / rows;

for (var i = 0; i < rows; ++i) {
    // Calculates the y coordinate of a tile.
    var y = (i + 1) * padding + i * height;

    for (var j = 0; j < columns; ++j) {
        // Calculates the x coordinate of a tile.
        var x = (j + 1) * padding + j * width;

        // Draws the tile.
        context.fillStyle = '#0000ee';
        context.fillRect(x, y, width, height);
    }
}