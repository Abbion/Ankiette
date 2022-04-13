<?php

require_once 'AppController.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../repository/UserRepository.php';

class SecurityController extends AppController
{
    private $userRepository;

    public function __construct()
    {
        parent::__construct();
        $this->userRepository = new UserRepository();
    }

    public function login()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');

        $postData = file_get_contents("php://input");

        //email:    mail@mail.com
        //password:   12345

        if (!$this->isPost() || empty($postData)) {
            http_response_code(400);
            echo json_encode("Bad request");
        } else {
            $request = json_decode($postData);

            $email = $request->email;
            $password = $request->password;

            if (empty($email) || empty($password)) {
                http_response_code(400);
                echo json_encode("Bad request");

            } else {
                $user = $this->userRepository->getUser($email);

                if (!$user || !password_verify($password, $user->getPassword())) {
                    http_response_code(404);
                    echo json_encode("Wrong email or password.");
                } else {
                    http_response_code(200);
                    echo json_encode($user->toJson());
                }
            }
        }
    }

    public function register()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');

        $postData = file_get_contents("php://input");
        var_dump($postData);
        // Required:
        //  name:    "jakub"
        //  surname:   "usyk"
        //  email:   "mail@mail.com"
        //  password:   "123456789"


        $request = json_decode($postData);
        $name = trim($request->name);
        $surname = trim($request->surname);
        $email = trim($request->email);
        $password = str_replace(' ', '', $request->password);

        if (empty($name) || empty($surname) || empty($email) || empty($password)) {

            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }


        if (!ctype_alpha($name) || !ctype_alpha($surname)) {
            http_response_code(400);
            echo json_encode("Bad name or surname");
            die();
        }

        $this->validatePassword($password);
        $password = password_hash($password, PASSWORD_DEFAULT);

        if (!$this->isEmailCorrect($email)) {
            http_response_code(400);
            echo json_encode("Wrong email");
            die();
        }

        if ($this->isEmailInUse($email)) {
            http_response_code(400);
            echo json_encode("Email in use");
            die();
        }

        $picture = "empty for now";
        $user = new User($email, $password, $name, $surname, $picture);

        $this->userRepository->createUser($user);

        http_response_code(200);
        echo json_encode("User added.");


    }

    private function isEmailInUse($email): bool
    {
        if ($this->userRepository->getUser($email) !== null) {
            return true;
        }
        return false;
    }

    private function isEmailCorrect($email): bool
    {
        $pattern = "*@*";
        if (preg_match($pattern, $email) == 1) return true;
        return false;
    }

    private function validatePassword($password)
    {
        // For now we do not know if the length has some meaning in this case so we added some

        if (strlen($password) < 8) {
            http_response_code(400);
            echo json_encode("Password too short");
            die();
        }

    }

}