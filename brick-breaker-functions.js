var interval=[];
//On document load, resize the game to fit the device screen
$(function(){
	//Set the height of the container to fill the device screen
	$('#container').height(window.innerHeight);	
	
	//Get the max width and height of the gaming menu
	var screenWidth = $('#game').width();
	var screenHeight = $('#game').height();
	
	//Resize the score table and its elements
	$('#scoretable').height(screenHeight*0.1);
	$('#lifecounter').width(screenWidth*0.3);
	$('#levelcounter').width(screenWidth*0.3);		
	$('#scorecounter').width(screenWidth*0.4);
	
	//Set the canvas to fit the dimensions of the gaming menu
	//But it must be a square
	$('#screen').attr('width',screenWidth);
	$('#screen').attr('height',screenWidth);
	//Resize the buttons to adjust to the game screen
	$('#leftButton').height(screenHeight*0.2);
	$('#rightButton').height(screenHeight*0.2);
	$('#exitButton').height(screenHeight*0.1);
	$('#pauseButton').height(screenHeight*0.1);
});

//When the action button is pressed
//AKA.The power button😂
system.start = function(){
if(system.screenPosition!= "flipping"){
	if(engine.state == 'idle'){
		engine.state = 'playing';
		$('#pauseButton').html('Pause');
		gameStart();
	}
	else if(engine.state == 'playing'){
		$('#pauseButton').html('Play');
		engine.state = 'paused';
	}
	else if(engine.state == 'paused'){
		$('#pauseButton').html('Pause');
		engine.state = 'playing';
	}
}
}

//This is like the on switch that kickstarts everything
function gameStart(){
	//Set the exit button to a quit button
	$('#exitButton').text('quit');
	//Get the max width of the gaming menu
	var screenWidth = $('#game').width();
	
	//Create the 8×10 brick matrix
	for(var i = 0;i < 10;i++){
		engine.bricks[i] = [];
	}
	
	//Set the player variables
	system.life=3;
	system.score=0;
	system.currentLevel = 1;
	
	//Reset the ball and paddle position and speed
	newGame(screenWidth);
	
	//Call the level generator
	system.levels[system.currentLevel-1](screenWidth);
	
	//Refresh the game system and the game engine 30 times per second
	interval[0] = setInterval(engine.redraw,1000/30);
	interval[1] = setInterval(system.refresh,1000/30);
}

/*This function initiates a new game by reseting the 
corrdinates of the ball and paddle*/
function newGame(screenWidth){
	//Set the dimensions of the game paddle to fit the gaming window
	paddle.length = screenWidth*0.24;
	paddle.width = screenWidth*0.06;
	//Position the paddle to the bottom center of the screen
	paddle.y = screenWidth*0.97;
	paddle.x = (screenWidth/2)-(paddle.length/2);
	
	//Set the attributes of the ball
	ball.x = screenWidth/2;
	ball.y = screenWidth*0.8;
	ball.r = screenWidth*0.03;
	//Min ball speed is 5 and max is 11
	ball.speed = 5;
	ball.angle = 270;
	ball.speedX = 0,ball.speedY = 5;
}

/*This function ends the game*/
function endGame(){
	//Stop the game
	engine.state = 'idle';
	//Clear all game intervals
	clearInterval(interval[0]);
	clearInterval(interval[1]);
	//Get the canvas
	var screen = document.getElementById('screen');
	//Get the width and height of the canvas
	var width = $(screen).width();
	var height = $(screen).height();
	//Get the context 2d
	var ctx = screen.getContext('2d');
	//Clear the screen
	ctx.clearRect(0,0,width,height);
	$('#pauseButton').html('Start');
	$('#exitButton').html('Exit');
	with(system){
		//Update the scoretable info
		$('#lifecounter').html('Life:--');
		$('#levelcounter').html('Level:--');		
		$('#scorecounter').html('Score:--');
	}
}

//When the exit/quit button is pressed
function exitQuit(){
	//The no game is being played
	if(engine.state == 'idle') flip();
	//If a game is being played
	else{
		//Pause the game
		engine.state = 'paused';
		$('#pauseButton').html('Play');
		//Ask the player for quit confirmation
		if(system.settings.staticGame == false) pwin.confirm('Are you sure you want to quit the current game?',null,
		function(){
			//If the user confirms yes end the game
			if(pwin.result == true) endGame();
		});
		else {
			var input = confirm('Are you sure you want to quit the current game?');
			if(input == true) endGame();
		}
	}
}

//The flipping animation function
function flip(){
//If the screen is facing the menu
	if(system.screenPosition == 'menu'){
		$('#card').css({"animation":"fliptogame 2s"});
		system.screenPosition = 'flipping';
		setTimeout(function(){
			$('#card').css({"transform":"rotateY(180deg)"})
			system.screenPosition = 'game';
		},2000);
	}
	
//If the screen is facing the game
	else if(system.screenPosition == 'game'){
		$('#card').css({"animation":"fliptomenu 2s"});
		system.screenPosition = 'flipping';
		setTimeout(function(){
			$('#card').css({"transform":"rotateY(0deg)"})
			system.screenPosition = 'menu';		
		},2000);
	}
}

//Function for getting a random value within a range
function random(min,max){
	var randomNum = Math.floor((max-min+1)*Math.random());//generate a random number between the min and th max
	var randomValue = randomNum+min;//Add the number to the min
	return randomValue;
}

//Handle internal system functions like moving the paddle
system.refresh = function(){
	//Set the paddle direction based on user input
	with(system.buttons){
		//If only the left button is being pressed
		if(left == true && right == false){
			paddle.direction = 'left';
		}
		//If only the right button is being pressed
		else if(left == false && right == true){
			paddle.direction = 'right';
		}
		//If both button are pressed
		else{
			paddle.direction = 'idle';
		}
	}
		
	//Update the scoretable information
	with(system){
		$('#lifecounter').html('Life:'+life);
		$('#levelcounter').html('Level:'+currentLevel);		
		$('#scorecounter').html('Score:'+score);
	}
	
	/*Check if the user has finished the current level
	so that the user may go to the next level*/
	var brickRemain = null;//This boolean will return false if no breakable bricks are left else it return true
	/*Scan through the available bricks in the game to determine if any is still left
	That is breakable(To be added soon)*/
	rowloop:
	for(var i = 0;i < engine.bricks.length;i++){
	columnloop:	
		for(var j = 0;j < engine.bricks[i].length;j++){
		//If a breakable brick is found
			if(engine.bricks[i][j] != null){
				brickRemain = true;
				break columnloop;
				break rowloop;
			}
		}
	}
	//When no bricks are left
	if(brickRemain != true){
		//Show the user a level completed msg
		var msg="Level"+system.currentLevel+" cleared!";
		//Pause the game internally
		engine.state= 'systempause';
		//Prevent the system from displaying multiple msgs
		clearInterval(interval[0]);		
		clearInterval(interval[1]);
		if(system.settings.staticGame == false) pwin.alert(msg,'<h3>Level cleared!</h3>',function(){levelClear()});
		else {
			alert(msg);
			levelClear();
		}
	}
}

//When a level is cleared
function levelClear(){
			//Check if this is the last level or if another level still exists
			if(system.levels.length - system.currentLevel > 0){
				//Move to the next level
				system.currentLevel += 1;
				
				//Get the max width of the gaming menu
				var screenWidth = $('#game').width();
				
				//Reset the ball and paddle position and speed
				newGame(screenWidth);
				ball.speed = 5;
				
				//Call the level generator
				system.levels[system.currentLevel-1](screenWidth);
								
				//Refresh the game system and the game engine 30 times per second
				interval[0] = setInterval(engine.redraw,1000/30);
				interval[1] = setInterval(system.refresh,1000/30);
				
				//Resume the game
				engine.state = 'playing';
			}
			//If this is the last level
			else {
				//End the game
				endGame();
				//Tell the user the next message
				var msg = '<p>You have cleared the game, you win!</br/>';
				msg += 'Your score was: '+system.score+'</p>';
	
				if(system.settings.staticGame == false) pwin.alert(msg,'<h3>Game over!</h3>',function(){clearScreen()});
				else{
				alert(msg);
				clearScreen();
				}
			}
}
		
//This function is called when the ball is in collision with the lower part of the canvas
function loseLife(){
//If the player still has some life points left
	if(system.life>1){
		//Subtract a life point
		system.life -= 1;
		//Give an internal pause
		engine.state = 'systempause';
		//Display the remaining amount of life
		var msg = "You have "+system.life;
		if(system.life > 1) msg += ' lifes left';
		else msg += ' life left';
		if(system.settings.staticGame == false) pwin.alert(msg,'<h3>You lost a life!</h3>',function(){
			//Get the max width of the gaming menu
			var screenWidth = $('#game').width();
			//Resume the game and reset the paddle and ball position and state
			newGame(screenWidth);
			ball.speed = 5;
			engine.state = 'playing';
		});
		else{
			alert(msg);
			continueGame();
		}
		function continueGame(){
			//Get the max width of the gaming menu
			var screenWidth = $('#game').width();
			//Resume the game and reset the paddle and ball position and state
			newGame(screenWidth);
			ball.speed = 5;
			engine.state = 'playing';
		}
	}
	//If not it's game over
	else gameOver();
}

//This function is called wheb the user has no lifes left
//As such that's the end of the game
function gameOver(){
	//Pause the game
	engine.state = 'paused';
	//End the game
	endGame();
	//Tell the user the next message
	var msg = 'Your score was: '+system.score;
	if(system.settings.staticGame == false) pwin.alert(msg,'<h3>Game over!</h3>',function(){clearScreen()});
	else{
	alert('Game over!\n'+msg);
	clearScreen()
	}
}

//Clear the screen
function clearScreen(){
	//Stop the engine and reset the system
	engine.state = 'idle';
	clearInterval(interval[0]);
		
	//Get the canvas
	var screen = document.getElementById('screen');
	//Get the width and height of the canvas
	var width = $(screen).width();
	var height = $(screen).height();
	//Get the context 2d
	var ctx = screen.getContext('2d');
	//Clear the screen
	ctx.clearRect(0,0,width,height);
}

//Checker for static games
function staticGame(e){
	system.settings.staticGame = e.target.checked;
}