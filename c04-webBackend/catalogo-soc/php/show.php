<?php

require_once "config/database.php";
require_once "controllers/SocController.php";

if (!isset($_GET['id'])) {
    die("ID no especificado");
}

$controller = new SocController($pdo);
$soc = $controller->show($_GET['id']);

require_once "views/soc_detail.php";
