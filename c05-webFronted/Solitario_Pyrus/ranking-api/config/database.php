<?php

$host = getenv('DB_HOST') ?: 'este-es-el-host.sa-east-1.aws.neon.tech';
$db   = getenv('DB_NAME') ?: 'neondb';
$user = getenv('DB_USER') ?: 'neondb_owner';
$pass = getenv('DB_PASS') ?: 'aquí-va-una-clave';

$dsn = "pgsql:host=$host;dbname=$db;sslmode=require";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("DB ERROR: " . $e->getMessage());
}
