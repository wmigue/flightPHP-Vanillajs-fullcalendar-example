<?php

class UsersController
{
    private $conexion;
    private $config;

    public function __construct($conn, $config)
    {

        $this->conexion = $conn;
        $this->config = $config;
    }

    public function getAllUsersData()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        $tokenDecoded = verificarTOKEN($token[1]);
        $id_user = $tokenDecoded->id;
        $email_user = $tokenDecoded->email;
        $celular_user = $tokenDecoded->celular;
        $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios WHERE role = ? ");
        $role = 'user';
        if ($result->bind_param("s", $role)) {
            $result->execute();
            $r = $result->get_result();
            if ($r->num_rows > 0) {
                $assoc = $r->fetch_all(MYSQLI_ASSOC);
                $usuarios = [];
                foreach ($assoc as $k => $v) {
                    $usuarios[$k] = $v;
                }
                echo json_encode(array('response' => 1, 'todosLosUsuarios' => $usuarios));
            } else {
                echo json_encode(array('response' => 0));
            }
        } else {
            echo json_encode(array('response' => 0));
        }
    }




    public function desactivarUsuario()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        $tokenDecoded = verificarTOKEN($token[1]);
        $id_user = $tokenDecoded->id;
        $email_user = $tokenDecoded->email;
        $celular_user = $tokenDecoded->celular;
        $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios WHERE id = ? and email = ? and celular = ? and role = ? ");
        $role = 'admin';
        try {
            $result->bind_param("ssss", $id_user, $email_user, $celular_user, $role);
            $result->execute();
            $r = $result->get_result();
            if ($r->num_rows > 0) {
                $DATA = json_decode($_POST['idUser'], true);
                $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET verificado = CASE verificado WHEN 1 THEN 0 ELSE 1 END WHERE id = ? ");
                $result->bind_param("s", $DATA);
                $result->execute();
                echo json_encode(array('response' => 1, 'userActualizado' => $DATA));
            } else {
                echo json_encode(array('response' => 0));
            }
        } catch (Throwable $e) {
            echo json_encode(array('response' => 0, 'erroMessage' => $e->getMessage()));
        }
    }





    public function eliminarUsuario()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        $tokenDecoded = verificarTOKEN($token[1]);
        $id_user = $tokenDecoded->id;
        $email_user = $tokenDecoded->email;
        $celular_user = $tokenDecoded->celular;
        $role = 'admin';
        $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios WHERE id = ? AND email = ? AND role = ? ");
        try {
            $result->bind_param("sss", $id_user, $email_user, $role);
            $result->execute();
            $r = $result->get_result();
            if ($r->num_rows > 0) {
                $eliminar = $_POST['id'];
                $role = 'user';
                $result = $this->conexion->prepare("DELETE FROM nutribarf_usuarios WHERE id = ? AND role = ? ");
                $result->bind_param("ss", $eliminar, $role);
                $result->execute();
                echo json_encode(array('response' => 1, 'id' => $eliminar));
            } else {
                echo json_encode(array('response' => 0));
            }
        } catch (Throwable $e) {
            echo json_encode(array('response' => 0, 'message' => $e->getMessage()));
        }
    }






    public function insertOne()
    {
        $DATA = json_decode($_POST['data'], true);
        //echo ($DATA[0]['mascotas'][0]['nombre']);

        $mascotas = [];
        foreach ($DATA[0]['mascotas'] as $k => $v) {
            SubirAdjunto($DATA[0]['mascotas'][$k]['imagen'], 'archivo' . $k);
            foreach ($v as $k2 => $v2) {
                $mascotas[$k][$k2] = $v2;
            }
        }

        foreach ($mascotas as $k => $v) {
            foreach ($v as $k2 => $v2) {
                //echo $v2; //nombre , raza , edad, peso de cada uno
            }
        }

        $cliente = [];
        foreach ($DATA[1]['datosCliente'] as $k => $v) {
            foreach ($v as $k2 => $v2) {
                $cliente[$k2] = $v2;
            }
        }
        //echo $cliente['name']; //imprime segun key asociativo.

        //comienzo una transaccion mysql. (se ejecuta antes de persistir datos por si algo falla)
        $this->conexion->begin_transaction();
        if (!existeUsuario($cliente['email'], $this->conexion)) {
            try {
                $result = $this->conexion->prepare("insert into nutribarf_usuarios(nombreCompleto, email, pass, localidad, provincia, direccion, celular, mascotas, calendario) values(?, ?, ?, ?, ?, ?, ?, ?, ?)") or die("error en base de datos" . $this->conexion->error);
                $json = json_encode($mascotas);
                $calendario = '[]';
                $result->bind_param("sssssssss", $cliente['name'], $cliente['email'], $cliente['pass'], $cliente['localidad'], $cliente['provincia'], $cliente['direccion'], $cliente['celular'], $json, $calendario);
                $result->execute();
                $id_generado = $this->conexion->insert_id; // Obtener el ID generado.
                $this->conexion->commit(); //aplico cambios a las 2 consultas anteriores en bd.
                $tokenParaValidarCuenta = GenerarTOKEN($id_generado, $cliente['email'], '', 1440); //le paso un dia de validez
                $emailDirector = new EmailDirector();
                $emailBuilder = new EmailBuilder2($cliente['email'], 'Click para validar registro: ', $tokenParaValidarCuenta);
                $emailBuilder->setLogoURL($this->config['logo1']);
                $emailBuilder->setServidorURL($this->config['confirmarCuentaURL']);
                $emailBuilder->setRemitenteName('Nutribarf');
                $emailBuilder->setRemitenteEmail('ventas@nutribarf.ar');
                $emailDirector->setBuilder($emailBuilder);
                $emailDirector->build();
                //email to admin:
                $emailBuilder = new EmailBuilder1($this->config['emailAdmin'], 'se registro el usuario: ' . $cliente["email"] . ' a NUTRIBARF.AR', $this->config['logo1'], 'NUTRIBARF', 'AVISO AL USUARIO - NUTRIBARF');
                $emailBuilder->setRemitenteName('Nutribarf');
                $emailBuilder->setRemitenteEmail('ventas@nutribarf.ar');
                $emailDirector->setBuilder($emailBuilder);
                $emailDirector->build();
                echo json_encode(array('response' => 1));
            } catch (Throwable $e) {
                $this->conexion->rollback(); //no aplico ningun cambio a ninguna de las tablas en bases de datos.
                echo json_encode(array('response' => 0, 'errorMessage' => $e->getMessage()));
            }
        } else {
            echo json_encode(array('response' => 0, 'errorMessage' => 'ya existe ese usuario en BD'));
        }
        $this->conexion->close();
    }




    public function confirmarUsuario()
    {
        $url = $_SERVER['REQUEST_URI']; //extraigo parametros de url/parametro1/parametro2 em un array.
        $parametros = explode('/', $url);
        $token = $parametros[$this->config['indexParametroUrl']];
        //echo $token;
        try {
            $tokenDecoded = verificarTOKEN($token);
            $id_user = $tokenDecoded->id;
            $email_user = $tokenDecoded->email;
            $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios WHERE id = ? AND email = ? ");
            $result->bind_param("ss", $id_user, $email_user);
            $result->execute();
            $r = $result->get_result();
            if ($r->num_rows > 0) {
                $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET verificado = 1 WHERE id = ? AND email = ? ");
                $result->bind_param("ss", $id_user, $email_user);
                $result->execute();
                Flight::render('usuarioConfirmado.view', array('response' => 1));
            } else {
                Flight::render('usuarioConfirmado.view', array('response' => 0));
            }
        } catch (Throwable $e) {
            Flight::render('usuarioConfirmado.view', array('response' => 0, 'errorMessage' => $e));
        }
    }





    public function login()
    {
        $DATA = json_decode($_POST['data'], true); //print_r($DATA);

        foreach ($DATA as $k => $v) {
            foreach ($v as $k2 => $v2) {
                $cliente[$k2] = $v2;
            }
        }

        try {
            $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios WHERE email = ? AND pass = ? AND verificado = 1 ") or die("error en base de datos" . $this->conexion->error);
            $result->bind_param("ss", $cliente['email'], $cliente['pass']);
            $result->execute();
            $result = $result->get_result();
            $registros = $result->num_rows;
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            foreach ($rows as $k => $v) {
                $tipo[$k] = $v;
            }
            if ($registros > 0) {
                $token = GenerarTOKEN($tipo[0]['id'], $tipo[0]['email'], $tipo[0]['celular'], 70); //15  PARA 15MIN
                echo json_encode(array('response' => 1, 'token' => $token));
            } else {
                echo json_encode(array('response' => 0, 'errorMessage' => 'credenciales incorrectas'));
            }
            //$tokenParaValidarCuenta = GenerarTOKEN($id_user, $cliente['email'], '', 1440);
        } catch (Throwable $e) {
            echo json_encode(array('response' => 0, 'errorMessage' => $e->getMessage()));
        }
    }







    public function sessionTokenVerify()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        $tokenDecoded = verificarTOKEN($token[1]);
        if ($tokenDecoded !== 0) {
            $id_user = $tokenDecoded->id;
            $email_user = $tokenDecoded->email;
            $celular_user = $tokenDecoded->celular;
            $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios where id = ? AND email = ? AND celular=? ");
            if ($result->bind_param("sss", $id_user, $email_user, $celular_user)) {
                $result->execute();
                $r = $result->get_result();
                $assoc = $r->fetch_all(MYSQLI_ASSOC);
                echo json_encode(array('response' => 1, 'user' => $assoc[0]['nombreCompleto'], 'mascotas' => $assoc[0]['mascotas']));
            } else {
                echo json_encode(array('response' => 0));
            }
        } else {
            echo json_encode(array('response' => 0));
        }
    }









    public function getUserData()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        $tokenDecoded = verificarTOKEN($token[1]);
        $id_user = $tokenDecoded->id;
        $email_user = $tokenDecoded->email;
        $celular_user = $tokenDecoded->celular;
        $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios where id = ? AND email = ? AND celular=? ");
        if ($result->bind_param("sss", $id_user, $email_user, $celular_user)) {
            $result->execute();
            $r = $result->get_result();
            if ($r->num_rows > 0) {
                $assoc = $r->fetch_all(MYSQLI_ASSOC);
                $mascotas = $assoc[0]['mascotas'];
                $usuario = [];
                unset($assoc[0]['pass']); //elimino el pass del array.
                unset($assoc[0]['mascotas']); //elimino mascotas del array.
                foreach ($assoc as $k => $v) {
                    $usuario[$k] = $v;
                }
                echo json_encode(array('response' => 1, 'mascotas' => $mascotas, 'usuario' => $usuario));
            } else {
                echo json_encode(array('response' => 0));
            }
        } else {
            echo json_encode(array('response' => 0));
        }
    }




    public function updateMascotas()
    {
        try {
            $token = $_SERVER["HTTP_AUTHORIZATION"];
            $token = explode(" ", $token);
            $tokenDecoded = verificarTOKEN($token[1]);
            $id_user = $tokenDecoded->id;
            $json = $_POST['arrayMascotasActualizado'];
            if (isset($_POST['imagenNuevaName'])) {
                $imgName = $_POST['imagenNuevaName'];
                SubirAdjunto($imgName, 'imagenFile1');
            }
            $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET mascotas = ? WHERE id = ? ");
            if ($result->bind_param("ss", $json, $id_user)) {
                $result->execute();
                echo json_encode(array('response' => 1));
            } else {
                echo json_encode(array('response' => 0));
            }
        } catch (Throwable $e) {
            echo $e->getMessage();
        }
    }





    public function eliminarEventoCalendario()
    {
        try {
            $token = $_SERVER["HTTP_AUTHORIZATION"];
            $token = explode(" ", $token);
            $tokenDecoded = verificarTOKEN($token[1]);
            $id_user = $tokenDecoded->id;
            $idEventoAEliminar = $_POST['idEventoAEliminar'];
            $result = $this->conexion->prepare("SELECT calendario FROM nutribarf_usuarios WHERE id = ? ");
            $result->bind_param("s", $id_user);
            $result->execute();
            $r = $result->get_result();
            $jsonCalendario = $r->fetch_all(MYSQLI_ASSOC);
            $arrayPHP = json_decode($jsonCalendario[0]['calendario']);
            //print_r($arrayPHP);
            $count = count($arrayPHP);
            foreach ($arrayPHP as $k => $v) {
                if ($v->id == $idEventoAEliminar) {
                    unset($arrayPHP[$k]); //quito ese objeto del array.
                };
            }
            // mantener los índices numéricos originales después de eliminar un elemento (sin esto no funcionara)
            $arrayPHP = array_values($arrayPHP);
            //convert to json
            $jsonNuevo = json_encode($arrayPHP);
            if (count($arrayPHP) < $count) {
                $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET calendario = ? WHERE id = ? ");
                $result->bind_param("ss", $jsonNuevo, $id_user);
                $result->execute();
            }
            echo json_encode(array('response' => 1, 'arrayModificado' => $arrayPHP));
        } catch (Throwable $e) {
            echo $e->getMessage();
        }
    }










    public function eliminarMascota()
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// ejemplo iterando un array json en el lado del backend //////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    {
        try {
            $token = $_SERVER["HTTP_AUTHORIZATION"];
            $token = explode(" ", $token);
            $tokenDecoded = verificarTOKEN($token[1]);
            $id_user = $tokenDecoded->id;
            $idMascotaAEliminar = $_POST['id'];
            $result = $this->conexion->prepare("SELECT mascotas FROM nutribarf_usuarios WHERE id = ? ");
            $result->bind_param("s", $id_user);
            $result->execute();
            $r = $result->get_result();
            $jsonM = $r->fetch_all(MYSQLI_ASSOC);
            $arrayPHP = json_decode($jsonM[0]['mascotas']);
            $count = count($arrayPHP);
            //print_r( $arrayPHP);
            foreach ($arrayPHP as $k => $v) {
                if ($v->id == $idMascotaAEliminar) {
                    unset($arrayPHP[$k]); //quito ese objeto del array.
                };
            }
            // mantener los índices numéricos originales después de eliminar un elemento (sin esto no funcionara)
            $arrayPHP = array_values($arrayPHP);
            //convert to json
            $jsonNuevo = json_encode($arrayPHP);
            if (count($arrayPHP) < $count) {
                $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET mascotas = ? WHERE id = ? ");
                $result->bind_param("ss", $jsonNuevo, $id_user);
                $result->execute();
            }
            echo json_encode(array('response' => 1, 'arrayModificado' => $arrayPHP));
        } catch (Throwable $e) {
            echo $e->getMessage();
        }
    }









    public function updateUsuario()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        $tokenDecoded = verificarTOKEN($token[1]);
        $id_user = $tokenDecoded->id;
        $email_user = $tokenDecoded->email;
        $DATA = json_decode($_POST['data'], true);
        try {
            $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET nombreCompleto = ?, localidad = ?, provincia = ?, celular = ?, email = ? WHERE id = ? AND email = ? ");
            $result->bind_param("sssssss",  $DATA['nombre'],  $DATA['localidad'],  $DATA['provincia'],  $DATA['celular'],  $DATA['email'], $id_user, $email_user);
            $result->execute();
            echo json_encode(array('response' => 1));
        } catch (Throwable $e) {
            echo json_encode(array('response' => 0, 'exception' => $e->getMessage()));
        }
    }







    public function emailUpdatePassword()
    {
        $DATA = json_decode($_POST['data'], true);
        $email_user = $DATA['email'];
        $result = $this->conexion->prepare("SELECT id FROM nutribarf_usuarios WHERE email = ?");
        $result->bind_param("s", $email_user);
        $result->execute();
        $r = $result->get_result();
        if ($r->num_rows > 0) {
            $assoc = $r->fetch_all(MYSQLI_ASSOC);
            $id_user = $assoc[0]['id'];
            $tokenParaValidarCuenta = GenerarTOKEN($id_user, $email_user, '', 1440);
            $emailDirector = new EmailDirector();
            $emailBuilder = new EmailBuilder2($email_user, 'cambia tu password en: ', $tokenParaValidarCuenta);
            $emailBuilder->setLogoURL($this->config['logo1']);
            $emailBuilder->setServidorURL($this->config['cambiarPassURL']);
            $emailBuilder->setRemitenteName('Nutribarf');
            $emailBuilder->setRemitenteEmail('ventas@nutribarf.ar');
            $emailDirector->setBuilder($emailBuilder);
            $emailDirector->build();
            echo json_encode(array('response' => 1));
        } else {
            echo json_encode(array('response' => 0));
        }
    }



    public function formUpdatePassword()
    {
        $url = $_SERVER['REQUEST_URI']; //extraigo parametros de url/parametro1/parametro2 em un array.
        $parametros = explode('/', $url);
        $token = $parametros[$this->config['indexParametroUrl']];
        //echo $token;
        try {
            $tokenDecoded = verificarTOKEN($token);
            $id_user = $tokenDecoded->id;
            $email_user = $tokenDecoded->email;
            $result = $this->conexion->prepare("SELECT * FROM nutribarf_usuarios WHERE id = ? AND email = ? ");
            $result->bind_param("ss", $id_user, $email_user);
            $result->execute();
            $r = $result->get_result();
            if ($r->num_rows > 0) {
                Flight::render('cambiarPassword.view', array('response' => 1, 'email' => $email_user, 'token' => $token));
            } else {
                Flight::render('cambiarPassword.view', array('response' => 0));
            }
        } catch (Throwable $e) {
            Flight::render('cambiarPassword.view', array('response' => 0, 'errorMessage' => $e));
        }
    }



    public function updatePassword()
    {
        $token = $_SERVER["HTTP_AUTHORIZATION"];
        $token = explode(" ", $token);
        $tokenDecoded = verificarTOKEN($token[1]);
        $id_user = $tokenDecoded->id;
        $email_user = $tokenDecoded->email;
        $DATA = json_decode($_POST['data'], true);
        try {
            $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET pass = ? WHERE email = ? AND id = ? ");
            $result->bind_param("ssi", $DATA['newPass'], $email_user, $id_user);
            $result->execute();
            echo json_encode(array('response' => 1));
        } catch (Throwable $e) {
            echo json_encode(array('response' => 0, 'exception' => $e->getMessage()));
        }
    }




    public function getCalendario()
    {
        $id_user = Flight::get('id_user'); //viene del req del middleware autenticator /protegida/
        Flight::clear(); //borra todas las variables que vienen del middleware.
        try {
            $result = $this->conexion->prepare("SELECT calendario FROM nutribarf_usuarios WHERE id= ? ");
            $result->bind_param("i", $id_user);
            $result->execute();
            $r = $result->get_result();
            $assoc = $r->fetch_all(MYSQLI_ASSOC);
            foreach ($assoc as $k => $v) {
                $eventosCalendario = $v;
            }
            echo json_encode(array('response' => 1, 'eventosCalendario' => $eventosCalendario['calendario']));
        } catch (Throwable $e) {
            echo json_encode(array('response' => 0, 'exception' => $e->getMessage()));
        }
    }




    public function addCalendarioEvento()
    {
        $id_user = Flight::get('id_user'); //viene del req del middleware autenticator /protegida/
        Flight::clear(); //borra todas las variables.
        $DATA = $_POST['data'];
        try {
            $result = $this->conexion->prepare("UPDATE nutribarf_usuarios SET calendario = ? WHERE id = ? ");
            $result->bind_param("si", $DATA, $id_user);
            $result->execute();
            echo json_encode(array('response' => 1));
        } catch (Throwable $e) {
            echo json_encode(array('response' => 0, 'exception' => $e->getMessage()));
        }
    }






    public function MailRecordatorioEventosProximos()
    {   //////////////////////////////////////
        //configurar como CRON desde CPANEL.//
        //////////////////////////////////////
        $arrEventosCerca = array();

        try {
            $result = $this->conexion->prepare("SELECT email, calendario FROM nutribarf_usuarios ");
            //$result->bind_param("i", $id_user);
            $result->execute();
            $r = $result->get_result();
            $assoc = $r->fetch_all(MYSQLI_ASSOC);
            // print_r($assoc);

            foreach ($assoc as $k => $v) {
                $arrCal = json_decode($v['calendario']);
                if (!empty($arrCal)) {
                    //echo  $v['email'];
                    //echo  "<br>";
                    foreach (json_decode($v['calendario']) as $obj) {
                        $distancia = distanciaAFecha($obj->start);
                        if ($distancia == 0) {
                            //echo  $obj->start .': " '. $obj->title . ' "  <br>' ;
                            $arrEventosCerca[$v['email']][] = '<b>FECHA:</b> ' . formatearddmmyyyyHora($obj->start)  . 'hs. <b>EVENTO:</b> " ' . $obj->title . ' "  <br>';
                        }
                    }

                    foreach ($arrEventosCerca as $k => $v) {
                        $emailTo = '';
                        $cuerpoDelMail = '';
                        $emailTo = $k;
                        //echo $k . '<br>';
                        foreach ($v as $k2 => $v2) {
                            //echo $v2;
                            $cuerpoDelMail = $cuerpoDelMail . $v2;
                        }
                        echo '<br>';
                        echo $emailTo;
                        echo 'NUTRIBARF TE AVISA QUE TENES LOS SIGUIENTES EVENTOS PROXIMOS: <br>' . $cuerpoDelMail;

                        $cuerpoParaEnviar = $cuerpoDelMail;
                        $emailParaEnviar = $emailTo;
                        $eventosProx = 'Hola ' . $emailParaEnviar . '<br>Tenés los siguientes eventos próximos: <br>' . $cuerpoParaEnviar;
                        // aca envio el mail //
                        $emailDirector = new EmailDirector();
                        $emailBuilder = new EmailBuilder1($emailTo, $eventosProx, $this->config['logo1'], 'NUTRIBARF', 'RECORDATORIO DE EVENTOS EN CALENDARIO');
                        $emailBuilder->setRemitenteName('Nutribarf');
                        $emailBuilder->setRemitenteEmail('ventas@nutribarf.ar');
                        $emailDirector->setBuilder($emailBuilder);
                        $emailDirector->build();
                        ///////////////////////
                    }
                }
            }
        } catch (Throwable $e) {
            echo $e->getMessage();
        }
    }




    public function contactarForm()
    {
        $mensaje = 'NOMBRE: ' . $_POST['t1'] . ' EMAIL: ' . $_POST['t2'] . '<br>TEMA: ' .  $_POST['t3'] . '<br>MENSAJE: ' . $_POST['t4'];
        $emailDirector = new EmailDirector();
        $emailBuilder = new EmailBuilder1($this->config['emailAdmin'], $mensaje, $this->config['logo1'], 'NUTRIBARF', 'Alguien envio un mensaje desde NUTRIBARF');
        $emailBuilder->setRemitenteName('Nutribarf');
        $emailBuilder->setRemitenteEmail('ventas@nutribarf.ar');
        $emailDirector->setBuilder($emailBuilder);
        $emailDirector->build();
        echo json_encode(array(
            'response' => 1,
            'mensaje' => $mensaje,
        ));
    }
}
