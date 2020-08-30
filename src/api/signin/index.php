<?php
ini_set("display_errors",1);
require_once("v1/siar_api.php");
$api = new siar();
if(isset($_POST['submit'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $signin = $api->signin($username,$password);
    if(!$signin){
        
    }
}



?>