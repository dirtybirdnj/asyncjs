<?php

// Passwords are md5 hashed within this array for readability 
// Passwords would NEVER be stored without hashing and salting
// Salting is omitted for simplicity, so I don't have to share the salt value with the front-end
	
$users = array(
	
	0 => array('username' => 'matgilbert', 'password' => md5('slackline')),
	1 => array('username' => 'craigschroder', 'password' => md5('collage'))
	
);


// This function exists to fake ORM behavior without all the overhead of MVC
function checkLogin($users,$username,$password){
	
	$response = array();

	$userRecordFound = false;
	
	foreach($users as $user){
		

		
		if(trim($username) === $user['username']){
			
			$userRecordFound = true;
			
			if($password === $user['password']){ $response = array('status' => 'ok', 'message' => 'Login completed successfully'); } 
			
			else { $response = array('status' => 'fail','type' => 'password', 'message' => 'Invalid password, please try again'); }	
			
		} else { $response = array('status' => 'fail', 'type' => 'username', 'message' => 'Invalid username, please try again'); }
		
		//If we've found the user, don't keep iterating over the rest of the records
		if($userRecordFound) break;
	
	}
	
	
	return $response;
	
}	
	
function sanitize($input) {

	//Would perform actual sanitization here, omitted for brevity
	return $input;

}	
	
?>