var screen = document.getElementById('screen');
var context = screen.getContext('2d');

screen.width = window.innerWidth * 0.4;
screen.height = window.innerHeight * 0.6;

var rows;
var columns;
var tiles;

var generateTiles = function(){
    tiles = [];

    for(var row = 0; row < rows; row++){
        tiles.push([]);
        
        for(var column = 0; column < columns; column++){
            tiles[row].push(0);
        }
    }

    for(var index = 0; index < 7; index++){
        changeTiles(Math.floor(Math.random() * rows), 
            Math.floor(Math.random() * columns));
    }
};

var changeState = function(row, column){
    if(tiles[row][column] == 0){
        tiles[row][column] = 1;
    }else{
        tiles[row][column] = 0;
    }
}

var changeTiles = function(row, column){
    if(column > 0){
        changeState(row, column - 1);
    }

    if(column < tiles[0].length - 1){
        changeState(row, column + 1);
    }
    
    if(row > 0){
        changeState(row - 1, column);
    }
    
    if(row < tiles.length - 1){
        changeState(row + 1, column);
    }
    
    changeState(row, column);
}

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
    
    // Draws the tiles.
    drawTiles();
};

var initializeGame = function(noOfRows, noOfColumns){
    rows = noOfRows;
    columns = noOfColumns;
    generateTiles();
    draw();
};

var hasWon = function(){
    var firstCheck = tiles[0][0];

    for(var row = 0; row < rows; row++){
        for(var column = 0; column < columns; column++){
            if(tiles[row][column] != firstCheck){
                return false;
            }
        }
    }

    return true;
};

var noOfClicks = 0;

screen.addEventListener('click', function(e){
    var clickedRow = Math.floor(getY(e) / (screen.height / rows));
    var clickedColumn = Math.floor(getX(e) / (screen.width / columns));
    
    changeTiles(clickedRow, clickedColumn);
    draw();

    noOfClicks++;

    if(hasWon()){
        alert("You won! Number of clicks: " + noOfClicks);
        initializeGame(rows, columns);
        noOfClicks = 0;
    }
});

var getX = function(e){
    var rect = screen.getBoundingClientRect();
    var relativeX = e.clientX - rect.left;

    return relativeX;
};

var getY = function(e){
    var rect = screen.getBoundingClientRect();
    var relativeY = e.clientY - rect.top;

    return relativeY;
};

initializeGame(3, 4);