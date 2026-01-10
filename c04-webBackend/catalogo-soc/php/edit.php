<?php

require_once "config/database.php";
require_once "controllers/SocController.php";

if (!isset($_GET['id'])) {
    die("ID no especificado");
}

$controller = new SocController($pdo);
$soc = $controller->show($_GET['id']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $frecuencia = intval($_POST['frecuencia']);

    if ($controller->updateFrequency($_GET['id'], $frecuencia)) {
        header("Location: index.php");
        exit;
    } else {
        echo "❌ Error al actualizar la frecuencia";
    }
}

require_once "views/soc_edit.php";
