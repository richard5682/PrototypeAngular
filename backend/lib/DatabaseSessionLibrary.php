<?php

	include_once('CONNECTSERVER.inc.php');
	include_once('util.php');
	$ip = get_client_ip();
	if($SERVERCONNECTION == null){
		ConnectToDefaultServer('testdatabase');
	}
	
	function SESSION($varname){
		global $ip;
		$SQL = Construct_SELECTSQL(
			['value'],'sessions',['ip','varname'],[$ip,$varname]);
		if($data = QUERY_SELECTSQL($SQL)){
			return $data[0]['value'];
		}else{
			return null;
		}
	}
	function createSession($varname,$value){
		global $ip;
		$SQL = Construct_INSERTSQL(
			'sessions',['ip','varname','value'],[$ip,$varname,$value]
		);
		if(QUERY_INSERTSQL($SQL)){
			return true;
		}else{
			return false;
		}
	}
	function deleteSession($varname){
		global $ip;
		$SQL = Construct_DELETESQL(
			'sessions',['ip','varname'],[$ip,$varname]
		);
		echo($SQL);
		if(QUERY_DELETESQL($SQL)){
			return true;
		}else{
			return false;
		}
	}
	function checkTimeout($varname){
		if(empty(SESSION($varname))){
			return true;
		}else{
			return false;
		}
	}
?>