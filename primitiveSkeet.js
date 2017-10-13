var NUM_ROWS = 10;
var NUM_COLS = 10;
var MAX_ROCKS = 100;
var ROCK_PER_LEVEL = 5;
var rocks = new Array();
var level = 0;
var rocksGeneratedForLevel = 0;
var canvas;
var ctx;
var width;
var height;
var crossHair = {x:0, y:0};
var win = false;
var lose = false;
var score = 0;
var ammo = 10;
var rockHit=0;
var rockMiss=0;

// pause game until click start
/*$.holdReady(true);

    $("#startimg").dblclick(function() {
        $("#startimg").fadeOut(1000, function() {
            $.holdReady(false);
        })
    })
*/
$(document).ready(function(){
    canvas = document.getElementById("skeetCanvas");
    ctx = canvas.getContext("2d");
    width = canvas.scrollWidth;
    height = canvas.scrollHeight;
    crossHair.x = width/2;
    crossHair.y = height/2;
    
    //draw();


    generateRock();
    setInterval(generateRock, 4000);
    setInterval(updateRocks, 25);

    $(document).keydown(function(event) {
        if(event.which == 38){
            crossHair.y-=10;
        }
        else if(event.which == 40){
            crossHair.y+=10;
        }
        else if(event.which == 37){
            crossHair.x-=10;
        }
        else if(event.which == 39){
            crossHair.x+=10;
        }
        else if(event.which == 32){
            //if on the same range of rock delete rock add score subtract ammo
            wasRockHit();
            //else if miss subtract ammo
            var audio = new Audio('sounds/shotgun-mossberg590-RA_The_Sun_God-451502290.mp3');
            audio.play();
            ammo -= 1;
        }

	if ((rockHit+rockMiss) == (Math.ceil(ROCK_PER_LEVEL + (ROCK_PER_LEVEL*level/2)))){
		level+=1;
		ammo+=5;
		rockHit=0;
		rockMiss=0;
		rocksGeneratedForLevel=0;
	}
	
	if (level == 1){
	        drawEndImage();
		//window.alert("WIN");
	        //$.holdReady(true); //trying to pause the game, show the winning screen and to reset the game, just double click the screen.
		win = true;
	        //$("#startimg").fadeIn();
	        //location.reload();
	}
	
	if (ammo == 0){
	        drawEndImage();
		//window.alert("LOSE");
	        //$.holdReady(true); //Same as winning screen
		lose = true;
	        //location.reload();	
	}

	
    });


	

    //YOU GUYS HAVE TO IMPLEMENT SHOOTING AND LEVEL PROGRESSION
    //UPDATE THE level VARIBLE BY 1 AND RESET THE rocksGeneratedForLevel VAR to 0
    //THE GAME WILL SPEED UP BASED ON THE LEVEL AND HAVE LONGER LEVELS

    // Call the function update_scores() once when your game is loaded.
    //update_scores(); //Needs to be called for the High Scores API -- works?.

    // Call the function highscore(score) when your game ends to submit a score. 
    //    Make sure to pass a score as an argument for the function.

	
	
	
    $("#startimg").dblclick(function() {
        $("#startimg").fadeOut(1000, function() {
            location.reload();
        })
    })

});

function wasRockHit(){
    for(i = 0; i < rocks.length; i++){
        //crossHair 200*200 rock rock size is 10*10
        if(crossHair.x < rocks[i].x && crossHair.x + 30 > rocks[i].x + 10){
            if(crossHair.y < rocks[i].y && crossHair.y + 30 > rocks[i].y + 10){
                rocks.splice(i,1); //remove the ith rock
                score += 1;
		rockHit+=1;
                
            }
        }
    }
}

function drawBackground(){
    //Sky
    ctx.fillStyle = "#57B1FF";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.stroke();
    ctx.fill();
    
    //Floor
    ctx.fillStyle = "#ABD24C";
    ctx.beginPath();
    ctx.rect(0, height * 4 / 5, width, height);
    ctx.stroke();
    ctx.fill();
}

function updateRocks(){
    var v0 = 2.0 + 0.250*level;  //2.00 2.25 2.50 2.75 3.00 3.25 3.50 3.75 4.00 4.25 4.50...
    var a0 = 0.5 + 0.125*level;  //0.50 0.63 0.75 0.83 1.00 1.13 1.25 1.33 1.50 1.63 1.75...
    var dt = 0.01;

    for(i = 0; i < rocks.length; i++){
        rocks[i].t = rocks[i].t + dt;
        //Position = x0 + v0_x*t - A_x*t^2
        //Time step so position = oldPosition + dPosition/dt
        rocks[i].x = rocks[i].x + v0*Math.cos(rocks[i].angle);
        rocks[i].y = rocks[i].y - v0*Math.sin(rocks[i].angle) + a0*2*rocks[i].t;

        
    }

   if(!win && !lose) {draw()};
}

function generateRock(){
    if(rocksGeneratedForLevel < Math.ceil(ROCK_PER_LEVEL + (ROCK_PER_LEVEL*level/2))){
        rocks.push({x:0, y:getRandomInt(height/2,height*3/4), angle:degsToRads(getRandomInt(30,80)), t:0})
        rocksGeneratedForLevel = rocksGeneratedForLevel + 1;

        var audio = new Audio('sounds/Catapult-SoundBible.com-829548288.mp3');
        audio.play();
    }
}

function degsToRads(degrees) {
    return degrees * Math.PI / 180;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function drawCrossHair() {
    var img = new Image();
    img.src = 'Images/Crosshair1.png';

    img.onload = function() {
        ctx.drawImage(img, crossHair.x, crossHair.y , 30, 30);
    }
}

function drawRocks(){
    for(i = 0; i < rocks.length; i++){
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
		
        if (rocks[i].y>height){
            rocks.splice(i,1); //remove the ith rock          
	    rockMiss+=1;
        }
    }
}

function drawScore() {
    ctx.fillText("Score: " + score, 10, 10);
}

function drawAmmo() {
    ctx.fillText("Ammo: " + ammo, 10, 20);
}

function drawHit() {
    ctx.fillText("Hit: " + rockHit, 10, 30);
}

function drawMiss() {
    ctx.fillText("Miss: " + rockMiss, 10, 40);
}

function drawLv() {
    ctx.fillText("Level: " + level + " rocks this level "+ (Math.ceil(ROCK_PER_LEVEL + (ROCK_PER_LEVEL*level/2))), 10, 50);
}

function drawEndImage() {
    document.getElementById("startimg").innerHTML = "Congratulation!<br/>You scored " + score + " point(s)!<br/> Double click here to PLAY AGAIN."; 
    $("#startimg").fadeIn();
}

function draw(){
    drawBackground();
    drawCrossHair();
    drawRocks();
    drawScore();
    drawHit();
    drawMiss();
    drawAmmo();
    drawLv();
}
