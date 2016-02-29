var screen = document.getElementById('screen');
var context = screen.getContext('2d');

var screenRectangle = screen.getBoundingClientRect();

context.fillStyle = '#ffffff';
context.fillRect(0, 0, screenRectangle.right, screenRectangle.bottom);

context.fillStyle = '#0000ee';
context.fillRect((screenRectangle.right - 300) / 2, (screenRectangle.bottom - 300) / 2, 300, 300);

context.fillStyle = '#ee0000';
context.fillRect((screenRectangle.right - 100) / 2, (screenRectangle.bottom - 100) / 2, 100, 100);

var rows;
var columns;




