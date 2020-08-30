<?php
require_once('../v1/siar_api.php');
 header('Access-Control-Allow-Origin: https://siar-sdg.herokuapp.com');
      header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
      header('Access-Control-Max-Age: 1000');
      header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
      
$api = new siar();

$content = file_get_contents("php://input");
$params = json_decode($content,true);

if(isset($params['btnLogin'])){
    $username = $params['username'];
    $password = $params['password'];

    $signin = $api->signin($username,$password);
    echo json_encode($signin);
}
else if(isset($params['btnRegister'])){
    $user = $params;
    unset($user['btnRegister']);
    echo json_encode($user);
}
else{
    $res['msg'] = "Invalid Request";
    echo json_encode($res);
}
?>