<?php
require_once('../v1/siar_api.php');
$api = new siar();

if(isset($_POST['btnLogin'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    $signin = $api->signin($username,$password);
    echo json_encode($signin);
}
else if(isset($_POST['btnRegister'])){
    $user = $_POST;
    unset($user['btnRegister']);
    echo json_encode($user);
}
else{
    $res['msg'] = "Invalid Request";
    echo json_encode($res);
}
?>