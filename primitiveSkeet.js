var NUM_ROWS = 10;
var NUM_COLS = 10;
var skeetGrid = matrix(NUM_ROWS,NUM_COLS,0);
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

    // Call the function update_scores() once when your game is loaded.
    //update_scores(); //Needs to be called for the High Scores API -- works?.

    // Call the function highscore(score) when your game ends to submit a score. 
    //    Make sure to pass a score as an argument for the function.
});

function matrix( rows, cols, defaultValue){
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
