var screen = document.getElementById('screen');
var context = screen.getContext('2d');

screen.width = window.innerWidth * 0.8;
screen.height = window.innerHeight * 0.8;

var tiles;

var generateTiles = function(rows, columns){
    var tiles = [];

    for(var row = 0; row < rows; row++){
        tiles.push([]);

        for(var column = 0; column < columns; column++){
            var random = Math.random();

            if(random < 0.5){
                tiles[row].push(0);
            }else{
                tiles[row].push(1);
            }
        }
    }

    return tiles;
};

var drawTiles = function(){
    var rows = tiles.length;
    var columns = tiles[0].length;
    var padding = 10;

    // Calculates the width of a tile
    var width = (screen.width - (columns + 1) * padding) / columns;

    // Calculates the height of a tile
    var height = (screen.height - (rows + 1) * padding) / rows;

    for(var row = 0; row < rows; ++row){
        // Calculates the y coordinate of a tile
        var y = (row + 1) * padding + row * height;

        for(var column = 0; column < columns; ++column){
            // Calculates the x coordinate of a tile
            var x = (column + 1) * padding + column * width;

            // Draws the tile
            if(tiles[row][column] == 0){
                context.fillStyle = '#0000ff';
            }else{
                context.fillStyle = '#ffffff';
            }

            context.fillRect(x, y, width, height);
        }
    }
};

var draw = function(){
    // Clears the screen
    context.fillStyle = '#000000';
    context.fillRect(0, 0, screen.width, screen.height);
    
    // Draws the tiles.
    drawTiles();
};

var initializeGame = function(rows, columns){
    tiles = generateTiles(rows, columns);
    draw();
};

initializeGame(4, 3);