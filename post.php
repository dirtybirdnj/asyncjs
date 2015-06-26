<?php


//Control timing of the login request
sleep(1);
	
include_once('functions.php');	

$username = sanitize($_POST['username']);
$password = sanitize($_POST['password']);


$response = checkLogin($users,$username,$password);

header('Content-type: application/json');
echo json_encode($response);	
	
?>