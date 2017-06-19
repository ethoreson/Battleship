//BACKEND
function Ship(row, column, size, indicator, isVertical) {
  this.row = row;
  this.column = column;
  this.isVertical = isVertical;
  this.size = size;
  this.indicator = indicator;
  this.sunk = false;
}

function Space() {
  this.hasShip = false;
  this.isHit = false;
  this.indicator;
}

function Player(turn) {
  this.turn = turn;
  this.totalHits = 0;
  this.grid = new Grid().initializeGrid();
}

Player.prototype.getHitCount = function() {
  return this.totalHits;
}

function Grid() {
  this.spaces = [];
}

Grid.prototype.initializeGrid = function() {
  var spaces = [];
  for(var r = 0; r < 10; r++) {
    var column = [];
    for(var c = 0; c < 10; c++) {
      var space = new Space();
      column.push(space);
    }
    spaces.push(column);
  }
  return spaces;
}

Player.prototype.checkPlacement = function(ship) {
  console.log(this.grid);
  if (ship.isVertical === "vertical") {
    for(var i = 0; i < ship.size; i++) {
      if(ship.row + i > 9) {
        return false;
      }
      else if(this.grid[ship.column + i][ship.row].hasShip === true) {
        return false;
      }
    }
    return true;
  } else if (ship.isVertical === "horizontal") {
      for(var i = 0; i < ship.size; i++) {
        if(ship.column + i > 9) {
          return false;
        }
        else if(this.grid[ship.column][ship.row + i].hasShip === true) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }

}

Player.prototype.placeShip = function(ship) {
    if (ship.isVertical === "vertical") {
    for(var i = 0; i < ship.size; i++) {
      this.grid[ship.column + i][ship.row].hasShip = true;
      this.grid[ship.column + i][ship.row].indicator = ship.indicator;
    }
  } else if (ship.isVertical === "horizontal") {
    for(var i = 0; i < ship.size; i++) {
      this.grid[ship.column][ship.row + i].hasShip = true;
      this.grid[ship.column][ship.row + i].indicator = ship.indicator;
    }
  }
}


//FRONTEND
$(document).ready(function() {
  var player1 = new Player(true);
  var battleship = new Ship(5,0,5,'b',"horizontal");
  if(player1.checkPlacement(battleship)) {
    player1.placeShip(battleship);
  }
});
