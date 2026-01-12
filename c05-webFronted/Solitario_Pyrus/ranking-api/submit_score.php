<?php
require __DIR__ . "/config/database.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$nick  = trim($data['nick'] ?? '');
$score = $data['score'] ?? null;

/* Validaciones mínimas */
if ($nick === '' || !is_numeric($score) || $score < 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
    exit;
}


/* Insertar puntaje */
$stmt = $pdo->prepare(
    "INSERT INTO scores (nick, score) VALUES (:nick, :score)"
);
$stmt->execute([
    ':nick'  => $nick,
    ':score' => (int)$score
]);

/* Mantener solo top 27 (MENOS movimientos es mejor) */
$pdo->exec("
    DELETE FROM scores
    WHERE id NOT IN (
        SELECT id FROM scores
        ORDER BY score ASC, created_at ASC
        LIMIT 27
    )
");


echo json_encode(["status" => "saved"]);
