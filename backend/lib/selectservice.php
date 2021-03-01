<?php
	header('Access-Control-Allow-Origin: *');
	include("CONNECTSERVER.inc.php");
	ConnectToDefaultServer('testdatabase');
	$response['result'] = 0;
	$WHERE = array();
	$VALUES = array();
	if(!empty($_GET['type'])){
		array_push($WHERE,'type');
		array_push($VALUES,$_GET['type']);
	}
	if(!empty($_GET['owner'])){
		array_push($WHERE,'owner');
		array_push($VALUES,$_GET['owner']);
	}
	if(!empty($_GET['serviceid'])){
		array_push($WHERE,'id');
		array_push($VALUES,$_GET['serviceid']);
	}
	$SQL = Construct_SELECTSQL(
		['id','title','description','contact','type','thumbnail','owner'],'services',
		$WHERE,$VALUES
	);
	if(!empty($_GET['limit'])){
		$SQL .= "LIMIT ".$_GET['limit'];
	}
	if($data = QUERY_SELECTSQL($SQL)){
		$response['result'] = 1;
		$response['services'] = $data;
	}
	echo(json_encode($response));
?>