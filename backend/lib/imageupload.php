<?php
	header('Access-Control-Allow-Origin: *');
	include('util.php');
	$response['result'] = 0;
	
	$data = $_POST['imagedata'];
	$file = $_POST['file'];
	
	$response['given'] = $data;
	if($link = save_base64($data,$file)){
		$response['result'] = 1;
		$response['link'] = $link;
	}
	echo(json_encode($response));
?>