<?php

require './utils/flight-master/flight/core/Dispatcher.php';
require './utils/flight-master/flight/core/Loader.php';
require './utils/flight-master/flight/net/Route.php';
require './utils/flight-master/flight/Flight.php';
require './utils/flight-master/flight/util/Collection.php';
require './controllers/Users.controller.php';
require './middlewares/authenticaction.php';
require './services/existeUsuario.php';
require './services/funcionesJWT.php';
require './services/fechasUtils/distancia-fecha.php';
require './services/fechasUtils/formateo-fecha.php';
require './services/subir-adjuntos.php';
foreach (glob("./services/EmailBuilder/*.php") as $filename) {
    require $filename;
}
require './utils/php-jwt-6.0.0/src/JWT.php';
require './utils/php-jwt-6.0.0/src/Key.php';
require './utils/php-jwt-6.0.0/src/ExpiredException.php';

require './types/config.php';
require './conexion.php';


use conexion\Conexion;
use middlewares\AuthMiddleware;
use flight\Engine;



$conexion = new Conexion();
$cadena = $conexion->getCadena();

$app = new Engine();

//PATH VIEWS
$app->set('flight.views.path', 'views'); //seteo las rutas de los archivos a renderizar.



//MIDDLEWARES
$app->route('POST /protegida/*', [new AuthMiddleware($cadena[2]), 'executer']);



//RENDERS
$app->route('GET /', function () {
    Flight::render('inicio.view');
});

$app->route('GET /ingresar', function () {
    Flight::render('ingresar.view');
});

$app->route('GET /registro', function () {
    Flight::render('registrousuario.view');
});

$app->route('GET /confirmeUsuario/@email', function ($email) {
    Flight::render('confirmeUsuario.view', array('email' => $email));
});

$app->route('GET /data', function () {
    Flight::render('data.view');
});

$app->route('GET /carrito', function () {
    Flight::render('carrito.view');
});

$app->route('GET /calendario', function () {
    Flight::render('calendario.view');
});

$app->route('GET /nosotros', function () {
    Flight::render('nosotros.view');
});

$app->route('GET /producto', function () {
    Flight::render('producto.view');
});

$app->route('GET /contacto', function () {
    Flight::render('contacto.view');
});







//ROUTES
$app->route('POST /desactivar-user', [new UsersController($cadena[2], $config), 'desactivarUsuario']);
$app->route('POST /email-update-password', [new UsersController($cadena[2], $config), 'emailUpdatePassword']);
$app->route('GET /update-password-form/@token', [new UsersController($cadena[2], $config), 'formUpdatePassword']);
$app->route('POST /update-password', [new UsersController($cadena[2], $config), 'updatePassword']);
$app->route('POST /protegida/get-calendario', [new UsersController($cadena[2], $config), 'getCalendario']);
$app->route('POST /protegida/add-evento', [new UsersController($cadena[2], $config), 'addCalendarioEvento']);
$app->route('POST /protegida/update-usuario', [new UsersController($cadena[2], $config), 'updateUsuario']);
$app->route('POST /protegida/update-mascotas', [new UsersController($cadena[2], $config), 'updateMascotas']);
$app->route('POST /protegida/misDatos', [new UsersController($cadena[2], $config), 'getUserData']);
$app->route('POST /protegida/all-users-data', [new UsersController($cadena[2], $config), 'getAllUsersData']);
$app->route('GET /confirmarUsuario/@token', [new UsersController($cadena[2], $config), 'confirmarUsuario']);
$app->route('POST /insertOneUser', [new UsersController($cadena[2], $config), 'insertOne']);
$app->route('POST /loginUser', [new UsersController($cadena[2], $config), 'login']);
$app->route('POST /tokenIsValid', [new UsersController($cadena[2], $config), 'sessionTokenVerify']);
$app->route('POST /contactar', [new UsersController($cadena[2], $config), 'contactarForm']);
$app->route('POST /eliminar-user', [new UsersController($cadena[2], $config), 'eliminarUsuario']);
$app->route('POST /protegida/eliminar-mascota', [new UsersController($cadena[2], $config), 'eliminarMascota']);
$app->route('POST /protegida/eliminar-evento-calendario', [new UsersController($cadena[2], $config), 'eliminarEventoCalendario']);







//CRON JOBS
$app->route('GET /eventos-proximos', [new UsersController($cadena[2], $config), 'MailRecordatorioEventosProximos']);






$app->start();
















/* 
//PRUBAS 
$app->route('GET /test', function () {
    $idx = Flight::get('id_user');
    echo json_encode(array('idx' => $idx));
});


$app->route('POST /prueba', function () {
    $buscado = Flight::request()->data->ejemplo; // {ejemplo: value}
    echo $buscado;
});

$app->route('GET /prueba2', function () {
    $headers = apache_request_headers();
    print_r($headers['authorization']); //headers array.
});


 */








