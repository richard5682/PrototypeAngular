<?php
	header('Access-Control-Allow-Origin: *');
	//THE DEFAULT SERVER ADDRESS/INFO
	$SERVER = 'localhost';
	$USERNAME = 'root';
	$PASSWORD = '';
	
	
	//THIS CAN BE USE FOR QUICK SINGLE CONNECTION TO THE DATABASE
	$SERVERCONNECTION = null;
	
	//THIS CAN BE USE FOR MULTIPLE DATABASE CONNECTION BY USING ASSOCIATIVE ARRAY TO
	//MANAGE THE CONNECTIONS
	$SERVERCONNECTIONS = array();
	
	//A METHOD TO CALL TO INITIALIZE THE CONNECTION/S
	//THIS IS THE FIRST METHOD TO CALL FOR EVERY DATABASE CONNECTION
	//FOR EASY CONNECTION THE LIBRARY USERS CAN USE THIS DEFAULT CONNECTION
	function ConnectToDefaultServer($databasename,$assoc_index=null){
		global $SERVER;
		global $USERNAME;
		global $PASSWORD;
		global $SERVERCONNECTION;
		global $SERVERSCONNECTION;
		if(!isset($assoc_index)){
			if($SERVERCONNECTION = @mysqli_connect($SERVER,$USERNAME,$PASSWORD)){
				if(@mysqli_select_db($SERVERCONNECTION,$databasename)){
					return true;
				}
				return false;
			}else{
				return false;
			}
		}else{
			if($SERVERCONNECTIONS[$assoc_index] = @mysqli_connect($SERVER,$USERNAME,$PASSWORD)){
				if(@mysqli_select_db($SERVERCONNECTIONS[$assoc_index],$databasename)){
					return true;
				}
				return false;
			}else{
				return false;
			}
		}
	}
	//THIS CAN SET A CONNECTION TO A DIFFERENT SERVER WITH A NULL ENTRY ITS THE SAME AS ConnecToDefaultServer();
	function ConnectToServer($databasename,$servername = null,$username = null,$password = null,
							$assoc_index = null){
		global $SERVER;
		global $USERNAME;
		global $PASSWORD;
		global $SERVERCONNECTION;
		global $SERVERSCONNECTION;
		if(!isset($servername)){
			$servername = $SERVER;
		}
		if(!isset($username)){
			$username = $USERNAME;
		}
		if(!isset($password)){
			$password = $PASSWORD;
		}
		if(!isset($assoc_index)){
			if($SERVERCONNECTION = @mysqli_connect($servername,$username,$password)){
				if(@mysqli_select_db($SERVERCONNECTION,$databasename)){
					return true;
				}
				return false;
			}else{
				return false;
			}
		}else{
			if($SERVERCONNECTIONS[$assoc_index] = @mysqli_connect($servername,$username,$password)){
				if(@mysqli_select_db($SERVERCONNECTIONS[$assoc_index],$databasename)){
					return true;
				}
				return false;
			}else{
				return false;
			}
		}
	}
	//CONSTRUCT A SELECT SQL WITH EASY SYNTAX
	function Construct_SELECTSQL($SELECT,$FROM,$WHERE,$VALUES){
		$buffer = 'SELECT ';
		$BOOL1 = false;
		foreach($SELECT as $collumn){
			if(!$BOOL1){
				$BOOL1 = true;
			}else{
				$buffer .= ",";
			}
			$buffer .= "`".$collumn."`";
		}
		$buffer .= " FROM `".$FROM."`";
		if(!empty($WHERE)){
			$buffer .= " WHERE ";
			$BOOL1 = false;
			for($i=0;$i<count($WHERE);$i++){
				if(!$BOOL1){
					$BOOL1 = true;
				}else{
					$buffer .= " AND ";
				}
				$buffer .= "`".$WHERE[$i]."` = '".$VALUES[$i]."'";
			}
		}
		return $buffer;
	}
	//CONSTRUCT A INSERT SQL EASILY
	function Construct_INSERTSQL($INSERT,$WHERE,$VALUES){
		$buffer = 'INSERT INTO '.$INSERT." (";
		$b=false;
		foreach($WHERE as $varname){
			if($b){
				$buffer .= ",";
			}else{
				$b=true;
			}
			$buffer .= "`".$varname."`";
		}
		$buffer .= ") VALUES (";
		$b=false;
		foreach($VALUES as $value){
			if($b){
				$buffer .= ",";
			}else{
				$b=true;
			}
			if($value != null){
				$buffer .= "'".$value."'";
			}else{
				$buffer .= "NULL";
			}
		}
		$buffer .= ")";
		return $buffer;
	}
	//CONSTRUCT A UPDATE SQL EASILY
	function Construct_UPDATESQL($UPDATE,$SET,$SVALUES,$WHERE,$WVALUES){
		$buffer = 'UPDATE `'.$UPDATE.'` SET ';
		$b=false;
		for($i=0;$i<count($SET);$i++){
			if($b){
				$buffer .= ",";
			}else{
				$b=true;
			}
			$buffer .= "`".$SET[$i]."` = '".$SVALUES[$i]."'";
		}
		$buffer .= " WHERE ";
		$b=false;
		for($i=0;$i<count($WHERE);$i++){
			if($b){
				$buffer .= " AND ";
			}else{
				$b=true;
			}
			$buffer .= "`".$WHERE[$i]."` = '".$WVALUES[$i]."'";
		}
		return $buffer;
	}
	
	///CONSTRUCT A DELETE SQL
	function Construct_DELETESQL($DELETE,$WHERE,$VALUES){
		$buffer = "DELETE FROM `".$DELETE."` WHERE ";
		$b=false;
		for($i=0;$i<count($WHERE);$i++){
			if($b){
				$buffer .= " AND ";
			}else{
				$b=true;
			}
			$buffer .= "`".$WHERE[$i]."` = '".$VALUES[$i]."'";
		}
		return $buffer;
	}
	//PROCESS A DELTE SQL
	function QUERY_DELETESQL($SQL,$ASSOCINDEX = null){
		global $SERVERCONNECTION;
		global $SERVERCONNECTIONS;
		if(isset($ASSOCINDEX)){
			$RESULT = mysqli_query($SERVERCONNECTIONS[$ASSOCINDEX],$SQL);
		}else{
			$RESULT = mysqli_query($SERVERCONNECTION,$SQL);
		}
		if($RESULT){
			return true;
		}
		return false;
	}
	//PROCESS A SQL IN A CONNECTION AND RETURN THE RESULT AS MULTI-DIMENSIONAL ARRAY
	function QUERY_SELECTSQL($SQL,$ASSOCINDEX = null){
		global $SERVERCONNECTION;
		global $SERVERCONNECTIONS;
		if(isset($ASSOCINDEX)){
			$REUSLT = mysqli_query($SERVERCONNECTIONS[$ASSOCINDEX],$SQL);
		}else{
			$RESULT = mysqli_query($SERVERCONNECTION,$SQL);
		}
		$DATA = array();
		if($RESULT){
			while($buffdata = mysqli_fetch_assoc($RESULT)){
				$DATA[] = $buffdata;
			}
			return $DATA;
		}
		return false;
	}
	function QUERY_INSERTSQL($SQL,$ASSOCINDEX = null){
		global $SERVERCONNECTION;
		global $SERVERCONNECTIONS;
		if(isset($ASSOCINDEX)){
			$RESULT = mysqli_query($SERVERCONNECTIONS[$ASSOCINDEX],$SQL);
		}else{
			$RESULT = mysqli_query($SERVERCONNECTION,$SQL);
		}
		if($RESULT){
			return true;
		}
		return false;
	}
	function QUERY_UPDATESQL($SQL,$ASSOCINDEX = null){
		global $SERVERCONNECTION;
		global $SERVERCONNECTIONS;
		if(isset($ASSOCINDEX)){
			$RESULT = mysqli_query($SERVERCONNECTIONS[$ASSOCINDEX],$SQL);
		}else{
			$RESULT = mysqli_query($SERVERCONNECTION,$SQL);
		}
		if($RESULT){
			return true;
		}
		return false;
	}
	function CONNECTIONS_CLOSE(){
		
	}
?>