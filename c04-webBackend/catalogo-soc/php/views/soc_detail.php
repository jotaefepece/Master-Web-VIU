
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Detalle SoC</title>
</head>
<body>

<h1>Detalle del SoC</h1>

<ul>
    <li><strong>ID:</strong> <?= htmlspecialchars($soc['id']) ?></li>
    <li><strong>Modelo:</strong> <?= htmlspecialchars($soc['nombre_modelo']) ?></li>
    <li><strong>Arquitectura:</strong> <?= htmlspecialchars($soc['arquitectura']) ?></li>
    <li><strong>Frecuencia:</strong> <?= htmlspecialchars($soc['frecuencia_mhz']) ?> MHz</li>
    <li><strong>Fabricante:</strong> <?= htmlspecialchars($soc['fabricante']) ?></li>
    <li><strong>Categoría:</strong> <?= htmlspecialchars($soc['categoria']) ?></li>
    <li><strong>Descripción:</strong> <?= htmlspecialchars($soc['descripcion']) ?></li>
</ul>

<a href="index.php">← Volver al listado</a>

</body>
</html>
