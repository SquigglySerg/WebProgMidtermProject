var NUM_ROWS = 10;
var NUM_COLS = 10;
var MAX_ROCKS = 100;
var rocks = new Array();
var level = 0;
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

    //setInterval(generateRock, 4000);
    generateRock();
    setInterval(updateRocks, 25);

    // Call the function update_scores() once when your game is loaded.
    //update_scores(); //Needs to be called for the High Scores API -- works?.

    // Call the function highscore(score) when your game ends to submit a score. 
    //    Make sure to pass a score as an argument for the function.
});

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

function updateRocks(){
    var v0 = 2.0 + 0.250*level;  //2.00 2.25 2.50 2.75 3.00 3.25 3.50 3.75 4.00 4.25 4.50...
    var a0 = 0.5 + 0.125*level;  //0.50 0.63 0.75 0.83 1.00 1.13 1.25 1.33 1.50 1.63 1.75...
    var dt = 0.01;

    drawBackground();
    for(i = 0; i < rocks.length; i++){
        rocks[i].t = rocks[i].t + dt;
        //Position = x0 + v0_x*t - A_x*t^2
        //Time step so position = oldPosition + dPosition/dt
        rocks[i].x = rocks[i].x + v0*Math.cos(rocks[i].angle);
        rocks[i].y = rocks[i].y - v0*Math.sin(rocks[i].angle) + a0*2*rocks[i].t;

        if(rocks[i].x < width){
            //Draw rock
            ctx.fillStyle = "Gray";
            ctx.beginPath();
            ctx.rect(rocks[i].x , rocks[i].y, 10 , 10);
            ctx.stroke();
            ctx.fill();
        }
        else{
            //remove rocks[i] //Missed rocks so end game maybe?
            rocks.shift();
        }
    }
}

function generateRock(){
    console.log("Rock Generated")
    rocks.push({x:0, y:getRandomInt(height/2,height*3/4), angle:degsToRads(getRandomInt(30,80)), t:0})
}

function degsToRads(degrees) {
    return degrees * Math.PI / 180;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
