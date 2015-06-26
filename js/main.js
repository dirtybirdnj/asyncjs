$(function(){
	
	console.log('ready');
	
	$('#loginForm').submit(function(event){
		
		event.preventDefault();
		console.log('form submit init');
		
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
		alert('The field ' + failedField + ' cannot be empty');
		$('#' + failedField).focus();

	}
	
	return formIsValid;
	
}

function handleLoginError(response){
	
	alert(response.message);
	$('#' + response.type).focus();
	
}

function track(){
	
	console.log('init tracking');
	
	$.post('tracking.php',{'action' : 'userLogin'},function(data){
		
		console.log('tracking complete!');
		console.log(data);
		
	});
	
}

function processLogin(username,password){
	
	toggleLoadingGif();
	
	if(validateForm()){
		
		console.log('valid form data, proceeding');		
		
		track('User Login');
		
		var hashPass = md5(password);
		
		$.post('post.php',{'username': username,'password': hashPass},function(data){
			
			if(data.status === 'ok'){ window.location = 'success.html'; } else {
				
				toggleLoadingGif();
				console.log(data);
				handleLoginError(data);
				
			}
			
			
		}
		).done(function(){ console.log('Login post finished'); }
		).fail(function(){ console.log('Post failed?!'); });	
		
	}
	
}

function toggleLoadingGif(){ $('#loading').toggle(); }