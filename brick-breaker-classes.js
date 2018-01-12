//The paddle object
var paddle = {
	//Positioning of the paddle
	x:null,
	y:null,
	//Thickness of the paddle
	width:null,
	//The length of the paddle
	length:null,
	//The direction of the paddle
	direction:null,
	//The existence state of the paddle
	state:'existent',
	//The movement speed of the paddle
	speed:8,
	//Function for drawing the paddle to the screen
	draw: function(ctx,width){
		ctx.strokeStyle = "black";
		ctx.lineCap = 'butt';
		ctx.lineWidth = paddle.width;
		
		ctx.beginPath()
		ctx.moveTo(paddle.x,paddle.y)
		ctx.lineTo(paddle.x + paddle.length,paddle.y);
		ctx.stroke();
		//Move the paddle within the screen
		switch(this.direction){
			case 'left':
				if(this.x >= 0)this.x -=  this.speed;
				else this.x = 0;
				break;
			case 'right':
				if(this.x+this.length <= width) this.x +=  this.speed;
				else this.x = width-this.length;
				break;
		}
	}
}

//The ball object
var ball = {
	//Position of the ball
	x:null,
	y:null,
	//Speed of the ball
	speed:null,
	speedX:null,
	speedY:null,
	//The angle
	angle:null,
	//Radius of the ball
	r:null,
	//Drawing the ball to the screen
	draw: function(ctx,width){
	  with(this){
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(x,y,r,0,2*Math.PI,true);
		ctx.fill();
		//move the ball for the next frame
		//If the ball is touching the upper part of the canvas rebound it
	if(y-r <= 0){
		y = r+(r/2);
		if(speedY<0)speedY *= -1;		
	}
	//If the ball is touching the lower canvas then a life is lost
	if(y+ r >= width){
		y = width-r-(r/2);
		speedY *= -1;
		loseLife();
	}
		//The ball is touching the side of the canvas
	if(x - r <= 0){
		x = r+(r/2);
		if(speedX<0)speedX *= -1;	
	}
	if(x + r >= width){
		x = width-r-(r/2);
		if(speedX>0)speedX *= -1;
	}
		
	/*Ball-paddle collision
		Check if the ball is in collision with the paddle*/
	if(x >= paddle.x-r && x <= paddle.x+paddle.length+r && y >= paddle.y-paddle.width && y <= paddle.y+r){
		  //If the collision is at the center of the paddle
		  if(x > paddle.x+(paddle.length*0.45) && x < paddle.x +(paddle.length*0.55)){
		 	angle = random(60,80);
		 	//For the first time(i.e going down)
		 	if(speedX== 0){
			 	var signs = [-1,1];
			 	speedX = signs[random(0,1)]*Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
			 	speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
		 	}
		 	//When the ball is going left
		 	else if(speedX < 0){
		 		speedX = -1*Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
		 		speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
		 	}
		 	//When the ball is going right
		 	else if(speedX > 0){
		 		speedX = Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
		 		speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
		 	}
		 }
		 
		  //If the collision is at the near left to the center
		else if(x >= paddle.x+(paddle.length*0.3) && x <= paddle.x +(paddle.length*0.45)){
		  //If  ball is going in the left direction
		 angle = random(30,60);		  
		  if(speedX <= 0){
			  speedX = -1*Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
			  speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
		  }
		  //If momentum is in the right direction
		  else{
			  speedX = Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
			  speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
		  }
		}
		  
		 //If the collision is at the far left edge of the paddle
		 else if(x > paddle.x +(paddle.length*0.1)&& x < paddle.x +(paddle.length*0.3)){
			//If  ball is going in the left direction
			angle = random(20,40);			
			if(speedX <= 0){
				speedX = -1*Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
				speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
			}
			//If momentum is in the right direction
			else{
				speedX = Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
				speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
			}
		 }
		 
		 //If the collision is at the far left corner barely on the paddle
		 else if(x >= paddle.x-r && x <= paddle.x +(paddle.length*0.1)){
		 		angle = random(15,20);
		 		speedX = -1*Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
		 		speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
		 }
		 
		 
		 //If the collision is at the near right
		 else if(x >= paddle.x+(paddle.length*0.55) && x <= paddle.x +(paddle.length*0.7)){
			 //If  ball is going in the left direction
			  angle = random(30,60);			 
			 if(speedX <= 0){
		 			  speedX = -1*Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
		 			  speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
			 }
		 //If momentum is in the right direction
			 else{
			  speedX = Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
		 	  speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
			 }
		 }
		 
		 //If the collision is at the far right edge
		 else if(x > paddle.x+(paddle.length*0.7) && x < paddle.x +(paddle.length*0.9)){
			 //If  ball is going in the left direction
			 angle = random(20,40);			 
			 if(speedX <= 0){
				 speedX = -1*Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
				 speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
			 }
			 //If momentum is in the right direction
			 else{
				 speedX = Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
				 speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
			 }
		 }
		 
		//If the collision is at the far right corner
		else if(x >= paddle.x+(paddle.length*0.9) && x <= paddle.x+paddle.length+r ){
			angle = random(15,20);
			speedX = Math.floor(speed*Math.cos(angle*(Math.PI/180)).toFixed(4));
			speedY = Math.floor(speed*Math.sin(angle*(Math.PI/180)).toFixed(4));
		}
	
		//Move the ball out of the paddle's collision box to prevent multiple collisions
		y = paddle.y-(r*2);
		//Make it move back upwards(bounce the ball)
		if(speedY > 0){
			speedY *= -1;
		}
	}
		
	/*Ball-brick collision detection
	Check if the ball is in collisiom with a brick by
	looping through brick array and find collision state for each brick*/
	for(var i = 0;i < engine.bricks.length;i++){
		for(var j = 0;j < engine.bricks[i].length;j++){
			if(engine.bricks[i][j] != null){					
				var brickX = engine.bricks[i][j].x, brickY = engine.bricks[i][j].y;
				var brickWidth = width*0.125,brickHeight = width*0.06;
				//Check if the ball is in collision with the brick
				if(x >= brickX-r & x <= brickX+brickWidth+r & y >= brickY-r & y <= brickY+brickHeight+r ){
					//check the location of collision for rebouding
					
					//If the ball collides with the left hand side of the brick only
					if(x >= brickX-r & x <= brickX & y >= brickY+(r/4) & y <= brickY+brickHeight+(r/4)){
						if(speedX > 0) speedX *= -1;
						x = brickX-r;
					}
					//If the ball collides with the  right hand side of the brick only
					if(x >= brickX+brickWidth & x <= brickX+brickWidth+r & y >= brickY+(r/4) & y <= brickY+brickHeight+(r/4)){
						if(speedX < 0) speedX *= -1;
						x = brickX+brickWidth+r;
					}
					//If the ball is in collision with the bottom of the brick
					if(x >= brickX-r & x <= brickX+brickWidth+r & y >= brickY+(brickHeight /2) & y <= brickY+brickHeight+r){
						if(speedY < 0) speedY *= -1;
						y = brickY+brickHeight+r;
					}
					//If the ball is in collision with thr top of the brick
					if(x >= brickX-r & x <= brickX+brickWidth+r & y <= brickY+(brickHeight /2) & y >= brickY-r){
						if(speedY > 0) speedY *= -1;
						y = brickY-r;
					}
					
					/*Brick destruction
					Check the color of the brick
					Red->Blue->Green->Yellow*/
					if(engine.bricks[i][j].color == 'red') engine.bricks[i][j].color = 'blue';					
					else if(engine.bricks[i][j].color == 'blue') engine.bricks[i][j].color = 'green';					
					else if(engine.bricks[i][j].color == 'green') engine.bricks[i][j].color = 'yellow';					
					else if(engine.bricks[i][j].color == 'yellow') engine.bricks[i][j] = null;
					
					//Steadily speed up the ball after every brick collision
					//Calculate the increase	
					var spInc = 0.05;
					var xInc = Math.floor(spInc*Math.cos(angle*(Math.PI/180)).toFixed(4));
					var yInc =	Math.floor(spInc*Math.sin(angle*(Math.PI/180)).toFixed(4));
					//Add the increase if it hasn't exceeded the max of speed 11
				if(speed <11){	
					speed += spInc;
					if(speedX > 0)speedX += xInc;
					else speedX -= xInc;
					if(speedY > 0) speedY += yInc;
					else speedY-= yInc;
				}
					//Increase score by 1 brick
					system.score += 1;
				}
			}
		}
	}
		 //Move the ball in the x and y direction
		 x += speedX;
		 y += speedY;
	 }
  }
}

/*The brick class that generates a brick
object*/
function brick(x,y,color){
	//Give it a random color
	this.color= color;
	//It's position in the bricks arrangement matrix
	this.x=x;
	this.y=y;
	//Drawing the brick
	this.draw = function(ctx,width){
		ctx.fillStyle = this.color;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.fillRect(x,y,width*0.125,width*0.06);
		ctx.strokeRect(x,y,width*0.125,width*0.06);			
	}
}