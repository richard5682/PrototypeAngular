<?php
	header('Access-Control-Allow-Origin: *');
	include('CONNECTSERVER.inc.php');
	$response['result']=0;
	if(ConnectToDefaultServer('testdatabase')){
		$SQL = Construct_INSERTSQL('comments',
		['serviceid','userid','comment','time'],
		[$_GET['serviceid'],$_GET['userid'],$_GET['comment'],time()]);
		if(QUERY_INSERTSQL($SQL)){
			$response['result']=1;
		}else{
			$response['result']=2;
		}
	}
	echo(json_encode($response));
?>