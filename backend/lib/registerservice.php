<?php

	header('Access-Control-Allow-Origin: *');
	include('CONNECTSERVER.inc.php');
	include('SessionLibrary.php');
	ConnectToDefaultServer('testdatabase');
	$title = $_GET['title'];
	$desc = $_GET['desc'];
	$contact = $_GET['contact'];
	$type = $_GET['type'];
	$thumbnail = $_GET['thumbnail'];
	$id = $_GET['id'];
	$response['result'] = 0;
	if(!checkTimeout('login_id')){
		if($id == SESSION('login_id')){
			$SQL = Construct_INSERTSQL('services',
			['title','description','contact','type','thumbnail','owner'],
			[$title,$desc,$contact,$type,$thumbnail,$id]);
			if(QUERY_INSERTSQL($SQL)){
				$response['result']=1;
			}else{
				$response['result']=2;
			}
		}
	}
	echo(json_encode($response));
?>