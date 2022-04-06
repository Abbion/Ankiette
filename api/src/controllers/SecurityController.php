<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/User.php';
require_once __DIR__.'/../repository/UserRepository.php';

class SecurityController extends AppController {
    private $userRepository;

    public function __construct() {
        parent::__construct();
        $this->userRepository = new UserRepository();
    }

    public function login() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');

        $postData = file_get_contents("php://input");

        //email:    mail@mail.com
        //passwd:   12345

        if(!$this->isPost() || empty($postData)) {
            http_response_code(400);
            echo json_encode("Bad request");
        }
        else {
            $request = json_decode($postData);

            $email = $request->email;
            $password = $request->password;

            $user = $this->userRepository->getUser($email);

            if(!$user || !password_verify($password, $user->getPassword())) {
                http_response_code(404);
                echo json_encode("Wrong email or password.");
            } else {
                http_response_code(200);
                echo json_encode($user->toJson());
            }
        }
    }
}