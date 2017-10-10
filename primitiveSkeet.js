var skeetGrid = matrix(10,10,0);

$(document).ready(function(){

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
