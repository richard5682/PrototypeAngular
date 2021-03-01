<?php
	header('Access-Control-Allow-Origin: *');
	
	include_once('SessionLibrary.php');
	include_once('CONNECTSERVER.inc.php');
	$response['result'] = 0;
	if(!checkTimeout('login_id')){
		ConnectToDefaultServer('testdatabase');
		$response['result'] = 1;
		$response['id'] = SESSION('login_id');
		$SQL = Construct_SELECTSQL(['username'],
		'users',['id'],[SESSION('login_id')]);
		if($data = QUERY_SELECTSQL($SQL)){
			$response['username'] = $data[0]['username'];
		}
	}
	echo(json_encode($response));
?>