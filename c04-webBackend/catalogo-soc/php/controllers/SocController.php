<?php

require_once __DIR__ . "/../models/SocModel.php";

class SocController
{
    private $model;

    public function __construct($pdo)
    {
        $this->model = new SocModel($pdo);
    }

    public function index()
    {
        return $this->model->getAllSoc();
    }
    public function show($id)
    {
        return $this->model->getSocById($id);
    }
    public function updateFrequency($id, $frecuencia)
    {
        if ($frecuencia <= 0) {
            return false;
        }
        return $this->model->updateFrequency($id, $frecuencia);
    }

}
