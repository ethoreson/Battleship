//BACKEND
function Ship(row, column, size, indicator, isVertical) {
  this.row = row;
  this.column = column;
  this.isVertical = isVertical;
  this.size = size;
  this.indicator = indicator;
  this.sunk = false;
}

function Player(turn) {
  this.turn = turn;
  this.totalHits = 0;
  this.grid = new Grid.initializeGrid();
}

Player.prototype.getHitCount = function() {
  return this.totalHits;
}

function Grid() {
  this.spaces = [];
}

Grid.prototype.initializeGrid() {
  var spaces = [];
  for(var r = 0; r < 10; r++) {
    for(var c = 0; c < 10; c++) {
      var space = new Space(r, c)
      spaces.push(space);
    }
  }
  return spaces;
}

Grid.prototype.placeShip = function(ship) {

}

function Space(row, column) {
  this.row = row;
  this.column = column;
  this.hasShip = false;
  this.isHit = false;
}






//FRONTEND
$(document).ready(function() {
  var player1 = new Player();
});
