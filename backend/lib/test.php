<?php

	include('CONNECTSERVER.inc.php');
	if(ConnectToDefaultServer('testdatabase')){
		echo("YES");
	}else{
		echo("NO");
	}

?>