<?php
	$root = './image/';
	$name = 'image';
	$ext = '.PNG';
	function save_base64($base64raw,$file_name){
		global $root,$name,$ext;
		$i = 0;
		$base64 = str_replace(' ','+',$base64raw);
		create_dir($root.$file_name);
		while(file_exists($root.$file_name.'/'.$name.$i.$ext)){
			$i++;
		}
		try{
			$link = $root.$file_name.'/'.$name.$i.$ext;
			$data = explode(',',$base64);
			$imagedata = base64_decode($data[1]);
			file_put_contents($link,$imagedata);
			return $name.$i;
		}catch(e){
			return false;
		}
	}
	function create_dir($dir){
		if(!file_exists($dir)){
			try{
				mkdir($dir, 0777, true);
			}catch(e){
				return false;
			}
			return true;
		}else{
			return false;
		}
	}
	function get_client_ip() {
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';
		return $ipaddress;
	}
	
?>