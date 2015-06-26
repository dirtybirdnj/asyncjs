$(function(){
	
	$('#loginForm').submit(function(event){
		
		event.preventDefault();
		processLogin($('#username').val(),$('#password').val());
		
	});
	
});

function validateForm(){
	
	var formIsValid = true;
	var failedField = '';

	if($('#email').val()  == '' || $('#password').val() == '') { formIsValid = false; }
	
	if($('#password').val() == ''){ failedField = 'password'; }	
	if($('#username').val() == ''){ failedField = 'username'; }

	if(!formIsValid){

		toggleLoadingGif();
		$('#errorMsg').text('The field ' + failedField + ' cannot be empty');
		$('#' + failedField).focus();

	}
	
	return formIsValid;
	
}

function handleLoginError(response){
	
	$('#errorMsg').text(response.message);
	$('#' + response.type).focus();
	
}

function track(){
	
	console.log('Tracking: init');
	
	$.post('tracking.php',{'action' : 'userLogin'},function(data){
		
		console.log('Tracking: finished');		
		
	});	
	
	return true;
}

function processLogin(username,password){
	
	console.log('Login: processLogin called');
	
	toggleLoadingGif();
	
	if(validateForm()){
		
		if(track('Tracking: User Login')){
			
			console.log('Tracking finished first!');
			
		}
			
		setTimeout(function(){ 
			
			//Wait 2000ms, then 				
			console.log('Login: Timeout request firing');
			makeLoginRequest(username,password); 
			
				
		},2000);	
				
	}
	
}

function makeLoginRequest(username,password){
	
			console.log('Login: makeLoginRequest() - Performing POST request');
			
			$.post('post.php',{'username': username,'password': md5(password)},function(data){

				console.log('Login: request complete');
				
				if(data.status === 'ok'){ 
					
					window.location = 'success.html';
					//console.log('Login: Forward to success page');
					//toggleLoadingGif();
				
				} else {
					
					toggleLoadingGif();
					console.log(data);
					handleLoginError(data);
					
				}
				
				
			}
			).done(function(){ /* console.log('Login: Login post finished');*/ }
			).fail(function(){ /* console.log('Login: Post failed?!'); */ });	
	
}


function toggleLoadingGif(){ $('#loading').toggle(); }