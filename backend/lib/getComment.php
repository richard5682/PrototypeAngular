<?php

	include_once('CONNECTSERVER.inc.php');
	$serviceid = $_GET['serviceid'];
	$response['result'] = 0;
	if(ConnectToDefaultServer('testdatabase')){
		$SQL = Construct_SELECTSQL(
			['userid','comment','time'],'comments',['serviceid'],[$serviceid]
		);
		if($data = QUERY_SELECTSQL($SQL)){
			$response['result'] = 1;
			$response['comments'] = $data;
		}else{
			$response['result'] = 2;
		}
	}
	echo(json_encode($response));
?>