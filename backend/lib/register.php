<?php
	include('CONNECTSERVER.inc.php');
	ConnectToDefaultServer('testdatabase');
	$username = $_GET['username'];
	$password = $_GET['password'];
	$email = $_GET['email'];
	
	$SQL = Construct_SELECTSQL(['id'],'users',['username'],[$username]);
	$response['result'] = 2;
	if(empty(QUERY_SELECTSQL($SQL))){
		$SQL = Construct_INSERTSQL('users',
		['username','password','email','profileimage']
		,[$username,$password,$email,'default']);
		if(QUERY_INSERTSQL($SQL)){
			$response['result']=1;
		}else{
			$response['result']=0;
		}
	}
	echo(json_encode($response));

?>