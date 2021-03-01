<?php
	header('Access-Control-Allow-Origin: *');
	include_once('CONNECTSERVER.inc.php');
	include('SessionLibrary.php');
	$response['result'] = 0;
	ConnectToDefaultServer('testdatabase');
	if(!checkTimeout('login_id')){
		$SET = array();
		$SVALUES = array();
		$id = SESSION('login_id');
		if(!empty($_GET['username'])){
			array_push($SET,'username');
			array_push($SVALUES,$_GET['username']);
		}
		if(!empty($_GET['profileimage'])){
			array_push($SET,'profileimage');
			array_push($SVALUES,$_GET['profileimage']);
		}
		if(!empty($_GET['email'])){
			array_push($SET,'email');
			array_push($SVALUES,$_GET['email']);
		}
		$SQL = Construct_UPDATESQL('users',$SET,$SVALUES,['id'],[$id]);
		if(QUERY_UPDATESQL($SQL)){
			$response['result'] = 1;
		}else{
			$response['result'] = 2;
		}
	}
	echo(json_encode($response));
?>