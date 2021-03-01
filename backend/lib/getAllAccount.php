<?php
	header('Access-Control-Allow-Origin: *');
	include('CONNECTSERVER.inc.php');
	ConnectToDefaultServer('testdatabase');
	$SQL = Construct_SELECTSQL(['id'],'users',null,null);
	$response['result']=0;
	if($data = QUERY_SELECTSQL($SQL)){
		$response['result']=1;
		$response['account']=$data;
	}
	echo(json_encode($response));
?>