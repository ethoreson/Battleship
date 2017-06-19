//BACKEND
function Ship(coordinates, size, indicator) {
  this.coordinates = coordinates;
  this.size = size;
  this.indicator = indicator;
  this.sunk = false;
}

function Player(turn) {
  this.turn = turn;
  this.totalHits = 0;
}

function Grid() {
  this.spaces = [];
}

function Space(row, column) {
  this.row = row;
  this.column = column;
  this.hasShip = false;
  this.isHit = false;
}








//FRONTEND
