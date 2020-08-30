<?php
ini_set('display_errors',1);
require_once('v1/siar_api.php');

$api = new siar();
$init = $api->init();
if($init) echo "successful";
else echo "not initialized";
?>