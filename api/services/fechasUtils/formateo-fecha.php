<?php

//input: '2023-04-22T01:00'
//output: 22-04-2023 / 01:00
function formatearddmmyyyyHora($fechahora)
{
    //Convertir la cadena en formato ISO8601 a un timestamp Unix
    $timestamp = strtotime($fechahora);
    //Formatear la fecha y hora en el formato deseado
    $fecha_formateada = date('d-m-Y / H:i', $timestamp);
    //echo $fecha_formateada; 
    return $fecha_formateada; 
}
