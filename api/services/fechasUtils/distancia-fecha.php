<?php

//input: '2023-04-22T01:00'
//output: integer
function distanciaAFecha($fecha)
{
    $fecha1 = new DateTime($fecha);
    $fecha2 = new DateTime(); // fecha actual
    $intervalo = date_diff($fecha1, $fecha2);
    $dias = $intervalo->format('%a'); 
        //echo "La distancia en días es: " . $dias . "dias.";
    return $dias; //integer

}
