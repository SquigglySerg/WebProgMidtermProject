var NUM_ROWS = 10;
var NUM_COLS = 10;
var MAX_ROCKS = 100;
var rocks = matrix(1, MAX_ROCKS, 0);
var numRocks = 0;
var level = 1;
var canvas;
var ctx;
var width;
var height;

$(document).ready(function(){
    canvas = document.getElementById("skeetCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.scrollWidth;
    height = canvas.scrollHeight;
    drawBackground();
    drawCrossHair(10,10);

    setInterval(updateRocks, 1000);

    // Call the function update_scores() once when your game is loaded.
    //update_scores(); //Needs to be called for the High Scores API -- works?.

    // Call the function highscore(score) when your game ends to submit a score. 
    //    Make sure to pass a score as an argument for the function.
});

function matrix(rows, cols, defaultValue){
    var M = [];

    //Creates Matrix M
    for(var i=0; i < rows; i++){
      //Creates an empty array for the row
      M.push([]);

      //Add cols to the empty row
      M[i].push(new Array(cols));

      for(var j=0; j < cols; j++){
        //Initializes
        M[i][j] = defaultValue;
      }
    }

    return M;
}

function drawBackground(){
    //Sky
    ctx.fillStyle = "Blue";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.stroke();
    ctx.fill();
    
    //Floor
    ctx.fillStyle = "Green";
    ctx.beginPath();
    ctx.rect(0, height * 4 / 5, width, height);
    ctx.stroke();
    ctx.fill();
}

function drawCrossHair( x, y){
    //First Rect
    ctx.fillStyle = "Gray";
    ctx.beginPath();
    ctx.rect(x , y, 10 , 10);
    ctx.stroke();
    ctx.fill();
}

function updateRocks(){
    console.log("1");
}

function generateRocks(){
    var numRocksToGen = level*3;
    for(i = 0; i < numRocksToGen; i++){
        var x = width;
        if(getRandomInt(0, width) < width/2){
            x = 0;
        }
        //x starting pos and y starting pos for the ith rock
        rocks[numRocks] = [x, getRandomInt(0, height)];
        numRocks = numRocks + 1;
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
