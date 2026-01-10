<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Catálogo de SoC</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 80%; margin: 20px auto; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        h1 { text-align: center; }
    </style>
</head>
<body>

<h1>Catálogo de Sistemas en un Chip (SoC)</h1>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Arquitectura</th>
            <th>Frecuencia (MHz)</th>
            <th>Fabricante</th>
            <th>Categoría</th>
	    <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($socs as $soc): ?>
        <tr>
            <td><?= htmlspecialchars($soc['id']) ?></td>
            <td><?= htmlspecialchars($soc['nombre_modelo']) ?></td>
            <td><?= htmlspecialchars($soc['arquitectura']) ?></td>
            <td><?= htmlspecialchars($soc['frecuencia_mhz']) ?></td>
            <td><?= htmlspecialchars($soc['fabricante']) ?></td>
            <td><?= htmlspecialchars($soc['categoria']) ?></td>
	    <td>
    	    <a href="show.php?id=<?= $soc['id'] ?>">Ver</a> |
    	    <a href="edit.php?id=<?= $soc['id'] ?>">Editar</a>
    	    </td>

        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

</body>
</html>
