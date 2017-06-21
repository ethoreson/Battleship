//BACKEND
function Ship(row, column, size, indicator, isVertical) {
  this.row = row;
  this.column = column;
  this.isVertical = isVertical;
  this.size = size;
  this.indicator = indicator;
  this.sunk = false;
}

function Space(indicator) {
  this.hasShip = false;
  this.isHit = false;
  this.indicator = indicator;
}

function Player(turn) {
  this.turn = turn;
  this.totalHits = 0;
  this.grid = new Grid().initializeGrid();
}

// Player.prototype.getHitCount = function() {
//   return this.totalHits;
// }

Player.prototype.markHit = function(spaceId) {
  var column = spaceId[0];
  var row = spaceId[1];
  this.grid[column][row].isHit = true;
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
  console.log(ship.row);
  if (ship.isVertical === "vertical") {
    for(var i = 0; i < ship.size; i++) {
      if(ship.row + i > 9) {
        return false;
      }
      else if(this.grid[ship.column][ship.row + i].hasShip === true) {
        return false;
      }
    }
    return true;
  } else if (ship.isVertical === "horizontal") {
      for(var i = 0; i < ship.size; i++) {
        if(ship.column + i > 9) {
          return false;
        }
        else if(this.grid[ship.column + i][ship.row].hasShip === true) {
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
      this.grid[ship.column][ship.row + i].hasShip = true;
      this.grid[ship.column][ship.row + i].indicator = ship.indicator;
    }
  } else if (ship.isVertical === "horizontal") {
    for(var i = 0; i < ship.size; i++) {
      this.grid[ship.column + i][ship.row].hasShip = true;
      this.grid[ship.column + i][ship.row].indicator = ship.indicator;
    }
  }
}

var createTable = function(grid) {
  $("#table").empty();
  var output = "";
  for(var r = 0; r < 10; r++) {
    output += "<tr>";
    for(var c = 0; c < 10; c++) {
      output += '<th id="' + c + r + '" class="space ';
      if(grid[c][r].hasShip === true) {
          output += 'greenClass';
      }
      if(grid[c][r].isHit === true) {
        if(grid[c][r].hasShip === true) {
          output += 'redClass';
        } else {
          output += 'blueClass';
        }
      }
      output += '"></th>';
    }
    output += "</tr>";
  }
  return output;
}



//FRONTEND
$(document).ready(function() {
  var player1 = new Player(true);
  var player2 = new Player(false);
//  var battleship = new Ship(0, 0, 4, "b","vertical");


  $("#table").on('click', '.space', function(event) {
    var space = $(event.currentTarget);
    var id = space[0]["id"];
    if (player1.turn === true) {
      player2.markHit(id);
      $("#table").append(createTable(player2.grid));
      player1.turn = false;
      player2.turn = true;
      $("#table").delay(1000).append(createTable(player1.grid));
      $("#whoseTurn").text("Player 2, take a guess:");
    } else if (player2.turn === true) {
      player1.markHit(id);
      $("#table").append(createTable(player1.grid));
      player1.turn = true;
      player2.turn = false;
      $("#table").delay(1000).append(createTable(player2.grid));
      $("#whoseTurn").text("Player 1, take a guess:");
    }
  });

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
    if (player1.checkPlacement(carrierShip)) {
      player1.placeShip(carrierShip);
      $("#table").append(createTable(player1.grid));
    } else {
      alert("Not enough room");
    }

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
    if (player1.checkPlacement(battleshipShip)) {
      player1.placeShip(battleshipShip);
      $("#table").append(createTable(player1.grid));
    } else {
      alert("Not enough room");
    }
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
    if (player1.checkPlacement(cruiserShip)) {
      player1.placeShip(cruiserShip);
      $("#table").append(createTable(player1.grid));
    } else {
      alert("Not enough room");
    }
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
    if (player1.checkPlacement(submarineShip)) {
      player1.placeShip(submarineShip);
      $("#table").append(createTable(player1.grid));
    } else {
      alert("Not enough room");
    }
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
    if (player1.checkPlacement(destroyerShip)) {
      player1.placeShip(destroyerShip);
      $("#table").append(createTable(player1.grid));
    } else {
      alert("Not enough room");
    }
  });

  $("#player2setup").click(function(event) {
    event.preventDefault();
    $(".player1startupscreen").hide();
    $(".player2startupscreen").show();
    $("#table").empty();
  });

  $("#carrierButton2").click(function(event) {
    event.preventDefault();
    var carrierRowString = $(".carrier_row2").val();
    var carrierRow = (parseInt(carrierRowString) - 1);
    var carrierColumnString = $(".carrier_col2").val();
    var carrierColumn = (carrierColumnString.charCodeAt(0) - 65);
    var carrierSize = 5;
    var carrierIndicator = "carrier";
    var hOrV = $("input:radio[name=carrierorientation2]:checked").val();
    var carrierShip = new Ship(carrierRow, carrierColumn, carrierSize, carrierIndicator, hOrV);
    if (player2.checkPlacement(carrierShip)) {
      player2.placeShip(carrierShip);
      $("#table").append(createTable(player2.grid));
    } else {
      alert("Not enough room");
    }

  });

  $("#battleshipButton2").click(function(event) {
    event.preventDefault();
    var battleshipRowString = $(".battleship_row2").val();
    var battleshipRow = (parseInt(battleshipRowString) - 1);
    var battleshipColumnString = $(".battleship_col2").val();
    var battleshipColumn = (battleshipColumnString.charCodeAt(0) - 65);
    var battleshipSize = 4;
    var battleshipIndicator = "battleship";
    var hOrV = $("input:radio[name=battleshiporientation2]:checked").val();
    var battleshipShip = new Ship(battleshipRow, battleshipColumn, battleshipSize, battleshipIndicator, hOrV);
    if (player2.checkPlacement(battleshipShip)) {
      player2.placeShip(battleshipShip);
      $("#table").append(createTable(player2.grid));
    } else {
      alert("Not enough room");
    }
  });

  $("#cruiserButton2").click(function(event) {
    event.preventDefault();
    var cruiserRowString = $(".cruiser_row2").val();
    var cruiserRow = (parseInt(cruiserRowString) - 1);
    var cruiserColumnString = $(".cruiser_col2").val();
    var cruiserColumn = (cruiserColumnString.charCodeAt(0) - 65);
    var cruiserSize = 3;
    var cruiserIndicator = "cruiser";
    var hOrV = $("input:radio[name=cruiserorientation2]:checked").val();
    var cruiserShip = new Ship(cruiserRow, cruiserColumn, cruiserSize, cruiserIndicator, hOrV);
    if (player2.checkPlacement(cruiserShip)) {
      player2.placeShip(cruiserShip);
      $("#table").append(createTable(player2.grid));
    } else {
      alert("Not enough room");
    }
  });

  $("#submarineButton2").click(function(event) {
  event.preventDefault();

  var submarineRowString = $(".submarine_row2").val();
  var submarineRow = (parseInt(submarineRowString) - 1);
  var submarineColumnString = $(".submarine_col2").val();
  var submarineColumn = (submarineColumnString.charCodeAt(0) - 65);
  var submarineSize = 3;
  var submarineIndicator = "submarine";
  var hOrV = $("input:radio[name=submarineorientation2]:checked").val();
  var submarineShip = new Ship(submarineRow, submarineColumn, submarineSize, submarineIndicator, hOrV);
  if (player2.checkPlacement(submarineShip)) {
    player2.placeShip(submarineShip);
    $("#table").append(createTable(player2.grid));
  } else {
    alert("Not enough room");
  }
  });

  $("#destroyerButton2").click(function(event) {
    event.preventDefault();
    var destroyerRowString = $(".destroyer_row2").val();
    var destroyerRow = (parseInt(destroyerRowString) - 1);
    var destroyerColumnString = $(".destroyer_col2").val();
    var destroyerColumn = (destroyerColumnString.charCodeAt(0) - 65);
    var destroyerSize = 2;
    var destroyerIndicator = "destroyer";
    var hOrV = $("input:radio[name=destroyerorientation2]:checked").val();
    var destroyerShip = new Ship(destroyerRow, destroyerColumn, destroyerSize, destroyerIndicator, hOrV);
    if (player2.checkPlacement(destroyerShip)) {
      player2.placeShip(destroyerShip);
      $("#table").append(createTable(player2.grid));
    } else {
      alert("Not enough room");
    }
  });

  $("#playbutton2").click(function(event) {
    event.preventDefault();
    $(".player2startupscreen").hide();
    $(".player1updates").show();
    $("#table").append(createTable(player2.grid));
  });



});
