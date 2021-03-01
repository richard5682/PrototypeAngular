<?php
	header('Access-Control-Allow-Origin: *');
	include('CONNECTSERVER.inc.php');
	$response['result'] = 0;
	$id = $_GET['id'];
	ConnectToDefaultServer('testdatabase');
	$SQL = Construct_SELECTSQL(['username','email','profileimage'],'users',
							['id'],[$id]);
	if($data = QUERY_SELECTSQL($SQL)){
		$response['result'] = 2;
		if(!empty($data)){
			$response['result'] = 1;
			$info = $data[0];
			$response['info'] = $info;
		}
	}
	echo(json_encode($response));
?>