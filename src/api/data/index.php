<?php
require_once('../v1/siar_api.php');
header('Access-Control-Allow-Origin: https://siar-sdg.herokuapp.com');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
      
$api = new siar();

if(isset($_GET['user']) && $_GET['user']=='all'){
    $users = $api->getAllUsers();
    echo json_encode($users);
}
?>