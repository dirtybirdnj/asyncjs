<?php
	
//Ensuring that the tracking code takes longer than the initial login post request
sleep(5);

$response = array('status' => 200, 'message' => 'ok');

header('Content-type: application/json');
echo json_encode($response);
	
	
?>