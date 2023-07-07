<?php


require '../api/types/config.php';

// Establecer la URL del endpoint
$url = $config['serverURL'] . '/api/eventos-proximos';

// Inicializar curl
$ch = curl_init();

// Establecer las opciones de curl
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Ejecutar la solicitud y almacenar la respuesta
$response = curl_exec($ch);

// Cerrar la conexión curl
curl_close($ch);

// Mostrar la respuesta
echo $response;
?>