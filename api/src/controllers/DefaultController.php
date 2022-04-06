<?php

require_once 'AppController.php';

class DefaultController extends AppController
{
    public function index() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');
        http_response_code(200);
        echo json_encode("Dziaa");
    }

    public function test() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');
        http_response_code(200);
        echo json_encode("test");
    }
}