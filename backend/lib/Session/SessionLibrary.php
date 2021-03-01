<?php
	$GLOBAL_TIMEOUT = 3600;
	$TIMEOUT_SYNTAX = "_expiration";
	session_start();
	//USE TO CHECK TOKEN $token is the name of the Session variable
	function checkToken($token){
		if(checkTimeout($token)){
			return false;
		}else{
			if(isset($_SESSION[$token])){
				if($_SESSION[$token] == $_GET['token']){
					return true;
				}
			}else{
				return false;
			}
		}
		return false;
	}
	//USE TO GENERATE NEW TOKEN
	function generateToken($varname){
		$token = bin2hex(random_bytes(16));
		createSession($varname,$token);
		return $token;
	}
	//USE TO CREATE SESSION VARIABLE WITH VARNAME AND VALUE AND THE OPTIONAL
	//EXPIRATION TIME IN SECONDS
	function createSession($varname,$value,$expiration=null){
		global $GLOBAL_TIMEOUT;
		global $TIMEOUT_SYNTAX;
		$_SESSION[$varname] = $value;
		if($expiration == null){
			if($GLOBAL_TIMEOUT != null){
				$_SESSION[$varname.$TIMEOUT_SYNTAX]=time()+$GLOBAL_TIMEOUT;
			}
		}else{
			$_SESSION[$varname.$TIMEOUT_SYNTAX]=time()+$expiration;
		}
	}
	//DELETE THE SESSION WITH THE INDEX OF $varname
	function deleteSession($varname){
		global $TIMEOUT_SYNTAX;
		if(isset($_SESSION[$varname])){
			unset($_SESSION[$varname]);
		}
		if(isset($_SESSION[$varname.$TIMEOUT_SYNTAX])){
			unset($_SESSION[$varname.$TIMEOUT_SYNTAX]);
		}
	}
	//CHECK IF THE SESSION IS EXPIRED
	function checkTimeout($varname){
		global $TIMEOUT_SYNTAX;
		if(isset($_SESSION[$varname.$TIMEOUT_SYNTAX])){
			if($_SESSION[$varname.$TIMEOUT_SYNTAX]<time()){
				deleteSession($varname);
				return true;
			}else{
				return false;
			}
		}
		return true;
	}
?>