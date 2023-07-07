<?php

function existeUsuario($email, $conexion)
{
    $email = filter_var($email, FILTER_VALIDATE_EMAIL); //valida un email en backend.
    if ($email) {
        $result = $conexion->prepare("select email from nutribarf_usuarios where email = ? ") or die("error en base de datos" . $conexion->error);

        $result->bind_param("s", $email);

        $result->execute();

        $r = $result->get_result();

        if (mysqli_num_rows($r) > 0) { // si hay registros en db.
            //$assoc = $r->fetch_assoc();
            //$emailFound = $assoc['email'];
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}
