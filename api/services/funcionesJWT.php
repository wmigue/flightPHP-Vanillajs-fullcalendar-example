
<?php

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


function GenerarTOKEN($id, $email, $celular = '', $validez)
{
    $secret_key = "nutribarf";
   
    $exp_time = time() + (60 * $validez); //pasarle en minutos

    if (!empty($celular)) { //token usuario logueado
        $data = array(
            "id" => $id,
            "email" => $email,
            "celular"=>$celular,
            "exp" => $exp_time
        );
    }else{
        $data = array( //token solo para validar cuentas 
            "id" => $id,
            "email" => $email,
            "exp" => $exp_time
        );
    }

    // Crear el token
    $token = JWT::encode($data, $secret_key, 'HS256');

    return $token;
}





function verificarTOKEN($token)
{
    $secret_key = "nutribarf";
    try {
        $decoded = JWT::decode($token, new key($secret_key, 'HS256'));
        return $decoded; //de aqui extraigo los campos incrustados en el token .
    } catch (ExpiredException $e) {
        return 0;
    }
}
