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
  this.grid;
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
    var row = [];
    for(var c = 0; c < 10; c++) {
      var space = new Space(r, c);
      row.push(space.hasShip);
    }
    spaces.push(row);
  }
  return spaces;
}

Grid.prototype.placeShip = function(ship) {

}



//FRONTEND
$(document).ready(function() {
  var player1 = new Player(true);
  player1Grid = new Grid();
  player1.grid = player1Grid.initializeGrid();

  $("#submitButton1").click(function(event) {
    event.preventDefault();
    //row, column, size, indicator, isVertical
    var carrierRowString = $(".carrier_row").val();
    var carrierRow = (parseInt(carrierRowString) - 1);
    var carrierColumnString = $(".carrier_col").val();
    var carrierColumn = (carrierColumnString.charCodeAt(0) - 65);
    var carrierSize = 5;
    var carrierIndicator = "carrier";
    var hOrV = $("input:radio[name=orientation]:checked").val();
    var carrierShip = new Ship(carrierRow, carrierColumn, carrierSize, carrierIndicator, hOrV);
    console.log(carrierShip);
    $(".player1startupscreen").hide();
    $(".player2startupscreen").show();
  });

});
