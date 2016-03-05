var screen = document.getElementById('screen');
var context = screen.getContext('2d');

screen.width = window.innerWidth * 0.4;
screen.height = window.innerHeight * 0.6;

var drawTiles = function(){
    var padding = 5;

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
    
    // Draws the tiles
    drawTiles();
};

var click = function(e){
    var row = Math.floor(getY(e) / (screen.height / rows));
    var column = Math.floor(getX(e) / (screen.width / columns));
    
    flip(row, column);
    draw();

    if(hasWon()){
        alert("You won! Number of clicks: " + flipCount);
        initialize(rows, columns);
        draw();
    }
}

screen.addEventListener('click', click);

initialize(3, 4);
draw();