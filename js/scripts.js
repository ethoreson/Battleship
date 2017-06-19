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

function Space(row, column) {
  this.row = row;
  this.column = column;
  this.hasShip = false;
  this.isHit = false;
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

function Space() {
  this.hasShip = false;
  this.isHit = false;
  this.indicator;
}


//FRONTEND
$(document).ready(function() {
  var player1 = new Player(true);
  player1Grid = new Grid();
  player1.grid = player1Grid.initializeGrid();

  $("#carrierButton1").click(function(event) {
    event.preventDefault();

    var carrierRowString = $(".carrier_row").val();
    var carrierRow = (parseInt(carrierRowString) - 1);
    var carrierColumnString = $(".carrier_col").val();
    var carrierColumn = (carrierColumnString.charCodeAt(0) - 65);
    var carrierSize = 5;
    var carrierIndicator = "carrier";
    var hOrV = $("input:radio[name=carrierorientation]:checked").val();
    var carrierShip = new Ship(carrierRow, carrierColumn, carrierSize, carrierIndicator, hOrV);
    console.log(carrierShip);
});

$("#battleshipButton1").click(function(event) {
  event.preventDefault();

  var battleshipRowString = $(".battleship_row").val();
  var battleshipRow = (parseInt(battleshipRowString) - 1);
  var battleshipColumnString = $(".battleship_col").val();
  var battleshipColumn = (battleshipColumnString.charCodeAt(0) - 65);
  var battleshipSize = 4;
  var battleshipIndicator = "battleship";
  var hOrV = $("input:radio[name=battleshiporientation]:checked").val();
  var battleshipShip = new Ship(battleshipRow, battleshipColumn, battleshipSize, battleshipIndicator, hOrV);
  console.log(battleshipShip);
});

$("#cruiserButton1").click(function(event) {
  event.preventDefault();

  var cruiserRowString = $(".cruiser_row").val();
  var cruiserRow = (parseInt(cruiserRowString) - 1);
  var cruiserColumnString = $(".cruiser_col").val();
  var cruiserColumn = (cruiserColumnString.charCodeAt(0) - 65);
  var cruiserSize = 3;
  var cruiserIndicator = "cruiser";
  var hOrV = $("input:radio[name=cruiserorientation]:checked").val();
  var cruiserShip = new Ship(cruiserRow, cruiserColumn, cruiserSize, cruiserIndicator, hOrV);
  console.log(cruiserShip);
});

$("#submarineButton1").click(function(event) {
  event.preventDefault();

  var submarineRowString = $(".submarine_row").val();
  var submarineRow = (parseInt(submarineRowString) - 1);
  var submarineColumnString = $(".submarine_col").val();
  var submarineColumn = (submarineColumnString.charCodeAt(0) - 65);
  var submarineSize = 3;
  var submarineIndicator = "submarine";
  var hOrV = $("input:radio[name=submarineorientation]:checked").val();
  var submarineShip = new Ship(submarineRow, submarineColumn, submarineSize, submarineIndicator, hOrV);
  console.log(submarineShip);
});

$("#destroyerButton1").click(function(event) {
  event.preventDefault();

  var destroyerRowString = $(".destroyer_row").val();
  var destroyerRow = (parseInt(destroyerRowString) - 1);
  var destroyerColumnString = $(".destroyer_col").val();
  var destroyerColumn = (destroyerColumnString.charCodeAt(0) - 65);
  var destroyerSize = 2;
  var destroyerIndicator = "destroyer";
  var hOrV = $("input:radio[name=destroyerorientation]:checked").val();
  var destroyerShip = new Ship(destroyerRow, destroyerColumn, destroyerSize, destroyerIndicator, hOrV);
  console.log(destroyerShip);
});

// //    $(".player1startupscreen").hide();
// //    $(".player2startupscreen").show();

});
