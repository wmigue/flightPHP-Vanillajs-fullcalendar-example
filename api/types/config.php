<?php
$singleton = 0; //0: dev 1: prod
$config['prodURL'] = 'https://nutribarf.ar';
$config['devURL'] = 'http://localhost:8080/25-3-2023%20nutribarf/public_html';

if ($singleton == 1) {
    $config['serverURL'] = $config['prodURL'];
    $config['emailAdmin'] = 'wmigue@gmail.com, mcorrea0512@gmail.com';
    $config['indexParametroUrl'] = 3;
} else {
    $config['serverURL'] = $config['devURL'];
    $config['emailAdmin'] = 'wmigue@gmail.com';
    $config['indexParametroUrl'] = 5;
}

$config['confirmarCuentaURL'] = $config['serverURL'] . '/api/confirmarUsuario';
$config['cambiarPassURL'] = $config['serverURL'] . '/api/update-password-form';
$config['ingresarURL'] = $config['serverURL'] . '/api/ingresar';
$config['logo1'] = 'https://nutribarf.ar/api/views-utils/img/logo_nutribarf.png';
