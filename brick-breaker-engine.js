//The internal game system
//Stores highscores and so on
var system = {
	/*Stores where the screen is currently facing
	menu:The screen is facing the main menu window
	game:The screen is facing the gaming window
	flipping:The screen is in transition*/
	screenPosition: "menu",
	//Gets the state of the movement buttons
	buttons:{
		left:false,
		right:false
	},
	//Function to kick the game into action
	start:null,
	//Handle the system functions
	refresh:null,
	//Stores the current level
	currentLevel:null,
	//Stores the functions to generate game levels
	levels:[],
	//Stores the player score
	score:null,
	//Stores the player lifes
	life:null
}

//The game engine, it manages collisions redraw and so on
//I.e Where the magic happens
var engine = {
	/*The state of the engine
	idle:Nothing is happening i.e The game is not started or has ended
	playing:A game is being played
	paused:A game is still being played but suspended
	systempause:When the game is displaying an msg to the user
	*/
	state:"idle",
	//Houses all the current brickss in the game
	//In a multi-dimensional array
	bricks:[],
	//Refresh the contents of the game screen
	redraw:function(){
	//Only draw if the game is being played
	  if(engine.state == 'playing'){
		//Get the canvas
		var screen = document.getElementById('screen');
		//Get the width and height of the canvas
		var width = $(screen).width();
		var height = $(screen).height();
		//Get the context 2d
		var ctx = screen.getContext('2d');
		
		//Drawing the background
		//Create the linear gradient
		var backGrad = ctx.createLinearGradient(0,0,0,height);
		backGrad.addColorStop(0, '#277'); 
		backGrad.addColorStop(0.4, '#5DF'); 
		backGrad.addColorStop(0.8,'#FFF');
				
		ctx.fillStyle= backGrad;
		ctx.fillRect(0,0,width,width);
		
		//Draw the paddle
		paddle.draw(ctx,width);
		//Draw the ball
		ball.draw(ctx,width);
		//Loop through brick array and draw each brick that exists
		for(var i = 0;i < engine.bricks.length;i++){
			for(var j = 0;j < engine.bricks[i].length;j++){
			//Only draw existent bricks to avoid errors
				if(engine.bricks[i][j] != null){
					engine.bricks[i][j].draw(ctx,width);
				}
			}
		}
	  }
	}
}