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