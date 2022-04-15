<?php

require_once 'AppController.php';
require_once __DIR__.'/../models/User.php';
require_once __DIR__.'/../repository/UserRepository.php';

class UserController extends AppController
{
    private $userRepository;

    const MAX_FILE_SIZE = 2048*2048;
    const SUPPORTED_TYPES = ['image/png', 'image/jpeg'];
    const UPLOAD_DIRECTORY = '/../public/img/profiles/';

    public function __construct() {
        parent::__construct();
        $this->userRepository = new UserRepository();
    }

    public function getUserDetails()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: application/json');

        $postData = file_get_contents("php://input");

        if(!$this->isGet() || empty($postData)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $request = json_decode($postData);
        $email = $request->email;

        $user = $this->userRepository->getUser($email);
        if(!$user) {
            http_response_code(404);
            echo json_encode("User not found");
        } else {
            http_response_code(200);
            echo json_encode($user->toJson());
        }
    }

    public function setUserDetails()
    {
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
        $name = trim($request->name);
        $surname = trim($request->surname);
        $email = trim($request->email);
        $password = $request->password;
        $newPassword = str_replace(' ', '', $request->new_password);

        if (empty($name) || empty($surname) || empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        $user = $this->userRepository->getUser($email);
        if(!$user || !password_verify($password, $user->getPassword())) {
            http_response_code(400);
            echo json_encode("Wrong email or password");
            die();
        }

        if (!ctype_alpha($name) || !ctype_alpha($surname)) {
            http_response_code(400);
            echo json_encode("Wrong name or surname");
            die();
        }

        $this->validatePassword($password);

        if($newPassword) {
            $this->validatePassword($newPassword);
            $newPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $this->userRepository->updatePassword($email, $newPassword);
        }

        $this->userRepository->updateUserData($email, $name, $surname);
        $user = $this->userRepository->getUser($email);

        if(!$user) {
            http_response_code(400);
            echo json_encode("user not found");
        } else {
            http_response_code(200);
            echo json_encode($user->toJson());
        }
    }

    public function setProfilePicture() {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-type: multipart/form-data');

        if(!$this->isPost()) {
            http_response_code(400);
            echo json_encode("Bad request");
            die();
        }

        if(is_uploaded_file($_FILES['picture']['tmp_name']) && $this->validatePicture($_FILES['picture'])) {
            $pathinfo = pathinfo($_FILES['picture']['name']);

            $_FILES['picture']['name'] = uniqid("picture_").".".$pathinfo['extension'];

            move_uploaded_file(
                $_FILES['picture']['tmp_name'],
                dirname(__DIR__).self::UPLOAD_DIRECTORY.$_FILES['picture']['name']
            );
        } else {
            die();
        }

        $email = $_POST['email'];
        $this->userRepository->updateUserPicture($email, $_FILES['picture']['name']);
        $user = $this->userRepository->getUser($email);

        if(!$user) {
            http_response_code(404);
            echo json_encode("User not found");
        } else {
            http_response_code(200);
            echo json_encode($user->toJson());
        }

    }

    private function validatePassword($password)
    {
        if (strlen($password) < 8) {
            http_response_code(400);
            echo json_encode("Password too short");
            die();
        }
    }

    private  function validatePicture(array $file)
    {
        if($file['size'] > self::MAX_FILE_SIZE){
            http_response_code(400);
            echo json_encode('File too large');
            return false;
        }

        if(!isset($file['type']) || !in_array($file['type'], self::SUPPORTED_TYPES)){
            http_response_code(400);
            echo json_encode('File type not supported');
            return false;
        }

        return true;
    }



}