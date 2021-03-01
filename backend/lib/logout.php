<?php
	header('Access-Control-Allow-Origin: *');
	include('SessionLibrary.php');
	$response['result'] = 0;
	if(!checkTimeout('login_id')){
		deleteSession('login_id');
		$response['result']=1;
	}
	echo(json_encode($response));
?>