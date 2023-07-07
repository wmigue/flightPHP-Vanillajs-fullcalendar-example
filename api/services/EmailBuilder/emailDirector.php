<?php

class EmailDirector
{
    private $builder;

    public function __construct()
    {}

    public function setBuilder($b)
    {
        $this->builder = $b;
    }

    public function build()
    {
        $this->builder->send();
    }
}
