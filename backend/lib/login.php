<?php
	include("CONNECTSERVER.inc.php");
	include("SessionLibrary.php");
	ConnectToDefaultServer('testdatabase');
	$username = $_GET['username'];
	$password = $_GET['password'];
	$SQL = Construct_SELECTSQL(
	['id','username','profileimage'],'users',['username','password'],[$username,$password]
	);
	$data = QUERY_SELECTSQL($SQL);
	$response['result'] = 0;
	if(checkTimeout('login_id')){
		if(!empty($data)){
			$response['result'] = 1;
			$response['id'] = $data[0]['id'];
			$response['username']= $data[0]['username'];
			$response['profileimage']= $data[0]['profileimage'];
			createSession('login_id',$response['id'],1000);
		}
	}else{
		$response['result'] = 3;
	}
	
	echo(json_encode($response));
?>