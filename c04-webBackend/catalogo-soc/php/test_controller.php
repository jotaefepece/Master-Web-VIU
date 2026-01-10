<?php

require_once "config/database.php";
require_once "controllers/SocController.php";

$controller = new SocController($pdo);
$socs = $controller->index();

print_r($socs);
