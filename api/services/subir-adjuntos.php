<?php

function SubirAdjunto($nameToSave, $nameHowTosent)
{

    if (isset($_FILES[$nameHowTosent])) {
        $img= $_FILES[$nameHowTosent];
        $name = $img["name"];
        $temp_name = $img["tmp_name"];
        //directorio actual
        //$directorio = getcwd() . '\\adjuntos\\';
        //$directorio = $_SERVER['DOCUMENT_ROOT'] . "/adjuntos/";
        $directorio = getcwd() . "/adjuntos/";
        //extension del archivo
        $ext = pathinfo($name, PATHINFO_EXTENSION);
        // Muevo la imagen desde el directorio temporal a nuestro directorio
        if (!move_uploaded_file(
            $temp_name,
            $directorio . $nameToSave
        )) {
            throw new RuntimeException('error.');
        }
        return $directorio . $nameToSave;
    }
}
