var skeetGrid = matrix(10,10,0);

$(document).ready(function(){


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
