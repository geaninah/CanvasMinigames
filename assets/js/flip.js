var rows;
var columns;
var tiles;
var flipCount;

var changeState = function(row, column){
    if(tiles[row][column] == 0){
        tiles[row][column] = 1;
    }else{
        tiles[row][column] = 0;
    }
};

var flip = function(row, column){
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
    flipCount++;
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

var initialize = function(noOfRows, noOfColumns){
    rows = noOfRows;
    columns = noOfColumns;
    tiles = [];

    for(var row = 0; row < rows; row++){
        tiles.push([]);
        
        for(var column = 0; column < columns; column++){
            tiles[row].push(0);
        }
    }

    for(var iteration = 0; iteration < 7; iteration++){
        var row = Math.floor(Math.random() * rows);
        var column = Math.floor(Math.random() * columns);

        flip(row, column);
    }

    flipCount = 0;
};