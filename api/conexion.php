<?php

namespace conexion; //defino para que solo pueda usarse desde este marrco de trabajo.

require './utils/flight-master/flight/Engine.php';

use flight\Engine;


class Conexion extends Engine
{
    private $user = 'nutribar_admin';
    private $pass = 'tupass';
    private $host = 'nutribarf.ar';
    private $db = 'nutribar_admin';
    private $motor = 'mysqli';
    private $alias = 'conexionDB';

    public function getCadena() 
    {
        $cadena = new \mysqli($this->host, $this->user, $this->pass, $this->db );
        $cadena->set_charset("utf8");
        return [$this->alias, $this->motor, $cadena];
    }

    public function getCadenaDEV()
    {
        $conexion=new \mysqli('localhost','root','0', 'db');
        $conexion->set_charset("utf8");
        return $conexion;
    }
}


