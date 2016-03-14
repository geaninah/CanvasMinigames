var screen = document.getElementById('screen');
var context = screen.getContext('2d');
screen.width  = 700;
screen.height = 700;

var matrix;
var playerPosition;
var width = screen.width / 16;
var height = screen.height / 16;

// Sets the tile images
var white = new Image();
var red = new Image();
var green = new Image();
var blue = new Image();

white.src = './assets/img/white.jpg';
red.src = './assets/img/red.jpg';
green.src = './assets/img/green.jpg';
blue.src = './assets/img/blue.jpg';

var imageLoadCount = 0;
var onLoad = function(){
    if (++imageLoadCount == 4) {
        draw();
    }
};

white.onload = onLoad;
red.onload = onLoad;
green.onload = onLoad;
blue.onload = onLoad;

var drawTiles = function(){
    rows = 16;
    columns = 16;

    for(var row = 0; row < rows; ++row){
        // Calculates the y coordinate of a tile
        var y = row * height;

        for(var column = 0; column < columns; ++column){
            // Calculates the x coordinate of a tile
            var x = column * width;

            if(matrix[row][column] == 0){
                context.drawImage(green, x, y, width, height);
            }else if(matrix[row][column] == 1){
                context.drawImage(white, x, y, width, height);
            }else{
                context.drawImage(red, x, y, width, height);
            }
        }
    }
};

var initialize = function(noOfRows, noOfColumns){
    rows = noOfRows;
    columns = noOfColumns;
    matrix = [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
        [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2]
    ]; 

    playerPosition = [0, 0];
    context.drawImage(red, playerPosition[1] * width, playerPosition[0] * height, width, height);
};

var moveDown = function(){
    var row = playerPosition[0];
    var column = playerPosition[1];

    if(row < 15 && matrix[row + 1][column] == 1){
        playerPosition = [row + 1, column];
    }
};

var moveUp = function(){
    var row = playerPosition[0];
    var column = playerPosition[1];

    if(row > 0 && matrix[row - 1][column] == 1){
        playerPosition = [row - 1, column];
    }
};

var moveLeft = function(){
    var row = playerPosition[0];
    var column = playerPosition[1];

    if(column > 0 && matrix[row][column - 1] == 1){
        playerPosition = [row, column - 1];
    }
};

var moveRight = function(){
    var row = playerPosition[0];
    var column = playerPosition[1];

    if(column < 15 && matrix[row][column + 1] == 1){
        playerPosition = [row, column + 1];
    }
}

var draw = function(){
    drawTiles();
    context.drawImage(blue, playerPosition[1] * width, playerPosition[0] * height, width, height);
}

var hasWon = function(){
    if(playerPosition[0] == 15 && playerPosition[1] == 15){
        return true;
    }
}

document.addEventListener('keydown', function(e){
    if(e.keyCode == '37'){
        // The left arrow key has been pressed
        moveLeft();
    }else if(e.keyCode == '39'){
        // The right arrow key has been pressed
        moveRight();
    }else if (e.keyCode == '38'){
        // The up arrow has been pressed
        moveUp();
    }else if(e.keyCode == '40'){
        // The down arrow has been pressed
        moveDown();
    }

    draw();

    if(hasWon()){
        alert("You won!");
        initialize(rows, columns);
        draw();
    }
});

initialize(16, 16);


