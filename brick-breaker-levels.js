//The game levels generator
//Level 1
system.levels[0] = 
function(screenWidth){
	//Update current level
	system.currentLevel = 1;
	var i,j;//These variables are used for navigation through the matrix
	//Fill the brick matrix with a square of bricks
	for(i=2;i<=5;i++){
		for(var j = 2;j <= 5;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'blue');		
		}
	}
}

//Level 2
system.levels[1] =
function(screenWidth){
//Update the system level
	system.currentLevel = 2;
	var i,j;//These variables are used for navigation through the matrix
	//Arranging the yellow bricks
	i = 1;
	for(var j = 2;j <= 5;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'yellow');		
	}
	i = 2;
	for(var j = 1;j <= 6;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'yellow');		
	}
	i = 7;
	for(var j = 1;j <= 6;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'yellow');		
	}
	i = 8;
	for(var j = 2;j <= 5;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'yellow');		
	}
	for(i=3;i<=6;i++){
		for(var j = 0;j <=7;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'yellow');		
		}
	}
	//Arranging the green bricks
	i = 2;
	for(var j = 2;j <= 5;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'green');		
	}
	i = 7;
	for(var j = 2;j <= 5;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'green');		
	}
	for(i=3;i<=6;i++){
		for(var j = 1;j <=6;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'green');		
		}
	}
	//Arranging the blue bricks
	i = 3;
	for(var j = 3;j <= 4;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'blue');		
	}
	i = 6;
	for(var j = 3;j <= 4;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'blue');		
	}
	for(i=4;i<=5;i++){
		for(var j = 2;j <= 5;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'blue');		
		}
	}
	//And finally the red bricks
	for(i=4;i<=5;i++){
		for(var j = 3;j <= 4;j++){
		engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'red');		
		}
	}
}

//Level 3
system.levels[2] = 
function(screenWidth){
//Update the system level
	system.currentLevel = 3;
	//Filling the 8×10 bricks matrix with bricks
	for(i = 9;i >= 0;i--){
		//Fill row 2 to 0 with red bricks
		if(i>=0 || i <= 2){
			for(var j=0;j<8;j++){
				engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'red');
			}
		}
		//Fill row 5 to 3 with blue bricks
		if(i>=3 & i <= 5){
			for(var j=0;j<8;j++){
				engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'blue');
			}
		}
		//Fill row 7 and 6 with green bricks
		if(i==7 || i == 6){
			for(var j=0;j<8;j++){
				engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'green');
			}
		}
		//Fill the last 2 rows with yellow bricks
		if(i==9 || i == 8){
			for(var j=0;j<8;j++){
				engine.bricks[i][j] = new brick(j*(screenWidth*0.125),i*(screenWidth*0.06),'yellow');
			}
		}
	}
}