
<?php

class SocModel
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllSoc()
    {
        $sql = "
            SELECT
                s.id,
                s.nombre_modelo,
                s.arquitectura,
                s.frecuencia_mhz,
                f.nombre AS fabricante,
                c.nombre AS categoria
            FROM soc s
            JOIN fabricantes f ON s.fabricante_id = f.id
            JOIN categorias_soc c ON s.categoria_id = c.id
            ORDER BY s.nombre_modelo;
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getSocById($id)
    {
        $sql = "
            SELECT
                s.id,
                s.nombre_modelo,
                s.arquitectura,
                s.frecuencia_mhz,
                s.descripcion,
                f.nombre AS fabricante,
                c.nombre AS categoria
            FROM soc s
            JOIN fabricantes f ON s.fabricante_id = f.id
            JOIN categorias_soc c ON s.categoria_id = c.id
            WHERE s.id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function updateFrequency($id, $frecuencia)
    {
        $sql = "
            UPDATE soc
            SET frecuencia_mhz = :frecuencia
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'frecuencia' => $frecuencia,
            'id' => $id
        ]);
    }


}
