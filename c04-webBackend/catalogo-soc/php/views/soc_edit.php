<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar SoC</title>
</head>
<body>

<h1>Editar frecuencia del SoC</h1>

<p><strong>Modelo:</strong> <?= htmlspecialchars($soc['nombre_modelo']) ?></p>

<form method="post">
    <label>
        Frecuencia (MHz):
        <input type="number" name="frecuencia" value="<?= htmlspecialchars($soc['frecuencia_mhz']) ?>" required>
    </label>
    <br><br>
    <button type="submit">Guardar cambios</button>
</form>

<a href="index.php">← Volver al listado</a>

</body>
</html>
