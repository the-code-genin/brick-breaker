/*
________________________
The Pwin Library
Developed by Adekunle Mohammed
--------------------------------------
Functions: pwin.alert()
pwin.confirm()
pwin.prompt()
('Message','Header','Callback function');
*Note that it uses the jquery library to function
*/
var pwin={};//The pwin object
pwin.result = null;//The result of any alert box
pwin.action = null;//Action to be executed after the message 
var deviceHeight;//The device height
pwin.state = null;//The state of the window

//Create a new instance of the Pwindow with all the elements
function newPwindow(){
	//Force remove any current pwindow on the screen
	$(pwin.window).remove();
	$(pwin.background).remove();

	//Create the window element
	pwin.window = document.createElement('div');//Create a new blank div element
	$(pwin.window).attr('class','pwindow');//Assign it the pwindow class
	deviceHeight = window.innerHeight;//Get the device height for positioning purpose

	//Create the content element
	pwin.content = document.createElement('div');
	$(pwin.content).attr('class','pwinContent');//Assign it the content class
	
	//Create the header element
	pwin.header = document.createElement('div');
	$(pwin.header).attr('class','pwinHeader');//Assign it the header class

	//Create the alert box ok button
	pwin.alertOk = document.createElement('div');
	$(pwin.alertOk).attr('class','pwinAlertOk');//Assign it the alertOk class
	$(pwin.alertOk).text('ok');
	$(pwin.alertOk).click(//When alertOk button is pressed
		function(){
			pwin.result=true;//Set the result to true
			closePwindow();//Close the window
			setTimeout(pwin.action,901);//After closing the window,execute the next function
		});
	
	//Create the confirm box no/cancel button
	pwin.confirmNo = document.createElement('div');
	$(pwin.confirmNo).attr('class','pwinConfirmNo');//Assign it the confirmNo class
	$(pwin.confirmNo).text('no');
	$(pwin.confirmNo).click(//When confirmNo button is pressed
		function(){
			pwin.result=false;//Set the result to false
			closePwindow();//Close the window
			setTimeout(pwin.action,901);//After closing the window,execute the next function
		});
	
	//Create the confirm box yes/ok button
	pwin.confirmYes = document.createElement('div');
	$(pwin.confirmYes).attr('class','pwinConfirmYes');//Assign it the confirmYes class
	$(pwin.confirmYes).text('yes');
	$(pwin.confirmYes).click(//When confirmYes button is pressed
		function(){
			pwin.result=true;//Set the result to true
			closePwindow();//Close the window
			setTimeout(pwin.action,901);//After closing the window,execute the next function
		});
	
	//Create the prompt box cancel button
	pwin.promptNo = document.createElement('div');
	$(pwin.promptNo).attr('class','pwinConfirmNo');//Assign it the confirmNo class
	$(pwin.promptNo).text('cancel');
	$(pwin.promptNo).click(//When promptNo button is pressed
		function(){
			pwin.result=false;//Set the result to false
			closePwindow();//Close the window
			setTimeout(pwin.action,901);//After closing the window,execute the next function
		});
	
	//Create the prompt box ok button
	pwin.promptYes = document.createElement('div');
	$(pwin.promptYes).attr('class','pwinConfirmYes');//Assign it the confirmYes class
	$(pwin.promptYes).text('ok');
	$(pwin.promptYes).click(//When confirmYes button is pressed
		function(){
			pwin.result=$(pwin.promptInput).val();//Set the result to that of the input box
			closePwindow();//Close the window
			setTimeout(pwin.action,901);//After closing the window,execute the next function
		});
	
	//Create the prompt input bar
	pwin.promptInput = document.createElement('input');
	$(pwin.promptInput).attr('type','text');//Set the type to text
	$(pwin.promptInput).attr('class','pwinPromptInput');//Assign it the promptInput class
	$(pwin.promptInput).attr('placeholder','input');
	
	//Create the background element to disable the selection of any other elements
	pwin.background = document.createElement('div');
	$(pwin.background).attr('class','pwindowBackground');//Assign it the pwindowBackground class
	$(pwin.background).click(//When background is pressed
		function(){
			pwin.result=false;//Set the result to false
			closePwindow();//Close the window
			setTimeout(pwin.action,901);//After closing the window,execute the next function
		});
}

//Remove the current pwindow instance with an animation
function closePwindow(){
	$(pwin.window).css('transition','top 1s');//Put an animation to the window
	$(pwin.window).css('top','0px');//Animate it to go back up
	setTimeout(//Remove the window
	function(){
		$(pwin.window).remove();
		$(pwin.background).remove();
	},901);
}


//Show an alert window event handler
pwin.alert = function(message,header,action=function(){}){
	newPwindow();//Create a new Pwindow
	
	/*Add the required alert elements
	An header,the content and an ok button*/
	if(header == null)header = '<h3>Alert</h3>'//If the header is null
	$(pwin.header).html(header);//Assign the pwindow header
	pwin.window.append(pwin.header);//Append it

	$(pwin.content).html(message);//Assign the pwindow message
	pwin.window.append(pwin.content);//Append it

	$(pwin.window).append(pwin.alertOk);//Append the ok button

	//Display the window
	$('body').append(pwin.background);//Add the background
	$('body').append(pwin.window);//Add the window itself

	//Position the window to the vertical middle in an animated form
	pwin.height = $(pwin.window).height();//Get the window height for positioning
	$(pwin.window).css('transition','');//Remove any prior transition
	$(pwin.window).css('top','0px');//Position it above the screen
	$(pwin.window).css('transition','top 1s');//Put an animation to the window
	$(pwin.window).css('top',((deviceHeight-pwin.height)/2)+'px');//Animate it to the center of the screen

	//Assign the continuation attributes
	pwin.result = null;//Set the result to null
	pwin.action = action;//Set the action method which will be executed after the user selects something
}


//Show a confirm window event handler
pwin.confirm = function(message,header,action=function(){}){
	newPwindow();//Create a new Pwindow
	
	/*Add the required alert elements
	An header,the content and two option buttons*/
	if(header == null)header = '<h3>Confirmation</h3>'//If the header is null
	$(pwin.header).html(header);//Assign the pwindow header
	pwin.window.append(pwin.header);//Append it

	$(pwin.content).html(message);//Assign the pwindow message
	pwin.window.append(pwin.content);//Append it

	$(pwin.window).append(pwin.confirmNo);//Append the no button
	$(pwin.window).append(pwin.confirmYes);//Append the yes button

	//Display the window
	$('body').append(pwin.background);//Add the background
	$('body').append(pwin.window);//Add the window itself

	//Position the window to the vertical middle in an animated form
	pwin.height = $(pwin.window).height();//Get the window height for positioning
	$(pwin.window).css('transition','');//Remove any prior transition
	$(pwin.window).css('top','0px');//Position it above the screen
	$(pwin.window).css('transition','top 1s');//Put an animation to the window
	$(pwin.window).css('top',((deviceHeight-pwin.height)/2)+'px');//Animate it to the center of the screen

	//Assign the continuation attributes
	pwin.result = null;//Set the result to null
	pwin.action = action;//Set the action method which will be executed after the user selects something
}

//Show a prompt window event handler
pwin.prompt = function(message,header,action=function(){}){
	newPwindow();//Create a new Pwindow
	
	/*Add the required alert elements
	An header,the content,the input box and two option buttons*/
	if(header == null)header = '<h3>Input</h3>'//If the header is null
	$(pwin.header).html(header);//Assign the pwindow header
	$(pwin.window).append(pwin.header);//Append it

	$(pwin.content).html(message);//Assign the pwindow message
	$(pwin.window).append(pwin.content);//Append it
	
	$(pwin.window).append(pwin.promptInput);//Append the input bar

	$(pwin.window).append(pwin.promptNo);//Append the cancel button
	$(pwin.window).append(pwin.promptYes);//Append the ok button

	//Display the window
	$('body').append(pwin.background);//Add the background
	$('body').append(pwin.window);//Add the window itself

	//Position the window to the vertical middle in an animated form
	pwin.height = $(pwin.window).height();//Get the window height for positioning
	$(pwin.window).css('transition','');//Remove any prior transition
	$(pwin.window).css('top','0px');//Position it above the screen
	$(pwin.window).css('transition','top 1s');//Put an animation to the window
	$(pwin.window).css('top',((deviceHeight-pwin.height)/2)+'px');//Animate it to the center of the screen

	//Assign the continuation attributes
	pwin.result = null;//Set the result to null
	pwin.action = action;//Set the action method which will be executed after the user selects something
}