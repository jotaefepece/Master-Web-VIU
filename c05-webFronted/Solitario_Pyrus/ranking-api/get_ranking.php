<?php
require_once __DIR__ . '/config/database.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("
        SELECT nick, score, created_at
        FROM scores
        ORDER BY score ASC, created_at ASC
        LIMIT 27
    ");

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load ranking']);
}
