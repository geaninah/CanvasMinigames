var screen = document.getElementById('screen');
var context = screen.getContext('2d');

screen.width  = 950;
screen.height = 950;

var level;

// The width and height of a tile
var tileWidth;
var tileHeight;

// Sets the tile images
var lava = new Image();
var wall = new Image();
var grey = new Image();
var diamond = new Image();
var player = new Image();
var finish = new Image();

lava.src = './assets/img/lava.jpg';
wall.src = './assets/img/wall.jpg';
grey.src = './assets/img/grey.jpg';
diamond.src = './assets/img/diamond.png';
player.src = './assets/img/player.png';
finish.src = './assets/img/finish.png';

var imageLoadCount = 0;
var onLoad = function(){
    if (++imageLoadCount == 6) {
        draw();
    }
};

lava.onload = onLoad;
wall.onload = onLoad;
grey.onload = onLoad;
diamond.onload = onLoad;
player.onload = onLoad;
finish.onload = onLoad;

// Draw the pints at the required coordinates
var drawPoints = function(){
    for(var index = 0; index < level.points.length; index++){
        var x = level.points[index][0] * tileHeight;
        var y = level.points[index][1] * tileWidth;
        context.drawImage(diamond, x, y, tileWidth, tileHeight);
    }
}

var drawTiles = function(){
    for(var row = 0; row < level.rows; ++row){
        // Calculates the y coordinate of a tile
        var y = row * tileHeight;

        for(var column = 0; column < level.columns; ++column){
            // Calculates the x coordinate of a tile
            var x = column * tileWidth;

            if(level.matrix[row][column] == 0){
                context.drawImage(wall, x, y, tileWidth, tileHeight);
            }else if(level.matrix[row][column] == 1){
                context.drawImage(grey, x, y, tileWidth, tileHeight);
            }else if(level.matrix[row][column] == 2){
                context.drawImage(lava, x, y, tileWidth, tileHeight);
            }
        }
    }

    // Get the last row and the last column
    var x = (level.rows - 1) * tileHeight;
    var y = (level.columns - 1) * tileWidth;
    // Draw the "finish"
    context.drawImage(finish, x, y, tileWidth, tileHeight);
    drawPoints();
};

var initialize = function(){
    level = getFirstLevel();
    tileWidth = screen.width / level.columns;
    tileHeight = screen.height / level.rows;
};

var movePlayer = function(row, column){
    if(row < 0 || row > level.rows - 1){
        return;
    }

    if(column < 0 || column >= level.columns - 1){
        return;
    }

    switch(level.matrix[row][column]){
        case 1: 
            level.playerPosition = [row, column];
            return;
        case 2:
            alert("You died");
            initialize();
            return;
    }
}

var moveDown = function(){
    movePlayer(level.playerPosition[0] + 1, level.playerPosition[1]);
};

var moveUp = function(){
    movePlayer(level.playerPosition[0] - 1, level.playerPosition[1]);
};

var moveLeft = function(){
    movePlayer(level.playerPosition[0], level.playerPosition[1] - 1);
};

var moveRight = function(){
    movePlayer(level.playerPosition[0], level.playerPosition[1] + 1);
}

var draw = function(){
    drawTiles();
    // Current coordinates of the character
    var x = level.playerPosition[1] * tileWidth;
    var y = level.playerPosition[0] * tileHeight;
    // Draw the character to the new position
    context.drawImage(player, x, y, tileWidth, tileHeight)
}

var noOfDiamondsCollected = 0;
var collectDiamonds = function(){
    // Check if on the current position is any point
    for(var index = 0; index < level.points.length; index++){
        if(level.points[index][0] == level.playerPosition[1] && 
            level.points[index][1] == level.playerPosition[0]){
            
            level.points.splice(index,1);
            // Increase the number of collected diamonds
            noOfDiamondsCollected++;
        }
    }
}

var hasWon = function(){
    if(level.playerPosition[0] == level.rows - 1 && level.playerPosition[1] == level.rows - 1 && 
        noOfDiamondsCollected == totalNoOfPoints){
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

    collectDiamonds();
    draw();

    if(hasWon()){
        alert("You won!");
        initialize();
        draw();
    }
});

initialize();

