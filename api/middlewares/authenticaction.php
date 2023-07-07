<?php

namespace middlewares;

use Flight;
use Throwable;

require './utils/flight-master/flight/net/Request.php';
require './utils/flight-master/flight/net/Response.php';
require './utils/flight-master/flight/net/Router.php';


class AuthMiddleware
{
    private $conexion;
    private $application;

    public function __construct($conn)
    {
        $this->conexion = $conn;
    }

    public function executer()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        //echo ($token[1]);
        try {
            $tokenDecoded = verificarTOKEN($token[1]);
            $id_user = $tokenDecoded->id;
            $email_user = $tokenDecoded->email;
            $celular_user = $tokenDecoded->celular;
            if ($tokenDecoded !== 0) {
                Flight::set('id_user', $id_user);
                Flight::set('email_user',  $email_user);
                Flight::set('celular_user', $celular_user);
                return true; // pasa a la siguiente ruta. next()
            } else {
                echo json_encode(array('response' => -1, 'errorMessage' => 'no autenticado'));
            }
        } catch (Throwable $e) {
            echo json_encode(array('response' => -1, 'errorMessage' => 'no autenticado', 'throw' => $e->getMessage()));
        }
    }
}
