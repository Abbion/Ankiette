<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/Form.php';
require_once __DIR__.'/../repository/FormRepository.php';
require_once __DIR__.'/../repository/UserRepository.php';

class FormController extends AppController {
    private $formRepository;
    private $userRepository;

    public function __construct() {
        parent::__construct();
        $this->formRepository = new FormRepository();
        $this->userRepository = new UserRepository();
    }

    public function addForm() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');

        $postData = file_get_contents("php://input");

        if(!$this->isPost() || empty($postData)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $request = json_decode($postData);

        $email = trim($request->email);
        $title = trim($request->title);

        $startDate = date("Y-m-d H:i:s", strtotime($request->startDate));
        $endDate = date("Y-m-d H:i:s", strtotime($request->endDate));

        if(empty($email) || empty($title) || empty($startDate) || empty($endDate)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $user = $this->userRepository->getUser($email);

        if(!$user) {
            http_response_code(400);
            echo json_encode("User does not exist");
            die();
        }

        date_default_timezone_set("Europe/Warsaw");
        $now = date("Y-m-d H:i:s");

        if($startDate <= $now || $endDate <= $startDate) {
            http_response_code(400);
            echo json_encode("Wrong start or end time");
            die();
        }

        $code = $this->generateCode();
        $form = new Form($title, $startDate, $endDate, $code);

        $this->formRepository->addForm($user, $form);
        http_response_code(200);
        echo json_encode($code);
    }

    private function generateCode(): string {
        $code = '';

        do {
            $string = str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

            for($i = 0; $i < 8; $i++) {
                $code .= $string[mt_rand(0, strlen($string) - 1)];
            }
        } while (!$this->formRepository->codeUnique($code));

        return $code;
    }
}