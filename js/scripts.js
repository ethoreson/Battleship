//BACKEND
function Ship(row, column, size, indicator, isVertical) {
  this.row = row;
  this.column = column;
  this.isVertical = isVertical;
  this.size = size;
  this.hits = 0;
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
  this.shipArray = [];
}

// Player.prototype.getHitCount = function() {
//   return this.totalHits;
// }

Player.prototype.markHit = function(spaceId) {
  var column = spaceId[0];
  var row = spaceId[1];
  if (this.grid[column][row].isHit === false) {
    this.grid[column][row].isHit = true;
    if (this.grid[column][row].hasShip) {
      for(i = 0; i < this.shipArray.length; i++) {
        if (this.shipArray[i].indicator === this.grid[column][row].indicator) {
          this.shipArray[i].hits += 1;
        }
        checkIfSunk(this.shipArray);
      }
    }
  } else {
    alert("Space already selected");
  }
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

var checkIfSunk = function(shipArray) {
  shipArray.forEach(function(ship) {
    if (ship.hits === ship.size) {
      ship.sunk = true;
      $("." + ship.indicator + "status").text("Ship Status: SUNK");
    }
  });
}

// Player.prototype.gameOver = function() {
//   this.shipArray.forEach(ship) {
//     if (ship.sunk === false) {
//       return false;
//     }
//   }
//   return true;
// }

var createTableForSetup = function(grid) {
  $("#setupTable").empty();
  var output = '<tr><th class="space"></th><th class="space">A</th><th class="space">B</th><th class="space">C</th><th class="space">D</th><th class="space">E</th><th class="space">F</th><th class="space">G</th><th class="space">H</th><th class="space">I</th><th class="space">J</th></tr>';
  for(var r = 0; r < 10; r++) {
    output += '<tr><td class="space">' + (r+1) + '</td>';
    for(var c = 0; c < 10; c++) {
      output += '<td id="' + c + r + '" class="space';
      if(grid[c][r].hasShip === true) {
          output += ' greenClass';
      }
      output += '"></td>';
    }
    output += '</tr>';
  }
  return output;
}

var createTable = function(grid) {
  $("#table").empty();
  var output = '<tr><th class="space"></th><th class="space">A</th><th class="space">B</th><th class="space">C</th><th class="space">D</th><th class="space">E</th><th class="space">F</th><th class="space">G</th><th class="space">H</th><th class="space">I</th><th class="space">J</th></tr>';
  for(var r = 0; r < 10; r++) {
    output += '<tr><td class="space">' + (r+1) + '</td>';
    for(var c = 0; c < 10; c++) {
      output += '<td id="' + c + r + '" class="space';
      if(grid[c][r].isHit === true) {
        if(grid[c][r].hasShip === true) {
          output += ' redClass';
        } else {
          output += ' blueClass';
        }
      }
      output += '"></td>';
    }
    output += "</tr>";
  }
  return output;
}

//FRONTEND
$(document).ready(function() {
  var player1 = new Player(true);
  var player2 = new Player(false);
  var player1ShipsSetup = 0;
  var player2ShipsSetup = 0;

  $("#setupTable").append(createTableForSetup(player1.grid));

  $("#table").on('click', '.space', function(event) {
    var space = $(event.currentTarget);
    var id = space[0]["id"];
    if (player1.turn === true) {
      player2.markHit(id);
      $("#table").append(createTable(player2.grid));
      player1.turn = false;
      player2.turn = true;
      $("#table").delay(1000).append(createTable(player1.grid));
      $("#whoseTurn").text("Player 2, Guess:");
    } else if (player2.turn === true) {
      player1.markHit(id);
      $("#table").append(createTable(player1.grid));
      player1.turn = true;
      player2.turn = false;
      $("#table").delay(1000).append(createTable(player2.grid));
      $("#whoseTurn").text("Player 1, Guess:");
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
    player1.shipArray.push(carrierShip);
    if (player1.checkPlacement(carrierShip)) {
      player1.placeShip(carrierShip);
      $("#setupTable").append(createTableForSetup(player1.grid));
      player1ShipsSetup += 1;
      $("form#carriersetup").hide();
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
    player1.shipArray.push(battleshipShip);
    if (player1.checkPlacement(battleshipShip)) {
      player1.placeShip(battleshipShip);
      $("#setupTable").append(createTableForSetup(player1.grid));
      player1ShipsSetup += 1;
      $("form#battleshipsetup").hide();
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
    player1.shipArray.push(cruiserShip);
    if (player1.checkPlacement(cruiserShip)) {
      player1.placeShip(cruiserShip);
      $("#setupTable").append(createTableForSetup(player1.grid));
      player1ShipsSetup += 1;
      $("form#cruisersetup").hide();
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
    player1.shipArray.push(submarineShip);
    if (player1.checkPlacement(submarineShip)) {
      player1.placeShip(submarineShip);
      $("#setupTable").append(createTableForSetup(player1.grid));
      player1ShipsSetup += 1;
      $("form#submarinesetup").hide();
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
    player1.shipArray.push(destroyerShip);
    if (player1.checkPlacement(destroyerShip)) {
      player1.placeShip(destroyerShip);
      $("#setupTable").append(createTableForSetup(player1.grid));
      player1ShipsSetup += 1;
      $("form#destroyersetup").hide();
    } else {
      alert("Not enough room");
    }
  });

  $("#player2setup").click(function(event) {
    event.preventDefault();
    if (player1ShipsSetup === 5) {
      $(".player1startupscreen").hide();
      $(".player2startupscreen").show();
      $("#setupTable").append(createTableForSetup(player2.grid));
    } else {
      alert("Please place all your ships.");
    }
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
    var carrierShip2 = new Ship(carrierRow, carrierColumn, carrierSize, carrierIndicator, hOrV);
    player2.shipArray.push(carrierShip2);
    if (player2.checkPlacement(carrierShip2)) {
      player2.placeShip(carrierShip2);
      $("#setupTable").append(createTableForSetup(player2.grid));
      player2ShipsSetup += 1;
      $("form#carriersetup2").hide();
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
    var battleshipShip2 = new Ship(battleshipRow, battleshipColumn, battleshipSize, battleshipIndicator, hOrV);
    player2.shipArray.push(battleshipShip2);
    if (player2.checkPlacement(battleshipShip2)) {
      player2.placeShip(battleshipShip2);
      $("#setupTable").append(createTableForSetup(player2.grid));
      player2ShipsSetup += 1;
      $("form#battleshipsetup2").hide();
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
    var cruiserShip2 = new Ship(cruiserRow, cruiserColumn, cruiserSize, cruiserIndicator, hOrV);
    player2.shipArray.push(cruiserShip2);
    if (player2.checkPlacement(cruiserShip2)) {
      player2.placeShip(cruiserShip2);
      $("#setupTable").append(createTableForSetup(player2.grid));
      player2ShipsSetup += 1;
      $("form#cruisersetup2").hide();
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
    var submarineShip2 = new Ship(submarineRow, submarineColumn, submarineSize, submarineIndicator, hOrV);
    player2.shipArray.push(submarineShip2);
    if (player2.checkPlacement(submarineShip2)) {
      player2.placeShip(submarineShip2);
      $("#setupTable").append(createTableForSetup(player2.grid));
      player2ShipsSetup += 1;
      $("form#submarinesetup2").hide();
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
    var destroyerShip2 = new Ship(destroyerRow, destroyerColumn, destroyerSize, destroyerIndicator, hOrV);
    player2.shipArray.push(destroyerShip2);
    if (player2.checkPlacement(destroyerShip2)) {
      player2.placeShip(destroyerShip2);
      $("#setupTable").append(createTableForSetup(player2.grid));
      player2ShipsSetup += 1;
      $("form#destroyersetup2").hide();
    } else {
      alert("Not enough room");
    }
  });

  $("#playbutton2").click(function(event) {
    event.preventDefault();
    if (player2ShipsSetup === 5) {
      $(".player2startupscreen").hide();
      $(".player1updates").show();
      $("#setupTable").empty();
      $("#table").append(createTable(player2.grid));
    } else {
      alert("Please place all your ships.");
    }
  });
  });
