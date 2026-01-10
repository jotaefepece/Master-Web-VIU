<?php

require_once "config/database.php";
require_once "models/SocModel.php";

$model = new SocModel($pdo);
$socs = $model->getAllSoc();

print_r($socs);
