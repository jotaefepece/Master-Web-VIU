<?php

$host = "ep-divine-mouse-ackjw0c7-pooler.sa-east-1.aws.neon.tech";
$dbname = "neondb";
$user = "neondb_owner";
$password = "npg_RweH6cm2hnLE";
$port = "5432";

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

} catch (PDOException $e) {
    die("❌ Error de conexión a la base de datos: " . $e->getMessage());
}

