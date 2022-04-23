<?php

class AppController
{
    private $request;

    public function __construct()
    {
        $this->request = $_SERVER['REQUEST_METHOD'];
    }

    protected function isPost(): bool
    {
        return $this->request === 'POST';
    }

    protected function getRequest($type) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');

        $data = file_get_contents("php://input");

        if(!($this->request === $type) || empty($data)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $request = json_decode($data);

        if(empty($request)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        return $request;
    }

}